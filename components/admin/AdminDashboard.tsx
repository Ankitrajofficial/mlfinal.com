'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  LayoutDashboard,
  Layers,
  Globe2,
  Inbox,
  ListTodo,
  Users,
  MapPin,
  Shield,
  Search,
  Bell,
  Menu,
  X,
  Plus,
  LogOut,
  RefreshCw,
  Download,
  Ship,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Mountain,
  Target,
  CloudSun,
} from 'lucide-react'
import type {
  AdminActivity,
  AdminAlert,
  AdminEnquiry,
  AdminShipment,
  AdminSite,
  AdminTask,
  AdminVertical,
  EnquiryPriority,
  EnquiryStatus,
  ShipmentStatus,
} from '@/lib/admin/types'
import {
  ENQUIRY_PRIORITIES,
  ENQUIRY_STATUSES,
  OWNER_OPTIONS,
  SHIPMENT_STATUSES,
  VERTICAL_OPTIONS,
} from '@/lib/admin/types'
import { ENTITIES, FOUNDING } from '@/lib/facts'
import { MLS_ASSETS } from '@/lib/site-mls'
import AdminLogin from './AdminLogin'
import MinesGis from './MinesGis'
import WeatherSatellite from './WeatherSatellite'
import CeoFuturePlans from './CeoFuturePlans'
import type { AdminMine } from '@/lib/admin/types'

type View =
  | 'overview'
  | 'enquiries'
  | 'shipments'
  | 'tasks'
  | 'alerts'
  | 'verticals'
  | 'sites'
  | 'mines'
  | 'plans'
  | 'weather'
  | 'activity'
  | 'governance'

type Session = { name: string; role: string; initials: string }

type DashboardData = {
  meta: {
    founded: number
    yearsEvergreen: string
    verticalsDisplay: string
    workforce: string
    family: string
    countries: string
    annualOutput: string
    studentBeds: string
    meals: string
  }
  entityStrip: readonly string[]
  operator: { name: string; role: string; initials: string; location: string }
  lastSynced: string
  session: Session
  stats: {
    openEnquiries: number
    highPriority: number
    openAlerts: number
    openTasks: number
    activeShipments: number
    wonThisMonth: number
    totalEnquiries: number
    verticals: number
  }
  enquiries: AdminEnquiry[]
  shipments: AdminShipment[]
  alerts: AdminAlert[]
  tasks: AdminTask[]
  activity: AdminActivity[]
  verticals: AdminVertical[]
  sites: AdminSite[]
  mines?: AdminMine[]
}

type DrawerState =
  | { type: 'enquiry'; mode: 'create' | 'edit'; item?: AdminEnquiry }
  | { type: 'shipment'; mode: 'create' | 'edit'; item?: AdminShipment }
  | { type: 'task'; mode: 'create' | 'edit'; item?: AdminTask }
  | { type: 'alert'; mode: 'create' | 'edit'; item?: AdminAlert }

const NAV: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Command centre', icon: LayoutDashboard },
  { id: 'enquiries', label: 'Enquiries CRM', icon: Inbox },
  { id: 'shipments', label: 'Shipments', icon: Ship },
  { id: 'mines', label: 'Mines portfolio', icon: Mountain },
  { id: 'weather', label: 'Weather / satellite', icon: CloudSun },
  { id: 'plans', label: 'CEO future plans', icon: Target },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'verticals', label: 'Verticals', icon: Layers },
  { id: 'sites', label: 'Sites & assets', icon: MapPin },
  { id: 'activity', label: 'Activity log', icon: Users },
  { id: 'governance', label: 'Governance', icon: Shield },
]

function Pill({
  tone,
  children,
}: {
  tone: 'good' | 'warn' | 'critical' | 'neutral' | 'info'
  children: React.ReactNode
}) {
  return <span className={`admin-pill ${tone}`}>{children}</span>
}

function statusTone(
  status: string
): 'good' | 'warn' | 'critical' | 'neutral' | 'info' {
  if (['won', 'delivered', 'done', 'resolved', 'operational', 'on_track', 'growing'].includes(status))
    return 'good'
  if (['new', 'planned', 'todo', 'open', 'info', 'cleared_customs'].includes(status)) return 'info'
  if (['in_review', 'quoted', 'loading', 'in_transit', 'in_progress', 'acknowledged', 'watch', 'stable', 'active_shipping'].includes(status))
    return 'warn'
  if (['lost', 'delayed', 'critical', 'cancelled', 'offline'].includes(status)) return 'critical'
  return 'neutral'
}

function labelize(value: string) {
  return value.replace(/_/g, ' ')
}

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

async function api<T>(url: string, init?: RequestInit): Promise<T & { ok: boolean; error?: string }> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}

