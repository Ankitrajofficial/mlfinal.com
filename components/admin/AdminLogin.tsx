'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  User,
  Building2,
  Globe2,
  Layers,
  Sparkles,
  AlertCircle,
} from 'lucide-react'
import { ENTITIES, FOUNDING, MLS_SCALE, KHADANE_SCALE } from '@/lib/facts'
import { MLS_ASSETS } from '@/lib/site-mls'

type Session = { name: string; role: string; initials: string }

const VERTICAL_PILLS = [
  'Stone & Export',
  'Automotive & Fuel',
  'Hospitality',
  'Student Housing',
  'Food Services',
] as const

const STATS = [
  { label: 'Since', value: String(FOUNDING.groupYear) },
  { label: 'Verticals', value: MLS_SCALE.verticalsDisplay },
  { label: 'Workforce', value: MLS_SCALE.groupWorkforce },
  { label: 'Markets', value: KHADANE_SCALE.countries.replace(' countries', '') },
] as const

export default function AdminLogin({
  onSuccess,
}: {
  onSuccess: (session: Session, usingDefaultPassword: boolean) => void
}) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [clock, setClock] = useState('')
  const [focused, setFocused] = useState<'name' | 'pass' | null>(null)

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat('en-IN', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
        }).format(new Date())
      )
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!password.trim()) {
      setError('Enter your admin password to continue.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Admin',
          password,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials')
      }
      onSuccess(data.session, Boolean(data.usingDefaultPassword))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      {/* Ambient layers */}
      <div className="admin-login-ambient" aria-hidden>
        <div className="admin-login-orb admin-login-orb-a" />
        <div className="admin-login-orb admin-login-orb-b" />
        <div className="admin-login-grid" />
      </div>

      <div className="admin-login-shell">
        {/* ── Brand panel ── */}
        <aside className="admin-login-brand">
          <div className="admin-login-brand-top">
            <div className="admin-login-logo-row">
              <div className="admin-login-mark">
                <Image
                  src={MLS_ASSETS.mark.onDark}
                  alt={ENTITIES.group.acronym}
                  width={40}
                  height={40}
                  priority
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <p className="admin-login-brand-name">{ENTITIES.group.name}</p>
                <p className="admin-login-brand-tag">A Dhakar family enterprise</p>
              </div>
            </div>

            <div className="admin-login-secure-chip">
              <ShieldCheck size={13} />
              Secure operations access
            </div>
          </div>

          <div className="admin-login-brand-hero">
            <p className="admin-login-kicker">
              <Sparkles size={12} />
              Command centre
            </p>
            <h1>
              One desk for
              <br />
              <em>five verticals</em>
            </h1>
            <p className="admin-login-lead">
              Run enquiries, shipments, sites, and day-to-day group operations from a single
              authenticated console — {FOUNDING.yearsEvergreen}.
            </p>

            <div className="admin-login-pills">
              {VERTICAL_PILLS.map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
          </div>

          <div className="admin-login-stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="admin-login-brand-foot">
            <div className="admin-login-meta-row">
              <Globe2 size={13} />
              <span>Bijolia · Kota · Mundra corridor</span>
            </div>
            <div className="admin-login-meta-row">
              <Building2 size={13} />
              <span>{clock || 'Asia/Kolkata'}</span>
            </div>
          </div>
        </aside>

        {/* ── Form panel ── */}
        <section className="admin-login-panel">
          <div className="admin-login-panel-inner">
            <div className="admin-login-mobile-brand">
              <div className="admin-login-mark admin-login-mark-light">
                <Image
                  src={MLS_ASSETS.mark.onLight}
                  alt={ENTITIES.group.acronym}
                  width={32}
                  height={32}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <p className="admin-login-mobile-title">{ENTITIES.group.acronym} Operations</p>
                <p className="admin-login-mobile-sub">Command centre</p>
              </div>
            </div>

            <header className="admin-login-form-head">
              <p className="admin-login-form-eyebrow">Operator sign-in</p>
              <h2>Welcome back</h2>
              <p className="admin-login-form-sub">
                Authenticate to manage the full group pipeline — CRM, logistics, tasks, and sites.
              </p>
            </header>

            <form className="admin-login-form" onSubmit={submit} noValidate>
              {error ? (
                <div className="admin-login-error" role="alert">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              ) : null}

              <div className={`admin-login-field${focused === 'name' ? ' is-focused' : ''}`}>
                <label htmlFor="admin-name">Display name</label>
                <div className="admin-login-input-wrap">
                  <User size={16} className="admin-login-input-icon" aria-hidden />
                  <input
                    id="admin-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    autoComplete="name"
                    placeholder="e.g. Rahul Dhakar"
                    disabled={loading}
                  />
                </div>
                <p className="admin-login-field-hint">Shown on the activity audit trail</p>
              </div>

              <div className={`admin-login-field${focused === 'pass' ? ' is-focused' : ''}`}>
                <label htmlFor="admin-pass">Admin password</label>
                <div className="admin-login-input-wrap">
                  <Lock size={16} className="admin-login-input-icon" aria-hidden />
                  <input
                    id="admin-pass"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused('pass')}
                    onBlur={() => setFocused(null)}
                    autoComplete="current-password"
                    placeholder="Enter secure password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="admin-login-eye"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="admin-login-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="admin-login-spinner" aria-hidden />
                    Verifying access…
                  </>
                ) : (
                  <>
                    Enter command centre
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="admin-login-features">
              <div>
                <Layers size={15} />
                <div>
                  <strong>Multi-vertical control</strong>
                  <span>Stone, auto, hotel, housing, food</span>
                </div>
              </div>
              <div>
                <ShieldCheck size={15} />
                <div>
                  <strong>Session protected</strong>
                  <span>HTTP-only cookie · 12-hour TTL</span>
                </div>
              </div>
            </div>

            <div className="admin-login-dev-note">
              <p>
                <strong>Local default:</strong> <code>mls-admin-2026</code>
              </p>
              <p>
                Production: set <code>ADMIN_PASSWORD</code> in environment.
              </p>
            </div>

            <footer className="admin-login-footer">
              <Link href="/mls">← Back to public site</Link>
              <span>
                © {FOUNDING.groupYear}–{new Date().getFullYear()} {ENTITIES.group.name}
              </span>
            </footer>
          </div>
        </section>
      </div>
    </div>
  )
}
