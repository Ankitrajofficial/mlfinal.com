import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  HardHat,
  Layers,
  MapPin,
  Mountain,
  Package,
  Shield,
  Truck,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import {
  getMineBySlug,
  getMinesPortfolio,
} from '@/lib/khadane/mines-portfolio'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const mine = await getMineBySlug(slug)
  if (!mine) {
    return { title: 'Mine not found' }
  }
  return buildMetadata({
    site: 'khadane',
    title: mine.name,
    description:
      mine.tagline ||
      mine.description ||
      `${mine.name} — stone types, samples, workforce and portfolio metrics.`,
    path: `/mines/${mine.slug}`,
  })
}

export async function generateStaticParams() {
  const mines = await getMinesPortfolio({ publicOnly: true })
  return mines.map((m) => ({ slug: m.slug }))
}

function statusLabel(s: string) {
  return s.replace(/_/g, ' ')
}

export default async function MineDetailPage({ params }: Props) {
  const { slug } = await params
  const mine = await getMineBySlug(slug)
  if (!mine) notFound()

  const all = await getMinesPortfolio({ publicOnly: true })
  const others = all.filter((m) => m.id !== mine.id).slice(0, 3)

  return (
    <div className="bg-warm-white text-obsidian">
      {/* Hero */}
      <section className="relative border-b border-obsidian/10">
        <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden bg-obsidian">
          {mine.primaryImage ? (
            <Image
              src={mine.primaryImage}
              alt={mine.name}
              fill
              className="object-cover opacity-80"
              priority
              sizes="100vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-6 pb-10 lg:px-8">
            <Link
              href="/mines"
              className="mb-4 inline-flex items-center gap-2 text-xs text-stone-linen/70 transition hover:text-quarry-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All mines
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-quarry-gold">
              {mine.code} · {statusLabel(mine.status)} · {statusLabel(mine.ownership)}
            </p>
            <h1 className="mt-2 font-display text-4xl text-stone-linen md:text-5xl">
              {mine.name}
            </h1>
            {mine.tagline ? (
              <p className="mt-3 max-w-2xl text-base text-stone-linen/80">{mine.tagline}</p>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-12 lg:px-8 lg:py-20">
        {/* Main */}
        <div className="lg:col-span-8">
          {mine.description ? (
            <div className="prose prose-neutral max-w-none">
              <h2 className="font-display text-2xl font-medium">About this holding</h2>
              <p className="mt-3 text-base leading-relaxed text-obsidian/75">{mine.description}</p>
            </div>
          ) : null}

          {/* Stone types */}
          <section className="mt-12">
            <h2 className="flex items-center gap-2 font-display text-2xl font-medium">
              <Layers className="h-5 w-5 text-quarry-gold" />
              Stone types
            </h2>
            <p className="mt-2 text-sm text-obsidian/55">
              Varieties extracted, staged, or allied at this face.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {mine.stoneTypes.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-obsidian/10 bg-white px-4 py-2 text-sm font-medium text-obsidian shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Samples */}
          <section className="mt-14">
            <h2 className="flex items-center gap-2 font-display text-2xl font-medium">
              <Package className="h-5 w-5 text-quarry-gold" />
              Samples
            </h2>
            <p className="mt-2 text-sm text-obsidian/55">
              Physical / catalogue samples associated with this mine.
            </p>
            {mine.samples.length === 0 ? (
              <p className="mt-6 text-sm text-obsidian/50">No samples logged yet.</p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {mine.samples.map((s) => (
                  <div
                    key={s.id}
                    className="overflow-hidden rounded-xl border border-obsidian/10 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3] bg-obsidian/5">
                      {s.imageUrl ? (
                        <Image
                          src={s.imageUrl}
                          alt={s.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 40vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Mountain className="h-10 w-10 text-obsidian/15" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-quarry-gold">
                        {s.stoneType}
                      </p>
                      <h3 className="mt-1 font-display text-lg">{s.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-obsidian/55">
                        {s.finish ? <span>Finish: {s.finish}</span> : null}
                        {s.size ? <span>Size: {s.size}</span> : null}
                      </div>
                      {s.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-obsidian/70">
                          {s.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Ops notes */}
          {(mine.equipment || mine.safetyNotes || mine.accessNotes) && (
            <section className="mt-14 space-y-6">
              <h2 className="font-display text-2xl font-medium">Operations</h2>
              {mine.equipment ? (
                <div className="flex gap-3">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-quarry-gold" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-obsidian/45">
                      Equipment
                    </p>
                    <p className="mt-1 text-sm text-obsidian/80">{mine.equipment}</p>
                  </div>
                </div>
              ) : null}
              {mine.accessNotes ? (
                <div className="flex gap-3">
                  <Truck className="mt-0.5 h-4 w-4 shrink-0 text-quarry-gold" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-obsidian/45">
                      Access
                    </p>
                    <p className="mt-1 text-sm text-obsidian/80">{mine.accessNotes}</p>
                  </div>
                </div>
              ) : null}
              {mine.safetyNotes ? (
                <div className="flex gap-3">
                  <HardHat className="mt-0.5 h-4 w-4 shrink-0 text-quarry-gold" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-obsidian/45">
                      Safety
                    </p>
                    <p className="mt-1 text-sm text-obsidian/80">{mine.safetyNotes}</p>
                  </div>
                </div>
              ) : null}
              {mine.certifications ? (
                <div className="flex gap-3">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-quarry-gold" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-obsidian/45">
                      Compliance
                    </p>
                    <p className="mt-1 text-sm text-obsidian/80">{mine.certifications}</p>
                  </div>
                </div>
              ) : null}
            </section>
          )}
        </div>

        {/* Sidebar KPIs */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-4 rounded-2xl border border-obsidian/10 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl">Portfolio metrics</h2>

            <Metric
              icon={<Users className="h-4 w-4" />}
              label="Workforce"
              value={mine.workforce || mine.headcount || '—'}
            />
            <Metric
              icon={<Wallet className="h-4 w-4" />}
              label="Revenue"
              value={
                mine.showRevenuePublic && mine.revenue
                  ? mine.revenue
                  : 'Available on request'
              }
              sub={mine.revenuePeriod || undefined}
            />
            <Metric
              icon={<Package className="h-4 w-4" />}
              label="Samples"
              value={String(mine.samples.length)}
            />
            <Metric
              icon={<Mountain className="h-4 w-4" />}
              label="Capacity / output"
              value={mine.capacity || '—'}
              sub={mine.annualOutput || undefined}
            />
            <Metric
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value={[mine.district, mine.state].filter(Boolean).join(', ') || '—'}
              sub={
                mine.lat && mine.lng
                  ? `${mine.lat.toFixed(4)}°N, ${mine.lng.toFixed(4)}°E`
                  : mine.nearestTown || undefined
              }
            />
            {mine.yearOpened ? (
              <Metric
                icon={<HardHat className="h-4 w-4" />}
                label="Established"
                value={mine.yearOpened}
              />
            ) : null}
            {mine.areaHa ? (
              <Metric label="Area" value={mine.areaHa} />
            ) : null}
            {mine.roadCondition ? (
              <Metric label="Road condition" value={mine.roadCondition} />
            ) : null}

            <div className="border-t border-obsidian/8 pt-4">
              <Link
                href="/desk"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-obsidian py-3 text-sm font-medium text-stone-linen transition hover:bg-tobacco"
              >
                Enquire on this face
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-obsidian/45">
                Illustrative portfolio metrics for management display. Trade terms via The Desk.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Other mines */}
      {others.length > 0 ? (
        <section className="border-t border-obsidian/10 bg-white/50 py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="font-display text-2xl">More in the portfolio</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {others.map((m) => (
                <Link
                  key={m.id}
                  href={`/mines/${m.slug}`}
                  className="rounded-xl border border-obsidian/10 bg-warm-white p-5 transition hover:border-quarry-gold/40"
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider text-quarry-gold">
                    {m.code}
                  </p>
                  <p className="mt-1 font-display text-lg">{m.name}</p>
                  <p className="mt-2 text-xs text-obsidian/55">
                    {m.stoneTypes.slice(0, 3).join(' · ')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function Metric({
  icon,
  label,
  value,
  sub,
}: {
  icon?: React.ReactNode
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex gap-3 border-b border-obsidian/6 pb-3 last:border-0 last:pb-0">
      {icon ? <span className="mt-0.5 text-quarry-gold">{icon}</span> : null}
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-wider text-obsidian/40">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-obsidian">{value}</p>
        {sub ? <p className="mt-0.5 text-xs text-obsidian/50">{sub}</p> : null}
      </div>
    </div>
  )
}
