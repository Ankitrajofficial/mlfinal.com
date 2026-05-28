import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import {
  ENTITIES,
  FOUNDING,
  MLS_SCALE,
  KHADANE_SCALE,
  VERTICALS,
  CONTACT,
  LOCATIONS,
  CROSS_LINKS,
  INSTITUTIONAL_PARTNER,
  SIGNATURE_LINES,
} from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'
import PlaceholderImage from '@/components/shared/PlaceholderImage'
import VerticalCard from '@/components/mls/VerticalCard'
import StatMarquee from '@/components/mls/StatMarquee'
import SectionHeader from '@/components/mls/SectionHeader'
import VyanjanamSection from '@/components/mls/VyanjanamSection'
import { MLS_HERO_VIDEO } from '@/lib/site-mls'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'A working group, since 1972',
  description:
    'Mohan Lal & Sons (MLS) — five verticals operated by the Dhakar family from Bijolia, Rajasthan, since 1972. Stone & Export (KHADANE™), Automotive & Fuel, Hospitality, Student Housing, Food Services.',
  path: '/',
})

const HOMEPAGE_VERTICAL_DETAILS: Record<string, string> = {
  hospitality:
    'M3 Boutique Hotel and M3 Mini Mall extend the group into Kota hospitality, serving families who arrive around education, travel, and local business.',
}

const HOMEPAGE_VERTICAL_FACTS: Record<string, Array<{ label: string; value: string }>> = {
  hospitality: [
    {
      label: 'Hotel',
      value:
        'Opened in Kunhari in 2016, near the group student residences, for parents and guests visiting Kota.',
    },
    {
      label: 'Neighbourhood',
      value:
        'M3 Mini Mall sits adjacent to the hotel with daily-use retail for residents, families, and visitors.',
    },
    {
      label: 'Operations',
      value:
        'Kitchen, housekeeping, reception, and guest enquiries are handled directly by the family operation.',
    },
  ],
}

/**
 * MLS Homepage — 13 institutional sections, locked per architectural brief.
 *
 * The voice is restrained, present-perfect tense, family-as-narrator where appropriate.
 * No marketing flourish. No generational hyperbole. Operational truth, surfaced cleanly.
 */
