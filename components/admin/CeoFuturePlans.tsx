'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Plus,
  Target,
  TrendingUp,
  Trash2,
  X,
  Pencil,
  BarChart3,
} from 'lucide-react'
import type { AdminMine, CeoPlan, CeoPlanCategory, CeoPlanStatus } from '@/lib/admin/types'
import { CEO_PLAN_CATEGORIES, CEO_PLAN_STATUSES } from '@/lib/admin/types'

type PlanRow = CeoPlan & {
  gap: number
  gapPct: number
  presentShareOfFuture: number
}

const emptyForm = {
  title: '',
  category: 'revenue' as CeoPlanCategory,
  metricLabel: '',
  unit: '₹ Cr',
  presentValue: 0,
  futureValue: 0,
  horizon: 'FY 2027–28',
  status: 'draft' as CeoPlanStatus,
  owner: 'Group principal',
  notes: '',
  linkedMineId: '',
}

function labelize(s: string) {
  return s.replace(/_/g, ' ')
}

function statusTone(s: string): 'good' | 'warn' | 'critical' | 'neutral' | 'info' {
  if (s === 'achieved' || s === 'active') return 'good'
  if (s === 'at_risk') return 'critical'
  if (s === 'draft') return 'info'
  return 'neutral'
}

export default function CeoFuturePlans({
  onToast,
  mines = [],
}: {
  onToast: (m: string) => void
  mines?: AdminMine[]
}) {
  const [plans, setPlans] = useState<PlanRow[]>([])
  const [summary, setSummary] = useState({ total: 0, active: 0, atRisk: 0, avgGapPct: 0 })
  const [loading, setLoading] = useState(true)
  const [drawer, setDrawer] = useState<null | { mode: 'create' | 'edit'; plan?: PlanRow }>(null)
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/plans')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load plans')
      setPlans(data.plans || [])
      setSummary(data.summary || { total: 0, active: 0, atRisk: 0, avgGapPct: 0 })
    } catch (e) {
      onToast(e instanceof Error ? e.message : 'Plans load failed')
    } finally {
      setLoading(false)
    }
  }, [onToast])

  useEffect(() => {
    load()
  }, [load])

  const chartMax = useMemo(() => {
    let m = 1
    plans.forEach((p) => {
      m = Math.max(m, p.presentValue, p.futureValue)
    })
    return m
  }, [plans])

  function openCreate() {
    setForm(emptyForm)
    setDrawer({ mode: 'create' })
  }

  function openEdit(plan: PlanRow) {
    setForm({
      title: plan.title,
      category: plan.category,
      metricLabel: plan.metricLabel,
      unit: plan.unit,
      presentValue: plan.presentValue,
      futureValue: plan.futureValue,
      horizon: plan.horizon,
      status: plan.status,
      owner: plan.owner,
      notes: plan.notes,
      linkedMineId: plan.linkedMineId,
    })
    setDrawer({ mode: 'edit', plan })
  }

  async function save() {
    setBusy(true)
    try {
      if (drawer?.mode === 'create') {
        const res = await fetch('/api/admin/plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Create failed')
        onToast('Future plan created')
      } else if (drawer?.plan) {
        const res = await fetch(`/api/admin/plans/${drawer.plan.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Update failed')
        onToast('Plan updated')
      }
      setDrawer(null)
      await load()
    } catch (e) {
      onToast(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this CEO plan?')) return
    setBusy(true)
    try {
      const res = await fetch(`/api/admin/plans/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Delete failed')
      onToast('Plan deleted')
      await load()
    } catch (e) {
      onToast(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-card admin-card-pad">
        <p className="mines-help">Loading CEO plans…</p>
      </div>
    )
  }

  return (
    <div className="ceo-plans">
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Strategy</p>
          <h2>Future plans · gap analysis</h2>
          <p className="lead">
            Set present baselines vs future targets. Graphs show the gap the organisation must close.
          </p>
        </div>
        <button type="button" className="admin-btn-primary" onClick={openCreate}>
          <Plus size={14} style={{ marginRight: 6 }} />
          New plan
        </button>
      </div>

      <div className="admin-stat-grid">
        {[
          { label: 'Plans', value: String(summary.total) },
          { label: 'Active', value: String(summary.active) },
          { label: 'At risk', value: String(summary.atRisk) },
          { label: 'Avg |gap|', value: `${summary.avgGapPct}%` },
        ].map((s) => (
          <div key={s.label} className="admin-card admin-stat">
            <p className="label">{s.label}</p>
            <p className="value">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Combined gap chart */}
      <div className="admin-card admin-card-pad" style={{ marginBottom: 16 }}>
        <div className="admin-section-head">
          <div>
            <p className="admin-eyebrow">Present vs future</p>
            <h3>
              <BarChart3 size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: -2 }} />
              Gap chart
            </h3>
          </div>
        </div>
        {plans.length === 0 ? (
          <p className="mines-help">No plans yet. Create one to see graphs.</p>
        ) : (
          <div className="gap-chart">
            {plans.map((p) => (
              <div key={p.id} className="gap-row">
                <div className="gap-label">
                  <strong>{p.title}</strong>
                  <span>
                    {p.horizon} · {labelize(p.category)}
                  </span>
                </div>
                <div className="gap-bars">
                  <div className="bar-track">
                    <div
                      className="bar present"
                      style={{ width: `${(p.presentValue / chartMax) * 100}%` }}
                      title={`Present ${p.presentValue} ${p.unit}`}
                    />
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar future"
                      style={{ width: `${(p.futureValue / chartMax) * 100}%` }}
                      title={`Future ${p.futureValue} ${p.unit}`}
                    />
                  </div>
                </div>
                <div className="gap-nums">
                  <span className="pres">
                    Now {p.presentValue}
                    {p.unit ? ` ${p.unit}` : ''}
                  </span>
                  <span className="fut">
                    Target {p.futureValue}
                    {p.unit ? ` ${p.unit}` : ''}
                  </span>
                  <span className={`gap-badge${p.gap >= 0 ? ' up' : ' down'}`}>
                    {p.gap >= 0 ? '+' : ''}
                    {p.gap} ({p.gapPct >= 0 ? '+' : ''}
                    {p.gapPct}%)
                  </span>
                </div>
              </div>
            ))}
            <div className="gap-legend">
              <span>
                <i className="sw present" /> Present
              </span>
              <span>
                <i className="sw future" /> Future target
              </span>
              <span>
                <i className="sw gap" /> Gap to close
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Plan cards */}
      <div className="admin-grid-equal">
        {plans.map((p) => (
          <div key={p.id} className="admin-card admin-card-pad plan-card">
            <div className="admin-status-row">
              <span className={`admin-pill ${statusTone(p.status)}`}>{labelize(p.status)}</span>
              <span className="admin-pill neutral">{labelize(p.category)}</span>
            </div>
            <h3 style={{ marginTop: 10, fontSize: '1.25rem' }}>{p.title}</h3>
            <p className="mines-help" style={{ marginBottom: 8 }}>
              {p.metricLabel} · {p.horizon}
            </p>

            <div className="plan-dual">
              <div>
                <span>Present</span>
                <strong>
                  {p.presentValue}
                  <small>{p.unit}</small>
                </strong>
              </div>
              <TrendingUp size={18} color="#B8962E" />
              <div>
                <span>Future</span>
                <strong>
                  {p.futureValue}
                  <small>{p.unit}</small>
                </strong>
              </div>
            </div>

            <div className="plan-progress-wrap">
              <div className="plan-progress-label">
                <span>Present as % of future</span>
                <span>{p.presentShareOfFuture}%</span>
              </div>
              <div className="admin-progress">
                <span style={{ width: `${p.presentShareOfFuture}%` }} />
              </div>
              <p className="mines-help" style={{ marginTop: 8 }}>
                Gap to close: <strong>{p.gap >= 0 ? '+' : ''}{p.gap}</strong> {p.unit} (
                {p.gapPct >= 0 ? '+' : ''}
                {p.gapPct}%)
              </p>
            </div>

            {p.notes ? <p className="mines-help">{p.notes}</p> : null}
            <p className="mines-help">
              Owner: {p.owner}
              {p.linkedMineId
                ? ` · Mine: ${mines.find((m) => m.id === p.linkedMineId)?.name || p.linkedMineId}`
                : ''}
            </p>

            {p.milestones?.length > 0 ? (
              <ul className="plan-ms">
                {p.milestones.map((m) => (
                  <li key={m.id} className={m.done ? 'done' : ''}>
                    {m.done ? '✓' : '○'} {m.label}
                    {m.targetDate ? ` · ${m.targetDate}` : ''}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="admin-actions" style={{ marginTop: 12 }}>
              <button type="button" className="admin-btn-ghost" onClick={() => openEdit(p)}>
                <Pencil size={14} style={{ marginRight: 4 }} />
                Edit
              </button>
              <button
                type="button"
                className="admin-btn-danger"
                disabled={busy}
                onClick={() => remove(p.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {drawer ? (
        <>
          <div className="admin-drawer-backdrop" onClick={() => setDrawer(null)} />
          <div className="admin-drawer">
            <div className="admin-drawer-head">
              <div>
                <p className="admin-eyebrow">
                  {drawer.mode === 'create' ? 'New' : 'Edit'}
                </p>
                <h3>
                  <Target size={18} style={{ display: 'inline', marginRight: 8 }} />
                  CEO future plan
                </h3>
              </div>
              <button type="button" className="admin-icon-btn" onClick={() => setDrawer(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="admin-drawer-body">
              <div className="admin-field">
                <label>Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value as CeoPlanCategory })
                    }
                  >
                    {CEO_PLAN_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {labelize(c)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-field">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value as CeoPlanStatus })
                    }
                  >
                    {CEO_PLAN_STATUSES.map((c) => (
                      <option key={c} value={c}>
                        {labelize(c)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="admin-field">
                <label>Metric label</label>
                <input
                  value={form.metricLabel}
                  onChange={(e) => setForm({ ...form, metricLabel: e.target.value })}
                  placeholder="e.g. Stone vertical revenue"
                />
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Present value</label>
                  <input
                    type="number"
                    value={form.presentValue}
                    onChange={(e) =>
                      setForm({ ...form, presentValue: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="admin-field">
                  <label>Future target</label>
                  <input
                    type="number"
                    value={form.futureValue}
                    onChange={(e) =>
                      setForm({ ...form, futureValue: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Unit</label>
                  <input
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    placeholder="₹ Cr, people, %"
                  />
                </div>
                <div className="admin-field">
                  <label>Horizon</label>
                  <input
                    value={form.horizon}
                    onChange={(e) => setForm({ ...form, horizon: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Owner</label>
                  <input
                    value={form.owner}
                    onChange={(e) => setForm({ ...form, owner: e.target.value })}
                  />
                </div>
                <div className="admin-field">
                  <label>Linked mine</label>
                  <select
                    value={form.linkedMineId}
                    onChange={(e) => setForm({ ...form, linkedMineId: e.target.value })}
                  >
                    <option value="">— None —</option>
                    {mines.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="admin-field">
                <label>Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                />
              </div>
              {form.presentValue !== form.futureValue ? (
                <p className="mines-help">
                  Gap preview:{' '}
                  <strong>
                    {form.futureValue - form.presentValue >= 0 ? '+' : ''}
                    {form.futureValue - form.presentValue} {form.unit}
                  </strong>
                </p>
              ) : null}
            </div>
            <div className="admin-drawer-foot">
              <button type="button" className="admin-btn-ghost" onClick={() => setDrawer(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn-primary"
                disabled={busy || !form.title || !form.metricLabel}
                onClick={save}
              >
                {busy ? 'Saving…' : 'Save plan'}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
