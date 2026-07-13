import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, newId, updateStore } from '@/lib/admin/store'
import {
  CEO_PLAN_CATEGORIES,
  CEO_PLAN_STATUSES,
  type CeoPlanCategory,
  type CeoPlanStatus,
} from '@/lib/admin/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MilestoneSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1).max(200),
  targetDate: z.string().max(40).optional().default(''),
  done: z.boolean().optional().default(false),
})

const PatchSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  category: z.enum(CEO_PLAN_CATEGORIES as [CeoPlanCategory, ...CeoPlanCategory[]]).optional(),
  metricLabel: z.string().min(1).max(120).optional(),
  unit: z.string().max(40).optional(),
  presentValue: z.number().optional(),
  futureValue: z.number().optional(),
  horizon: z.string().max(80).optional(),
  status: z.enum(CEO_PLAN_STATUSES as [CeoPlanStatus, ...CeoPlanStatus[]]).optional(),
  owner: z.string().max(80).optional(),
  notes: z.string().max(4000).optional(),
  linkedMineId: z.string().max(80).optional(),
  milestones: z.array(MilestoneSchema).optional(),
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
    if (!Array.isArray(s.ceoPlans)) s.ceoPlans = []
    const idx = s.ceoPlans.findIndex((p) => p.id === id)
    if (idx < 0) return
    const prev = s.ceoPlans[idx]!
    const data = parsed.data
    s.ceoPlans[idx] = {
      ...prev,
      ...data,
      milestones: data.milestones
        ? data.milestones.map((m) => ({
            id: m.id || newId('ms'),
            label: m.label,
            targetDate: m.targetDate || '',
            done: Boolean(m.done),
          }))
        : prev.milestones,
      updatedAt: new Date().toISOString(),
    }
    logActivity(s, {
      actor: session.name,
      action: `Updated CEO plan “${prev.title}”`,
      entityType: 'ceo_plan',
      entityId: id,
    })
  })

  const plan = (store.ceoPlans || []).find((p) => p.id === id)
  if (!plan) return jsonError('Plan not found', 404)
  return jsonOk({ plan })
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
    if (!Array.isArray(s.ceoPlans)) s.ceoPlans = []
    const prev = s.ceoPlans.find((p) => p.id === id)
    if (!prev) return
    found = true
    s.ceoPlans = s.ceoPlans.filter((p) => p.id !== id)
    logActivity(s, {
      actor: session.name,
      action: `Deleted CEO plan “${prev.title}”`,
      entityType: 'ceo_plan',
      entityId: id,
    })
  })

  if (!found) return jsonError('Plan not found', 404)
  return jsonOk({ deleted: true })
}
