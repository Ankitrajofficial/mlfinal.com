import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Layers, MapPin, Mountain, Users, Wallet } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import {
  getMinesPortfolio,
  minePortfolioStats,
} from '@/lib/khadane/mines-portfolio'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'

export const dynamic = 'force-dynamic'

export const metadata = buildMetadata({
  site: 'khadane',
  title: 'Mines portfolio',
  description:
    'KHADANE™ mines portfolio — stone types, samples, workforce and quarry faces across the Rajasthan belt. Bijolia base and allied holdings.',
  path: '/mines',
})

function statusLabel(s: string) {
  return s.replace(/_/g, ' ')
}

export default async function MinesPortfolioPage() {
  const mines = await getMinesPortfolio({ publicOnly: true })
  const stats = minePortfolioStats(mines)

  return (
    <div className="bg-warm-white text-obsidian">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-obsidian/10 bg-obsidian text-stone-linen">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/img/gallery/quarry/working-face-dawn.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/50" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-quarry-gold">
            Mines portfolio
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
            Faces we work. Stones we hold.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-linen/80 md:text-lg">
            A working portfolio of quarry faces and staging yards behind KHADANE™ —
            stone types, physical samples, workforce, and portfolio revenue metrics
            for each holding.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Holdings', value: String(stats.total) },
              { label: 'Active faces', value: String(stats.active) },
              { label: 'Stone types', value: String(stats.stoneTypes) },
              { label: 'Samples logged', value: String(stats.samples) },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <p className="font-display text-2xl text-quarry-gold">{s.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-stone-linen/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        <RevealOnScroll>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-quarry-gold">
                Portfolio
              </p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">All mines</h2>
            </div>
            <Link
              href="/quarry"
              className="inline-flex items-center gap-2 text-sm text-obsidian/70 transition hover:text-quarry-gold"
            >
              The Quarry story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid gap-8 md:grid-cols-2">
          {mines.map((mine, i) => (
            <RevealOnScroll key={mine.id} delay={i * 40}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-obsidian/10 bg-white shadow-sm transition hover:border-quarry-gold/40 hover:shadow-md">
                <div className="relative aspect-[16/10] overflow-hidden bg-obsidian/5">
                  {mine.primaryImage ? (
                    <Image
                      src={mine.primaryImage}
                      alt={mine.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Mountain className="h-12 w-12 text-obsidian/20" />
                    </div>
                  )}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-obsidian/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-stone-linen">
                      {statusLabel(mine.status)}
                    </span>
                    <span className="rounded-full bg-quarry-gold/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-obsidian">
                      {statusLabel(mine.ownership)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-quarry-gold">
                    {mine.code}
                  </p>
                  <h3 className="mt-1 font-display text-2xl tracking-tight">{mine.name}</h3>
                  {mine.tagline ? (
                    <p className="mt-2 text-sm leading-relaxed text-obsidian/65">{mine.tagline}</p>
                  ) : null}

                  <div className="mt-4 flex items-start gap-2 text-xs text-obsidian/55">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-quarry-gold" />
                    <span>
                      {[mine.nearestTown, mine.district, mine.state].filter(Boolean).join(' · ')}
                    </span>
                  </div>

                  {/* Stone types */}
                  <div className="mt-5">
                    <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-obsidian/45">
                      <Layers className="h-3 w-3" /> Stone types
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {mine.stoneTypes.slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-obsidian/10 bg-warm-white px-2 py-0.5 text-xs text-obsidian/80"
                        >
                          {t}
                        </span>
                      ))}
                      {mine.stoneTypes.length > 6 ? (
                        <span className="text-xs text-obsidian/45">
                          +{mine.stoneTypes.length - 6}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* KPI strip */}
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-obsidian/8 pt-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-obsidian/40">
                        Workforce
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-obsidian">
                        {mine.workforce || mine.headcount || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-obsidian/40">
                        Samples
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-obsidian">
                        {mine.samples?.length ?? 0}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-obsidian/40">
                        Revenue
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-obsidian">
                        {mine.showRevenuePublic && mine.revenue ? mine.revenue : 'On request'}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/mines/${mine.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-obsidian transition group-hover:text-quarry-gold"
                  >
                    View mine portfolio
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <p className="mt-12 text-center text-xs leading-relaxed text-obsidian/45">
          Revenue figures on this portfolio are illustrative operating metrics for management
          presentation unless otherwise contracted. For trade enquiries, write to the desk.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/desk"
            className="inline-flex items-center gap-2 rounded-full bg-obsidian px-6 py-3 text-sm font-medium text-stone-linen transition hover:bg-tobacco"
          >
            <Wallet className="h-4 w-4" />
            The Desk
          </Link>
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 rounded-full border border-obsidian/15 px-6 py-3 text-sm font-medium text-obsidian transition hover:border-quarry-gold"
          >
            <Users className="h-4 w-4" />
            Collection
          </Link>
        </div>
      </section>
    </div>
  )
}
