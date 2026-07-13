import { NextResponse, type NextRequest } from 'next/server'
import {
  cookieOptions,
  createSessionToken,
  isDefaultAdminPassword,
  verifyPassword,
  ADMIN_COOKIE,
} from '@/lib/admin/auth'
import { jsonError, jsonOk } from '@/lib/admin/api-helpers'
import { logActivity, updateStore } from '@/lib/admin/store'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  // Brute-force protection: 5 attempts / 15 min per IP. The 'login:'
  // prefix keeps this bucket separate from the public enquiry limiter.
  const ip = getClientIp(request.headers)
  const rate = checkRateLimit(`login:${ip}`)
  if (!rate.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many sign-in attempts. Try again in ${Math.ceil(rate.retryAfterSec / 60)} minute(s).`,
      },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSec) } }
    )
  }

  let body: { password?: string; name?: string }
  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid JSON body')
  }

  if (!body.password || !verifyPassword(body.password)) {
    return jsonError('Invalid password', 401)
  }

  const name = body.name?.trim() || 'Admin'
  const token = createSessionToken({ name, role: 'Group Operator' })

  await updateStore((store) => {
    logActivity(store, {
      actor: name,
      action: 'Signed in to command centre',
      entityType: 'auth',
    })
  })

  const res = jsonOk({
    session: {
      name,
      role: 'Group Operator',
      initials: name
        .split(/\s+/)
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    },
    usingDefaultPassword: isDefaultAdminPassword(),
  })

  res.cookies.set(ADMIN_COOKIE, token, cookieOptions(60 * 60 * 12))
  return res
}
