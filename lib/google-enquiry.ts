import type { EnquiryInput } from './enquiry-schema'

export interface GoogleEnquiryPayload {
  reference: string
  enquiry: EnquiryInput
  notifyTo: string
  ip: string
  userAgent: string
  sourceUrl: string
}

export interface GoogleEnquiryResult {
  configured: boolean
  ok: boolean
  error?: string
}

interface AppsScriptResponse {
  ok?: boolean
  error?: string
  reference?: string
}

export async function sendGoogleEnquiryWebhook(
  payload: GoogleEnquiryPayload,
): Promise<GoogleEnquiryResult> {
  const url = process.env.GOOGLE_ENQUIRY_WEBHOOK_URL
  if (!url) return { configured: false, ok: true }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        secret: process.env.GOOGLE_ENQUIRY_WEBHOOK_SECRET || '',
        reference: payload.reference,
        notifyTo: payload.notifyTo,
        ip: payload.ip,
        userAgent: payload.userAgent,
        sourceUrl: payload.sourceUrl,
        ...payload.enquiry,
      }),
      signal: AbortSignal.timeout(10000),
    })

    let data: AppsScriptResponse | undefined
    try {
      data = (await res.json()) as AppsScriptResponse
    } catch {
      data = undefined
    }

    if (!res.ok || data?.ok === false) {
      return {
        configured: true,
        ok: false,
        error: data?.error || `Google enquiry webhook returned ${res.status}`,
      }
    }

    return { configured: true, ok: true }
  } catch (err) {
    return {
      configured: true,
      ok: false,
      error: err instanceof Error ? err.message : 'Google enquiry webhook failed',
    }
  }
}
