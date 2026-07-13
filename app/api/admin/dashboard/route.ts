import { type NextRequest } from 'next/server'
import { isSession, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { readStore } from '@/lib/admin/store'
import { normalizeMines } from '@/lib/admin/mine-normalize'
import { GROUP_META, ENTITY_STRIP } from '@/lib/admin/seed'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session

  const store = await readStore()

  const openEnquiries = store.enquiries.filter(
    (e) => !['won', 'lost', 'archived'].includes(e.status)
  )
  const highPriority = store.enquiries.filter(
    (e) => e.priority === 'high' && !['won', 'lost', 'archived'].includes(e.status)
  )
  const openAlerts = store.alerts.filter((a) => a.status !== 'resolved')
  const openTasks = store.tasks.filter((t) => t.status === 'todo' || t.status === 'in_progress')
  const activeShipments = store.shipments.filter(
    (s) => !['delivered', 'cancelled'].includes(s.status)
  )

  return jsonOk({
    meta: GROUP_META,
    entityStrip: ENTITY_STRIP,
    operator: store.operator,
    lastSynced: store.lastSynced,
    session: {
      name: session.name,
      role: session.role,
      initials: session.initials,
    },
    stats: {
      openEnquiries: openEnquiries.length,
      highPriority: highPriority.length,
      openAlerts: openAlerts.length,
      openTasks: openTasks.length,
      activeShipments: activeShipments.length,
      wonThisMonth: store.enquiries.filter((e) => e.status === 'won').length,
      totalEnquiries: store.enquiries.length,
      verticals: store.verticals.length,
    },
    enquiries: store.enquiries,
    shipments: store.shipments,
    alerts: store.alerts,
    tasks: store.tasks,
    activity: store.activity.slice(0, 40),
    verticals: store.verticals,
    sites: store.sites,
    mines: normalizeMines(store.mines || []),
    ceoPlans: store.ceoPlans || [],
  })
}
