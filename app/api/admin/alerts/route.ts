import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, newId, updateStore } from '@/lib/admin/store'
import type { AdminAlert, AlertLevel } from '@/lib/admin/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CreateSchema = z.object({
  level: z.enum(['info', 'warn', 'critical']),
  title: z.string().min(2).max(160),
  body: z.string().min(2).max(2000),
  owner: z.string().max(80).optional().default('Unassigned'),
})

export async function POST(request: NextRequest) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid JSON body')
  }

  const parsed = CreateSchema.safeParse(body)
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || 'Validation failed')
  }

  const now = new Date().toISOString()
  const alert: AdminAlert = {
    id: newId('alt'),
    level: parsed.data.level as AlertLevel,
    title: parsed.data.title,
    body: parsed.data.body,
    status: 'open',
    owner: parsed.data.owner,
    createdAt: now,
    updatedAt: now,
  }

  await updateStore((store) => {
    store.alerts = [alert, ...store.alerts]
    logActivity(store, {
      actor: session.name,
      action: `Raised ${alert.level} alert: ${alert.title}`,
      entityType: 'alert',
      entityId: alert.id,
    })
  })

  return jsonOk({ alert }, { status: 201 })
}
