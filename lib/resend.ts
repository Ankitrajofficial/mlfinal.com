/**
 * Resend client wrapper.
 *
 * The actual `resend` npm package isn't imported here — that requires
 * `npm install resend` first. To keep the codebase syntactically valid
 * without the package installed, we use a small thin wrapper that does
 * a `fetch()` to the Resend HTTP API directly. This avoids the dependency
 * footprint while staying production-ready.
 *
 * If you prefer the official SDK, swap `sendEmail` for:
 *   import { Resend } from 'resend'
 *   const resend = new Resend(process.env.RESEND_API_KEY)
 *   await resend.emails.send({ from, to, subject, html })
 *
 * Environment variables expected:
 *   RESEND_API_KEY        — required in production
 *   RESEND_FROM_DOMAIN    — e.g. 'office@mohanlalsonsgroup.com' (must be verified at Resend)
 *
 * Per FACTS Section 10: single-channel routing.
 *   MLS enquiries → office@mohanlalsonsgroup.com
 *   KHADANE enquiries → exports@khadane.com
 */

export interface SendEmailOptions {
  from: string
  to: string | string[]
  replyTo?: string
  subject: string
  html: string
  text?: string
}

export interface SendEmailResult {
  ok: boolean
  id?: string
  error?: string
}

/**
 * Send an email via Resend HTTP API.
 * Returns { ok: false, error } if RESEND_API_KEY is missing or the send fails.
 */
export async function sendEmail(
  opts: SendEmailOptions,
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY is not configured' }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: opts.from,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        reply_to: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
      }),
    })

    if (!res.ok) {
      let errMsg = `Resend API returned ${res.status}`
      try {
        const data = (await res.json()) as { message?: string; name?: string }
        if (data?.message) errMsg = `${data.name ?? 'Error'}: ${data.message}`
      } catch {
        // ignore JSON parse failures
      }
      return { ok: false, error: errMsg }
    }

    const data = (await res.json()) as { id?: string }
    return { ok: true, id: data.id }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Unknown send error',
    }
  }
}

/**
 * Verify a Cloudflare Turnstile token. Optional layer.
 * Returns true if token is valid OR TURNSTILE_SECRET_KEY is not configured.
 */
export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // Turnstile not configured — accept
  if (!token) return false

  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, response: token }),
      },
    )
    if (!res.ok) return false
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}
