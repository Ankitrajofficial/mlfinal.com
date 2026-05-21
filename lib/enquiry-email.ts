import type { z } from 'zod'
import { EnquirySchema } from './enquiry-schema'
import { ENTITIES, CONTACT } from './facts'

type Enquiry = z.infer<typeof EnquirySchema>

interface ComposedEmail {
  subject: string
  text: string
  html: string
}

/**
 * Format an enquiry into an email the family can read.
 *
 * The format is restrained — institutional, readable in any client,
 * no Web2 marketing styling. Reference number is the first thing.
 */
export function composeEnquiryEmail(
  data: Enquiry,
  reference: string,
): ComposedEmail {
  const categoryLabel = formatCategory(data.category)
  const siteLabel = data.site === 'mls' ? ENTITIES.group.acronym : 'KHADANE™'

  const subject = `[${reference}] ${categoryLabel} — ${data.name}`

  // ─── Plain-text body ─────────────────────────────────────────
  const textLines = [
    `${siteLabel} ENQUIRY · ${reference}`,
    `Received: ${new Date().toISOString()}`,
    '',
    `Category: ${categoryLabel}`,
    `From:     ${data.name}`,
    `Email:    ${data.email}`,
  ]
  if (data.phone) textLines.push(`Phone:    ${data.phone}`)
  if (data.company) textLines.push(`Company:  ${data.company}`)
  if (data.country) textLines.push(`Country:  ${data.country}`)
  textLines.push('', '─── Message ───', '', data.message, '', '─── End ───')

  const text = textLines.join('\n')

  // ─── HTML body — minimal, institutional ──────────────────────
  const escapedMessage = escapeHtml(data.message).replace(/\n/g, '<br>')

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:#EEEBE0;font-family:Georgia,serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#EEEBE0;padding:40px 20px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#FFFFFF;border:1px solid #1A1410;">
        <tr><td style="padding:32px 40px;border-bottom:2px solid #B8962E;">
          <p style="margin:0 0 4px 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#999690;">
            ${escapeHtml(siteLabel)} · Enquiry
          </p>
          <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#1A1410;font-style:italic;">
            ${escapeHtml(reference)}
          </p>
        </td></tr>
        <tr><td style="padding:32px 40px 16px 40px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            ${row('Category', categoryLabel)}
            ${row('Name', data.name)}
            ${row('Email', `<a href="mailto:${escapeAttr(data.email)}" style="color:#B8962E;text-decoration:none;">${escapeHtml(data.email)}</a>`)}
            ${data.phone ? row('Phone', `<a href="tel:${escapeAttr(data.phone)}" style="color:#B8962E;text-decoration:none;">${escapeHtml(data.phone)}</a>`) : ''}
            ${data.company ? row('Company', data.company) : ''}
            ${data.country ? row('Country', data.country) : ''}
            ${row('Received', new Date().toUTCString())}
          </table>
        </td></tr>
        <tr><td style="padding:0 40px 32px 40px;">
          <p style="margin:24px 0 12px 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#B8962E;">
            Message
          </p>
          <div style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#1A1410;border-left:2px solid #B8962E;padding-left:20px;">
            ${escapedMessage}
          </div>
        </td></tr>
        <tr><td style="padding:24px 40px;background:#4A3520;color:#EEEBE0;">
          <p style="margin:0 0 4px 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7;">
            ${escapeHtml(ENTITIES.group.name)}
          </p>
          <p style="margin:0;font-family:Georgia,serif;font-size:14px;font-style:italic;color:#B8962E;">
            Reply directly to this email to respond. Reference number preserved automatically.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return { subject, text, html }
}

/**
 * Compose a confirmation email sent BACK to the enquirer.
 * Acknowledges receipt, names the reference, sets expectations.
 */
export function composeConfirmationEmail(
  data: Enquiry,
  reference: string,
): ComposedEmail {
  const siteLabel = data.site === 'mls' ? ENTITIES.group.name : 'KHADANE™'
  const slaPhrase = data.category === 'hospitality'
    ? CONTACT.slaHospitality
    : CONTACT.slaStandard

  const subject = `[${reference}] We received your enquiry — ${siteLabel}`

  const text = [
    `Dear ${data.name},`,
    '',
    `Thank you for writing to ${siteLabel}.`,
    '',
    `Your enquiry has been received and assigned the reference number ${reference}.`,
    `We respond ${slaPhrase}.`,
    '',
    `If you need to refer to this enquiry, please use the reference above.`,
    '',
    `— The Office`,
    `${siteLabel}`,
    '',
    `This is an automated acknowledgement. The reply to your enquiry will come from a member of the family directly.`,
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:#EEEBE0;font-family:Georgia,serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#EEEBE0;padding:40px 20px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#FFFFFF;border:1px solid #1A1410;">
        <tr><td style="padding:40px;border-bottom:2px solid #B8962E;">
          <p style="margin:0 0 4px 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#999690;">
            ${escapeHtml(siteLabel)} · The Office
          </p>
          <p style="margin:0;font-family:Georgia,serif;font-size:28px;color:#1A1410;line-height:1.2;">
            Your enquiry has been
            <span style="font-style:italic;color:#B8962E;">received.</span>
          </p>
        </td></tr>
        <tr><td style="padding:32px 40px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#1A1410;">
          <p style="margin:0 0 16px 0;">Dear ${escapeHtml(data.name)},</p>
          <p style="margin:0 0 16px 0;">
            Thank you for writing to ${escapeHtml(siteLabel)}. We have received your
            enquiry and assigned it the reference number below.
          </p>
          <p style="margin:0 0 24px 0;text-align:center;font-family:'Courier New',monospace;font-size:18px;letter-spacing:0.1em;color:#B8962E;padding:16px;background:#EEEBE0;">
            ${escapeHtml(reference)}
          </p>
          <p style="margin:0 0 16px 0;">
            We respond <em style="color:#4A3520;">${escapeHtml(slaPhrase)}</em>. The
            reply will come from a member of the family directly, not from an
            automated system.
          </p>
          <p style="margin:0;font-family:Georgia,serif;font-style:italic;color:#4A3520;">
            — The Office
          </p>
        </td></tr>
        <tr><td style="padding:20px 40px;background:#4A3520;color:#EEEBE0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.1em;">
          ${escapeHtml(ENTITIES.group.name)} · Bijolia, Rajasthan
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return { subject, text, html }
}

// ─── Helpers ──────────────────────────────────────────────────

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;vertical-align:top;width:120px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#999690;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;vertical-align:top;font-family:Georgia,serif;font-size:15px;color:#1A1410;">${value}</td>
  </tr>`
}

function formatCategory(category: string): string {
  return category
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/\n/g, ' ')
}
