import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, updateStore } from '@/lib/admin/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PatchSchema = z.object({
  title: z.string().min(2).max(160).optional(),
  description: z.string().max(2000).optional(),
  status: z.enum(['todo', 'in_progress', 'done', 'cancelled']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  owner: z.string().max(80).optional(),
  dueDate: z.string().max(40).optional(),
  relatedEnquiryId: z.string().max(80).optional(),
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
    const idx = s.tasks.findIndex((x) => x.id === id)
    if (idx < 0) return
    const prev = s.tasks[idx]!
    s.tasks[idx] = {
      ...prev,
      ...parsed.data,
      updatedAt: new Date().toISOString(),
    }
    logActivity(s, {
      actor: session.name,
      action:
        parsed.data.status && parsed.data.status !== prev.status
          ? `Task “${prev.title}” → ${parsed.data.status}`
          : `Updated task “${prev.title}”`,
      entityType: 'task',
      entityId: id,
    })
  })

  const task = store.tasks.find((x) => x.id === id)
  if (!task) return jsonError('Task not found', 404)
  return jsonOk({ task })
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
    const prev = s.tasks.find((x) => x.id === id)
    if (!prev) return
    found = true
    s.tasks = s.tasks.filter((x) => x.id !== id)
    logActivity(s, {
      actor: session.name,
      action: `Deleted task “${prev.title}”`,
      entityType: 'task',
      entityId: id,
    })
  })

  if (!found) return jsonError('Task not found', 404)
  return jsonOk({ deleted: true })
}
