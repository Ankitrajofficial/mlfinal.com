'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  MapPin,
  Plus,
  Navigation,
  Crosshair,
  Route,
  BarChart3,
  Trash2,
  Pencil,
  X,
  LocateFixed,
  Mountain,
  Clock,
  Compass,
  Layers,
  Package,
  Wallet,
  Users,
  ExternalLink,
  Briefcase,
} from 'lucide-react'
import type { AdminMine, MineOwnership, MineSample, MineStatus } from '@/lib/admin/types'
import { MINE_OWNERSHIPS, MINE_STATUSES } from '@/lib/admin/types'
import {
  bearingDegrees,
  compassLabel,
  formatDuration,
  haversineKm,
  planNearestNeighbour,
  planSequence,
  type TravelPlan,
} from '@/lib/admin/geo'

type Analytics = {
  total: number
  active: number
  byStatus: { status: string; count: number }[]
  byOwnership: { ownership: string; count: number }[]
  districts: number
  withVisits: number
}

type Tab = 'portfolio' | 'map' | 'travel' | 'analyse'

type MineForm = {
  name: string
  code: string
  tagline: string
  description: string
  material: string
  district: string
  state: string
  address: string
  lat: number
  lng: number
  gpsAccuracyM: number
  status: MineStatus
  ownership: MineOwnership
  capacity: string
  annualOutput: string
  headcount: string
  workforce: string
  revenue: string
  revenuePeriod: string
  areaHa: string
  yearOpened: string
  equipment: string
  certifications: string
  safetyNotes: string
  accessNotes: string
  roadCondition: string
  nearestTown: string
  contactName: string
  contactPhone: string
  varieties: string
  notes: string
  primaryImage: string
  publicVisible: boolean
  showRevenuePublic: boolean
  samples: MineSample[]
}

const emptyForm: MineForm = {
  name: '',
  code: '',
  tagline: '',
  description: '',
  material: 'Sandstone',
  district: '',
  state: 'Rajasthan',
  address: '',
  lat: 25.176,
  lng: 75.342,
  gpsAccuracyM: 0,
  status: 'active',
  ownership: 'owned',
  capacity: '',
  annualOutput: '',
  headcount: '',
  workforce: '',
  revenue: '',
  revenuePeriod: '',
  areaHa: '',
  yearOpened: '',
  equipment: '',
  certifications: '',
  safetyNotes: '',
  accessNotes: '',
  roadCondition: '',
  nearestTown: '',
  contactName: '',
  contactPhone: '',
  varieties: '',
  notes: '',
  primaryImage: '',
  publicVisible: true,
  showRevenuePublic: false,
  samples: [],
}

function labelize(s: string) {
  return s.replace(/_/g, ' ')
}

function statusTone(status: string): 'good' | 'warn' | 'critical' | 'neutral' | 'info' {
  if (status === 'active') return 'good'
  if (status === 'development' || status === 'seasonal') return 'warn'
  if (status === 'closed' || status === 'idle') return 'critical'
  if (status === 'allied') return 'info'
  return 'neutral'
}

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

