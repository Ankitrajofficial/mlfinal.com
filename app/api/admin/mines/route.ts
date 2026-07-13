import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, newId, readStore, updateStore } from '@/lib/admin/store'
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

const CreateSchema = z.object({
  name: z.string().min(2).max(160),
  slug: z.string().max(80).optional().default(''),
  code: z.string().max(40).optional().default(''),
  tagline: z.string().max(240).optional().default(''),
  description: z.string().max(4000).optional().default(''),
  material: z.string().max(120).optional().default('Sandstone'),
  stoneTypes: z.array(z.string().max(120)).optional().default([]),
  samples: z.array(SampleSchema).optional().default([]),
  district: z.string().max(80).optional().default(''),
  state: z.string().max(80).optional().default('Rajasthan'),
  address: z.string().max(300).optional().default(''),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  gpsAccuracyM: z.number().min(0).max(50000).optional().default(0),
  status: z.enum(MINE_STATUSES as [MineStatus, ...MineStatus[]]).optional(),
  ownership: z.enum(MINE_OWNERSHIPS as [MineOwnership, ...MineOwnership[]]).optional(),
  capacity: z.string().max(160).optional().default(''),
  annualOutput: z.string().max(200).optional().default(''),
  headcount: z.string().max(80).optional().default(''),
  workforce: z.string().max(160).optional().default(''),
  revenue: z.string().max(80).optional().default(''),
  revenuePeriod: z.string().max(80).optional().default(''),
  areaHa: z.string().max(40).optional().default(''),
  yearOpened: z.string().max(40).optional().default(''),
  equipment: z.string().max(400).optional().default(''),
  certifications: z.string().max(400).optional().default(''),
  safetyNotes: z.string().max(1000).optional().default(''),
  accessNotes: z.string().max(1000).optional().default(''),
  roadCondition: z.string().max(160).optional().default(''),
  nearestTown: z.string().max(120).optional().default(''),
  contactName: z.string().max(120).optional().default(''),
  contactPhone: z.string().max(40).optional().default(''),
  varieties: z.string().max(400).optional().default(''),
  notes: z.string().max(5000).optional().default(''),
  primaryImage: z.string().max(400).optional().default(''),
  publicVisible: z.boolean().optional().default(true),
  showRevenuePublic: z.boolean().optional().default(false),
})

export async function GET(request: NextRequest) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session

  const store = await readStore()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const q = (searchParams.get('q') || '').toLowerCase().trim()

  let mines = (store.mines || []).map((m) => normalizeMine(m))
  if (status) mines = mines.filter((m) => m.status === status)
  if (q) {
    mines = mines.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.code.toLowerCase().includes(q) ||
        m.district.toLowerCase().includes(q) ||
        m.material.toLowerCase().includes(q) ||
        m.varieties.toLowerCase().includes(q) ||
        m.stoneTypes.some((t) => t.toLowerCase().includes(q)) ||
        m.revenue.toLowerCase().includes(q)
    )
  }

  const active = mines.filter((m) => m.status === 'active').length
  const districts = Array.from(new Set(mines.map((m) => m.district).filter(Boolean)))

  return jsonOk({
    mines,
    analytics: {
      total: mines.length,
      active,
      byStatus: MINE_STATUSES.map((s) => ({
        status: s,
        count: mines.filter((m) => m.status === s).length,
      })),
      byOwnership: MINE_OWNERSHIPS.map((o) => ({
        ownership: o,
        count: mines.filter((m) => m.ownership === o).length,
      })),
      districts: districts.length,
      withVisits: mines.filter((m) => m.visits?.length > 0).length,
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

  const data = parsed.data
  const now = new Date().toISOString()
  const code =
    data.code ||
    `MN-${(data.district || 'GEN').slice(0, 3).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`

  const mine = normalizeMine({
    id: newId('mine'),
    code,
    name: data.name,
    slug: data.slug,
    tagline: data.tagline,
    description: data.description,
    material: data.material,
    stoneTypes: data.stoneTypes,
    samples: data.samples.map((s, i) => ({
      id: s.id || `smp_${i}`,
      name: s.name,
      stoneType: s.stoneType || data.material,
      finish: s.finish,
      size: s.size,
      description: s.description,
      imageUrl: s.imageUrl,
    })),
    district: data.district,
    state: data.state,
    address: data.address,
    lat: data.lat,
    lng: data.lng,
    gpsAccuracyM: data.gpsAccuracyM,
    status: data.status ?? 'active',
    ownership: data.ownership ?? 'owned',
    capacity: data.capacity,
    annualOutput: data.annualOutput,
    headcount: data.headcount || data.workforce,
    workforce: data.workforce || data.headcount,
    revenue: data.revenue,
    revenuePeriod: data.revenuePeriod,
    areaHa: data.areaHa,
    yearOpened: data.yearOpened,
    equipment: data.equipment,
    certifications: data.certifications,
    safetyNotes: data.safetyNotes,
    accessNotes: data.accessNotes,
    roadCondition: data.roadCondition,
    nearestTown: data.nearestTown,
    contactName: data.contactName,
    contactPhone: data.contactPhone,
    varieties: data.varieties || data.stoneTypes.join(', '),
    notes: data.notes,
    primaryImage: data.primaryImage,
    publicVisible: data.publicVisible,
    showRevenuePublic: data.showRevenuePublic,
    lastVisitedAt: '',
    visits: [],
    createdAt: now,
    updatedAt: now,
    createdBy: session.name,
  })

  await updateStore((store) => {
    if (!Array.isArray(store.mines)) store.mines = []
    store.mines = [mine, ...store.mines]
    logActivity(store, {
      actor: session.name,
      action: `Added mine ${mine.code} — ${mine.name} (${mine.lat.toFixed(4)}, ${mine.lng.toFixed(4)})`,
      entityType: 'mine',
      entityId: mine.id,
    })
  })

  return jsonOk({ mine }, { status: 201 })
}
