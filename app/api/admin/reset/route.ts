import { type NextRequest } from 'next/server'
import { isSession, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, resetStore, updateStore } from '@/lib/admin/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Reset operational store to seed baseline (admin only). */
export async function POST(request: NextRequest) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session

  await resetStore()
  await updateStore((store) => {
    logActivity(store, {
      actor: session.name,
      action: 'Reset command centre data to seed baseline',
      entityType: 'system',
    })
  })

  return jsonOk({ message: 'Store reset to seed data' })
}
