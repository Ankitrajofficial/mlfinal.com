import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, updateStore } from '@/lib/admin/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PatchSchema = z.object({
  status: z.enum(['operational', 'active_shipping', 'maintenance', 'offline']).optional(),
  people: z.string().max(40).optional(),
  focus: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
  role: z.string().max(300).optional(),
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
    const idx = s.sites.findIndex((x) => x.id === id)
    if (idx < 0) return
    const prev = s.sites[idx]!
    s.sites[idx] = {
      ...prev,
      ...parsed.data,
      updatedAt: new Date().toISOString(),
    }
    logActivity(s, {
      actor: session.name,
      action:
        parsed.data.status && parsed.data.status !== prev.status
          ? `Site ${prev.name} status → ${parsed.data.status}`
          : `Updated site ${prev.name}`,
      entityType: 'site',
      entityId: id,
    })
  })

  const site = store.sites.find((x) => x.id === id)
  if (!site) return jsonError('Site not found', 404)
  return jsonOk({ site })
}
