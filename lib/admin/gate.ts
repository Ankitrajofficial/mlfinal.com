/**
 * Admin access gate (edge-safe).
 *
 * A pre-authentication layer that hides the /admin login page from anyone
 * who does not hold the gate secret. Enforced in proxy.ts (Next middleware,
 * Edge runtime), so it uses Web Crypto only — no Node `crypto` module.
 *
 * Flow:
 *   1. An authorized person opens the one-time unlock link once per device:
 *        https://<site>/admin?k=<ADMIN_GATE_SECRET>
 *   2. The edge verifies the key, sets a long-lived signed gate cookie, and
 *      redirects to a clean /admin URL (the key never lingers in history).
 *   3. Every later /admin and /api/admin request must carry a valid gate
 *      cookie; without it the edge returns 404 — the panel appears not to
 *      exist. The existing password login still runs behind this gate.
 *
 * When ADMIN_GATE_SECRET is unset (local dev), the gate is disabled and the
 * panel behaves as before.
 */

export const ADMIN_GATE_COOKIE = 'mls_admin_gate'

// 30 days — long enough that a trusted device rarely re-unlocks.
export const ADMIN_GATE_MAX_AGE = 60 * 60 * 24 * 30

export function gateSecret(): string {
  return process.env.ADMIN_GATE_SECRET?.trim() || ''
}

export function gateEnabled(): boolean {
  return gateSecret().length > 0
}

/** Constant-time string comparison (no early-exit on first mismatch). */
export function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

/** SHA-256 hex of the input, using Web Crypto (available in the Edge runtime). */
export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** The value stored in the gate cookie: a hash of the secret, not the secret. */
export function gateCookieValue(): Promise<string> {
  return sha256Hex(`mls-admin-gate:${gateSecret()}`)
}
