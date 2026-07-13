import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionFromRequest, type AdminSession } from './auth'

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, ...data }, init)
}

export function jsonError(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status })
}

export function requireAdmin(request: NextRequest): AdminSession | NextResponse {
  const session = getSessionFromRequest(request)
  if (!session) {
    return jsonError('Unauthorized. Please sign in.', 401)
  }
  return session
}

export function isSession(value: AdminSession | NextResponse): value is AdminSession {
  return !(value instanceof NextResponse)
}