export default function AdminDashboard() {
  const [boot, setBoot] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [usingDefaultPassword, setUsingDefaultPassword] = useState(false)
  const [data, setData] = useState<DashboardData | null>(null)
  const [view, setView] = useState<View>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')
  const [busy, setBusy] = useState(false)
  const [drawer, setDrawer] = useState<DrawerState | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 3200)
  }, [])

  const refresh = useCallback(async () => {
    const dash = await api<DashboardData>('/api/admin/dashboard')
    setData(dash as unknown as DashboardData)
    setSession(dash.session)
    return dash
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const me = await api<{
          session: Session
          usingDefaultPassword?: boolean
        }>('/api/admin/auth/me')
        if (cancelled) return
        setSession(me.session)
        setUsingDefaultPassword(Boolean(me.usingDefaultPassword))
        await refresh()
      } catch {
        if (!cancelled) setSession(null)
      } finally {
        if (!cancelled) setBoot(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [refresh])

  // Background refresh only when tab is visible — avoids jank while scrolling
  useEffect(() => {
    if (!session) return
    const tick = () => {
      if (document.visibilityState !== 'visible') return
      refresh().catch(() => undefined)
    }
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [session, refresh])

  const filteredEnquiries = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    if (!q) return data.enquiries
    return data.enquiries.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        e.reference.toLowerCase().includes(q) ||
        e.vertical.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q)
    )
  }, [data, query])

  async function patchEnquiry(id: string, patch: Partial<AdminEnquiry>) {
    setBusy(true)
    try {
      await api(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      await refresh()
      showToast('Enquiry updated')
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setBusy(false)
    }
  }

  async function patchShipment(id: string, patch: Partial<AdminShipment>) {
    setBusy(true)
    try {
      await api(`/api/admin/shipments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      await refresh()
      showToast('Shipment updated')
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setBusy(false)
    }
  }

  async function patchTask(id: string, patch: Partial<AdminTask>) {
    setBusy(true)
    try {
      await api(`/api/admin/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      await refresh()
      showToast('Task updated')
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setBusy(false)
    }
  }

  async function patchAlert(id: string, patch: Partial<AdminAlert>) {
    setBusy(true)
    try {
      await api(`/api/admin/alerts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      await refresh()
      showToast('Alert updated')
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setBusy(false)
    }
  }

  async function patchVertical(id: string, patch: Partial<AdminVertical>) {
    setBusy(true)
    try {
      await api(`/api/admin/verticals/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      await refresh()
      showToast('Vertical updated')
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setBusy(false)
    }
  }

  async function patchSite(id: string, patch: Partial<AdminSite>) {
    setBusy(true)
    try {
      await api(`/api/admin/sites/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      await refresh()
      showToast('Site updated')
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setBusy(false)
    }
  }

  function exportEnquiriesCsv() {
    if (!data) return
    const rows = data.enquiries
    const header = [
      'reference',
      'name',
      'email',
      'phone',
      'company',
      'country',
      'vertical',
      'status',
      'priority',
      'owner',
      'subject',
      'createdAt',
    ]
    const lines = [
      header.join(','),
      ...rows.map((e) =>
        header
          .map((k) => {
            const v = String((e as unknown as Record<string, unknown>)[k] ?? '')
            return `"${v.replace(/"/g, '""')}"`
          })
          .join(',')
      ),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mls-enquiries-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast('CSV downloaded')
  }

  if (boot) {
    return <div className="admin-loading">Loading command centre…</div>
  }

  if (!session) {
    return (
      <AdminLogin
        onSuccess={async (s, defaultPw) => {
          setSession(s)
          setUsingDefaultPassword(defaultPw)
          setBoot(true)
          try {
            await refresh()
          } finally {
            setBoot(false)
          }
        }}
      />
    )
  }

  if (!data) {
    return <div className="admin-loading">Loading operations data…</div>
  }

  const navTo = (id: View) => {
    setView(id)
    setSidebarOpen(false)
  }

  return (
    <div className="admin-shell">
      <div
        className={`admin-overlay${sidebarOpen ? ' is-open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`admin-sidebar${sidebarOpen ? ' is-open' : ''}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark">
            <Image
              src={MLS_ASSETS.mark.onDark}
              alt={ENTITIES.group.acronym}
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p className="admin-brand-title">{ENTITIES.group.acronym}</p>
            <p className="admin-brand-sub">Operations</p>
          </div>
          <button type="button" className="admin-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="admin-preview-chip">
          <strong>
            <span className="admin-live-dot" /> Live operations
          </strong>
          <p>Full control · changes save immediately</p>
        </div>

        <nav className="admin-nav">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = view === item.id
            return (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-btn${active ? ' is-active' : ''}`}
                onClick={() => navTo(item.id)}
              >
                <Icon size={16} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="admin-user-card">
          <div className="admin-avatar">{session.initials}</div>
          <div style={{ minWidth: 0 }}>
            <strong>{session.name}</strong>
            <span>{session.role}</span>
          </div>
        </div>

        <button
          type="button"
          className="admin-back-link"
          style={{ width: 'calc(100% - 24px)' }}
          onClick={async () => {
            // Clear the local session even if the network call fails —
            // signing out must never appear to silently do nothing.
            try {
              await api('/api/admin/auth/logout', { method: 'POST' })
            } catch {
              /* cookie may survive; the login screen still replaces the UI */
            }
            setSession(null)
            setData(null)
          }}
        >
          <LogOut size={14} />
          Sign out
        </button>

        <Link href="/mls" className="admin-back-link">
          <ExternalLink size={14} />
          Public site
        </Link>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-row">
            <button type="button" className="admin-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Menu size={18} />
            </button>
            <div className="admin-topbar-titles">
              <h1>{ENTITIES.group.name}</h1>
              <p>
                {FOUNDING.yearsEvergreen} · {data.meta.verticalsDisplay} verticals ·{' '}
                {data.operator.location}
              </p>
            </div>
            <AdminClock />
            <div className="admin-search">
              <Search size={15} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setView('enquiries')}
                placeholder="Search enquiries…"
              />
            </div>
            <button
              type="button"
              className="admin-icon-btn"
              title="Refresh"
              onClick={async () => {
                try {
                  await refresh()
                  showToast('Synced')
                } catch (e) {
                  showToast(e instanceof Error ? e.message : 'Sync failed')
                }
              }}
            >
              <RefreshCw size={16} />
            </button>
            <button
              type="button"
              className="admin-icon-btn"
              title="Alerts"
              onClick={() => navTo('alerts')}
            >
              <Bell size={16} />
              {data.stats.openAlerts > 0 ? <span className="dot" /> : null}
            </button>
          </div>
          <div className="admin-entity-strip">
            {data.entityStrip.map((name) => (
              <span key={name} className="admin-entity-chip">
                {name}
              </span>
            ))}
          </div>
        </header>

        <div className={`admin-ops-banner${usingDefaultPassword ? ' warn' : ''}`}>
          <CheckCircle2 size={14} />
          <span>
            Operational mode · last sync {formatWhen(data.lastSynced)}
            {usingDefaultPassword
              ? ' · Set ADMIN_PASSWORD in .env.local for production security'
              : ''}
          </span>
        </div>

        <main className="admin-content">
          {view === 'overview' && (
            <Overview
              data={data}
              onNavigate={navTo}
              onOpenEnquiry={(item) => setDrawer({ type: 'enquiry', mode: 'edit', item })}
              onCreateEnquiry={() => setDrawer({ type: 'enquiry', mode: 'create' })}
              onPatchAlert={patchAlert}
              onPatchTask={patchTask}
              onToast={showToast}
            />
          )}
          {view === 'enquiries' && (
            <EnquiriesView
              items={filteredEnquiries}
              query={query}
              setQuery={setQuery}
              busy={busy}
              onCreate={() => setDrawer({ type: 'enquiry', mode: 'create' })}
              onOpen={(item) => setDrawer({ type: 'enquiry', mode: 'edit', item })}
              onPatch={patchEnquiry}
              onExport={exportEnquiriesCsv}
            />
          )}
          {view === 'shipments' && (
            <ShipmentsView
              items={data.shipments}
              busy={busy}
              onCreate={() => setDrawer({ type: 'shipment', mode: 'create' })}
              onOpen={(item) => setDrawer({ type: 'shipment', mode: 'edit', item })}
              onPatch={patchShipment}
            />
          )}
          {view === 'tasks' && (
            <TasksView
              items={data.tasks}
              busy={busy}
              onCreate={() => setDrawer({ type: 'task', mode: 'create' })}
              onOpen={(item) => setDrawer({ type: 'task', mode: 'edit', item })}
              onPatch={patchTask}
            />
          )}
          {view === 'alerts' && (
            <AlertsView
              items={data.alerts}
              busy={busy}
              onCreate={() => setDrawer({ type: 'alert', mode: 'create' })}
              onOpen={(item) => setDrawer({ type: 'alert', mode: 'edit', item })}
              onPatch={patchAlert}
            />
          )}
          {view === 'verticals' && (
            <VerticalsView items={data.verticals} busy={busy} onPatch={patchVertical} />
          )}
          {view === 'sites' && <SitesView items={data.sites} busy={busy} onPatch={patchSite} />}
          {view === 'mines' && <MinesGis onToast={showToast} />}
          {view === 'weather' && (
            <div>
              <div className="admin-page-head">
                <div>
                  <p className="admin-eyebrow">Field intelligence</p>
                  <h2>Weather & satellite</h2>
                  <p className="lead">
                    Live Open-Meteo forecast for each mine coordinate, plus Windy satellite and radar.
                  </p>
                </div>
              </div>
              <WeatherSatellite onToast={showToast} />
            </div>
          )}
          {view === 'plans' && (
            <CeoFuturePlans onToast={showToast} mines={data.mines || []} />
          )}
          {view === 'activity' && <ActivityView items={data.activity} />}
          {view === 'governance' && (
            <GovernanceView
              onReset={async () => {
                if (!confirm('Reset all operational data to seed baseline?')) return
                setBusy(true)
                try {
                  await api('/api/admin/reset', { method: 'POST' })
                  await refresh()
                  showToast('Store reset to seed data')
                } catch (e) {
                  showToast(e instanceof Error ? e.message : 'Reset failed')
                } finally {
                  setBusy(false)
                }
              }}
              busy={busy}
            />
          )}
        </main>
      </div>

      {drawer ? (
        <Drawer
          drawer={drawer}
          busy={busy}
          onClose={() => setDrawer(null)}
          onSaved={async (msg) => {
            setDrawer(null)
            await refresh()
            showToast(msg)
          }}
          onError={(msg) => showToast(msg)}
          setBusy={setBusy}
        />
      ) : null}

      {toast ? <div className="admin-toast">{toast}</div> : null}
    </div>
  )
}

/** Isolated clock — avoids re-rendering the entire dashboard every second */
function AdminClock() {
  const [clock, setClock] = useState('')
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-IN', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
      }).format(new Date())
    setClock(fmt())
    // Minute resolution is enough; 1s ticks were causing full-panel jank
    const id = window.setInterval(() => setClock(fmt()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="admin-clock">
      <Clock size={13} color="#B8962E" />
      {clock || '—'} IST
    </div>
  )
}

function Overview({
  data,
  onNavigate,
  onOpenEnquiry,
  onCreateEnquiry,
  onPatchAlert,
  onPatchTask,
  onToast,
}: {
  data: DashboardData
  onNavigate: (v: View) => void
  onOpenEnquiry: (e: AdminEnquiry) => void
  onCreateEnquiry: () => void
  onPatchAlert: (id: string, p: Partial<AdminAlert>) => void
  onPatchTask: (id: string, p: Partial<AdminTask>) => void
  onToast: (m: string) => void
}) {
  const kpis = [
    { label: 'Open enquiries', value: String(data.stats.openEnquiries), sub: `${data.stats.highPriority} high priority` },
    { label: 'Active shipments', value: String(data.stats.activeShipments), sub: 'Not delivered' },
    { label: 'Open tasks', value: String(data.stats.openTasks), sub: 'Todo + in progress' },
    { label: 'Open alerts', value: String(data.stats.openAlerts), sub: 'Needs attention' },
    { label: 'Won deals', value: String(data.stats.wonThisMonth), sub: 'In pipeline store' },
    { label: 'Export markets', value: data.meta.countries, sub: data.meta.annualOutput },
  ]

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Live operations</p>
          <h2>Group command centre</h2>
          <p className="lead">
            Run day-to-day operations across stone export, automotive, hospitality, student housing,
            and food services — plus mine weather and CEO future-gap plans.
          </p>
        </div>
        <div className="admin-actions">
          <button type="button" className="admin-btn-primary" onClick={onCreateEnquiry}>
            <Plus size={14} style={{ marginRight: 6 }} />
            New enquiry
          </button>
          <button type="button" className="admin-btn-ghost" onClick={() => onNavigate('plans')}>
            Future plans
          </button>
          <button type="button" className="admin-btn-ghost" onClick={() => onNavigate('shipments')}>
            Shipments
          </button>
        </div>
      </div>

      <div className="admin-kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className="admin-card admin-kpi">
            <p className="label">{k.label}</p>
            <p className="value">{k.value}</p>
            <p className="sub">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="admin-grid-2" style={{ marginBottom: 16 }}>
        <WeatherSatellite onToast={onToast} />
        <div className="admin-card admin-card-pad">
          <div className="admin-section-head">
            <div>
              <p className="admin-eyebrow">Strategy</p>
              <h3>CEO future plans</h3>
            </div>
            <button type="button" className="admin-linkish" onClick={() => onNavigate('plans')}>
              Open plans
            </button>
          </div>
          <p className="mines-help">
            Plan present baselines vs future targets. Graphs show the gap to close — revenue,
            export markets, workforce, mine readiness, and capex.
          </p>
          <div className="admin-actions" style={{ marginTop: 12 }}>
            <button type="button" className="admin-btn-primary" onClick={() => onNavigate('plans')}>
              Manage future plans
            </button>
          </div>
        </div>
      </div>

      {/* Mines portfolio strip on command centre */}
      <div className="admin-card admin-card-pad" style={{ marginBottom: 16 }}>
        <div className="admin-section-head">
          <div>
            <p className="admin-eyebrow">Holdings</p>
            <h3>Mines portfolio</h3>
          </div>
          <button type="button" className="admin-linkish" onClick={() => onNavigate('mines')}>
            Open full portfolio
          </button>
        </div>
        {(data.mines || []).length === 0 ? (
          <p className="mines-help">
            No mines loaded yet.{' '}
            <button type="button" className="admin-linkish" onClick={() => onNavigate('mines')}>
              Add mines
            </button>
          </p>
        ) : (
          <div className="dash-mines-strip">
            {(data.mines || []).slice(0, 5).map((m) => (
              <button
                key={m.id}
                type="button"
                className="dash-mine-chip"
                onClick={() => onNavigate('mines')}
              >
                <strong>{m.name}</strong>
                <span>
                  {(m.stoneTypes && m.stoneTypes.length
                    ? m.stoneTypes.slice(0, 2).join(' · ')
                    : m.material) || 'Sandstone'}
                </span>
                <span className="dash-mine-meta">
                  {m.workforce || m.headcount || '—'} · {m.revenue || 'Rev. n/a'} ·{' '}
                  {m.samples?.length ?? 0} samples
                </span>
              </button>
            ))}
          </div>
        )}
        <div className="admin-actions" style={{ marginTop: 12 }}>
          <button type="button" className="admin-btn-primary" onClick={() => onNavigate('mines')}>
            Mines portfolio
          </button>
          <a
            href="/khadane/mines"
            target="_blank"
            rel="noreferrer"
            className="admin-btn-ghost"
            style={{ textDecoration: 'none' }}
          >
            Public page ↗
          </a>
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card admin-card-pad">
          <div className="admin-section-head">
            <div>
              <p className="admin-eyebrow">Pipeline</p>
              <h3>Latest enquiries</h3>
            </div>
            <button type="button" className="admin-linkish" onClick={() => onNavigate('enquiries')}>
              Manage all
            </button>
          </div>
          {data.enquiries.slice(0, 5).map((e) => (
            <button
              key={e.id}
              type="button"
              className="admin-list-row"
              style={{ width: '100%', background: 'none', textAlign: 'left' }}
              onClick={() => onOpenEnquiry(e)}
            >
              <div>
                <div className="admin-status-row">
                  <h4>{e.name}</h4>
                  <Pill tone={statusTone(e.status)}>{labelize(e.status)}</Pill>
                  <Pill tone={e.priority === 'high' ? 'critical' : e.priority === 'medium' ? 'warn' : 'neutral'}>
                    {e.priority}
                  </Pill>
                </div>
                <p>{e.subject}</p>
                <p className="meta">
                  {e.reference} · {e.vertical} · {e.owner}
                </p>
              </div>
              <span className="when">{formatWhen(e.createdAt).split(',')[0]}</span>
            </button>
          ))}
        </div>

        <div className="admin-card admin-card-pad">
          <div className="admin-section-head">
            <div>
              <p className="admin-eyebrow">Alerts</p>
              <h3>Action required</h3>
            </div>
          </div>
          {data.alerts.filter((a) => a.status !== 'resolved').slice(0, 4).map((a) => (
            <div key={a.id} className="admin-alert">
              <div className="admin-status-row">
                <Pill tone={statusTone(a.level)}>{a.level}</Pill>
                <Pill tone={statusTone(a.status)}>{a.status}</Pill>
              </div>
              <h4>{a.title}</h4>
              <p>{a.body}</p>
              <div className="admin-actions" style={{ marginTop: 10 }}>
                {a.status === 'open' ? (
                  <button
                    type="button"
                    className="admin-btn-ghost"
                    style={{ padding: '6px 10px', fontSize: 12 }}
                    onClick={() => onPatchAlert(a.id, { status: 'acknowledged' })}
                  >
                    Acknowledge
                  </button>
                ) : null}
                {a.status !== 'resolved' ? (
                  <button
                    type="button"
                    className="admin-btn-primary"
                    style={{ padding: '6px 10px', fontSize: 12 }}
                    onClick={() => onPatchAlert(a.id, { status: 'resolved' })}
                  >
                    Resolve
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-grid-equal">
        <div className="admin-card admin-card-pad">
          <div className="admin-section-head">
            <div>
              <p className="admin-eyebrow">Work queue</p>
              <h3>Open tasks</h3>
            </div>
            <button type="button" className="admin-linkish" onClick={() => onNavigate('tasks')}>
              All tasks
            </button>
          </div>
          {data.tasks
            .filter((t) => t.status === 'todo' || t.status === 'in_progress')
            .slice(0, 5)
            .map((t) => (
              <div key={t.id} className="admin-list-row">
                <div>
                  <div className="admin-status-row">
                    <h4>{t.title}</h4>
                    <Pill tone={statusTone(t.status)}>{labelize(t.status)}</Pill>
                  </div>
                  <p>
                    {t.owner} · due {t.dueDate || '—'}
                  </p>
                </div>
                {t.status !== 'done' ? (
                  <button
                    type="button"
                    className="admin-btn-ghost"
                    style={{ padding: '6px 10px', fontSize: 12 }}
                    onClick={() => onPatchTask(t.id, { status: 'done' })}
                  >
                    Done
                  </button>
                ) : null}
              </div>
            ))}
        </div>

        <div className="admin-card admin-card-pad">
          <div className="admin-section-head">
            <div>
              <p className="admin-eyebrow">Feed</p>
              <h3>Recent activity</h3>
            </div>
          </div>
          {data.activity.slice(0, 8).map((item) => (
            <div key={item.id} className="admin-timeline-item">
              <div className="admin-timeline-dot" />
              <div>
                <p>
                  <span className="actor">{item.actor}</span> — {item.action}
                </p>
                <p className="time">{formatWhen(item.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EnquiriesView({
  items,
  query,
  setQuery,
  busy,
  onCreate,
  onOpen,
  onPatch,
  onExport,
}: {
  items: AdminEnquiry[]
  query: string
  setQuery: (v: string) => void
  busy: boolean
  onCreate: () => void
  onOpen: (e: AdminEnquiry) => void
  onPatch: (id: string, p: Partial<AdminEnquiry>) => void
  onExport: () => void
}) {
  return (
    <div>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">CRM</p>
          <h2>Enquiries</h2>
          <p className="lead">Assign owners, change status, add notes, export CSV.</p>
        </div>
        <div className="admin-actions">
          <button type="button" className="admin-btn-ghost" onClick={onExport}>
            <Download size={14} style={{ marginRight: 6 }} />
            Export CSV
          </button>
          <button type="button" className="admin-btn-primary" onClick={onCreate}>
            <Plus size={14} style={{ marginRight: 6 }} />
            Add enquiry
          </button>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={15} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter…" />
        </div>
        <span style={{ fontSize: 12, color: 'var(--admin-muted)' }}>{items.length} records</span>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Account</th>
                <th>Vertical</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Owner</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e.id} className="is-clickable" onClick={() => onOpen(e)}>
                  <td className="mono">{e.reference}</td>
                  <td>
                    <div className="strong">{e.name}</div>
                    <div style={{ fontSize: 11 }}>{e.subject}</div>
                  </td>
                  <td>{e.vertical}</td>
                  <td onClick={(ev) => ev.stopPropagation()}>
                    <select
                      className="admin-inline-select"
                      value={e.status}
                      disabled={busy}
                      onChange={(ev) =>
                        onPatch(e.id, { status: ev.target.value as EnquiryStatus })
                      }
                    >
                      {ENQUIRY_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {labelize(s)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td onClick={(ev) => ev.stopPropagation()}>
                    <select
                      className="admin-inline-select"
                      value={e.priority}
                      disabled={busy}
                      onChange={(ev) =>
                        onPatch(e.id, { priority: ev.target.value as EnquiryPriority })
                      }
                    >
                      {ENQUIRY_PRIORITIES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td onClick={(ev) => ev.stopPropagation()}>
                    <select
                      className="admin-inline-select"
                      value={e.owner}
                      disabled={busy}
                      onChange={(ev) => onPatch(e.id, { owner: ev.target.value })}
                    >
                      {OWNER_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ fontSize: 12 }}>{formatWhen(e.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length < 1 ? <p className="admin-empty">No enquiries match your filter.</p> : null}
        </div>
      </div>
    </div>
  )
}

function ShipmentsView({
  items,
  busy,
  onCreate,
  onOpen,
  onPatch,
}: {
  items: AdminShipment[]
  busy: boolean
  onCreate: () => void
  onOpen: (s: AdminShipment) => void
  onPatch: (id: string, p: Partial<AdminShipment>) => void
}) {
  return (
    <div>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Logistics</p>
          <h2>Shipments</h2>
        </div>
        <button type="button" className="admin-btn-primary" onClick={onCreate}>
          <Plus size={14} style={{ marginRight: 6 }} />
          New shipment
        </button>
      </div>
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Destination</th>
                <th>Cargo</th>
                <th>Buyer</th>
                <th>ETA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="is-clickable" onClick={() => onOpen(s)}>
                  <td className="mono">{s.code}</td>
                  <td className="strong">{s.destination}</td>
                  <td>{s.variety}</td>
                  <td>{s.buyer || '—'}</td>
                  <td>{s.eta || '—'}</td>
                  <td onClick={(ev) => ev.stopPropagation()}>
                    <select
                      className="admin-inline-select"
                      value={s.status}
                      disabled={busy}
                      onChange={(ev) =>
                        onPatch(s.id, { status: ev.target.value as ShipmentStatus })
                      }
                    >
                      {SHIPMENT_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {labelize(st)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TasksView({
  items,
  busy,
  onCreate,
  onOpen,
  onPatch,
}: {
  items: AdminTask[]
  busy: boolean
  onCreate: () => void
  onOpen: (t: AdminTask) => void
  onPatch: (id: string, p: Partial<AdminTask>) => void
}) {
  return (
    <div>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Work queue</p>
          <h2>Tasks</h2>
        </div>
        <button type="button" className="admin-btn-primary" onClick={onCreate}>
          <Plus size={14} style={{ marginRight: 6 }} />
          New task
        </button>
      </div>
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Owner</th>
                <th>Due</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id} className="is-clickable" onClick={() => onOpen(t)}>
                  <td className="strong">{t.title}</td>
                  <td>{t.owner}</td>
                  <td>{t.dueDate || '—'}</td>
                  <td>
                    <Pill tone={t.priority === 'high' ? 'critical' : t.priority === 'medium' ? 'warn' : 'neutral'}>
                      {t.priority}
                    </Pill>
                  </td>
                  <td onClick={(ev) => ev.stopPropagation()}>
                    <select
                      className="admin-inline-select"
                      value={t.status}
                      disabled={busy}
                      onChange={(ev) =>
                        onPatch(t.id, {
                          status: ev.target.value as AdminTask['status'],
                        })
                      }
                    >
                      {['todo', 'in_progress', 'done', 'cancelled'].map((s) => (
                        <option key={s} value={s}>
                          {labelize(s)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AlertsView({
  items,
  busy,
  onCreate,
  onOpen,
  onPatch,
}: {
  items: AdminAlert[]
  busy: boolean
  onCreate: () => void
  onOpen: (a: AdminAlert) => void
  onPatch: (id: string, p: Partial<AdminAlert>) => void
}) {
  return (
    <div>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Incidents</p>
          <h2>Alerts</h2>
        </div>
        <button type="button" className="admin-btn-primary" onClick={onCreate}>
          <Plus size={14} style={{ marginRight: 6 }} />
          Raise alert
        </button>
      </div>
      <div className="admin-grid-equal">
        {items.map((a) => (
          <div key={a.id} className="admin-card admin-card-pad">
            <div className="admin-status-row">
              <Pill tone={statusTone(a.level)}>{a.level}</Pill>
              <Pill tone={statusTone(a.status)}>{a.status}</Pill>
            </div>
            <h3 style={{ marginTop: 10, fontSize: '1.2rem' }}>{a.title}</h3>
            <p style={{ marginTop: 6, fontSize: 13, color: 'var(--admin-muted)' }}>{a.body}</p>
            <p style={{ marginTop: 8, fontSize: 11, color: 'var(--admin-faint)' }}>
              {a.owner} · {formatWhen(a.updatedAt)}
            </p>
            <div className="admin-actions" style={{ marginTop: 12 }}>
              <button type="button" className="admin-btn-ghost" onClick={() => onOpen(a)}>
                Edit
              </button>
              {a.status !== 'resolved' ? (
                <button
                  type="button"
                  className="admin-btn-primary"
                  disabled={busy}
                  onClick={() => onPatch(a.id, { status: 'resolved' })}
                >
                  Resolve
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VerticalsView({
  items,
  busy,
  onPatch,
}: {
  items: AdminVertical[]
  busy: boolean
  onPatch: (id: string, p: Partial<AdminVertical>) => void
}) {
  return (
    <div>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Portfolio</p>
          <h2>Verticals</h2>
          <p className="lead">Update status, revenue notes, and operational highlights.</p>
        </div>
      </div>
      {items.map((v) => (
        <div key={v.id} className="admin-card admin-vdetail" style={{ marginBottom: 12 }}>
          <div className="admin-vdetail-grid">
            <div className="admin-vdetail-side">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{v.title}</h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--admin-muted)' }}>
                  {v.brand}
                </p>
              </div>
            </div>
            <div className="admin-vdetail-body">
              <div className="admin-metric">
                <p className="mlabel">Revenue</p>
                <p className="mvalue">{v.revenue}</p>
              </div>
              <div className="admin-metric">
                <p className="mlabel">Share</p>
                <p className="mvalue">{v.share}%</p>
              </div>
              <div className="admin-metric">
                <p className="mlabel">Headcount</p>
                <p className="mvalue">{v.headcount}</p>
              </div>
              <div className="admin-metric">
                <p className="mlabel">Status</p>
                <select
                  className="admin-inline-select"
                  style={{ marginTop: 6, maxWidth: '100%' }}
                  value={v.status}
                  disabled={busy}
                  onChange={(e) =>
                    onPatch(v.id, {
                      status: e.target.value as AdminVertical['status'],
                    })
                  }
                >
                  {['on_track', 'growing', 'stable', 'watch', 'critical'].map((s) => (
                    <option key={s} value={s}>
                      {labelize(s)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-metric span-2" style={{ gridColumn: '1 / -1' }}>
                <p className="mlabel">Ops notes</p>
                <textarea
                  defaultValue={v.notes}
                  key={v.updatedAt}
                  rows={2}
                  style={{
                    width: '100%',
                    marginTop: 6,
                    borderRadius: 10,
                    border: '1px solid var(--admin-line)',
                    padding: 10,
                    fontFamily: 'inherit',
                    fontSize: 13,
                  }}
                  onBlur={(e) => {
                    if (e.target.value !== v.notes) onPatch(v.id, { notes: e.target.value })
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SitesView({
  items,
  busy,
  onPatch,
}: {
  items: AdminSite[]
  busy: boolean
  onPatch: (id: string, p: Partial<AdminSite>) => void
}) {
  return (
    <div>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Network</p>
          <h2>Sites & assets</h2>
        </div>
      </div>
      <div className="admin-sites">
        {items.map((s) => (
          <div key={s.id} className="admin-card admin-site-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <MapPin size={16} color="#B8962E" />
              <select
                className="admin-inline-select"
                value={s.status}
                disabled={busy}
                onChange={(e) =>
                  onPatch(s.id, { status: e.target.value as AdminSite['status'] })
                }
              >
                {['operational', 'active_shipping', 'maintenance', 'offline'].map((st) => (
                  <option key={st} value={st}>
                    {labelize(st)}
                  </option>
                ))}
              </select>
            </div>
            <h3>{s.name}</h3>
            <p className="role">{s.role}</p>
            <p className="coords">{s.coords}</p>
            <div className="admin-site-meta">
              <div>
                <p>People</p>
                <strong>{s.people}</strong>
              </div>
              <div>
                <p>Focus</p>
                <strong>{s.focus}</strong>
              </div>
            </div>
            <textarea
              defaultValue={s.notes}
              key={s.updatedAt}
              placeholder="Site notes…"
              rows={2}
              style={{
                width: '100%',
                marginTop: 12,
                borderRadius: 10,
                border: '1px solid var(--admin-line)',
                padding: 10,
                fontFamily: 'inherit',
                fontSize: 12,
              }}
              onBlur={(e) => {
                if (e.target.value !== s.notes) onPatch(s.id, { notes: e.target.value })
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityView({ items }: { items: AdminActivity[] }) {
  return (
    <div>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Audit</p>
          <h2>Activity log</h2>
        </div>
      </div>
      <div className="admin-card admin-card-pad">
        {items.map((item) => (
          <div key={item.id} className="admin-timeline-item">
            <div className="admin-timeline-dot" />
            <div>
              <p>
                <span className="actor">{item.actor}</span> — {item.action}
              </p>
              <p className="time">
                {formatWhen(item.createdAt)}
                {item.entityType ? ` · ${item.entityType}` : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GovernanceView({ onReset, busy }: { onReset: () => void; busy: boolean }) {
  return (
    <div>
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Controls</p>
          <h2>Governance</h2>
        </div>
      </div>
      <div className="admin-gov-grid">
        {[
          {
            title: 'Authentication',
            body: 'HTTP-only session cookie (12h). Password via ADMIN_PASSWORD env var.',
            status: 'Active',
          },
          {
            title: 'Enquiry intake',
            body: 'Website form submissions are mirrored into this store automatically with owner routing.',
            status: 'Live',
          },
          {
            title: 'Data store',
            body: 'Persistent JSON store at data/admin/store.json. Suitable for single-server / local ops; use a DB for multi-instance Vercel.',
            status: 'File store',
          },
          {
            title: 'Audit trail',
            body: 'Every create/update/delete is logged under Activity with actor name.',
            status: 'On',
          },
        ].map((g) => (
          <div key={g.title} className="admin-card admin-gov-card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Shield size={16} color="#B8962E" />
              <Pill tone="good">{g.status}</Pill>
            </div>
            <h3>{g.title}</h3>
            <p>{g.body}</p>
          </div>
        ))}
      </div>

      <div className="admin-cta">
        <div>
          <p className="admin-eyebrow">Danger zone</p>
          <h3>Reset operational data</h3>
          <p>Restores seed enquiries, shipments, tasks, and alerts. Website-ingested rows will be cleared.</p>
        </div>
        <button type="button" className="admin-btn-danger" disabled={busy} onClick={onReset}>
          <AlertTriangle size={14} style={{ marginRight: 6 }} />
          Reset to seed
        </button>
      </div>
    </div>
  )
}

function Drawer({
  drawer,
  busy,
  onClose,
  onSaved,
  onError,
  setBusy,
}: {
  drawer: DrawerState
  busy: boolean
  onClose: () => void
  onSaved: (msg: string) => void
  onError: (msg: string) => void
  setBusy: (v: boolean) => void
}) {
  if (drawer.type === 'enquiry') {
    return (
      <EnquiryDrawer
        mode={drawer.mode}
        item={drawer.item}
        busy={busy}
        onClose={onClose}
        onSaved={onSaved}
        onError={onError}
        setBusy={setBusy}
      />
    )
  }
  if (drawer.type === 'shipment') {
    return (
      <ShipmentDrawer
        mode={drawer.mode}
        item={drawer.item}
        busy={busy}
        onClose={onClose}
        onSaved={onSaved}
        onError={onError}
        setBusy={setBusy}
      />
    )
  }
  if (drawer.type === 'task') {
    return (
      <TaskDrawer
        mode={drawer.mode}
        item={drawer.item}
        busy={busy}
        onClose={onClose}
        onSaved={onSaved}
        onError={onError}
        setBusy={setBusy}
      />
    )
  }
  return (
    <AlertDrawer
      mode={drawer.mode}
      item={drawer.item}
      busy={busy}
      onClose={onClose}
      onSaved={onSaved}
      onError={onError}
      setBusy={setBusy}
    />
  )
}

function EnquiryDrawer({
  mode,
  item,
  busy,
  onClose,
  onSaved,
  onError,
  setBusy,
}: {
  mode: 'create' | 'edit'
  item?: AdminEnquiry
  busy: boolean
  onClose: () => void
  onSaved: (msg: string) => void
  onError: (msg: string) => void
  setBusy: (v: boolean) => void
}) {
  const [form, setForm] = useState({
    name: item?.name ?? '',
    email: item?.email ?? '',
    phone: item?.phone ?? '',
    company: item?.company ?? '',
    country: item?.country ?? '',
    market: item?.market ?? '',
    vertical: item?.vertical ?? 'Stone & Export',
    subject: item?.subject ?? '',
    message: item?.message ?? '',
    status: item?.status ?? 'new',
    priority: item?.priority ?? 'medium',
    owner: item?.owner ?? 'Unassigned',
    notes: item?.notes ?? '',
    variety: item?.variety ?? '',
    format: item?.format ?? '',
    volume: item?.volume ?? '',
  })

  async function save() {
    setBusy(true)
    try {
      if (mode === 'create') {
        await api('/api/admin/enquiries', { method: 'POST', body: JSON.stringify(form) })
        onSaved('Enquiry created')
      } else if (item) {
        await api(`/api/admin/enquiries/${item.id}`, {
          method: 'PATCH',
          body: JSON.stringify(form),
        })
        onSaved('Enquiry saved')
      }
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    if (!item || !confirm('Delete this enquiry?')) return
    setBusy(true)
    try {
      await api(`/api/admin/enquiries/${item.id}`, { method: 'DELETE' })
      onSaved('Enquiry deleted')
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="admin-drawer-backdrop" onClick={onClose} />
      <div className="admin-drawer">
        <div className="admin-drawer-head">
          <div>
            <p className="admin-eyebrow">{mode === 'create' ? 'Create' : item?.reference}</p>
            <h3>{mode === 'create' ? 'New enquiry' : 'Manage enquiry'}</h3>
          </div>
          <button type="button" className="admin-icon-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="admin-drawer-body">
          {item ? (
            <div className="admin-detail-block">
              <p className="k">Source</p>
              <p className="v">
                {item.source} · {item.site} · {formatWhen(item.createdAt)}
              </p>
            </div>
          ) : null}
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Company</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Country / market</label>
              <input
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value, market: e.target.value })}
              />
            </div>
            <div className="admin-field">
              <label>Vertical</label>
              <select
                value={form.vertical}
                onChange={(e) => setForm({ ...form, vertical: e.target.value })}
              >
                {VERTICAL_OPTIONS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-field">
            <label>Subject</label>
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </div>
          <div className="admin-field">
            <label>Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as EnquiryStatus })}
              >
                {ENQUIRY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {labelize(s)}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label>Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as EnquiryPriority })}
              >
                {ENQUIRY_PRIORITIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-field">
            <label>Owner</label>
            <select value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })}>
              {OWNER_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Variety</label>
              <input value={form.variety} onChange={(e) => setForm({ ...form, variety: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Volume</label>
              <input value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} />
            </div>
          </div>
          <div className="admin-field">
            <label>Internal notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
        </div>
        <div className="admin-drawer-foot">
          {mode === 'edit' ? (
            <button type="button" className="admin-btn-danger" disabled={busy} onClick={remove}>
              Delete
            </button>
          ) : null}
          <button type="button" className="admin-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="admin-btn-primary" disabled={busy} onClick={save}>
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </>
  )
}

function ShipmentDrawer({
  mode,
  item,
  busy,
  onClose,
  onSaved,
  onError,
  setBusy,
}: {
  mode: 'create' | 'edit'
  item?: AdminShipment
  busy: boolean
  onClose: () => void
  onSaved: (msg: string) => void
  onError: (msg: string) => void
  setBusy: (v: boolean) => void
}) {
  const [form, setForm] = useState({
    code: item?.code ?? '',
    destination: item?.destination ?? '',
    variety: item?.variety ?? '',
    status: item?.status ?? 'planned',
    eta: item?.eta ?? '',
    volume: item?.volume ?? '',
    port: item?.port ?? 'Mundra',
    buyer: item?.buyer ?? '',
    notes: item?.notes ?? '',
  })

  async function save() {
    setBusy(true)
    try {
      if (mode === 'create') {
        await api('/api/admin/shipments', { method: 'POST', body: JSON.stringify(form) })
        onSaved('Shipment created')
      } else if (item) {
        await api(`/api/admin/shipments/${item.id}`, {
          method: 'PATCH',
          body: JSON.stringify(form),
        })
        onSaved('Shipment saved')
      }
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    if (!item || !confirm('Delete shipment?')) return
    setBusy(true)
    try {
      await api(`/api/admin/shipments/${item.id}`, { method: 'DELETE' })
      onSaved('Shipment deleted')
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="admin-drawer-backdrop" onClick={onClose} />
      <div className="admin-drawer">
        <div className="admin-drawer-head">
          <div>
            <p className="admin-eyebrow">Shipment</p>
            <h3>{mode === 'create' ? 'New shipment' : item?.code}</h3>
          </div>
          <button type="button" className="admin-icon-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="admin-drawer-body">
          <div className="admin-field">
            <label>Destination</label>
            <input
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label>Cargo / variety</label>
            <input value={form.variety} onChange={(e) => setForm({ ...form, variety: e.target.value })} />
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Buyer</label>
              <input value={form.buyer} onChange={(e) => setForm({ ...form, buyer: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Volume</label>
              <input value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} />
            </div>
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>ETA</label>
              <input
                type="date"
                value={form.eta}
                onChange={(e) => setForm({ ...form, eta: e.target.value })}
              />
            </div>
            <div className="admin-field">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ShipmentStatus })}
              >
                {SHIPMENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {labelize(s)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-field">
            <label>Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
        </div>
        <div className="admin-drawer-foot">
          {mode === 'edit' ? (
            <button type="button" className="admin-btn-danger" disabled={busy} onClick={remove}>
              Delete
            </button>
          ) : null}
          <button type="button" className="admin-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="admin-btn-primary" disabled={busy} onClick={save}>
            Save
          </button>
        </div>
      </div>
    </>
  )
}

function TaskDrawer({
  mode,
  item,
  busy,
  onClose,
  onSaved,
  onError,
  setBusy,
}: {
  mode: 'create' | 'edit'
  item?: AdminTask
  busy: boolean
  onClose: () => void
  onSaved: (msg: string) => void
  onError: (msg: string) => void
  setBusy: (v: boolean) => void
}) {
  const [form, setForm] = useState({
    title: item?.title ?? '',
    description: item?.description ?? '',
    status: item?.status ?? 'todo',
    priority: item?.priority ?? 'medium',
    owner: item?.owner ?? 'Unassigned',
    dueDate: item?.dueDate ?? '',
  })

  async function save() {
    setBusy(true)
    try {
      if (mode === 'create') {
        await api('/api/admin/tasks', { method: 'POST', body: JSON.stringify(form) })
        onSaved('Task created')
      } else if (item) {
        await api(`/api/admin/tasks/${item.id}`, {
          method: 'PATCH',
          body: JSON.stringify(form),
        })
        onSaved('Task saved')
      }
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    if (!item || !confirm('Delete task?')) return
    setBusy(true)
    try {
      await api(`/api/admin/tasks/${item.id}`, { method: 'DELETE' })
      onSaved('Task deleted')
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="admin-drawer-backdrop" onClick={onClose} />
      <div className="admin-drawer">
        <div className="admin-drawer-head">
          <div>
            <p className="admin-eyebrow">Task</p>
            <h3>{mode === 'create' ? 'New task' : 'Edit task'}</h3>
          </div>
          <button type="button" className="admin-icon-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="admin-drawer-body">
          <div className="admin-field">
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="admin-field">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Owner</label>
              <select value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })}>
                {OWNER_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label>Due date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Priority</label>
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value as AdminTask['priority'] })
                }
              >
                {['low', 'medium', 'high'].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as AdminTask['status'] })
                }
              >
                {['todo', 'in_progress', 'done', 'cancelled'].map((s) => (
                  <option key={s} value={s}>
                    {labelize(s)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="admin-drawer-foot">
          {mode === 'edit' ? (
            <button type="button" className="admin-btn-danger" disabled={busy} onClick={remove}>
              Delete
            </button>
          ) : null}
          <button type="button" className="admin-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="admin-btn-primary" disabled={busy} onClick={save}>
            Save
          </button>
        </div>
      </div>
    </>
  )
}

function AlertDrawer({
  mode,
  item,
  busy,
  onClose,
  onSaved,
  onError,
  setBusy,
}: {
  mode: 'create' | 'edit'
  item?: AdminAlert
  busy: boolean
  onClose: () => void
  onSaved: (msg: string) => void
  onError: (msg: string) => void
  setBusy: (v: boolean) => void
}) {
  const [form, setForm] = useState({
    level: item?.level ?? 'info',
    title: item?.title ?? '',
    body: item?.body ?? '',
    status: item?.status ?? 'open',
    owner: item?.owner ?? 'Unassigned',
  })

  async function save() {
    setBusy(true)
    try {
      if (mode === 'create') {
        await api('/api/admin/alerts', { method: 'POST', body: JSON.stringify(form) })
        onSaved('Alert raised')
      } else if (item) {
        await api(`/api/admin/alerts/${item.id}`, {
          method: 'PATCH',
          body: JSON.stringify(form),
        })
        onSaved('Alert saved')
      }
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    if (!item || !confirm('Delete alert?')) return
    setBusy(true)
    try {
      await api(`/api/admin/alerts/${item.id}`, { method: 'DELETE' })
      onSaved('Alert deleted')
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="admin-drawer-backdrop" onClick={onClose} />
      <div className="admin-drawer">
        <div className="admin-drawer-head">
          <div>
            <p className="admin-eyebrow">Alert</p>
            <h3>{mode === 'create' ? 'Raise alert' : 'Edit alert'}</h3>
          </div>
          <button type="button" className="admin-icon-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="admin-drawer-body">
          <div className="admin-field">
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="admin-field">
            <label>Details</label>
            <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Level</label>
              <select
                value={form.level}
                onChange={(e) =>
                  setForm({ ...form, level: e.target.value as AdminAlert['level'] })
                }
              >
                {['info', 'warn', 'critical'].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as AdminAlert['status'] })
                }
              >
                {['open', 'acknowledged', 'resolved'].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-field">
            <label>Owner</label>
            <select value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })}>
              {OWNER_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="admin-drawer-foot">
          {mode === 'edit' ? (
            <button type="button" className="admin-btn-danger" disabled={busy} onClick={remove}>
              Delete
            </button>
          ) : null}
          <button type="button" className="admin-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="admin-btn-primary" disabled={busy} onClick={save}>
            Save
          </button>
        </div>
      </div>
    </>
  )
}
