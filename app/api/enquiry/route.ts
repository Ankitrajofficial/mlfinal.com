import { NextResponse, type NextRequest } from 'next/server'
import {
  EnquirySchema,
  generateReferenceNumber,
  routeEnquiryInbox,
} from '@/lib/enquiry-schema'
import { sendEmail, verifyTurnstile } from '@/lib/resend'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { CONTACT, ENTITIES, FOUNDING } from '@/lib/facts'

/**
 * Enquiry API — PRODUCTION.
 *
 * Pipeline per request:
 *   1. Parse JSON body
 *   2. Validate via EnquirySchema
 *   3. Honeypot check (silent block if filled)
 *   4. Min-submit-time check (silent block if too fast)
 *   5. IP rate limit (5 / 15 min per IP)
 *   6. Optional Turnstile verification
 *   7. Production safety: 503 if RESEND_API_KEY missing in production
 *   8. Generate reference number
 *   9. Route to correct inbox via lib/enquiry-schema.ts
 *   10. Compose and send email via Resend
 *   11. Return {ok, reference, message}
 *
 * Single-channel discipline per FACTS Section 10.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const FROM_DOMAIN =
  process.env.RESEND_FROM_DOMAIN || 'enquiries@mohanlalsonsgroup.com'

export async function POST(request: NextRequest) {
  // ─── 1. Parse JSON ─────────────────────────────────────────
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  // ─── 2. Validate ────────────────────────────────────────────
  const parsed = EnquirySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Validation failed',
        details: parsed.error.flatten(),
      },
      { status: 400 },
    )
  }
  const data = parsed.data

  // ─── 3. Honeypot (silent block) ─────────────────────────────
  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({
      ok: true,
      reference:
        'BLOCKED-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      message: 'Received.',
    })
  }

  // ─── 4. Min-submit-time check (silent block) ────────────────
  if (data.submittedAtClient) {
    const elapsed = Date.now() - data.submittedAtClient
    if (elapsed < 2000) {
      return NextResponse.json({
        ok: true,
        reference:
          'BLOCKED-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
        message: 'Received.',
      })
    }
  }

  // ─── 5. IP rate limit ───────────────────────────────────────
  const ip = getClientIp(request.headers)
  const rate = checkRateLimit(ip)
  if (!rate.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many enquiries from this address. Please try again in ${Math.ceil(rate.retryAfterSec / 60)} minutes, or write to ${CONTACT.officeMLS} directly.`,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rate.retryAfterSec) },
      },
    )
  }

  // ─── 6. Turnstile verification (if configured) ──────────────
  if (process.env.TURNSTILE_SECRET_KEY) {
    const tsToken = (body as { turnstileToken?: string })?.turnstileToken
    const tsOk = await verifyTurnstile(tsToken)
    if (!tsOk) {
      return NextResponse.json(
        { ok: false, error: 'Verification failed. Please try again.' },
        { status: 403 },
      )
    }
  }

  // ─── 7. Production safety check ─────────────────────────────
  if (process.env.NODE_ENV === 'production' && !process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Mail service is temporarily unavailable. Please write directly to ' +
          CONTACT.officeMLS,
      },
      { status: 503 },
    )
  }

  // ─── 8. Reference number ────────────────────────────────────
  const reference = generateReferenceNumber(data.site)
  const inbox = routeEnquiryInbox(data.site, data.category)

  // ─── 9. Compose email ───────────────────────────────────────
  const { subject, html, text } = composeEmail({
    reference,
    site: data.site,
    category: data.category,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    company: data.company || '',
    country: data.country || '',
    message: data.message,
    ip,
  })

  // ─── 10. Send (only attempts in prod or when key present) ───
  let sendOk = true
  let sendError: string | undefined
  if (process.env.RESEND_API_KEY) {
    const sendResult = await sendEmail({
      from: FROM_DOMAIN,
      to: inbox,
      replyTo: data.email,
      subject,
      html,
      text,
    })
    sendOk = sendResult.ok
    sendError = sendResult.error
  } else {
    // Dev mode: log and continue
    console.log('[ENQUIRY · DEV]', {
      reference,
      to: inbox,
      from: data.email,
      preview: data.message.slice(0, 80),
    })
  }

  // ─── 11. Response ───────────────────────────────────────────
  if (!sendOk) {
    console.error('[ENQUIRY · SEND ERROR]', { reference, sendError })
    // Don't tell the user the technical reason; we have the ref number.
    return NextResponse.json(
      {
        ok: false,
        error: `We received your enquiry (ref ${reference}) but could not deliver it automatically. Please write to ${CONTACT.officeMLS} mentioning this reference.`,
        reference,
      },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    reference,
    message:
      'Your enquiry has been received. The Office will respond within one business day.',
  })
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: 'Method not allowed. Use POST to submit an enquiry.',
    },
    { status: 405 },
  )
}

// ─────────────────────────────────────────────────────────────
// Email composition
// ─────────────────────────────────────────────────────────────

interface ComposeInput {
  reference: string
  site: 'mls' | 'khadane'
  category: string
  name: string
  email: string
  phone: string
  company: string
  country: string
  message: string
  ip: string
}

function composeEmail(input: ComposeInput) {
  const siteLabel = input.site === 'mls' ? ENTITIES.group.name : 'KHADANE™'
  const subject = `[${input.reference}] ${input.category} — ${input.name}`

  const text = [
    `${siteLabel} · New enquiry`,
    `Reference: ${input.reference}`,
    `Category: ${input.category}`,
    '',
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || '—'}`,
    `Company: ${input.company || '—'}`,
    `Country: ${input.country || '—'}`,
    '',
    'Message:',
    input.message,
    '',
    '---',
    `Submitted from: ${input.ip}`,
    `Year: ${FOUNDING.currentYear}`,
  ].join('\n')

  const html = `
<!DOCTYPE html>
<html lang="en">
<body style="font-family:Georgia,serif;background:#EEEBE0;color:#1A1410;padding:0;margin:0;">
  <div style="max-width:600px;margin:0 auto;background:#EEEBE0;padding:32px;">
    <p style="font-family:'Courier New',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#B8962E;margin:0 0 12px 0;">
      ${siteLabel} · New enquiry
    </p>
    <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:normal;color:#1A1410;margin:0 0 8px 0;letter-spacing:-0.02em;">
      ${escapeHtml(input.name)}
    </h1>
    <p style="font-family:Georgia,serif;font-style:italic;font-size:16px;color:#4A3520;margin:0 0 24px 0;">
      ${escapeHtml(input.category)} · Ref ${input.reference}
    </p>
    <hr style="border:0;border-top:1px solid rgba(26,20,16,0.1);margin:24px 0;" />
    <table style="width:100%;border-collapse:collapse;margin:0 0 24px 0;">
      <tr>
        <td style="padding:8px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#999690;width:30%;">Email</td>
        <td style="padding:8px 0;font-size:15px;color:#1A1410;"><a href="mailto:${escapeHtml(input.email)}" style="color:#B8962E;text-decoration:none;">${escapeHtml(input.email)}</a></td>
      </tr>
      ${input.phone ? `<tr><td style="padding:8px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#999690;">Phone</td><td style="padding:8px 0;font-size:15px;color:#1A1410;">${escapeHtml(input.phone)}</td></tr>` : ''}
      ${input.company ? `<tr><td style="padding:8px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#999690;">Company</td><td style="padding:8px 0;font-size:15px;color:#1A1410;">${escapeHtml(input.company)}</td></tr>` : ''}
      ${input.country ? `<tr><td style="padding:8px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#999690;">Country</td><td style="padding:8px 0;font-size:15px;color:#1A1410;">${escapeHtml(input.country)}</td></tr>` : ''}
    </table>
    <hr style="border:0;border-top:1px solid rgba(26,20,16,0.1);margin:24px 0;" />
    <p style="font-family:'Courier New',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#999690;margin:0 0 8px 0;">
      Message
    </p>
    <div style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#1A1410;white-space:pre-wrap;">${escapeHtml(input.message)}</div>
    <hr style="border:0;border-top:1px solid rgba(26,20,16,0.1);margin:32px 0 16px 0;" />
    <p style="font-family:'Courier New',monospace;font-size:10px;color:#999690;margin:0;">
      Submitted from ${escapeHtml(input.ip)} · ${siteLabel} · ${FOUNDING.currentYear}
    </p>
  </div>
</body>
</html>`.trim()

  return { subject, html, text }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
