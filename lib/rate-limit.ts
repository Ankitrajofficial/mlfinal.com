/**
 * Simple in-memory IP rate limiter.
 *
 * Production note: this lives in a single Node process. On Vercel,
 * each serverless instance has its own counter. That's acceptable for
 * the volume we expect (a few dozen enquiries a day at most), but if
 * abuse becomes a real concern, swap in Upstash Redis. Drop-in path
 * documented in DEPLOYMENT.md.
 *
 * Default window: 15 minutes / 5 requests.
 */

interface Entry {
  count: number
  resetAt: number // epoch ms
}

// Module-scoped map (lives for the life of the warm instance).
const buckets = new Map<string, Entry>()

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5

// Periodically prune expired entries. Runs lazily on each check;
// avoids unbounded growth without needing a timer.
function pruneExpired(now: number) {
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key)
  }
}

export interface RateLimitResult {
  ok: boolean
  remaining: number
  resetAtMs: number
  retryAfterSec: number
}

/**
 * Check whether `ip` is within the rate limit. Increments the counter
 * if allowed, leaves it alone if not.
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now()

  // Prune occasionally (1-in-50 chance per call)
  if (Math.random() < 0.02) pruneExpired(now)

  const entry = buckets.get(ip)

  if (!entry || entry.resetAt <= now) {
    // First request in window
    const resetAt = now + WINDOW_MS
    buckets.set(ip, { count: 1, resetAt })
    return {
      ok: true,
      remaining: MAX_REQUESTS - 1,
      resetAtMs: resetAt,
      retryAfterSec: 0,
    }
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfterSec = Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
    return {
      ok: false,
      remaining: 0,
      resetAtMs: entry.resetAt,
      retryAfterSec,
    }
  }

  entry.count += 1
  return {
    ok: true,
    remaining: MAX_REQUESTS - entry.count,
    resetAtMs: entry.resetAt,
    retryAfterSec: 0,
  }
}

/**
 * Extract a best-guess IP from request headers.
 * Vercel sets x-forwarded-for; fall back to x-real-ip.
 * If neither is present (local dev), use a placeholder so the limiter still works.
 */
export function getClientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()

  const xri = headers.get('x-real-ip')
  if (xri) return xri.trim()

  return 'local-dev'
}
