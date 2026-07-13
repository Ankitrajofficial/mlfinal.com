import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, newId, updateStore } from '@/lib/admin/store'
import { normalizeMine } from '@/lib/admin/mine-normalize'
import {
  MINE_OWNERSHIPS,
  MINE_STATUSES,
  type MineOwnership,
  type MineStatus,
} from '@/lib/admin/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SampleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(160),
  stoneType: z.string().max(120).optional().default(''),
  finish: z.string().max(120).optional().default(''),
  size: z.string().max(120).optional().default(''),
  description: z.string().max(1000).optional().default(''),
  imageUrl: z.string().max(400).optional().default(''),
})

const PatchSchema = z.object({
  name: z.string().min(2).max(160).optional(),
  slug: z.string().max(80).optional(),
  code: z.string().max(40).optional(),
  tagline: z.string().max(240).optional(),
  description: z.string().max(4000).optional(),
  material: z.string().max(120).optional(),
  stoneTypes: z.array(z.string().max(120)).optional(),
  samples: z.array(SampleSchema).optional(),
  district: z.string().max(80).optional(),
  state: z.string().max(80).optional(),
  address: z.string().max(300).optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  gpsAccuracyM: z.number().min(0).max(50000).optional(),
  status: z.enum(MINE_STATUSES as [MineStatus, ...MineStatus[]]).optional(),
  ownership: z.enum(MINE_OWNERSHIPS as [MineOwnership, ...MineOwnership[]]).optional(),
  capacity: z.string().max(160).optional(),
  annualOutput: z.string().max(200).optional(),
  headcount: z.string().max(80).optional(),
  workforce: z.string().max(160).optional(),
  revenue: z.string().max(80).optional(),
  revenuePeriod: z.string().max(80).optional(),
  areaHa: z.string().max(40).optional(),
  yearOpened: z.string().max(40).optional(),
  equipment: z.string().max(400).optional(),
  certifications: z.string().max(400).optional(),
  safetyNotes: z.string().max(1000).optional(),
  accessNotes: z.string().max(1000).optional(),
  roadCondition: z.string().max(160).optional(),
  nearestTown: z.string().max(120).optional(),
  contactName: z.string().max(120).optional(),
  contactPhone: z.string().max(40).optional(),
  varieties: z.string().max(400).optional(),
  notes: z.string().max(5000).optional(),
  primaryImage: z.string().max(400).optional(),
  publicVisible: z.boolean().optional(),
  showRevenuePublic: z.boolean().optional(),
  lastVisitedAt: z.string().max(40).optional(),
})

const VisitSchema = z.object({
  purpose: z.string().min(2).max(200),
  notes: z.string().max(2000).optional().default(''),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  visitedAt: z.string().max(40).optional(),
})

export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session
  const { id } = await ctx.params

  const { readStore } = await import('@/lib/admin/store')
  const store = await readStore()
  const mine = (store.mines || []).find((m) => m.id === id)
  if (!mine) return jsonError('Mine not found', 404)
  return jsonOk({ mine })
}

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

  // Visit append action
  if (body && typeof body === 'object' && (body as { action?: string }).action === 'add_visit') {
    const parsed = VisitSchema.safeParse(body)
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || 'Validation failed')
    }
    const store = await updateStore((s) => {
      if (!Array.isArray(s.mines)) s.mines = []
      const idx = s.mines.findIndex((m) => m.id === id)
      if (idx < 0) return
      const prev = s.mines[idx]!
      const visit = {
        id: newId('vis'),
        visitedAt: parsed.data.visitedAt || new Date().toISOString(),
        visitor: session.name,
        purpose: parsed.data.purpose,
        notes: parsed.data.notes,
        lat: parsed.data.lat,
        lng: parsed.data.lng,
      }
      s.mines[idx] = {
        ...prev,
        visits: [visit, ...(prev.visits || [])],
        lastVisitedAt: visit.visitedAt,
        updatedAt: new Date().toISOString(),
      }
      logActivity(s, {
        actor: session.name,
        action: `Logged visit at ${prev.name}: ${visit.purpose}`,
        entityType: 'mine',
        entityId: id,
      })
    })
    const mine = (store.mines || []).find((m) => m.id === id)
    if (!mine) return jsonError('Mine not found', 404)
    return jsonOk({ mine })
  }

  const parsed = PatchSchema.safeParse(body)
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || 'Validation failed')
  }

  const store = await updateStore((s) => {
    if (!Array.isArray(s.mines)) s.mines = []
    const idx = s.mines.findIndex((m) => m.id === id)
    if (idx < 0) return
    const prev = s.mines[idx]!
    s.mines[idx] = normalizeMine({
      ...prev,
      ...parsed.data,
      samples: parsed.data.samples
        ? parsed.data.samples.map((smp, i) => ({
            id: smp.id || `smp_${i}`,
            name: smp.name,
            stoneType: smp.stoneType || prev.material,
            finish: smp.finish || '',
            size: smp.size || '',
            description: smp.description || '',
            imageUrl: smp.imageUrl || '',
          }))
        : prev.samples,
      updatedAt: new Date().toISOString(),
    })
    logActivity(s, {
      actor: session.name,
      action: `Updated mine ${prev.code} — ${prev.name}`,
      entityType: 'mine',
      entityId: id,
    })
  })

  const mine = (store.mines || []).find((m) => m.id === id)
  if (!mine) return jsonError('Mine not found', 404)
  return jsonOk({ mine: normalizeMine(mine) })
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
    if (!Array.isArray(s.mines)) s.mines = []
    const prev = s.mines.find((m) => m.id === id)
    if (!prev) return
    found = true
    s.mines = s.mines.filter((m) => m.id !== id)
    logActivity(s, {
      actor: session.name,
      action: `Deleted mine ${prev.code} — ${prev.name}`,
      entityType: 'mine',
      entityId: id,
    })
  })

  if (!found) return jsonError('Mine not found', 404)
  return jsonOk({ deleted: true })
}