export default function MinesGis({
  onToast,
}: {
  onToast: (msg: string) => void
}) {
  const [mines, setMines] = useState<AdminMine[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('portfolio')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [drawer, setDrawer] = useState<null | { mode: 'create' | 'edit'; mine?: AdminMine }>(
    null
  )
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [gpsBusy, setGpsBusy] = useState(false)
  const [livePos, setLivePos] = useState<{ lat: number; lng: number; accuracy: number } | null>(
    null
  )
  const [travelIds, setTravelIds] = useState<string[]>([])
  const [travelMode, setTravelMode] = useState<'sequence' | 'nearest'>('nearest')
  const [plan, setPlan] = useState<TravelPlan | null>(null)
  const [visitPurpose, setVisitPurpose] = useState('Field inspection')
  const [visitNotes, setVisitNotes] = useState('')
  const [mapReady, setMapReady] = useState(false)

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<import('leaflet').Map | null>(null)
  const layerRef = useRef<import('leaflet').LayerGroup | null>(null)
  const routeLayerRef = useRef<import('leaflet').Polyline | null>(null)
  const liveMarkerRef = useRef<import('leaflet').CircleMarker | null>(null)
  const Lref = useRef<typeof import('leaflet') | null>(null)

  const selected = useMemo(
    () => mines.find((m) => m.id === selectedId) || null,
    [mines, selectedId]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return mines
    return mines.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.code.toLowerCase().includes(q) ||
        m.district.toLowerCase().includes(q) ||
        m.material.toLowerCase().includes(q)
    )
  }, [mines, query])

  const load = useCallback(async () => {
    const data = await api<{ mines: AdminMine[]; analytics: Analytics }>('/api/admin/mines')
    setMines(data.mines)
    setAnalytics(data.analytics)
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await load()
      } catch (e) {
        onToast(e instanceof Error ? e.message : 'Failed to load mines')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [load, onToast])

  // The map container only exists after loading finishes AND while a
  // map-bearing tab is active — (re)init Leaflet whenever it (re)enters
  // the DOM, and tear down when it leaves (tab = analyse).
  const mapVisible = !loading && (tab === 'map' || tab === 'travel')

  useEffect(() => {
    let cancelled = false

    async function init() {
      if (!mapVisible || !mapRef.current || mapInstance.current) return
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css'
        document.head.appendChild(link)
      }

      const L = await import('leaflet')
      if (cancelled || !mapRef.current) return

      Lref.current = L

      // Fix default marker icons in bundlers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current, {
        center: [25.4, 74.8],
        zoom: 7,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
      }).addTo(map)

      const layers = L.layerGroup().addTo(map)
      mapInstance.current = map
      layerRef.current = layers

      // Click map to set form lat/lng when drawer open
      map.on('click', (e: import('leaflet').LeafletMouseEvent) => {
        setForm((f) => ({
          ...f,
          lat: Math.round(e.latlng.lat * 1e6) / 1e6,
          lng: Math.round(e.latlng.lng * 1e6) / 1e6,
          gpsAccuracyM: 0,
        }))
      })

      setMapReady(true)
    }

    init()
    return () => {
      cancelled = true
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
        layerRef.current = null
        routeLayerRef.current = null
        liveMarkerRef.current = null
        setMapReady(false)
      }
    }
  }, [mapVisible])

  // Render mine markers
  useEffect(() => {
    const L = Lref.current
    const map = mapInstance.current
    const layers = layerRef.current
    if (!L || !map || !layers) return

    layers.clearLayers()

    filtered.forEach((m) => {
      const color =
        m.status === 'active'
          ? '#067647'
          : m.status === 'development'
            ? '#b54708'
            : m.status === 'allied'
              ? '#175cd3'
              : m.status === 'closed' || m.status === 'idle'
                ? '#b42318'
                : '#B8962E'

      const marker = L.circleMarker([m.lat, m.lng], {
        radius: selectedId === m.id ? 11 : 8,
        color: '#1A1410',
        weight: selectedId === m.id ? 2 : 1,
        fillColor: color,
        fillOpacity: 0.9,
      })

      marker.bindPopup(
        `<strong>${escapeHtml(m.name)}</strong><br/><span style="font-family:monospace;font-size:11px">${escapeHtml(m.code)}</span><br/>${escapeHtml(m.district)} · ${escapeHtml(m.status)}`
      )
      marker.on('click', () => setSelectedId(m.id))
      marker.addTo(layers)
    })

    if (filtered.length > 0 && !selectedId) {
      const bounds = L.latLngBounds(filtered.map((m) => [m.lat, m.lng] as [number, number]))
      map.fitBounds(bounds.pad(0.2))
    } else if (selected) {
      map.panTo([selected.lat, selected.lng])
    }
  }, [filtered, selectedId, selected, mapReady])

  // Draw travel route
  useEffect(() => {
    const L = Lref.current
    const map = mapInstance.current
    if (!L || !map) return

    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current)
      routeLayerRef.current = null
    }

    if (!plan || plan.orderedIds.length < 2) return

    const pts = plan.orderedIds
      .map((id) => mines.find((m) => m.id === id))
      .filter(Boolean) as AdminMine[]

    if (pts.length < 2) return

    const line = L.polyline(
      pts.map((p) => [p.lat, p.lng] as [number, number]),
      { color: '#B8962E', weight: 4, opacity: 0.85, dashArray: '8 6' }
    ).addTo(map)

    routeLayerRef.current = line
    map.fitBounds(line.getBounds().pad(0.2))
  }, [plan, mines, mapReady])

  // Live GPS marker
  useEffect(() => {
    const L = Lref.current
    const map = mapInstance.current
    if (!L || !map) return

    if (liveMarkerRef.current) {
      map.removeLayer(liveMarkerRef.current)
      liveMarkerRef.current = null
    }

    if (!livePos) return

    const marker = L.circleMarker([livePos.lat, livePos.lng], {
      radius: 9,
      color: '#175cd3',
      weight: 2,
      fillColor: '#53b1fd',
      fillOpacity: 0.95,
    })
      .bindPopup(`Your live position<br/>±${Math.round(livePos.accuracy)} m`)
      .addTo(map)

    liveMarkerRef.current = marker
  }, [livePos, mapReady])

  function captureLiveGps(forForm = false) {
    if (!navigator.geolocation) {
      onToast('Geolocation not available on this device')
      return
    }
    setGpsBusy(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Math.round(pos.coords.latitude * 1e6) / 1e6
        const lng = Math.round(pos.coords.longitude * 1e6) / 1e6
        const accuracy = pos.coords.accuracy || 0
        setLivePos({ lat, lng, accuracy })
        if (forForm) {
          setForm((f) => ({
            ...f,
            lat,
            lng,
            gpsAccuracyM: Math.round(accuracy),
          }))
        }
        mapInstance.current?.setView([lat, lng], 13)
        setGpsBusy(false)
        onToast(`GPS locked · ±${Math.round(accuracy)} m`)
      },
      (err) => {
        setGpsBusy(false)
        onToast(err.message || 'Could not read GPS')
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    )
  }

  function openCreate(atLive = false) {
    const base = { ...emptyForm }
    if (atLive && livePos) {
      base.lat = livePos.lat
      base.lng = livePos.lng
      base.gpsAccuracyM = Math.round(livePos.accuracy)
    }
    setForm(base)
    setDrawer({ mode: 'create' })
  }

  function openEdit(mine: AdminMine) {
    setForm({
      name: mine.name,
      code: mine.code,
      tagline: mine.tagline || '',
      description: mine.description || '',
      material: mine.material,
      district: mine.district,
      state: mine.state,
      address: mine.address,
      lat: mine.lat,
      lng: mine.lng,
      gpsAccuracyM: mine.gpsAccuracyM,
      status: mine.status,
      ownership: mine.ownership,
      capacity: mine.capacity,
      annualOutput: mine.annualOutput || '',
      headcount: mine.headcount,
      workforce: mine.workforce || mine.headcount,
      revenue: mine.revenue || '',
      revenuePeriod: mine.revenuePeriod || '',
      areaHa: mine.areaHa,
      yearOpened: mine.yearOpened || '',
      equipment: mine.equipment || '',
      certifications: mine.certifications || '',
      safetyNotes: mine.safetyNotes || '',
      accessNotes: mine.accessNotes,
      roadCondition: mine.roadCondition,
      nearestTown: mine.nearestTown,
      contactName: mine.contactName,
      contactPhone: mine.contactPhone,
      varieties: mine.varieties || mine.stoneTypes?.join(', ') || '',
      notes: mine.notes,
      primaryImage: mine.primaryImage || '',
      publicVisible: mine.publicVisible !== false,
      showRevenuePublic: Boolean(mine.showRevenuePublic),
      samples: mine.samples || [],
    })
    setDrawer({ mode: 'edit', mine })
    setSelectedId(mine.id)
  }

  function formPayload() {
    const stoneTypes = form.varieties
      .split(/[,·|]/)
      .map((s) => s.trim())
      .filter(Boolean)
    return {
      ...form,
      stoneTypes,
      workforce: form.workforce || form.headcount,
      headcount: form.headcount || form.workforce,
      varieties: form.varieties || stoneTypes.join(', '),
    }
  }

  function addSample() {
    setForm((f) => ({
      ...f,
      samples: [
        ...f.samples,
        {
          id: `smp_${Date.now()}`,
          name: 'New sample',
          stoneType: f.varieties.split(/[,·|]/)[0]?.trim() || f.material,
          finish: '',
          size: '',
          description: '',
          imageUrl: '',
        },
      ],
    }))
  }

  function updateSample(i: number, patch: Partial<MineSample>) {
    setForm((f) => {
      const samples = [...f.samples]
      samples[i] = { ...samples[i]!, ...patch }
      return { ...f, samples }
    })
  }

  function removeSample(i: number) {
    setForm((f) => ({ ...f, samples: f.samples.filter((_, idx) => idx !== i) }))
  }

  async function saveMine() {
    setBusy(true)
    try {
      const body = formPayload()
      if (drawer?.mode === 'create') {
        await api('/api/admin/mines', { method: 'POST', body: JSON.stringify(body) })
        onToast('Mine saved to GIS store')
      } else if (drawer?.mine) {
        await api(`/api/admin/mines/${drawer.mine.id}`, {
          method: 'PATCH',
          body: JSON.stringify(body),
        })
        onToast('Mine updated')
      }
      setDrawer(null)
      await load()
    } catch (e) {
      onToast(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  async function deleteMine(id: string) {
    if (!confirm('Delete this mine record permanently?')) return
    setBusy(true)
    try {
      await api(`/api/admin/mines/${id}`, { method: 'DELETE' })
      if (selectedId === id) setSelectedId(null)
      onToast('Mine deleted')
      await load()
    } catch (e) {
      onToast(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setBusy(false)
    }
  }

  async function logVisit() {
    if (!selected) return
    setBusy(true)
    try {
      await api(`/api/admin/mines/${selected.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          action: 'add_visit',
          purpose: visitPurpose,
          notes: visitNotes,
          lat: livePos?.lat ?? selected.lat,
          lng: livePos?.lng ?? selected.lng,
        }),
      })
      setVisitNotes('')
      onToast('Visit logged')
      await load()
    } catch (e) {
      onToast(e instanceof Error ? e.message : 'Visit log failed')
    } finally {
      setBusy(false)
    }
  }

  function toggleTravel(id: string) {
    setTravelIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
    setPlan(null)
  }

  function buildPlan() {
    const pts = travelIds
      .map((id) => mines.find((m) => m.id === id))
      .filter(Boolean)
      .map((m) => ({ id: m!.id, name: m!.name, lat: m!.lat, lng: m!.lng }))

    if (pts.length < 2) {
      onToast('Select at least two mines for a travel plan')
      return
    }

    const next =
      travelMode === 'nearest' ? planNearestNeighbour(pts) : planSequence(pts)
    setPlan(next)
    setTab('travel')
    onToast(
      `Route ready · ${next.totalDistanceKm} km · ${formatDuration(next.totalDriveMinutes)}`
    )
  }

  function nearestToLive() {
    if (!livePos || mines.length === 0) {
      onToast('Capture live GPS first')
      return
    }
    let best = mines[0]!
    let bestD = Infinity
    for (const m of mines) {
      const d = haversineKm(livePos, m)
      if (d < bestD) {
        bestD = d
        best = m
      }
    }
    setSelectedId(best.id)
    mapInstance.current?.setView([best.lat, best.lng], 11)
    const bearing = compassLabel(bearingDegrees(livePos, best))
    onToast(`Nearest mine: ${best.name} · ${bestD.toFixed(1)} km ${bearing}`)
  }

  if (loading) {
    return <div className="admin-loading" style={{ minHeight: 320 }}>Loading mines GIS…</div>
  }

  return (
    <div className="mines-gis">
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Field operations · portfolio</p>
          <h2>Mines portfolio</h2>
          <p className="lead">
            Portfolio cards (stone types, samples, workforce, revenue), map GIS, travel planning,
            and analysis across the Rajasthan stone belt.
          </p>
        </div>
        <div className="admin-actions">
          <a
            href="/khadane/mines"
            target="_blank"
            rel="noreferrer"
            className="admin-btn-ghost"
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={14} style={{ marginRight: 6 }} />
            Public page
          </a>
          <button
            type="button"
            className="admin-btn-ghost"
            disabled={gpsBusy}
            onClick={() => captureLiveGps(false)}
          >
            <LocateFixed size={14} style={{ marginRight: 6 }} />
            {gpsBusy ? 'Locating…' : 'Live GPS'}
          </button>
          <button type="button" className="admin-btn-primary" onClick={() => openCreate(true)}>
            <Plus size={14} style={{ marginRight: 6 }} />
            Add mine
          </button>
        </div>
      </div>

      {analytics ? (
        <div className="admin-stat-grid mines-stats">
          {[
            { label: 'Total mines', value: String(analytics.total) },
            { label: 'Active', value: String(analytics.active) },
            { label: 'Districts', value: String(analytics.districts) },
            { label: 'With visits', value: String(analytics.withVisits) },
          ].map((s) => (
            <div key={s.label} className="admin-card admin-stat">
              <p className="label">{s.label}</p>
              <p className="value">{s.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mines-tabs">
        {(
          [
            ['portfolio', 'Portfolio', Briefcase],
            ['map', 'Map & registry', MapPin],
            ['travel', 'Travel planner', Route],
            ['analyse', 'Analyse', BarChart3],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            className={`mines-tab${tab === id ? ' is-active' : ''}`}
            onClick={() => setTab(id)}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'portfolio' ? (
        <div className="mines-portfolio-admin">
          {filtered.length === 0 ? (
            <div className="admin-card admin-card-pad">
              <p className="mines-help">No mines yet. Click “Add mine” to create the first holding.</p>
            </div>
          ) : (
            <div className="mines-portfolio-grid">
              {filtered.map((m) => (
                <article key={m.id} className="admin-card mines-portfolio-card">
                  <div className="mpc-head">
                    <div>
                      <p className="admin-eyebrow">{m.code || 'Mine'}</p>
                      <h3>{m.name}</h3>
                      {m.tagline ? <p className="mines-help">{m.tagline}</p> : null}
                    </div>
                    <div className="admin-status-row">
                      <span className={`admin-pill ${statusTone(m.status)}`}>
                        {labelize(m.status)}
                      </span>
                      <span className="admin-pill neutral">{labelize(m.ownership)}</span>
                    </div>
                  </div>

                  <div className="mpc-loc">
                    <MapPin size={13} />
                    {[m.nearestTown, m.district, m.state].filter(Boolean).join(' · ') || '—'}
                  </div>

                  <div className="mpc-block">
                    <p className="mpc-label">
                      <Layers size={12} /> Stone types
                    </p>
                    <div className="mpc-tags">
                      {(m.stoneTypes?.length ? m.stoneTypes : m.varieties ? m.varieties.split(/[,·]/).map((s) => s.trim()).filter(Boolean) : []).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                      {!m.stoneTypes?.length && !m.varieties ? <span className="muted">None listed</span> : null}
                    </div>
                  </div>

                  <div className="mpc-kpis">
                    <div>
                      <p className="mpc-label">
                        <Users size={12} /> Workforce
                      </p>
                      <strong>{m.workforce || m.headcount || '—'}</strong>
                    </div>
                    <div>
                      <p className="mpc-label">
                        <Package size={12} /> Samples
                      </p>
                      <strong>{m.samples?.length ?? 0}</strong>
                    </div>
                    <div>
                      <p className="mpc-label">
                        <Wallet size={12} /> Revenue
                      </p>
                      <strong>{m.revenue || '—'}</strong>
                      {m.revenuePeriod ? (
                        <span className="mpc-sub">{m.revenuePeriod}</span>
                      ) : null}
                    </div>
                  </div>

                  {(m.samples?.length ?? 0) > 0 ? (
                    <div className="mpc-block">
                      <p className="mpc-label">Sample catalogue</p>
                      <ul className="mpc-samples">
                        {m.samples.slice(0, 4).map((s) => (
                          <li key={s.id}>
                            <strong>{s.name}</strong>
                            <span>
                              {s.stoneType}
                              {s.finish ? ` · ${s.finish}` : ''}
                              {s.size ? ` · ${s.size}` : ''}
                            </span>
                          </li>
                        ))}
                        {m.samples.length > 4 ? (
                          <li className="muted">+{m.samples.length - 4} more</li>
                        ) : null}
                      </ul>
                    </div>
                  ) : null}

                  <div className="admin-actions" style={{ marginTop: 12 }}>
                    <button
                      type="button"
                      className="admin-btn-primary"
                      onClick={() => openEdit(m)}
                    >
                      <Pencil size={14} style={{ marginRight: 6 }} />
                      Edit portfolio
                    </button>
                    <button
                      type="button"
                      className="admin-btn-ghost"
                      onClick={() => {
                        setSelectedId(m.id)
                        setTab('map')
                      }}
                    >
                      <MapPin size={14} style={{ marginRight: 6 }} />
                      Map
                    </button>
                    {m.publicVisible !== false && m.slug ? (
                      <a
                        href={`/khadane/mines/${m.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-btn-ghost"
                        style={{ textDecoration: 'none' }}
                      >
                        Public
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {tab === 'map' || tab === 'travel' ? (
        <div className="mines-layout">
          <div className="mines-map-card admin-card">
            <div className="mines-map-toolbar">
              <input
                className="mines-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search mines, codes, districts…"
              />
              <button type="button" className="admin-btn-ghost" onClick={nearestToLive}>
                <Navigation size={14} style={{ marginRight: 6 }} />
                Nearest to me
              </button>
            </div>
            <div ref={mapRef} className="mines-map" />
            <p className="mines-map-hint">
              Click the map to drop coordinates into the add/edit form. Gold dashed line = travel
              plan.
            </p>
          </div>

          <div className="mines-side">
            {tab === 'travel' ? (
              <div className="admin-card admin-card-pad mines-travel-panel">
                <div className="admin-section-head">
                  <div>
                    <p className="admin-eyebrow">Route</p>
                    <h3>Travel planner</h3>
                  </div>
                </div>
                <p className="mines-help">
                  Select mines in the list (checkbox), choose order mode, then build the route.
                  Distances use great-circle estimates with ~{42} km/h mixed road speed.
                </p>
                <div className="admin-field">
                  <label>Route mode</label>
                  <select
                    value={travelMode}
                    onChange={(e) =>
                      setTravelMode(e.target.value as 'sequence' | 'nearest')
                    }
                  >
                    <option value="nearest">Optimise order (nearest neighbour)</option>
                    <option value="sequence">Keep selection order</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="admin-btn-primary"
                  style={{ width: '100%' }}
                  onClick={buildPlan}
                  disabled={travelIds.length < 2}
                >
                  <Route size={14} style={{ marginRight: 6 }} />
                  Build travel plan ({travelIds.length} stops)
                </button>

                {plan ? (
                  <div className="mines-plan">
                    <div className="mines-plan-totals">
                      <div>
                        <strong>{plan.totalDistanceKm} km</strong>
                        <span>Total distance</span>
                      </div>
                      <div>
                        <strong>{formatDuration(plan.totalDriveMinutes)}</strong>
                        <span>Est. drive</span>
                      </div>
                    </div>
                    <ol className="mines-plan-legs">
                      {plan.legs.map((leg, i) => (
                        <li key={`${leg.fromId}-${leg.toId}`}>
                          <span className="n">{i + 1}</span>
                          <div>
                            <strong>
                              {leg.fromName} → {leg.toName}
                            </strong>
                            <p>
                              {leg.distanceKm} km · {formatDuration(leg.driveMinutes)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <a
                      className="admin-btn-ghost"
                      style={{ display: 'inline-flex', marginTop: 8, textDecoration: 'none' }}
                      href={googleMapsUrl(
                        plan.orderedIds
                          .map((id) => mines.find((m) => m.id === id))
                          .filter(Boolean) as AdminMine[]
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Compass size={14} style={{ marginRight: 6 }} />
                      Open in Google Maps
                    </a>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="admin-card admin-card-pad">
              <div className="admin-section-head">
                <div>
                  <p className="admin-eyebrow">Registry</p>
                  <h3>{filtered.length} mines</h3>
                </div>
              </div>
              <div className="mines-list">
                {filtered.map((m) => (
                  <div
                    key={m.id}
                    className={`mines-list-item${selectedId === m.id ? ' is-selected' : ''}`}
                  >
                    <label className="mines-check">
                      <input
                        type="checkbox"
                        checked={travelIds.includes(m.id)}
                        onChange={() => toggleTravel(m.id)}
                        title="Include in travel plan"
                      />
                    </label>
                    <button
                      type="button"
                      className="mines-list-main"
                      onClick={() => setSelectedId(m.id)}
                    >
                      <div className="mines-list-top">
                        <strong>{m.name}</strong>
                        <span className={`admin-pill ${statusTone(m.status)}`}>
                          {labelize(m.status)}
                        </span>
                      </div>
                      <p>
                        {m.code} · {m.district || m.state} · {m.material}
                      </p>
                      <p className="mines-coords">
                        {m.lat.toFixed(4)}, {m.lng.toFixed(4)}
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {selected ? (
              <div className="admin-card admin-card-pad mines-detail">
                <div className="admin-section-head">
                  <div>
                    <p className="admin-eyebrow">{selected.code}</p>
                    <h3>{selected.name}</h3>
                  </div>
                  <div className="admin-actions">
                    <button
                      type="button"
                      className="admin-btn-ghost"
                      onClick={() => openEdit(selected)}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      className="admin-btn-danger"
                      disabled={busy}
                      onClick={() => deleteMine(selected.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="mines-detail-grid">
                  <Detail k="Status" v={labelize(selected.status)} />
                  <Detail k="Ownership" v={labelize(selected.ownership)} />
                  <Detail k="Material" v={selected.material} />
                  <Detail k="Capacity" v={selected.capacity || '—'} />
                  <Detail k="Headcount" v={selected.headcount || '—'} />
                  <Detail k="Nearest town" v={selected.nearestTown || '—'} />
                  <Detail k="Road" v={selected.roadCondition || '—'} />
                  <Detail k="Varieties" v={selected.varieties || '—'} />
                </div>

                {selected.accessNotes ? (
                  <div className="admin-detail-block">
                    <p className="k">Access</p>
                    <p className="v">{selected.accessNotes}</p>
                  </div>
                ) : null}
                {selected.notes ? (
                  <div className="admin-detail-block">
                    <p className="k">Notes</p>
                    <p className="v">{selected.notes}</p>
                  </div>
                ) : null}

                <div className="mines-visit-box">
                  <p className="admin-eyebrow">Log field visit</p>
                  <div className="admin-field">
                    <label>Purpose</label>
                    <input
                      value={visitPurpose}
                      onChange={(e) => setVisitPurpose(e.target.value)}
                    />
                  </div>
                  <div className="admin-field">
                    <label>Notes</label>
                    <textarea
                      value={visitNotes}
                      onChange={(e) => setVisitNotes(e.target.value)}
                      rows={2}
                    />
                  </div>
                  <button
                    type="button"
                    className="admin-btn-primary"
                    disabled={busy}
                    onClick={logVisit}
                  >
                    <Clock size={14} style={{ marginRight: 6 }} />
                    Save visit
                  </button>
                </div>

                {(selected.visits || []).length > 0 ? (
                  <div className="mines-visits">
                    <p className="admin-eyebrow">Visit history</p>
                    {selected.visits.slice(0, 5).map((v) => (
                      <div key={v.id} className="mines-visit-row">
                        <strong>{v.purpose}</strong>
                        <p>
                          {v.visitor} · {formatWhen(v.visitedAt)}
                        </p>
                        {v.notes ? <p className="muted">{v.notes}</p> : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <AnalysePanel mines={mines} analytics={analytics} />
      )}

      {drawer ? (
        <>
          <div className="admin-drawer-backdrop" onClick={() => setDrawer(null)} />
          <div className="admin-drawer mines-drawer">
            <div className="admin-drawer-head">
              <div>
                <p className="admin-eyebrow">
                  {drawer.mode === 'create' ? 'New mine' : drawer.mine?.code}
                </p>
                <h3>{drawer.mode === 'create' ? 'Add mine location' : 'Edit mine'}</h3>
              </div>
              <button type="button" className="admin-icon-btn" onClick={() => setDrawer(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="admin-drawer-body">
              <button
                type="button"
                className="admin-btn-ghost"
                style={{ width: '100%', marginBottom: 14 }}
                disabled={gpsBusy}
                onClick={() => captureLiveGps(true)}
              >
                <Crosshair size={14} style={{ marginRight: 6 }} />
                {gpsBusy ? 'Reading GPS…' : 'Use live GPS for coordinates'}
              </button>

              <div className="admin-field">
                <label>Mine name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Code</label>
                  <input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    placeholder="Auto if empty"
                  />
                </div>
                <div className="admin-field">
                  <label>Material</label>
                  <input
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Latitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={form.lat}
                    onChange={(e) => setForm({ ...form, lat: Number(e.target.value) })}
                  />
                </div>
                <div className="admin-field">
                  <label>Longitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={form.lng}
                    onChange={(e) => setForm({ ...form, lng: Number(e.target.value) })}
                  />
                </div>
              </div>
              {form.gpsAccuracyM > 0 ? (
                <p className="mines-help">GPS accuracy ±{form.gpsAccuracyM} m</p>
              ) : null}
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value as MineStatus })
                    }
                  >
                    {MINE_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {labelize(s)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-field">
                  <label>Ownership</label>
                  <select
                    value={form.ownership}
                    onChange={(e) =>
                      setForm({ ...form, ownership: e.target.value as MineOwnership })
                    }
                  >
                    {MINE_OWNERSHIPS.map((s) => (
                      <option key={s} value={s}>
                        {labelize(s)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>District</label>
                  <input
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                  />
                </div>
                <div className="admin-field">
                  <label>State</label>
                  <input
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-field">
                <label>Address / landmark</label>
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div className="admin-field">
                <label>Tagline</label>
                <input
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="Short portfolio line"
                />
              </div>
              <div className="admin-field">
                <label>Portfolio description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Capacity</label>
                  <input
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                  />
                </div>
                <div className="admin-field">
                  <label>Annual output</label>
                  <input
                    value={form.annualOutput}
                    onChange={(e) => setForm({ ...form, annualOutput: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Workforce</label>
                  <input
                    value={form.workforce || form.headcount}
                    onChange={(e) =>
                      setForm({ ...form, workforce: e.target.value, headcount: e.target.value })
                    }
                    placeholder="180+"
                  />
                </div>
                <div className="admin-field">
                  <label>Revenue</label>
                  <input
                    value={form.revenue}
                    onChange={(e) => setForm({ ...form, revenue: e.target.value })}
                    placeholder="₹148 Cr"
                  />
                </div>
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Revenue period</label>
                  <input
                    value={form.revenuePeriod}
                    onChange={(e) => setForm({ ...form, revenuePeriod: e.target.value })}
                    placeholder="FY 2025–26"
                  />
                </div>
                <div className="admin-field">
                  <label>Year opened</label>
                  <input
                    value={form.yearOpened}
                    onChange={(e) => setForm({ ...form, yearOpened: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Nearest town</label>
                  <input
                    value={form.nearestTown}
                    onChange={(e) => setForm({ ...form, nearestTown: e.target.value })}
                  />
                </div>
                <div className="admin-field">
                  <label>Road condition</label>
                  <input
                    value={form.roadCondition}
                    onChange={(e) => setForm({ ...form, roadCondition: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-field">
                <label>Stone types (comma-separated)</label>
                <input
                  value={form.varieties}
                  onChange={(e) => setForm({ ...form, varieties: e.target.value })}
                  placeholder="Kandla Grey, Autumn Brown, Sage Green"
                />
              </div>
              <div className="admin-field">
                <label>Primary image URL</label>
                <input
                  value={form.primaryImage}
                  onChange={(e) => setForm({ ...form, primaryImage: e.target.value })}
                  placeholder="/img/gallery/quarry/…"
                />
              </div>
              <div className="admin-field-row">
                <label className="admin-field" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={form.publicVisible}
                    onChange={(e) => setForm({ ...form, publicVisible: e.target.checked })}
                  />
                  <span>Show on public /mines portfolio</span>
                </label>
                <label className="admin-field" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={form.showRevenuePublic}
                    onChange={(e) => setForm({ ...form, showRevenuePublic: e.target.checked })}
                  />
                  <span>Show revenue publicly</span>
                </label>
              </div>

              {/* Samples editor */}
              <div className="samples-editor">
                <div className="admin-section-head" style={{ marginBottom: 8 }}>
                  <div>
                    <p className="admin-eyebrow">Portfolio</p>
                    <h3 style={{ fontSize: '1.1rem' }}>Samples ({form.samples.length})</h3>
                  </div>
                  <button type="button" className="admin-btn-ghost" onClick={addSample}>
                    + Sample
                  </button>
                </div>
                {form.samples.map((s, i) => (
                  <div key={s.id} className="sample-card">
                    <div className="admin-field-row">
                      <div className="admin-field">
                        <label>Sample name</label>
                        <input
                          value={s.name}
                          onChange={(e) => updateSample(i, { name: e.target.value })}
                        />
                      </div>
                      <div className="admin-field">
                        <label>Stone type</label>
                        <input
                          value={s.stoneType}
                          onChange={(e) => updateSample(i, { stoneType: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="admin-field-row">
                      <div className="admin-field">
                        <label>Finish</label>
                        <input
                          value={s.finish}
                          onChange={(e) => updateSample(i, { finish: e.target.value })}
                        />
                      </div>
                      <div className="admin-field">
                        <label>Size</label>
                        <input
                          value={s.size}
                          onChange={(e) => updateSample(i, { size: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="admin-field">
                      <label>Image URL</label>
                      <input
                        value={s.imageUrl}
                        onChange={(e) => updateSample(i, { imageUrl: e.target.value })}
                        placeholder="/img/varieties/…/slab-face.jpg"
                      />
                    </div>
                    <div className="admin-field">
                      <label>Description</label>
                      <textarea
                        value={s.description}
                        onChange={(e) => updateSample(i, { description: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <button
                      type="button"
                      className="admin-btn-danger"
                      style={{ marginBottom: 10 }}
                      onClick={() => removeSample(i)}
                    >
                      Remove sample
                    </button>
                  </div>
                ))}
              </div>

              <div className="admin-field">
                <label>Access notes</label>
                <textarea
                  value={form.accessNotes}
                  onChange={(e) => setForm({ ...form, accessNotes: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="admin-field">
                <label>Equipment</label>
                <input
                  value={form.equipment}
                  onChange={(e) => setForm({ ...form, equipment: e.target.value })}
                />
              </div>
              <div className="admin-field">
                <label>Safety notes</label>
                <input
                  value={form.safetyNotes}
                  onChange={(e) => setForm({ ...form, safetyNotes: e.target.value })}
                />
              </div>
              <div className="admin-field">
                <label>Operations notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Contact name</label>
                  <input
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  />
                </div>
                <div className="admin-field">
                  <label>Contact phone</label>
                  <input
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="admin-drawer-foot">
              <button type="button" className="admin-btn-ghost" onClick={() => setDrawer(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn-primary"
                disabled={busy || !form.name.trim()}
                onClick={saveMine}
              >
                <Mountain size={14} style={{ marginRight: 6 }} />
                {busy ? 'Saving…' : 'Save mine'}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="k">{k}</p>
      <p className="v">{v}</p>
    </div>
  )
}

function AnalysePanel({
  mines,
  analytics,
}: {
  mines: AdminMine[]
  analytics: Analytics | null
}) {
  const byDistrict = useMemo(() => {
    const map = new Map<string, number>()
    mines.forEach((m) => {
      const d = m.district || 'Unknown'
      map.set(d, (map.get(d) || 0) + 1)
    })
    return Array.from(map.entries())
      .map(([district, count]) => ({ district, count }))
      .sort((a, b) => b.count - a.count)
  }, [mines])

  const recentlyVisited = useMemo(() => {
    return [...mines]
      .filter((m) => m.lastVisitedAt)
      .sort((a, b) => +new Date(b.lastVisitedAt) - +new Date(a.lastVisitedAt))
      .slice(0, 6)
  }, [mines])

  const neverVisited = mines.filter((m) => !m.lastVisitedAt && m.visits.length === 0)

  return (
    <div className="mines-analyse">
      <div className="admin-grid-equal">
        <div className="admin-card admin-card-pad">
          <div className="admin-section-head">
            <div>
              <p className="admin-eyebrow">Status mix</p>
              <h3>Portfolio health</h3>
            </div>
          </div>
          {(analytics?.byStatus || []).map((row) => (
            <div key={row.status} className="admin-budget-row">
              <div className="head">
                <span>{labelize(row.status)}</span>
                <span>{row.count}</span>
              </div>
              <div className="admin-progress">
                <span
                  style={{
                    width: `${analytics && analytics.total ? (row.count / analytics.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="admin-card admin-card-pad">
          <div className="admin-section-head">
            <div>
              <p className="admin-eyebrow">Ownership</p>
              <h3>Control structure</h3>
            </div>
          </div>
          {(analytics?.byOwnership || []).map((row) => (
            <div key={row.ownership} className="admin-budget-row">
              <div className="head">
                <span>{labelize(row.ownership)}</span>
                <span>{row.count}</span>
              </div>
              <div className="admin-progress">
                <span
                  style={{
                    width: `${analytics && analytics.total ? (row.count / analytics.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-grid-equal" style={{ marginTop: 16 }}>
        <div className="admin-card admin-card-pad">
          <div className="admin-section-head">
            <div>
              <p className="admin-eyebrow">Geography</p>
              <h3>By district</h3>
            </div>
          </div>
          {byDistrict.map((d) => (
            <div key={d.district} className="admin-list-row">
              <div>
                <h4>{d.district}</h4>
              </div>
              <span className="when">{d.count}</span>
            </div>
          ))}
        </div>

        <div className="admin-card admin-card-pad">
          <div className="admin-section-head">
            <div>
              <p className="admin-eyebrow">Field coverage</p>
              <h3>Recent visits</h3>
            </div>
          </div>
          {recentlyVisited.length === 0 ? (
            <p className="mines-help">No visits logged yet.</p>
          ) : (
            recentlyVisited.map((m) => (
              <div key={m.id} className="admin-list-row">
                <div>
                  <h4>{m.name}</h4>
                  <p>{formatWhen(m.lastVisitedAt)}</p>
                </div>
              </div>
            ))
          )}
          {neverVisited.length > 0 ? (
            <>
              <p className="admin-eyebrow" style={{ marginTop: 16 }}>
                Never visited ({neverVisited.length})
              </p>
              {neverVisited.slice(0, 5).map((m) => (
                <div key={m.id} className="admin-list-row">
                  <div>
                    <h4>{m.name}</h4>
                    <p>
                      {m.district} · {labelize(m.status)}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
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

function googleMapsUrl(mines: AdminMine[]) {
  if (mines.length === 0) return 'https://maps.google.com'
  if (mines.length === 1) {
    return `https://www.google.com/maps/search/?api=1&query=${mines[0]!.lat},${mines[0]!.lng}`
  }
  const origin = `${mines[0]!.lat},${mines[0]!.lng}`
  const destination = `${mines[mines.length - 1]!.lat},${mines[mines.length - 1]!.lng}`
  const waypoints = mines
    .slice(1, -1)
    .map((m) => `${m.lat},${m.lng}`)
    .join('|')
  const base = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`
  return waypoints ? `${base}&waypoints=${encodeURIComponent(waypoints)}` : base
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
