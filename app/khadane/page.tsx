import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BadgeCheck, Factory, Gem, MapPin, PackageCheck, Route, Users } from 'lucide-react'
import { ASSETS, SITE } from '@/lib/khadane/site'
import { VARIETIES, getOwnedVarieties, getAlliedVarieties } from '@/lib/khadane/varieties'
import { FORMATS } from '@/lib/khadane/formats'
import { getVarietyImage } from '@/lib/khadane/variety-images'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import HeroVideo from '@/components/khadane/HeroVideo'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import Marquee from '@/components/khadane/Marquee'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export default function HomePage() {
  const ownedVarieties = getOwnedVarieties()
  const alliedVarieties = getAlliedVarieties()
  const heroVarieties = VARIETIES.slice(0, 6)
  const heroFormats = FORMATS.slice(0, 6)

  return (
    <>
      {/* ============================================================
          SECTION 01 — HERO
          Cinematic full-bleed, word-rise headline, gold details
          ============================================================ */}
      <section className="relative min-h-[calc(100vh-4.5rem)] lg:min-h-[calc(100vh-4.75rem)] flex items-end overflow-hidden bg-obsidian texture-lines">
        {/* Background video with static fallback */}
        <div className="absolute inset-0">
          <Image
            src="/img/mls-home-hero-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none absolute inset-0 object-cover"
            style={{ objectPosition: '50% 58%' }}
            aria-hidden="true"
          />
          <HeroVideo
            src="/videos/home-hero.mp4"
            poster="/img/mls-home-hero-poster.jpg"
            objectPosition="50% 58%"
          />
          {/* Top scrim */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-obsidian/70 via-obsidian/40 to-transparent" />
          {/* Bottom scrim */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 container-editorial pb-14 lg:pb-18 pt-28 lg:pt-36">
          <div className="max-w-4xl">
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: '200ms' }}
            >
              <p className="eyebrow-gold mb-8 no-justify">
                KHADANE™ · BIJOLIA · SINCE 1972
              </p>
            </div>

            <HeroWordRise
              as="h1"
              words={['Stone', 'of', 'the', 'Bijolia', 'Belt.']}
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05] text-warm-white mb-10"
              baseDelay={400}
              staggerDelay={130}
            />

            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: '1800ms' }}
            >
              <p className="font-display italic text-xl md:text-2xl text-quarry-gold mb-12 no-justify max-w-2xl">
                Owned quarries, and a network of allied quarries across northern India. Cut and dressed in every form the trade specifies.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/khadane/collection" className="cta-primary no-justify">
                  Browse the Collection
                </Link>
                <Link
                  href="/khadane/desk"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-warm-white/30 text-warm-white font-sans text-sm tracking-wider uppercase transition-all duration-400 ease-editorial hover:bg-warm-white hover:text-obsidian hover:gap-4 no-justify"
                >
                  Write to The Desk
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom corner — coordinates badge (Quiet Authority detail) */}
          <div
            className="absolute bottom-8 right-8 lg:bottom-12 lg:right-16 opacity-0 animate-fade-in"
            style={{ animationDelay: '2400ms' }}
          >
            <div className="text-right">
              <p className="font-mono text-[10px] tracking-widest text-warm-white/40 no-justify">
                25.176° N · 75.342° E
              </p>
              <p className="font-mono text-[10px] tracking-widest text-quarry-gold/60 no-justify mt-1">
                BIJOLIA · RAJASTHAN
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 02 — RUNNING BELT (variety codes marquee)
          ============================================================ */}
      <Marquee />

      {/* ============================================================
          SECTION 03 — THE HOUSE STATEMENT
          Three-statement period rhythm
          ============================================================ */}
      <section className="section-warm py-16 lg:py-24">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7 border border-obsidian/10 bg-stone-linen/45 p-8 md:p-10 lg:p-12">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-8 no-justify">THE HOUSE</p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-obsidian mb-8 no-justify">
                  We quarry our own.
                  <span className="block text-quarry-gold italic mt-2">We process our own.</span>
                  <span className="block mt-2">We ship our own.</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={250}>
                <p className="font-sans text-lg leading-relaxed text-graphite no-justify max-w-3xl mb-10">
                  KHADANE works the Bijolia sandstone belt of Rajasthan through owned quarries, a controlled processing yard, and long-standing allied quarry relationships across northern India. The buyer sees the source, the format, the finish, and the dispatch route without broker ambiguity.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={350}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: MapPin,
                      title: 'Source',
                      body: 'Owned and allied quarry origins are marked clearly in the catalogue.',
                    },
                    {
                      icon: Factory,
                      title: 'Process',
                      body: 'Cutting, calibration, surfacing, edging, and packing run through Bijolia.',
                    },
                    {
                      icon: Route,
                      title: 'Dispatch',
                      body: `Finished crates move from the yard to ${SITE.port} for export loading.`,
                    },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="bg-warm-white p-6">
                        <Icon size={20} strokeWidth={1.5} className="mb-6 text-quarry-gold" />
                        <h3 className="font-display text-2xl text-obsidian no-justify mb-3">{item.title}</h3>
                        <p className="font-sans text-sm leading-6 text-graphite no-justify">{item.body}</p>
                      </div>
                    )
                  })}
                </div>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { icon: BadgeCheck, value: SITE.quarryCount, label: 'Quarries', note: 'Owned and allied source network' },
                { icon: PackageCheck, value: SITE.varietyCount, label: 'Varieties', note: `${SITE.ownedVarieties} owned · ${SITE.alliedVarieties} allied` },
                { icon: Factory, value: SITE.formatCount, label: 'Formats', note: 'Production formats from the yard' },
                { icon: Users, value: SITE.workforceCount, label: 'Workforce', note: 'Quarry, yard, and office teams' },
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <RevealOnScroll key={stat.label} delay={200 + index * 80} className="h-full">
                    <div className="flex h-full min-h-[210px] flex-col justify-between border border-obsidian/10 bg-warm-white p-6 lg:p-7">
                      <div className="flex items-start justify-between gap-5">
                        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/50 no-justify">{String(index + 1).padStart(2, '0')}</p>
                        <Icon size={20} strokeWidth={1.5} className="text-quarry-gold" />
                      </div>
                      <div>
                        <p className="font-display text-5xl lg:text-6xl text-quarry-gold no-justify">{stat.value}</p>
                        <p className="mt-3 font-sans text-xs uppercase tracking-eyebrow text-obsidian no-justify">{stat.label}</p>
                        <p className="mt-3 font-sans text-xs leading-5 text-graphite no-justify">{stat.note}</p>
                      </div>
                    </div>
                  </RevealOnScroll>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 04 — THE COLLECTION PREVIEW
          23 varieties in a tight editorial mosaic
          ============================================================ */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">01 · THE COLLECTION</p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="section-heading mb-8">
                  A working catalogue
                  <span className="block italic text-quarry-gold mt-2">of twenty-three stones.</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={250}>
                <p className="font-sans text-lg leading-relaxed text-graphite no-justify mb-8">
                  Fourteen owned varieties and nine allied varieties, each marked by source, formation, format compatibility, and technical specification. Buyers can read what is ours, what is allied, and how each stone can be cut.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={320}>
                <div className="mb-8 grid grid-cols-2 gap-4">
                  {[
                    { value: SITE.ownedVarieties, label: 'Owned varieties' },
                    { value: SITE.alliedVarieties, label: 'Allied network' },
                    { value: SITE.surfaceTreatmentCount, label: 'Surface treatments' },
                    { value: SITE.edgeProfileCount, label: 'Edge profiles' },
                  ].map((item) => (
                    <div key={item.label} className="border border-obsidian/10 bg-warm-white p-5">
                      <p className="font-display text-4xl text-quarry-gold no-justify">{item.value}</p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/55 no-justify">{item.label}</p>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={420}>
                <Link href="/khadane/collection" className="inline-flex items-center gap-3 bg-obsidian px-8 py-4 font-sans text-sm uppercase tracking-wider text-warm-white transition-colors duration-400 ease-editorial hover:bg-quarry-gold hover:text-obsidian no-justify">
                  Browse all {SITE.varietyCount} varieties <ArrowRight size={16} strokeWidth={1.6} />
                </Link>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-7">
              <RevealOnScroll>
                <Link href={`/khadane/collection/${heroVarieties[0].slug}`} className="group mb-5 block border border-obsidian/10 bg-warm-white p-5 transition-colors duration-400 ease-editorial hover:border-quarry-gold/50">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-stretch">
                    <div className="md:col-span-7">
                      <PlaceholderImage
                        variant={heroVarieties[0].placeholderClass.replace('placeholder-', '') as any}
                        label={heroVarieties[0].code}
                        title={heroVarieties[0].name}
                        swapPath={getVarietyImage(heroVarieties[0].slug, 'hero', `/img/varieties/${heroVarieties[0].slug}-hero.jpg`)}
                        aspectRatio="aspect-[16/10]"
                        className="transition-transform duration-700 ease-editorial group-hover:scale-[1.015]"
                      />
                    </div>
                    <div className="md:col-span-5 flex flex-col justify-between p-2 md:p-4">
                      <div>
                        <div className="mb-8 flex items-center justify-between gap-4">
                          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-quarry-gold no-justify">Featured stone</p>
                          <Gem size={19} strokeWidth={1.5} className="text-quarry-gold" />
                        </div>
                        <h3 className="font-display text-4xl leading-tight text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                          {heroVarieties[0].name}
                        </h3>
                        <p className="mt-3 font-mono text-xs uppercase tracking-eyebrow text-tobacco/55 no-justify">{heroVarieties[0].code}</p>
                        <p className="mt-6 font-sans text-sm leading-6 text-graphite no-justify">
                          {heroVarieties[0].oneLine}
                        </p>
                      </div>
                      <p className="mt-8 inline-flex items-center gap-3 font-sans text-sm uppercase tracking-wider text-obsidian no-justify">
                        View technical page <ArrowRight size={16} strokeWidth={1.6} />
                      </p>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {heroVarieties.slice(1).map((v, i) => (
                  <RevealOnScroll key={v.slug} delay={100 + i * 70}>
                    <Link href={`/khadane/collection/${v.slug}`} className="group block h-full border border-obsidian/10 bg-warm-white p-4 transition-colors duration-400 ease-editorial hover:border-quarry-gold/50">
                      <PlaceholderImage
                        variant={v.placeholderClass.replace('placeholder-', '') as any}
                        label={v.code}
                        title={v.name}
                        swapPath={getVarietyImage(v.slug, 'hero', `/img/varieties/${v.slug}-hero.jpg`)}
                        aspectRatio="aspect-[5/4]"
                        className="transition-transform duration-700 ease-editorial group-hover:scale-[1.02]"
                      />
                      <div className="flex items-start justify-between gap-4 pt-5">
                        <div>
                          <p className="font-display text-2xl leading-tight text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                            {v.name}
                          </p>
                          <p className="mt-2 font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/55 no-justify">{v.code}</p>
                        </div>
                        <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center border border-obsidian/10 text-tobacco/60 transition-colors group-hover:border-quarry-gold/45 group-hover:text-quarry-gold">
                          <ArrowRight size={15} strokeWidth={1.6} />
                        </span>
                      </div>
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 05 — THE FORMATS
          19 formats grid
          ============================================================ */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">02 · THE FORMATS</p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="section-heading mb-8">
                  Every form
                  <span className="block italic text-quarry-gold mt-1">the trade asks for.</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={250}>
                <p className="editorial-body mb-8">
                  KHADANE cuts and dresses the stone before it leaves Mundra. Nineteen formats run through the yard, with surface treatments and edge profiles cross-listed against each form.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={350}>
                <Link href="/khadane/formats" className="cta-text">All {SITE.formatCount} formats →</Link>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-px bg-obsidian/10">
              {heroFormats.map((f, i) => (
                <RevealOnScroll key={f.slug} delay={i * 50} className="h-full">
                  <Link href={`/khadane/formats/${f.slug}`} className="flex h-full min-h-44 flex-col bg-warm-white p-6 lg:p-8 hover:bg-stone-linen transition-colors duration-400 ease-editorial group">
                    <p className="font-mono text-xs text-quarry-gold no-justify mb-3">{f.code}</p>
                    <h3 className="font-display text-xl lg:text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors mb-3">
                      {f.name}
                    </h3>
                    <p className="font-sans text-xs text-graphite leading-relaxed no-justify">
                      {f.oneLine}
                    </p>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 06 — THE QUARRY (dark cinematic block)
          ============================================================ */}
      <section className="section-dark texture-lines">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="relative min-h-[60vh] lg:min-h-[80vh]">
            <PlaceholderImage
              variant="quarry"
              label="QUARRY · DOCUMENTARY"
              title="The working face."
              spec="1600 × 2000px · Vertical portrait. Active quarry with stone strata, dust haze acceptable. Early morning preferred."
              swapPath="/img/quarry-portrait.jpg"
              aspectRatio="absolute inset-0"
              className="w-full h-full"
            />
          </div>
          <div className="flex items-center p-10 md:p-16 lg:p-20 xl:p-24">
            <div>
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">03 · THE QUARRY</p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-8 no-justify">
                  We are the source.
                  <span className="block italic text-quarry-gold mt-2">Not the broker.</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={250}>
                <p className="font-sans text-lg text-warm-white/80 mb-10 leading-relaxed">
                  Our quarries sit in the Bijolia sandstone belt — a working geology that has produced sandstone for over eight centuries. We don't buy through middlemen. We don't repackage other people's stone. Every owned variety comes from a quarry we control end to end.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={400}>
                <div className="grid grid-cols-2 gap-6 lg:gap-10 mb-10">
                  <div>
                    <p className="font-display text-4xl text-quarry-gold no-justify">{SITE.bijoliaBeltYears}</p>
                    <p className="font-sans text-xs uppercase tracking-eyebrow text-warm-white/50 mt-2 no-justify">Years of working geology</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl text-quarry-gold no-justify">{SITE.annualOutput}</p>
                    <p className="font-sans text-xs uppercase tracking-eyebrow text-warm-white/50 mt-2 no-justify">Annual output (sq.m)</p>
                  </div>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={500}>
                <Link href="/khadane/quarry" className="inline-flex items-center gap-3 text-warm-white font-sans text-sm tracking-wider uppercase border-b border-warm-white/30 hover:border-quarry-gold hover:text-quarry-gold pb-1 transition-all duration-400 no-justify">
                  Inside the quarry →
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 07 — THE FIVE-DIMENSION TRADE SPEC
          ============================================================ */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <RevealOnScroll>
              <p className="eyebrow mb-6 no-justify">04 · THE TRADE SPEC</p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="section-heading mb-8">
                Five dimensions.
                <span className="block italic text-quarry-gold">Every order.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="editorial-body max-w-2xl mx-auto">
                Every shipment is specified across five dimensions. This is how stone moves from quarry to container without ambiguity.
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-obsidian/10">
            {[
              { label: 'Variety', count: String(SITE.varietyCount), hint: 'Catalogue varieties' },
              { label: 'Format', count: String(SITE.formatCount), hint: 'Production formats' },
              { label: 'Cutting', count: '4', hint: 'Methods' },
              { label: 'Surface', count: String(SITE.surfaceTreatmentCount), hint: 'Treatments' },
              { label: 'Size', count: '13', hint: 'Standard sizes' },
            ].map((d, i) => (
              <RevealOnScroll key={d.label} delay={i * 80}>
                <div className="bg-warm-white p-8 lg:p-10 text-center">
                  <p className="font-mono text-xs text-tobacco/60 mb-4 no-justify">{String(i + 1).padStart(2, '0')}</p>
                  <p className="font-display text-5xl text-quarry-gold mb-4 no-justify">{d.count}</p>
                  <p className="font-sans text-sm tracking-wider uppercase text-obsidian mb-2 no-justify">{d.label}</p>
                  <p className="font-sans text-xs text-graphite no-justify">{d.hint}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 08 — THE YARD
          ============================================================ */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">05 · THE YARD</p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="section-heading mb-8">
                  Where stone
                  <span className="block italic text-quarry-gold">becomes a shipment.</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={250}>
                <p className="editorial-body mb-6">
                  Raw blocks arrive from the quarries; finished crates leave for the port. Grading, gangsaw, surface treatments, edge profiles, calibration, quality check, packing: all handled at the Bijolia yard.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <p className="editorial-body mb-10">
                  We do not list pricing publicly. Every quote is built against your project — variety, format, cutting, surface, size, volume, port, lead time. Quotes are returned within one business day.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={400}>
                <Link href="/khadane/yard" className="cta-text">Inside the yard →</Link>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <RevealOnScroll>
                <PlaceholderImage
                  variant="yard"
                  label="YARD · PROCESSING"
                  title="Calibration line."
                  spec="1600 × 1200px · Documentary. Active calibration line, slabs in production, workforce visible at distance."
                  swapPath="/img/yard-calibration.jpg"
                  aspectRatio="aspect-[4/3]"
                />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 09 — GALLERY PREVIEW
          Editorial mosaic teaser
          ============================================================ */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
            <div className="max-w-2xl">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">06 · THE GALLERY</p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="section-heading">
                  Stone, quarry, yard,
                  <span className="block italic text-quarry-gold">in-situ.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={250}>
              <Link href="/khadane/gallery" className="cta-text">Open the gallery →</Link>
            </RevealOnScroll>
          </div>

          {/* 4-tile editorial preview — wide + 2 stacked + tall */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
            {/* Large wide tile */}
            <RevealOnScroll delay={100} className="lg:col-span-8 lg:row-span-2">
              <Link href="/khadane/gallery" className="group block relative overflow-hidden bg-obsidian h-full">
                <PlaceholderImage
                  variant="quarry"
                  label="GAL-009"
                  title="The Working Face"
                  swapPath="/img/gallery/quarry/working-face-dawn.jpg"
                  aspectRatio="aspect-[16/10] lg:aspect-[5/4] lg:h-full"
                  className="transition-transform duration-1000 ease-editorial group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/90 to-transparent p-6 lg:p-8">
                  <p className="font-mono text-xs text-quarry-gold mb-2 no-justify">GAL-009 · QUARRY</p>
                  <h3 className="font-display text-2xl lg:text-3xl text-warm-white no-justify">
                    The Working Face
                  </h3>
                </div>
              </Link>
            </RevealOnScroll>
            {/* Top right tile */}
            <RevealOnScroll delay={200} className="lg:col-span-4">
              <Link href="/khadane/gallery" className="group block relative overflow-hidden bg-obsidian">
                <PlaceholderImage
                  variant="stone-grey"
                  label="GAL-001"
                  title="Kandla Grey · Riven"
                  swapPath="/img/gallery/stone/kandla-grey-riven.jpg"
                  aspectRatio="aspect-[4/3]"
                  className="transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 to-transparent p-4 lg:p-5">
                  <p className="font-mono text-[10px] text-quarry-gold mb-1 no-justify">GAL-001 · #KHD-001</p>
                  <h3 className="font-display text-lg text-warm-white no-justify">Kandla Grey · Riven</h3>
                </div>
              </Link>
            </RevealOnScroll>
            {/* Bottom right tile */}
            <RevealOnScroll delay={300} className="lg:col-span-4">
              <Link href="/khadane/gallery" className="group block relative overflow-hidden bg-obsidian">
                <PlaceholderImage
                  variant="yard"
                  label="GAL-016"
                  title="Calibration"
                  swapPath="/img/gallery/yard/calibration.jpg"
                  aspectRatio="aspect-[4/3]"
                  className="transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 to-transparent p-4 lg:p-5">
                  <p className="font-mono text-[10px] text-quarry-gold mb-1 no-justify">GAL-016 · YARD</p>
                  <h3 className="font-display text-lg text-warm-white no-justify">Calibration</h3>
                </div>
              </Link>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={400}>
            <div className="mt-12 text-center">
              <Link href="/khadane/gallery" className="cta-secondary no-justify">
                All 32 frames →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================
          SECTION 10 — THE FIELD NOTES (3 article shelf preview)
          ============================================================ */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
            <div>
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">06 · FIELD NOTES</p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="section-heading">
                  Editorial briefs
                  <span className="block italic text-quarry-gold">from the belt.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={250}>
              <Link href="/khadane/field-notes" className="cta-text">All field notes →</Link>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                code: 'FN-001',
                category: 'Geology',
                title: 'Why Bijolia sandstone sits where it does.',
                excerpt: 'The Vindhyan Supergroup is one of the largest preserved sedimentary basins on Earth. Bijolia sits on its western edge.',
                swapPath: '/img/field-notes/bijolia-sandstone-geology.jpg',
              },
              {
                code: 'FN-002',
                category: 'Process',
                title: 'Calibration, explained.',
                excerpt: 'A 22mm slab from Kandla Grey shouldn\'t arrive at 24mm. Here is how we hit tolerance, batch after batch.',
                swapPath: '/img/field-notes/calibration-explained.jpg',
              },
              {
                code: 'FN-003',
                category: 'Trade',
                title: 'FOB, FOR, CIF: what UK buyers actually need.',
                excerpt: 'The shipping terms most often confused — and what they mean for your landed cost.',
                swapPath: '/img/field-notes/fob-for-cif-uk-buyers.jpg',
              },
            ].map((note, i) => (
              <RevealOnScroll key={note.code} delay={i * 100}>
                <Link href="/khadane/field-notes" className="block group">
                  <PlaceholderImage
                    variant="stone"
                    label={note.code}
                    title={note.category}
                    swapPath={note.swapPath}
                    aspectRatio="aspect-[4/3]"
                    className="mb-6 transition-transform duration-600 ease-editorial group-hover:scale-[1.01]"
                  />
                  <p className="font-mono text-xs text-quarry-gold no-justify mb-3">{note.category.toUpperCase()}</p>
                  <h3 className="font-display text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors mb-3 leading-snug">
                    {note.title}
                  </h3>
                  <p className="font-sans text-sm text-graphite leading-relaxed">
                    {note.excerpt}
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 10 — THE NETWORK (allied operators)
          ============================================================ */}
      <section className="section-padding section-tobacco">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">07 · THE NETWORK</p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-8 no-justify">
                  Nine allied
                  <span className="block italic text-quarry-gold">heritage operators.</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={250}>
                <p className="font-sans text-lg text-warm-white/80 leading-relaxed mb-8">
                  Some varieties sit outside the Bijolia belt — Agra Red from Dholpur, Jaisalmer Yellow from the Marwar basin, Teakwood from Nagaur, Sagar Black from Madhya Pradesh. For these we work direct with heritage operators who have produced these stones for decades.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={350}>
                <p className="font-sans text-sm text-quarry-gold/80 uppercase tracking-wider no-justify">
                  Every allied variety still ships under DSI custody.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-3 gap-3 lg:gap-4">
                {alliedVarieties.slice(0, 9).map((v, i) => (
                  <RevealOnScroll key={v.slug} delay={i * 50}>
                    <Link href={`/khadane/collection/${v.slug}`} className="block group">
                      <PlaceholderImage
                        variant={v.placeholderClass.replace('placeholder-', '') as any}
                        label={v.code}
                        title={v.name}
                        swapPath={getVarietyImage(v.slug, 'hero', `/img/varieties/${v.slug}-hero.jpg`)}
                        aspectRatio="aspect-square"
                        className="border border-quarry-gold/20 transition-transform duration-700 ease-editorial group-hover:scale-[1.02]"
                      />
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 11 — THE GROUP (MLS endorsement)
          ============================================================ */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <p className="eyebrow mb-6 no-justify">08 · THE GROUP</p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <Link
                href="/mls"
                aria-label="Open Mohan Lal & Sons homepage"
                className="flex justify-center mb-10 transition-opacity hover:opacity-80"
              >
                <Image
                  src={ASSETS.mls.lockup.onLight}
                  alt="Mohan Lal & Sons · Est. 1972"
                  width={400}
                  height={156}
                  className="w-[280px] lg:w-[400px] h-auto"
                />
              </Link>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl lg:text-3xl text-obsidian leading-snug mb-8 no-justify max-w-2xl mx-auto">
                KHADANE™ is one of five operations within Mohan Lal &amp; Sons. The stone &amp; export vertical is run by the {SITE.groupOperation}.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <Link href="/khadane/group" className="cta-secondary">
                The full house →
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 12 — THE DESK (CTA section)
          ============================================================ */}
      <section className="section-padding section-dark texture-lines">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <p className="eyebrow-gold mb-6 no-justify">09 · THE DESK</p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.05] text-warm-white mb-10 no-justify">
                Write to us.
                <span className="block italic text-quarry-gold mt-2">Quote within a day.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-sans text-lg text-warm-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
                Pricing is built per project. Tell us the variety, format, finish, size, and volume — and we will return a quote with the lead time, shipping option, and any catalogue alternatives within one business day.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/khadane/desk" className="inline-flex items-center gap-3 px-10 py-5 bg-quarry-gold text-obsidian font-sans text-sm tracking-wider uppercase hover:bg-warm-white transition-all duration-400 ease-editorial no-justify">
                  Write to The Desk
                </Link>
                <a
                  href={SITE.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-3 px-10 py-5 border border-warm-white/30 text-warm-white font-sans text-sm tracking-wider uppercase hover:bg-warm-white hover:text-obsidian transition-all duration-400 ease-editorial no-justify"
                >
                  WhatsApp directly
                </a>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={500}>
              <div className="mt-16 pt-12 border-t border-warm-white/10 flex flex-col md:flex-row items-center justify-center gap-8 text-warm-white/60 font-mono text-xs no-justify">
                <span>{SITE.contact.publicEmail}</span>
                <span className="hidden md:inline text-quarry-gold/30">◆</span>
                <span>{SITE.contact.publicPhone}</span>
                <span className="hidden md:inline text-quarry-gold/30">◆</span>
                <span>{SITE.contact.hours}</span>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 13 — BRAND WHISPER · GOLD
          ============================================================ */}
      <BrandWhisper variant="gold" />
    </>
  )
}
