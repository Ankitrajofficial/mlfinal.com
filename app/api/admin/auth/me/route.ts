import { type NextRequest } from 'next/server'
import { getSessionFromRequest, isDefaultAdminPassword } from '@/lib/admin/auth'
import { jsonError, jsonOk } from '@/lib/admin/api-helpers'
import { readStore } from '@/lib/admin/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request)
  if (!session) return jsonError('Unauthorized', 401)

  const store = await readStore()
  return jsonOk({
    session: {
      name: session.name,
      role: session.role,
      initials: session.initials,
    },
    operator: store.operator,
    lastSynced: store.lastSynced,
    usingDefaultPassword: isDefaultAdminPassword(),
  })
}
