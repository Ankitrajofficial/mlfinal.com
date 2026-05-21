'use client'

import { MLS_SCALE, FOUNDING } from '@/lib/facts'

/**
 * Scrolling stat strip — used on MLS homepage Section 02 and similar.
 * Loops continuously; CSS marquee animation defined in tailwind.config.ts.
 * Pauses on hover so readers can take in any particular stat.
 */
interface Stat {
  value: string
  label: string
}

const DEFAULT_STATS: Stat[] = [
  { value: MLS_SCALE.verticalsDisplay, label: 'Verticals' },
  { value: MLS_SCALE.generations, label: 'Generations' },
  { value: MLS_SCALE.familyMembers, label: 'Family members' },
  { value: MLS_SCALE.groupWorkforce, label: 'Across the group' },
  { value: FOUNDING.yearsEvergreen, label: 'Working from Bijolia' },
  { value: MLS_SCALE.indirectExportYears, label: 'Of indirect exports' },
  { value: MLS_SCALE.vyanjanamDailyMeals, label: 'Daily meals' },
  { value: MLS_SCALE.studentHousingTotal, label: 'Student beds' },
]

export default function StatMarquee({
  stats = DEFAULT_STATS,
  className = '',
}: {
  stats?: Stat[]
  className?: string
}) {
  // Duplicate for seamless loop
  const looped = [...stats, ...stats]

  return (
    <div
      className={`relative overflow-hidden bg-mls-tobacco text-mls-cream py-8 ${className}`}
      role="region"
      aria-label="Group at a glance"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-mls-tobacco to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-mls-tobacco to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
        {looped.map((stat, i) => (
          <div
            key={`${stat.label}-${i}`}
            className="inline-flex items-baseline gap-4 px-10 border-r border-mls-cream/15 last:border-r-0"
          >
            <span className="font-display text-2xl lg:text-3xl text-mls-gold">
              {stat.value}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-marker text-mls-cream/70">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
