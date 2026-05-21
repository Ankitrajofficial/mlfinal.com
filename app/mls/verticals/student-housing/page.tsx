import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import {
  ENTITIES,
  FOUNDING,
  MLS_SCALE,
  CONTACT,
  LOCATIONS,
} from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'
import PlaceholderImage from '@/components/shared/PlaceholderImage'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Student Housing',
  description:
    'Two girls\' residences (The Princess + Victoria Palace) and three boys\' PG accommodations in Kunhari, Kota — within walking distance of Allen Career Institute. Over 570 beds across the portfolio.',
  path: '/verticals/student-housing',
})

export default function StudentHousingPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                04 · Student Housing
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                A strategic expansion.
                <span className="block italic text-mls-gold mt-2">
                  Into where the students live.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                Every year, lakhs of students come to Kota for the coaching
                examinations. They need somewhere to sleep, somewhere to eat,
                and somewhere their families can reach them. The family runs
                that work as a fixture of the neighbourhood.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="bg-mls-cream py-20 lg:py-28 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-mls-ink/85">
            <RevealOnScroll>
              <p>
                The student housing operation is concentrated in Kunhari, a
                neighbourhood of Kota that sits within {MLS_SCALE.girlsToAllenWalk} of{' '}
                Allen Career Institute. Five residences operate from this
                cluster: two girls&rsquo; campuses — The Princess (since{' '}
                {MLS_SCALE.princessOpened}) and Victoria Palace (since{' '}
                {MLS_SCALE.victoriaOpened}) — and three boys&rsquo; PG
                accommodations.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <p>
                The girls&rsquo; campuses are read separately and at
                length, because the institutional commitment the family
                makes to the families of those students is specific. The
                boys&rsquo; PGs operate as pure residences — room and roof,
                no included food. Many of the boys subscribe to{' '}
                Vyanjanam tiffin delivery, which arrives at their PG at
                meal times.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* GIRLS CAMPUS */}
      <section className="bg-mls-buff/20 py-20 lg:py-32 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  01 · The Girls&rsquo; Campus
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-mls-ink mb-6">
                  Two residences.
                  <span className="block italic text-mls-gold mt-2">
                    {MLS_SCALE.girlsCampusTotal}.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="text-lg leading-relaxed text-mls-ink/85 mb-8 max-w-md">
                  The Princess and Victoria Palace together host over 320
                  female students through the academic year. The girls&rsquo;
                  campus is read at length on its own page — including the
                  family&rsquo;s commitment to the students&rsquo; families.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <Link
                  href="/verticals/student-housing/girls"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-mls-ink text-mls-cream text-sm font-body tracking-wider uppercase hover:bg-mls-tobacco hover:gap-4 transition-all duration-400"
                >
                  Read the girls&rsquo; campus
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'The Princess',
                  meta: `Since ${MLS_SCALE.princessOpened} · ${MLS_SCALE.girlsCampusTotal === 'Over 320 beds' ? 'Over 200 beds' : ''}`,
                  variant: 'mls-tobacco' as const,
                  label: 'PRINCESS · KUNHARI',
                },
                {
                  title: 'Victoria Palace',
                  meta: `Since ${MLS_SCALE.victoriaOpened} · Over 120 beds`,
                  variant: 'documentary' as const,
                  label: 'VICTORIA · KUNHARI',
                },
              ].map((card, i) => (
                <RevealOnScroll key={card.title} delay={i * 100}>
                  <PlaceholderImage
                    label={card.label}
                    title={card.title}
                    aspectRatio="aspect-[3/4]"
                    variant={card.variant}
                  />
                  <div className="mt-3 px-1">
                    <p className="font-display text-xl text-mls-ink mb-1">
                      {card.title}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate">
                      {card.meta}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOYS PGs */}
      <section className="bg-mls-cream py-20 lg:py-32 border-b border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  02 · The Boys&rsquo; Residences
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] text-mls-ink mb-6">
                  Three PGs.
                  <span className="block italic text-mls-gold mt-2">
                    {MLS_SCALE.boysTotal}.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <div className="space-y-5 text-lg leading-relaxed text-mls-ink/85 max-w-md">
                  <p>
                    {ENTITIES.boysPGs.join(' · ')}.
                  </p>
                  <p>
                    All three operate as pure residences — room, bathroom,
                    laundry, common areas. No food is included by default.
                    Many residents subscribe to Vyanjanam Tiffin Delivery,
                    which brings lunch and dinner to the PG at meal times.
                  </p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <div className="mt-8 p-6 bg-mls-buff/30 border border-mls-ink/10">
                  <p className="font-mono text-[10px] uppercase tracking-marker text-mls-gold mb-2">
                    Direct line to the campus
                  </p>
                  <p className="font-display text-lg text-mls-ink">
                    {CONTACT.boysCampusPresentation}
                  </p>
                </div>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <PlaceholderImage
                  label="BOYS' RESIDENCES · KUNHARI"
                  title="The walk to the door."
                  spec="1600 × 1067px · Exterior or street-side documentary"
                  swapPath="/img/boys-pgs.jpg"
                  aspectRatio="aspect-[3/2]"
                  variant="mls-cream"
                />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* WALKING DISTANCE TO ALLEN */}
      <section className="bg-mls-tobacco text-mls-cream py-20 lg:py-28">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                Walking distance
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.1] mb-6">
                {MLS_SCALE.girlsToAllenWalk}
                <span className="block italic text-mls-gold mt-2">
                  to Allen Career Institute.
                </span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="text-lg leading-relaxed text-mls-cream/85">
                The residences sit deliberately within walking distance of
                the Allen Career Institute campus. The students walk to
                class and back, with the residences and the kitchen
                operating around that rhythm.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-mls-cream py-16 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate text-center">
            {ENTITIES.footerSignature.toUpperCase()} · KUNHARI, KOTA · {FOUNDING.yearsEvergreen.toUpperCase()}
          </p>
        </div>
      </section>
    </>
  )
}
