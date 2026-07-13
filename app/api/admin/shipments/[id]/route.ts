import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, updateStore } from '@/lib/admin/store'
import { SHIPMENT_STATUSES, type ShipmentStatus } from '@/lib/admin/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PatchSchema = z.object({
  code: z.string().min(2).max(40).optional(),
  destination: z.string().min(2).max(120).optional(),
  variety: z.string().min(2).max(160).optional(),
  status: z.enum(SHIPMENT_STATUSES as [ShipmentStatus, ...ShipmentStatus[]]).optional(),
  eta: z.string().max(40).optional(),
  volume: z.string().max(80).optional(),
  port: z.string().max(80).optional(),
  buyer: z.string().max(120).optional(),
  notes: z.string().max(2000).optional(),
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
    const idx = s.shipments.findIndex((x) => x.id === id)
    if (idx < 0) return
    const prev = s.shipments[idx]!
    s.shipments[idx] = {
      ...prev,
      ...parsed.data,
      updatedAt: new Date().toISOString(),
    }
    logActivity(s, {
      actor: session.name,
      action:
        parsed.data.status && parsed.data.status !== prev.status
          ? `Shipment ${prev.code} status → ${parsed.data.status}`
          : `Updated shipment ${prev.code}`,
      entityType: 'shipment',
      entityId: id,
    })
  })

  const shipment = store.shipments.find((x) => x.id === id)
  if (!shipment) return jsonError('Shipment not found', 404)
  return jsonOk({ shipment })
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
    const prev = s.shipments.find((x) => x.id === id)
    if (!prev) return
    found = true
    s.shipments = s.shipments.filter((x) => x.id !== id)
    logActivity(s, {
      actor: session.name,
      action: `Deleted shipment ${prev.code}`,
      entityType: 'shipment',
      entityId: id,
    })
  })

  if (!found) return jsonError('Shipment not found', 404)
  return jsonOk({ deleted: true })
}
