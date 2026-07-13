import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export const ADMIN_COOKIE = 'mls_admin_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 12 // 12 hours

export interface AdminSession {
  name: string
  role: string
  initials: string
  iat: number
  exp: number
}

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'mls-dev-admin-secret-change-me'
  )
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'mls-admin-2026'
}

export function isDefaultAdminPassword(): boolean {
  return !process.env.ADMIN_PASSWORD
}

function sign(payloadB64: string): string {
  return createHmac('sha256', secret()).update(payloadB64).digest('base64url')
}

export function createSessionToken(input: {
  name: string
  role?: string
}): string {
  const now = Date.now()
  const session: AdminSession = {
    name: input.name.trim() || 'Admin',
    role: input.role?.trim() || 'Group Operator',
    initials: initialsFromName(input.name.trim() || 'Admin'),
    iat: now,
    exp: now + SESSION_TTL_MS,
  }
  const payloadB64 = Buffer.from(JSON.stringify(session), 'utf8').toString('base64url')
  const sig = sign(payloadB64)
  return `${payloadB64}.${sig}`
}

export function verifySessionToken(token: string | undefined | null): AdminSession | null {
  if (!token) return null
  const [payloadB64, sig] = token.split('.')
  if (!payloadB64 || !sig) return null

  const expected = sign(payloadB64)
  try {
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }

  try {
    const session = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf8')
    ) as AdminSession
    if (!session.exp || session.exp < Date.now()) return null
    if (!session.name) return null
    return session
  } catch {
    return null
  }
}

export function verifyPassword(password: string): boolean {
  const expected = getAdminPassword()
  try {
    const a = Buffer.from(password)
    const b = Buffer.from(expected)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export async function getSessionFromCookies(): Promise<AdminSession | null> {
  const jar = await cookies()
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value)
}

export function getSessionFromRequest(request: NextRequest): AdminSession | null {
  return verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value)
}

export function cookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSec,
  }
}

function initialsFromName(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'AD'
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase()
}