export default function MLSHomePage() {
  return (
    <>
      {/* ============================================================
          SECTION 01 — HERO
          ============================================================ */}
      <section
        data-mls-hero
        className="relative -mt-20 lg:-mt-24 min-h-[calc(100svh-6.25rem)] bg-mls-ink overflow-hidden flex items-end"
      >
        <Image
          src="/img/mls-home-hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
          style={{ objectPosition: '50% 58%' }}
          aria-hidden="true"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '50% 58%' }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/img/mls-home-hero-poster.jpg"
          aria-hidden="true"
        >
          <source src={MLS_HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-mls-ink via-mls-ink/58 to-mls-ink/28" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-mls-ink/70 to-transparent" />

        <div className="relative z-10 mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem] pt-20 lg:pt-28 pb-20 lg:pb-32 w-full">
          <div className="max-w-5xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                #{ENTITIES.group.acronym} · {FOUNDING.yearsEvergreen} · Bijolia, Rajasthan
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[8.5rem] tracking-tighter leading-[1.02] text-mls-cream mb-8">
                A working group.
                <span className="block italic text-mls-gold mt-2">
                  Since 1972.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-cream max-w-2xl leading-snug mb-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                Five verticals. One family. Operated by hand, from Bijolia, Rajasthan.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/our-legacy"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-mls-cream text-mls-ink text-sm font-body tracking-wider uppercase hover:bg-mls-gold hover:gap-4 transition-all duration-400 ease-editorial"
                >
                  Read the legacy
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/khadane"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-mls-cream/45 text-mls-cream text-sm font-body tracking-wider uppercase hover:bg-mls-cream hover:text-mls-ink hover:gap-4 transition-all duration-400 ease-editorial"
                >
                  Visit KHADANE™
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 02 — STAT MARQUEE
          ============================================================ */}
      <StatMarquee />

      {/* ============================================================
          SECTION 03 — THE OPENING PARAGRAPH
          Institutional introduction. Restrained voice. One paragraph.
          ============================================================ */}
      <section className="bg-mls-cream py-24 lg:py-40">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <SectionHeader
            number="03"
            eyebrow="The Group"
            heading="The work began with stone."
            subLine="The rest came from the same hands."
            layout="split"
            body={
              <>
                <p>
                  Mohan Lal &amp; Sons is the operating name under which the
                  Dhakar family has worked, in and around the Bijolia
                  sandstone belt of Rajasthan, since 1972. The first
                  generation worked stone, and the family home was built
                  from it. The work since has stayed close to that founding
                  shape — extraction, transport, hospitality, housing,
                  food. None of it spun off into separate companies. Every
                  vertical has been carried by the same family.
                </p>
                <p>
                  The group operates five verticals today. The largest is
                  still stone and its export, run as KHADANE™. The other
                  four were taken on, in turn, where an obligation or an
                  operational need landed in front of the family and we
                  could meet it with our own hands.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* ============================================================
          SECTION 04 — THE FIVE VERTICALS
          The full canonical grid. Variant tones distinguish each.
          ============================================================ */}
      <section className="bg-mls-cream py-20 lg:py-32 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-16 lg:mb-20">
            <SectionHeader
              number="04"
              eyebrow="The Five Verticals"
              heading="One family,"
              subLine="five ways of working."
              maxWidth="max-w-4xl"
              body={
                <p>
                  Each vertical began the same way: an operational need we
                  could answer with our own hands, or an obligation we took
                  on for the people we already serve. None of these were
                  spun off into separate companies. They are all the work
                  of the same family.
                </p>
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr gap-px bg-mls-ink/10">
            {VERTICALS.map((v, idx) => {
              const number = String(idx + 1).padStart(2, '0')
              const isStone = v.slug === 'stone-export'
              const isHospitality = v.slug === 'hospitality'
              return (
                <RevealOnScroll
                  key={v.slug}
                  delay={idx * 80}
                  className={`h-full ${isHospitality ? 'lg:row-span-2' : ''}`}
                >
                  <VerticalCard
                    href={isStone ? '/khadane' : `/verticals/${v.slug}`}
                    external={isStone}
                    number={number}
                    title={v.title}
                    brand={v.brand}
                    framing={v.framing}
                    body={HOMEPAGE_VERTICAL_DETAILS[v.slug]}
                    details={HOMEPAGE_VERTICAL_FACTS[v.slug]}
                    variant={isStone ? 'dark' : 'cream'}
                  />
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 05 — THE BIJOLIA INSCRIPTIONS
          The 854-year stone-belt continuity claim (KHADANE side mostly,
          but introduced here on MLS for the institutional gravitas).
          ============================================================ */}
      <section className="relative overflow-hidden bg-mls-tobacco text-mls-cream py-24 lg:py-32">
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(238,235,224,0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(238,235,224,0.06) 1px, transparent 1px)',
            backgroundSize: '84px 84px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-mls-gold/30" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-mls-ink/60" />

        <div className="relative mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                  05 · The Belt
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
                  Stone has been worked here
                  <span className="block italic text-mls-gold mt-2">
                    for {FOUNDING.bijoliaInscriptionsYears} years.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="text-lg leading-relaxed text-mls-cream/85 max-w-2xl mb-8">
                  The Bijolia rock inscriptions, carved into the sandstone of
                  this belt around 1170 CE, are among the earliest dated
                  examples of stone-cut documentation in this part of India.
                  Working stone is what the families of this belt have always
                  done. We came later, in 1972 — but the craft is older than
                  any of us.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={260}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-mls-cream/12 max-w-2xl mb-10">
                  {[
                    { value: '1170 CE', label: 'Earliest dated inscriptions' },
                    { value: `${FOUNDING.bijoliaInscriptionsYears}`, label: 'Stone-belt continuity' },
                    { value: '1972', label: 'MLS begins its work here' },
                  ].map((item) => (
                    <div key={item.label} className="bg-mls-tobacco/80 p-5">
                      <p className="font-display text-2xl text-mls-gold mb-1">
                        {item.value}
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-marker text-mls-cream/58 leading-relaxed">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={300}>
                <Link
                  href="/khadane/quarry"
                  className="inline-flex items-center gap-2 text-mls-gold hover:gap-3 transition-all duration-300 font-display italic text-lg"
                >
                  Read the quarry story at KHADANE™
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5">
              <RevealOnScroll delay={200}>
                <figure className="relative border border-mls-cream/14 bg-mls-ink shadow-2xl shadow-mls-ink/35">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <video
                      className="absolute inset-0 h-full w-full object-cover opacity-85"
                      style={{ objectPosition: '50% 58%' }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster="/img/hero-quarry-face.svg"
                      aria-label="Bijolia quarry documentary footage"
                    >
                      <source src={MLS_HERO_VIDEO} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-mls-ink via-mls-ink/18 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6 border-t border-mls-cream/24 pt-5">
                      <p className="font-mono text-[10px] uppercase tracking-marker text-mls-gold mb-2">
                        Bijolia · Documentary
                      </p>
                      <figcaption className="font-display italic text-2xl text-mls-cream">
                        Working stone, working hands.
                      </figcaption>
                    </div>
                  </div>
                </figure>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 06 — KHADANE™ BRIDGE
          The single largest cross-link surface on MLS.
          ============================================================ */}
      <section className="bg-mls-ink text-mls-cream py-24 lg:py-40">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                  06 · The Trade Brand
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] mb-4">
                  KHADANE
                  <sup className="text-3xl md:text-4xl text-mls-gold align-top">™</sup>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="font-display italic text-2xl text-mls-gold mb-8">
                  खदान — The Quarry
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <p className="text-lg leading-relaxed text-mls-cream/85 max-w-md">
                  Stone and export is operated under KHADANE™, the
                  trade-facing brand of the group. {KHADANE_SCALE.quarries}{' '}
                  quarries across the Bijolia belt. {KHADANE_SCALE.annualOutput}{' '}
                  of annual output. Shipped to {KHADANE_SCALE.countries} across{' '}
                  {KHADANE_SCALE.continents}.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7 lg:pl-12 lg:border-l lg:border-mls-cream/15 flex flex-col justify-center">
              <RevealOnScroll delay={200}>
                <p className="font-display text-2xl md:text-3xl leading-snug text-mls-cream/90 mb-10">
                  &ldquo;The trade brand carries the founding work of the family,
                  spoken in the language of the buyers who receive it.&rdquo;
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <Link
                  href="/khadane"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-mls-gold text-mls-ink text-sm font-body tracking-wider uppercase hover:bg-mls-cream hover:gap-4 transition-all duration-400 ease-editorial self-start"
                >
                  Open khadane.com
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 07 — THE KOTA CLUSTER
          Kunhari treatment — M3 + Vyanjanam + 5 residences, all adjacent
          ============================================================ */}
      <section className="bg-mls-cream py-24 lg:py-40">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                  07 · The Kota Cluster
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-mls-ink mb-6">
                  Four operations.
                  <span className="block italic text-mls-gold mt-2">
                    One neighbourhood.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="text-lg leading-relaxed text-mls-ink/85 mb-6 max-w-md">
                  In Kunhari — a neighbourhood of Kota — the family operates
                  M3 Hotel, Vyanjanam, two girls&rsquo; residences, and three
                  PG accommodations for boys. They sit within five minutes
                  of each other. The kitchen serves the residences in the
                  morning. The hotel takes families visiting their children.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <p className="font-display italic text-lg text-mls-tobacco max-w-md">
                  Not built as branches. Built as a neighbourhood fixture.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-px bg-mls-ink/10">
              {[
                {
                  title: 'M3 Boutique Hotel',
                  meta: `Since ${MLS_SCALE.m3Opened}`,
                  href: '/verticals/hospitality',
                  variant: 'mls-tobacco' as const,
                  label: 'M3 · KUNHARI',
                  swapPath: '/img/m3-mini-mall.webp',
                },
                {
                  title: 'The Princess',
                  meta: `Since ${MLS_SCALE.princessOpened}`,
                  href: '/verticals/student-housing',
                  variant: 'documentary' as const,
                  label: 'PRINCESS · KUNHARI',
                  swapPath: '/img/mls-gallery/princess-day.jpg',
                },
                {
                  title: 'Victoria Palace',
                  meta: `Since ${MLS_SCALE.victoriaOpened}`,
                  href: '/verticals/student-housing',
                  variant: 'mls-cream' as const,
                  label: 'VICTORIA · KUNHARI',
                  swapPath: '/img/mls-gallery/victoria-study.jpg',
                },
                {
                  title: 'Vyanjanam',
                  meta: `${MLS_SCALE.vyanjanamDailyMeals}`,
                  href: '/verticals/food-services',
                  variant: 'vyanjanam-dark' as const,
                  label: 'VYANJANAM · KUNHARI',
                  swapPath: '/img/mls-gallery/vyanjanam-service.jpg',
                },
              ].map((card, i) => (
                <RevealOnScroll key={card.title} delay={i * 80}>
                  <Link href={card.href} className="block group">
                    <PlaceholderImage
                      label={card.label}
                      title={card.title}
                      swapPath={card.swapPath}
                      aspectRatio="aspect-square"
                      variant={card.variant}
                      className="group-hover:opacity-95 transition-opacity duration-400"
                    />
                    <div className="bg-mls-cream p-5 flex items-baseline justify-between border-t border-mls-ink/10">
                      <p className="font-display text-lg text-mls-ink group-hover:text-mls-gold transition-colors">
                        {card.title}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate">
                        {card.meta}
                      </p>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 08 — VYANJANAM DARK BLOCK
          B&W contrast section. Vyanjanam treatment.
          ============================================================ */}
      <VyanjanamSection eyebrow="08 · The Kitchen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <RevealOnScroll>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.02] text-vyanjanam-white mb-8">
                The meal that comes
                <span className="block italic text-vyanjanam-light mt-2">
                  before the exam.
                </span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
              <p className="font-display italic text-xl md:text-2xl text-vyanjanam-light/90 leading-snug max-w-xl mb-8">
                {SIGNATURE_LINES.foodAndHumanDignity}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="text-lg leading-relaxed text-vyanjanam-light/80 max-w-xl">
                Vyanjanam is the family&rsquo;s kitchen for the coaching
                students of Kota. Pure vegetarian. Sourced from our own farms
                in Bijolia where possible, from trusted vendors otherwise.
                The dairy on a student&rsquo;s tray came from the family
                house. So did the buttermilk.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={350}>
              <div className="mt-10">
                <Link
                  href="/verticals/food-services"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-vyanjanam-white/40 text-vyanjanam-white text-sm font-body tracking-wider uppercase hover:bg-vyanjanam-white hover:text-vyanjanam-black hover:gap-4 transition-all duration-400"
                >
                  Read the kitchen story
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
          <div className="lg:col-span-5">
            <RevealOnScroll delay={200}>
              <PlaceholderImage
                label="VYANJANAM · DOCUMENTARY"
                title="Service, before the day's first paper."
                spec="1200 × 1500px · Morning service at Vyanjanam, no flash, real students"
                swapPath="/img/vyanjanam-morning.jpg"
                aspectRatio="aspect-[4/5]"
                variant="vyanjanam-dark"
              />
            </RevealOnScroll>
          </div>
        </div>
      </VyanjanamSection>

      {/* ============================================================
          SECTION 09 — THE FAMILY THROUGH THE WORK
          ============================================================ */}
      <section className="bg-mls-cream py-24 lg:py-40">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                  09 · The Working House
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-mls-ink mb-6">
                  The family is read
                  <span className="block italic text-mls-gold mt-2">
                    through the work.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="text-lg leading-relaxed text-mls-ink/85 mb-8 max-w-md">
                  MLS is not introduced through a posed family photograph.
                  It is read through the places the family keeps running:
                  stone yards, fuel stations, residences, kitchens, and hotel
                  floors. The full family line is carried on the Legacy page.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <Link
                  href="/our-legacy"
                  className="inline-flex items-center gap-3 font-display italic text-lg text-mls-gold hover:gap-4 transition-all duration-300"
                >
                  Read the legacy
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={200}>
                <PlaceholderImage
                  label="MLS · OPERATING SITE"
                  title="A working site in the family network."
                  spec="1600 × 1067px · Documentary frame from the operating archive"
                  swapPath="/img/family-bijolia.jpg"
                  aspectRatio="aspect-[3/2]"
                  variant="mls-tobacco"
                />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 10 — INSTITUTIONAL PARTNER (Milan Ji)
          ============================================================ */}
      <section className="bg-mls-buff/30 py-20 lg:py-28 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                10 · An institutional partner
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-mls-ink mb-6">
                Mr. {INSTITUTIONAL_PARTNER.name}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-lg leading-relaxed text-mls-ink/85 max-w-3xl">
                {INSTITUTIONAL_PARTNER.role.charAt(0).toUpperCase() +
                  INSTITUTIONAL_PARTNER.role.slice(1)}
                . Joined the work {INSTITUTIONAL_PARTNER.poeticPhrase} —{' '}
                {INSTITUTIONAL_PARTNER.directPhrase}. He is named here
                because the institutional work of the family cannot honestly
                be told without him.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 11 — RECENT WORK (placeholder pulling from /gallery/)
          ============================================================ */}
      <section className="bg-mls-cream py-24 lg:py-40">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-12">
            <SectionHeader
              number="11"
              eyebrow="Recent Work"
              heading="The work,"
              subLine={SIGNATURE_LINES.workAsItAppears
                .replace(/^The work,\s*/, '')
                .trim()}
              maxWidth="max-w-3xl"
              body={
                <p>
                  A small selection from the gallery — photographs taken on
                  working days. Not staged for the camera. Where photographs
                  are pending, the page reads honestly about that.
                </p>
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'STONE · QUARRY',
                title: 'The working face at Bijolia.',
                swapPath: '/img/mls-gallery/quarry-face.jpg',
                variant: 'documentary' as const,
              },
              {
                label: 'STONE · YARD',
                title: 'The yard, seen from above.',
                swapPath: '/img/mls-gallery/yard-overview.jpg',
                variant: 'mls-tobacco' as const,
              },
              {
                label: 'BIJOLIA · BELT',
                title: 'Roads between quarry and yard.',
                swapPath: '/img/mls-gallery/quarry-road.jpg',
                variant: 'mls-cream' as const,
              },
            ].map((item, i) => (
              <RevealOnScroll key={item.label} delay={i * 100}>
                <PlaceholderImage
                  label={item.label}
                  title={item.title}
                  swapPath={item.swapPath}
                  aspectRatio="aspect-[4/5]"
                  variant={item.variant}
                />
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll delay={300}>
            <div className="mt-10">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 font-display italic text-lg text-mls-gold hover:gap-4 transition-all duration-300"
              >
                See the full gallery
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================
          SECTION 12 — THE OFFICE
          ============================================================ */}
      <section className="bg-mls-tobacco text-mls-cream py-24 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  12 · The Office
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
                  Write to us
                  <span className="block italic text-mls-gold mt-2">
                    at one address.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="text-lg leading-relaxed text-mls-cream/85 max-w-xl mb-3">
                  Whichever vertical your inquiry concerns, the same office
                  reads it. Stone export inquiries are routed to KHADANE™
                  on the same day; everything else is answered by the family
                  directly.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <p className="font-display italic text-mls-gold text-lg">
                  {SIGNATURE_LINES.readByFamily}.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-mls-cream/15">
              <RevealOnScroll delay={150}>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-cream/60 mb-2">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT.officeMLS}`}
                      className="font-display text-xl text-mls-cream hover:text-mls-gold transition-colors break-all"
                    >
                      {CONTACT.officeMLS}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-cream/60 mb-2">
                      Phone
                    </p>
                    <a
                      href={`tel:${CONTACT.groupMain.replace(/\s/g, '')}`}
                      className="font-display text-xl text-mls-cream hover:text-mls-gold transition-colors"
                    >
                      {CONTACT.groupMain}
                    </a>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-mls-cream/40 text-mls-cream text-sm font-body tracking-wider uppercase hover:bg-mls-cream hover:text-mls-tobacco transition-all duration-400"
                    >
                      Open the contact page
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 13 — THE CLOSING LINE
          The institutional sign-off. One sentence, generous space.
          ============================================================ */}
      <section className="bg-mls-cream py-16 lg:py-20 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <p className="font-display italic text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-mls-ink">
                {ENTITIES.footerSignature}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-mls-gold" aria-hidden />
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-slate">
                  Bijolia · {LOCATIONS.bijolia.district} ·{' '}
                  {FOUNDING.yearsEvergreen}
                </p>
                <div className="h-px w-16 bg-mls-gold" aria-hidden />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
