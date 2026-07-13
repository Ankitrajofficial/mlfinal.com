import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, newId, readStore, updateStore } from '@/lib/admin/store'
import {
  CEO_PLAN_CATEGORIES,
  CEO_PLAN_STATUSES,
  type CeoPlan,
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

const CreateSchema = z.object({
  title: z.string().min(2).max(200),
  category: z.enum(CEO_PLAN_CATEGORIES as [CeoPlanCategory, ...CeoPlanCategory[]]).optional(),
  metricLabel: z.string().min(1).max(120),
  unit: z.string().max(40).optional().default(''),
  presentValue: z.number(),
  futureValue: z.number(),
  horizon: z.string().max(80).optional().default(''),
  status: z.enum(CEO_PLAN_STATUSES as [CeoPlanStatus, ...CeoPlanStatus[]]).optional(),
  owner: z.string().max(80).optional().default('Group principal'),
  notes: z.string().max(4000).optional().default(''),
  linkedMineId: z.string().max(80).optional().default(''),
  milestones: z.array(MilestoneSchema).optional().default([]),
})

export async function GET(request: NextRequest) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session
  const store = await readStore()
  const plans = store.ceoPlans || []

  const withGap = plans.map((p) => {
    const gap = p.futureValue - p.presentValue
    const gapPct =
      p.presentValue === 0
        ? p.futureValue === 0
          ? 0
          : 100
        : Math.round((gap / Math.abs(p.presentValue)) * 1000) / 10
    // Progress = present as a share of the future target.
    const presentShareOfFuture =
      p.futureValue === 0
        ? 0
        : Math.min(100, Math.max(0, Math.round((p.presentValue / p.futureValue) * 1000) / 10))

    return {
      ...p,
      gap,
      gapPct,
      presentShareOfFuture,
      progressPct: presentShareOfFuture,
    }
  })

  return jsonOk({
    plans: withGap,
    summary: {
      total: plans.length,
      active: plans.filter((p) => p.status === 'active').length,
      atRisk: plans.filter((p) => p.status === 'at_risk').length,
      avgGapPct:
        withGap.length === 0
          ? 0
          : Math.round(
              (withGap.reduce((s, p) => s + Math.abs(p.gapPct), 0) / withGap.length) * 10
            ) / 10,
    },
  })
}

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

  const d = parsed.data
  const now = new Date().toISOString()
  const plan: CeoPlan = {
    id: newId('plan'),
    title: d.title,
    category: d.category ?? 'other',
    metricLabel: d.metricLabel,
    unit: d.unit,
    presentValue: d.presentValue,
    futureValue: d.futureValue,
    horizon: d.horizon,
    status: d.status ?? 'draft',
    owner: d.owner,
    notes: d.notes,
    linkedMineId: d.linkedMineId,
    milestones: d.milestones.map((m, i) => ({
      id: m.id || newId('ms'),
      label: m.label,
      targetDate: m.targetDate,
      done: m.done,
    })),
    createdAt: now,
    updatedAt: now,
    createdBy: session.name,
  }

  await updateStore((store) => {
    if (!Array.isArray(store.ceoPlans)) store.ceoPlans = []
    store.ceoPlans = [plan, ...store.ceoPlans]
    logActivity(store, {
      actor: session.name,
      action: `Created CEO plan “${plan.title}” (${plan.presentValue} → ${plan.futureValue} ${plan.unit})`,
      entityType: 'ceo_plan',
      entityId: plan.id,
    })
  })

  return jsonOk({ plan }, { status: 201 })
}
