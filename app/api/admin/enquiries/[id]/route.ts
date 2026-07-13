import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, updateStore } from '@/lib/admin/store'
import {
  ENQUIRY_PRIORITIES,
  ENQUIRY_STATUSES,
  type EnquiryPriority,
  type EnquiryStatus,
} from '@/lib/admin/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PatchSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().max(200).optional(),
  phone: z.string().max(40).optional(),
  company: z.string().max(200).optional(),
  country: z.string().max(100).optional(),
  market: z.string().max(100).optional(),
  vertical: z.string().min(1).max(80).optional(),
  category: z.string().max(80).optional(),
  subject: z.string().min(2).max(200).optional(),
  message: z.string().min(2).max(5000).optional(),
  status: z.enum(ENQUIRY_STATUSES as [EnquiryStatus, ...EnquiryStatus[]]).optional(),
  priority: z.enum(ENQUIRY_PRIORITIES as [EnquiryPriority, ...EnquiryPriority[]]).optional(),
  owner: z.string().max(80).optional(),
  notes: z.string().max(5000).optional(),
  variety: z.string().max(160).optional(),
  format: z.string().max(160).optional(),
  volume: z.string().max(160).optional(),
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
    const idx = s.enquiries.findIndex((e) => e.id === id)
    if (idx < 0) return
    const prev = s.enquiries[idx]!
    const next = {
      ...prev,
      ...parsed.data,
      updatedAt: new Date().toISOString(),
    }
    s.enquiries[idx] = next

    const changes: string[] = []
    if (parsed.data.status && parsed.data.status !== prev.status) {
      changes.push(`status → ${parsed.data.status}`)
    }
    if (parsed.data.priority && parsed.data.priority !== prev.priority) {
      changes.push(`priority → ${parsed.data.priority}`)
    }
    if (parsed.data.owner && parsed.data.owner !== prev.owner) {
      changes.push(`owner → ${parsed.data.owner}`)
    }
    if (parsed.data.notes !== undefined && parsed.data.notes !== prev.notes) {
      changes.push('notes updated')
    }

    logActivity(s, {
      actor: session.name,
      action:
        changes.length > 0
          ? `Updated enquiry ${prev.reference}: ${changes.join(', ')}`
          : `Updated enquiry ${prev.reference}`,
      entityType: 'enquiry',
      entityId: id,
    })
  })

  const enquiry = store.enquiries.find((e) => e.id === id)
  if (!enquiry) return jsonError('Enquiry not found', 404)
  return jsonOk({ enquiry })
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
    const prev = s.enquiries.find((e) => e.id === id)
    if (!prev) return
    found = true
    s.enquiries = s.enquiries.filter((e) => e.id !== id)
    logActivity(s, {
      actor: session.name,
      action: `Deleted enquiry ${prev.reference}`,
      entityType: 'enquiry',
      entityId: id,
    })
  })

  if (!found) return jsonError('Enquiry not found', 404)
  return jsonOk({ deleted: true })
}
