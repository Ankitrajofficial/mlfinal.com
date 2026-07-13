import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, newId, updateStore } from '@/lib/admin/store'
import type { AdminTask, TaskPriority, TaskStatus } from '@/lib/admin/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CreateSchema = z.object({
  title: z.string().min(2).max(160),
  description: z.string().max(2000).optional().default(''),
  status: z.enum(['todo', 'in_progress', 'done', 'cancelled']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  owner: z.string().max(80).optional().default('Unassigned'),
  dueDate: z.string().max(40).optional().default(''),
  relatedEnquiryId: z.string().max(80).optional().default(''),
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
  const task: AdminTask = {
    id: newId('tsk'),
    title: parsed.data.title,
    description: parsed.data.description,
    status: (parsed.data.status ?? 'todo') as TaskStatus,
    priority: (parsed.data.priority ?? 'medium') as TaskPriority,
    owner: parsed.data.owner,
    dueDate: parsed.data.dueDate,
    relatedEnquiryId: parsed.data.relatedEnquiryId,
    createdAt: now,
    updatedAt: now,
  }

  await updateStore((store) => {
    store.tasks = [task, ...store.tasks]
    logActivity(store, {
      actor: session.name,
      action: `Created task “${task.title}”`,
      entityType: 'task',
      entityId: task.id,
    })
  })

  return jsonOk({ task }, { status: 201 })
}
