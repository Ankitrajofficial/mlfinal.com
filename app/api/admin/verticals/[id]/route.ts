import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, updateStore } from '@/lib/admin/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PatchSchema = z.object({
  revenue: z.string().max(40).optional(),
  share: z.number().min(0).max(100).optional(),
  status: z.enum(['on_track', 'growing', 'stable', 'watch', 'critical']).optional(),
  sites: z.string().max(200).optional(),
  headcount: z.string().max(40).optional(),
  highlight: z.string().max(120).optional(),
  region: z.string().max(200).optional(),
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
    const idx = s.verticals.findIndex((x) => x.id === id || x.slug === id)
    if (idx < 0) return
    const prev = s.verticals[idx]!
    s.verticals[idx] = {
      ...prev,
      ...parsed.data,
      updatedAt: new Date().toISOString(),
    }
    logActivity(s, {
      actor: session.name,
      action: `Updated vertical ${prev.title}`,
      entityType: 'vertical',
      entityId: prev.id,
    })
  })

  const vertical = store.verticals.find((x) => x.id === id || x.slug === id)
  if (!vertical) return jsonError('Vertical not found', 404)
  return jsonOk({ vertical })
}
