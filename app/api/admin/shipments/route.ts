import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, newId, updateStore } from '@/lib/admin/store'
import {
  SHIPMENT_STATUSES,
  type AdminShipment,
  type ShipmentStatus,
} from '@/lib/admin/types'
import { KHADANE_SCALE } from '@/lib/facts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CreateSchema = z.object({
  code: z.string().min(2).max(40).optional(),
  destination: z.string().min(2).max(120),
  variety: z.string().min(2).max(160),
  status: z.enum(SHIPMENT_STATUSES as [ShipmentStatus, ...ShipmentStatus[]]).optional(),
  eta: z.string().max(40).optional().default(''),
  volume: z.string().max(80).optional().default(''),
  port: z.string().max(80).optional().default(KHADANE_SCALE.port),
  buyer: z.string().max(120).optional().default(''),
  notes: z.string().max(2000).optional().default(''),
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
  const data = parsed.data
  const shipment: AdminShipment = {
    id: newId('shp'),
    code:
      data.code ||
      `SH-${now.slice(2, 4)}${now.slice(5, 7)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    destination: data.destination,
    variety: data.variety,
    status: data.status ?? 'planned',
    eta: data.eta,
    volume: data.volume,
    port: data.port,
    buyer: data.buyer,
    notes: data.notes,
    createdAt: now,
    updatedAt: now,
  }

  await updateStore((store) => {
    store.shipments = [shipment, ...store.shipments]
    logActivity(store, {
      actor: session.name,
      action: `Created shipment ${shipment.code} → ${shipment.destination}`,
      entityType: 'shipment',
      entityId: shipment.id,
    })
  })

  return jsonOk({ shipment }, { status: 201 })
}
