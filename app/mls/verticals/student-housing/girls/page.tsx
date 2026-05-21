import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import {
  ENTITIES,
  FOUNDING,
  MLS_SCALE,
  CONTACT,
  SIGNATURE_LINES,
} from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'
import PlaceholderImage from '@/components/shared/PlaceholderImage'
import DivineDarkSection from '@/components/mls/DivineDarkSection'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'The Girls\' Campus — The Princess + Victoria Palace',
  description:
    'The Princess (since 2018, over 200 beds) and Victoria Palace (since 2023, over 120 beds) — the family\'s two residences for female students in Kunhari, Kota. Operated as one campus, with Divine Dining as the in-house kitchen.',
  path: '/verticals/student-housing/girls',
})

/**
 * Girls' campus DEPTH page.
 *
 * Carries the locked signatures:
 *   - "A daughter under our roof is treated as one of the family's own" (Section 06)
 *   - "— The Dhakar Family" sign-off (the ONLY page that uses this)
 *   - The Divine Dining brand mention (named-only treatment per FACTS Section 12)
 */
export default function GirlsCampusPage() {
  return (
    <>
      {/* SECTION 01 — HERO */}
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                The Girls&rsquo; Campus · Kunhari
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                The Princess.
                <span className="block italic text-mls-gold mt-2">
                  Victoria Palace.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                Two residences. {MLS_SCALE.girlsCampusTotal}. One campus, run
                by the family at hand.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* SECTION 02 — THE TWO RESIDENCES */}
      <section className="bg-mls-cream py-20 lg:py-28 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-12">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
                02 · The two houses
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-mls-ink tracking-tight">
                Read in order.
              </h2>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-mls-ink/10">
            {[
              {
                title: 'The Princess',
                year: MLS_SCALE.princessOpened,
                beds: 'Over 200 beds',
                body: "The older of the two campuses. Established in 2018. Carries the institutional knowledge that the family built up across the first six years of student housing.",
                variant: 'mls-tobacco' as const,
                label: 'PRINCESS · DOCUMENTARY',
              },
              {
                title: 'Victoria Palace',
                year: MLS_SCALE.victoriaOpened,
                beds: 'Over 120 beds',
                body: 'The newer campus. Opened in 2023. Built with the lessons of the first five years of Princess operation already in place.',
                variant: 'documentary' as const,
                label: 'VICTORIA · DOCUMENTARY',
              },
            ].map((house, i) => (
              <RevealOnScroll key={house.title} delay={i * 100}>
                <div className="bg-mls-cream p-8 lg:p-10 h-full">
                  <PlaceholderImage
                    label={house.label}
                    title={house.title}
                    aspectRatio="aspect-[3/2]"
                    variant={house.variant}
                  />
                  <div className="mt-6 flex items-baseline justify-between mb-4">
                    <h3 className="font-display text-3xl text-mls-ink">
                      {house.title}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate">
                      Since {house.year}
                    </p>
                  </div>
                  <p className="font-display italic text-lg text-mls-gold mb-4">
                    {house.beds}
                  </p>
                  <p className="text-base leading-relaxed text-mls-ink/80">
                    {house.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03 — WHAT THE DAY LOOKS LIKE */}
      <section className="bg-mls-buff/20 py-20 lg:py-28 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-mls-ink/85">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5 not-italic">
                  03 · The day
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <p>
                  Mornings start in the kitchen. Divine Dining — the
                  family&rsquo;s in-house residence kitchen — serves
                  breakfast in the dining area before the students leave
                  for class. The walk to Allen Career Institute is{' '}
                  {MLS_SCALE.girlsToAllenWalk}.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p>
                  Through the day, the residences operate quietly. Common
                  areas, study spaces, laundry, library hours. The kitchen
                  serves lunch when students return between sessions. The
                  evening meal is followed by the residence settling down
                  for night-study hours.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <p>
                  Visitor hours for parents are {CONTACT.girlsCampusVisitingHours}.
                  Outside those hours, the residence is closed to visitors,
                  with security maintained at the gate.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5">
              <RevealOnScroll delay={150}>
                <PlaceholderImage
                  label="CAMPUS · DOCUMENTARY"
                  title="The dining area, morning."
                  spec="1200 × 1500px · Documentary residence interior, no flash"
                  swapPath="/img/girls-campus-day.jpg"
                  aspectRatio="aspect-[4/5]"
                  variant="mls-cream"
                />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — DIVINE DINING (named-only treatment) */}
      <DivineDarkSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                04 · The kitchen
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.02] mb-8">
                Divine Dining.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="font-display italic text-xl md:text-2xl text-mls-cream/90 max-w-xl leading-snug mb-8">
                The family&rsquo;s in-house residence kitchen, serving the
                two girls&rsquo; campuses.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
              <div className="space-y-5 text-lg leading-relaxed text-mls-cream/85 max-w-xl">
                <p>
                  Divine Dining draws on the same sourcing chain that the
                  family&rsquo;s public-facing kitchen, Vyanjanam, uses —
                  Bijolia farm and dairy in the morning, trusted vendors
                  otherwise. The dairy on a student&rsquo;s tray came from
                  the family house. So did the buttermilk —{' '}
                  {MLS_SCALE.dairyChain.split('Vyanjanam')[0]}Vyanjanam and
                  Divine Dining alike.
                </p>
                <p>
                  Three meals a day, six days a week. Pure vegetarian.
                  Sourced from the same chain the family eats from.
                </p>
              </div>
            </RevealOnScroll>
          </div>
          <div className="lg:col-span-5 flex items-center">
            <RevealOnScroll delay={200}>
              <PlaceholderImage
                label="DIVINE DINING · IN-HOUSE"
                title="The morning serve."
                spec="1200 × 1500px · Kitchen documentary, available light"
                swapPath="/img/divine-dining-kitchen.jpg"
                aspectRatio="aspect-[4/5]"
                variant="vyanjanam-dark"
              />
            </RevealOnScroll>
          </div>
        </div>
      </DivineDarkSection>

      {/* SECTION 05 — VOICE OF STUDENTS (locked empty state) */}
      <section className="bg-mls-cream py-20 lg:py-28">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                05 · The voice of students
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-mls-ink mb-6">
                Testimonies from current students
                <span className="block italic text-mls-gold mt-2">
                  will be added as the work continues.
                </span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="text-lg leading-relaxed text-mls-ink/85 max-w-2xl">
                Until then, this section reads honestly about the state of
                the archive. The institutional voice of the residence
                doesn&rsquo;t need to be spoken for the students — we wait
                for them to speak in their own time.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* SECTION 06 — THE COMMITMENT
          ⚠️ This section carries:
          - The locked "daughter under our roof" signature
          - The rare "— The Dhakar Family" sign-off (ONLY here on the entire site)
       */}
      <section className="bg-mls-ink text-mls-cream py-24 lg:py-40">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-8">
                06 · The commitment
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <p className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-10">
                {SIGNATURE_LINES.daughtersUnderOurRoof}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <div className="space-y-5 text-lg leading-relaxed text-mls-cream/85 max-w-3xl">
                <p>
                  We mean this in the most institutional sense the family
                  can offer. The students who live with us through the
                  coaching years are not transient guests of a hostel. They
                  are read as members of the household, with the same
                  expectations of safety, of dignity, and of the daily
                  attention the family pays to its own.
                </p>
                <p>
                  Their families can reach us by phone at any reasonable
                  hour. The visiting window is open every day. The
                  kitchen, the security, the housekeeping, and the
                  pastoral arrangements are run by the family directly.
                  There is no contracted operator between the residents
                  and the family that owns the operation.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <div className="mt-16 pt-10 border-t border-mls-cream/20 flex items-center gap-4">
                <div className="h-px w-24 bg-mls-gold" aria-hidden />
                <p className="font-display italic text-2xl text-mls-gold">
                  {SIGNATURE_LINES.familySignatureOnly}
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* SECTION 07 — CONTACT */}
      <section className="bg-mls-tobacco text-mls-cream py-24 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  07 · Reach the campus
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
                  The campus is reached
                  <span className="block italic text-mls-gold mt-2">
                    on one direct line.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="text-lg leading-relaxed text-mls-cream/85 max-w-xl">
                  For parents enquiring about admission, for current
                  parents reaching their child, for school counsellors —
                  the same line connects to the campus directly. Visiting
                  hours are {CONTACT.girlsCampusVisitingHours}.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-mls-cream/15">
              <RevealOnScroll delay={150}>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-cream/60 mb-2">
                      Campus line
                    </p>
                    <a
                      href={`tel:${CONTACT.girlsCampus.replace(/\s/g, '')}`}
                      className="font-display text-xl text-mls-cream hover:text-mls-gold transition-colors"
                    >
                      {CONTACT.girlsCampus}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-cream/60 mb-2">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT.officeMLS}?subject=Girls%27%20Campus%20%E2%80%94%20Enquiry`}
                      className="font-display text-xl text-mls-cream hover:text-mls-gold transition-colors break-all"
                    >
                      {CONTACT.officeMLS}
                    </a>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-mls-gold text-mls-gold text-sm font-body tracking-wider uppercase hover:bg-mls-gold hover:text-mls-tobacco transition-all duration-400"
                    >
                      Open the contact page
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
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
