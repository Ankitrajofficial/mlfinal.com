import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, updateStore } from '@/lib/admin/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PatchSchema = z.object({
  level: z.enum(['info', 'warn', 'critical']).optional(),
  title: z.string().min(2).max(160).optional(),
  body: z.string().min(2).max(2000).optional(),
  status: z.enum(['open', 'acknowledged', 'resolved']).optional(),
  owner: z.string().max(80).optional(),
})

export async function PATCH(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session
  const { id } = await ctx.params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid JSON body')
  }

  const parsed = PatchSchema.safeParse(body)
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || 'Validation failed')
  }

  const store = await updateStore((s) => {
    const idx = s.alerts.findIndex((x) => x.id === id)
    if (idx < 0) return
    const prev = s.alerts[idx]!
    s.alerts[idx] = {
      ...prev,
      ...parsed.data,
      updatedAt: new Date().toISOString(),
    }
    logActivity(s, {
      actor: session.name,
      action:
        parsed.data.status && parsed.data.status !== prev.status
          ? `Alert “${prev.title}” → ${parsed.data.status}`
          : `Updated alert “${prev.title}”`,
      entityType: 'alert',
      entityId: id,
    })
  })

  const alert = store.alerts.find((x) => x.id === id)
  if (!alert) return jsonError('Alert not found', 404)
  return jsonOk({ alert })
}

export async function DELETE(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session
  const { id } = await ctx.params
  let found = false

  await updateStore((s) => {
    const prev = s.alerts.find((x) => x.id === id)
    if (!prev) return
    found = true
    s.alerts = s.alerts.filter((x) => x.id !== id)
    logActivity(s, {
      actor: session.name,
      action: `Deleted alert “${prev.title}”`,
      entityType: 'alert',
      entityId: id,
    })
  })

  if (!found) return jsonError('Alert not found', 404)
  return jsonOk({ deleted: true })
}
