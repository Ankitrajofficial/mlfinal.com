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
  emailStatus?: string
}

interface AppsScriptResponse {
  ok?: boolean
  error?: string
  reference?: string
  emailStatus?: string
  message?: string
}

/**
 * POST to a Google Apps Script web app while preserving the POST method
 * across Google's 302 redirects.
 *
 * Node/undici (and browsers) convert 302 POST → GET by default, which
 * hits doGet() instead of doPost() and breaks the webhook. We follow
 * redirects manually and re-POST the same body each hop.
 */
async function postAppsScript(
  url: string,
  body: string,
  timeoutMs = 15000,
): Promise<Response> {
  let current = url

  for (let hop = 0; hop < 6; hop++) {
    const res = await fetch(current, {
      method: 'POST',
      headers: {
        // text/plain avoids CORS preflight and is the Apps Script-recommended body type
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body,
      redirect: 'manual',
      signal: AbortSignal.timeout(timeoutMs),
    })

    // 2xx / 4xx / 5xx — stop here
    if (res.status < 300 || res.status >= 400) {
      return res
    }

    const location = res.headers.get('location')
    // Drain body so the socket can be reused
    await res.arrayBuffer().catch(() => undefined)

    if (!location) {
      return res
    }

    current = new URL(location, current).href
  }

  throw new Error('Too many redirects from Google Apps Script webhook')
}

async function parseAppsScriptResponse(
  res: Response,
): Promise<AppsScriptResponse | undefined> {
  const text = await res.text()

  // Apps Script sometimes returns HTML error pages ("Page not found", auth walls).
  if (/^\s*</.test(text) || /unable to open the file/i.test(text)) {
    return {
      ok: false,
      error:
        'Google Apps Script returned an HTML error page. Redeploy the web app as "Anyone", use a new version after code changes, and confirm the /exec URL is current.',
    }
  }

  try {
    return JSON.parse(text) as AppsScriptResponse
  } catch {
    // Some deployments wrap JSON oddly; try to extract a JSON object
    const match = text.match(/\{[\s\S]*\}/)
    if (match) {
      try {
        return JSON.parse(match[0]) as AppsScriptResponse
      } catch {
        /* fall through */
      }
    }
    return {
      ok: false,
      error: `Non-JSON response from Google Apps Script (HTTP ${res.status})`,
    }
  }
}

export async function sendGoogleEnquiryWebhook(
  payload: GoogleEnquiryPayload,
): Promise<GoogleEnquiryResult> {
  const url = process.env.GOOGLE_ENQUIRY_WEBHOOK_URL?.trim()
  if (!url) return { configured: false, ok: true }

  const body = JSON.stringify({
    secret: process.env.GOOGLE_ENQUIRY_WEBHOOK_SECRET || '',
    reference: payload.reference,
    notifyTo: payload.notifyTo,
    ip: payload.ip,
    userAgent: payload.userAgent,
    sourceUrl: payload.sourceUrl,
    ...payload.enquiry,
  })

  try {
    const res = await postAppsScript(url, body)
    const data = await parseAppsScriptResponse(res)

    if (!res.ok || data?.ok === false) {
      return {
        configured: true,
        ok: false,
        error:
          data?.error ||
          data?.message ||
          `Google enquiry webhook returned HTTP ${res.status}`,
        emailStatus: data?.emailStatus,
      }
    }

    // Treat missing `ok` as success only when HTTP is 2xx (legacy scripts).
    return {
      configured: true,
      ok: true,
      emailStatus: data?.emailStatus,
    }
  } catch (err) {
    return {
      configured: true,
      ok: false,
      error: err instanceof Error ? err.message : 'Google enquiry webhook failed',
    }
  }
}
