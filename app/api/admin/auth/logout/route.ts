import { type NextRequest } from 'next/server'
import { ADMIN_COOKIE, cookieOptions, getSessionFromRequest } from '@/lib/admin/auth'
import { jsonOk } from '@/lib/admin/api-helpers'
import { logActivity, updateStore } from '@/lib/admin/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request)
  if (session) {
    await updateStore((store) => {
      logActivity(store, {
        actor: session.name,
        action: 'Signed out of command centre',
        entityType: 'auth',
      })
    })
  }

  const res = jsonOk({ message: 'Signed out' })
  res.cookies.set(ADMIN_COOKIE, '', { ...cookieOptions(0), maxAge: 0 })
  return res
}
