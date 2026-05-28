import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Layers3,
  MapPin,
  PackageCheck,
  Send,
} from 'lucide-react'
import { VARIETIES, getVariety, getPrevVariety, getNextVariety } from '@/lib/khadane/varieties'
import { FORMATS } from '@/lib/khadane/formats'
import { SITE } from '@/lib/khadane/site'
import { getVarietyImage } from '@/lib/khadane/variety-images'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export function generateStaticParams() {
  return VARIETIES.map((v) => ({ variety: v.slug }))
}

type VarietyPageProps = {
  params: Promise<{ variety: string }>
}

export async function generateMetadata({ params }: VarietyPageProps) {
  const { variety } = await params
  const v = getVariety(variety)
  if (!v) return { title: 'Not found' }
  return {
    title: `${v.name} — ${v.code}`,
    description: v.oneLine,
  }
}

export default async function VarietyPage({ params }: VarietyPageProps) {
  const { variety } = await params
  const v = getVariety(variety)
  if (!v) notFound()

  const swapPathFor = (path: string): string | undefined => {
    if (path.endsWith('-hero.jpg')) return getVarietyImage(v.slug, 'hero', path)
    if (path.endsWith('/slab-face.jpg')) return getVarietyImage(v.slug, 'slabFace', path)
    if (path.endsWith('/surface-close.jpg')) return getVarietyImage(v.slug, 'surfaceClose', path)
    if (path.endsWith('/edge-profile.jpg')) return getVarietyImage(v.slug, 'edgeProfile', path)
    if (path.endsWith('/worked-format.jpg')) return getVarietyImage(v.slug, 'workedFormat', path)
    if (path.endsWith('/source-context.jpg')) return getVarietyImage(v.slug, 'sourceContext', path)
    return path
  }
  const prev = getPrevVariety(v.rank)
  const next = getNextVariety(v.rank)

  // Format availability for this variety
  const availableFormats = v.formatExceptions?.includes('block-first')
    ? FORMATS.filter((f) => ['quarry-blocks', 'gangsaw-slabs', 'wall-cladding', 'cobble-setts', 'window-sills', 'copings', 'block-steps-treads'].includes(f.slug))
    : FORMATS
  const technicalRows = [
    { label: 'Catalogue code', value: v.code },
    { label: 'Source classification', value: v.tierLabel },
    { label: 'Geological formation', value: v.formation },
    { label: 'Splittable', value: v.splittable },
    { label: v.tier === 'owned' ? 'Worked since' : 'Partnership since', value: v.workedSince },
    { label: 'Primary location', value: v.primaryLocation },
    { label: 'Quarry network', value: v.quarryNetworkNote || v.additionalLocations },
    { label: 'Trade aliases', value: v.tradeNames === 'Catalogued under its trade name' ? undefined : v.tradeNames },
    { label: 'Renamed by KHADANE', value: v.renamedByKhadane },
    { label: 'Format scope', value: v.formatScope },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value))
  const sourceLabel = v.tier === 'owned' ? 'Owned quarry' : 'Allied quarry'
  const sourceDetail =
    v.tier === 'owned'
      ? 'Extracted from KHADANE controlled blocks and processed through the Bijolia yard.'
      : 'Sourced through a direct family-allied quarry relationship and shipped under KHADANE custody.'
  const splitSummary = v.splittable?.startsWith('Yes') ? 'Natural split bed' : 'Machine-cut supply'
  const featuredFormats = availableFormats.slice(0, 8)
  const stoneVariant = v.placeholderClass.replace('placeholder-', '') as
    | 'stone'
    | 'stone-grey'
    | 'stone-warm'
    | 'stone-red'
    | 'stone-green'
  const imageSlots = [
    {
      label: '01 · MATERIAL',
      title: `${v.name} · Slab face`,
      spec: 'Full-face slab or paving piece on neutral ground. Show the colour range clearly.',
      swapPath: swapPathFor(`/img/varieties/${v.slug}/slab-face.jpg`),
      aspectRatio: 'aspect-[4/5]',
      variant: stoneVariant,
    },
    {
      label: '02 · SURFACE',
      title: `${v.name} · Surface close-up`,
      spec: 'Macro texture, grain, fossil/vein/colour movement where present. Raking light preferred.',
      swapPath: swapPathFor(`/img/varieties/${v.slug}/surface-close.jpg`),
      aspectRatio: 'aspect-[4/3]',
      variant: stoneVariant,
    },
    {
      label: '03 · EDGE',
      title: `${v.name} · Edge profile`,
      spec: 'Show thickness, edge finish, and bedding plane. Include hand-cut or machine-cut character.',
      swapPath: swapPathFor(`/img/varieties/${v.slug}/edge-profile.jpg`),
      aspectRatio: 'aspect-[4/3]',
      variant: stoneVariant,
    },
    {
      label: '04 · FORMAT',
      title: `${v.name} · Worked format`,
      spec: 'Paving, cobble, coping, cladding, or custom cut in production or stacked for packing.',
      swapPath: swapPathFor(`/img/varieties/${v.slug}/worked-format.jpg`),
      aspectRatio: 'aspect-[4/3]',
      variant: 'yard' as const,
    },
    {
      label: '05 · SOURCE',
      title: `${v.name} · Source context`,
      spec: `${v.primaryLocation}. Quarry face, block yard, or raw block documentation.`,
      swapPath: swapPathFor(`/img/varieties/${v.slug}/source-context.jpg`),
      aspectRatio: 'aspect-[16/10]',
      variant: v.tier === 'owned' ? ('quarry' as const) : ('belt' as const),
    },
  ]

  return (
    <>
      {/* Section 01 — Product hero */}
      <section className="relative overflow-hidden section-warm pt-36 pb-20 md:pt-40 lg:min-h-[calc(100vh-4.5rem)] lg:flex lg:items-center lg:pt-48 lg:pb-28 xl:pt-52">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="mb-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 border border-quarry-gold/35 bg-quarry-gold/10 px-3 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-quarry-gold no-justify">
                    <BadgeCheck size={14} strokeWidth={1.6} />
                    {v.code}
                  </span>
                  <span className="inline-flex border border-obsidian/10 bg-stone-linen/45 px-3 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-tobacco no-justify">
                    {v.tierLabel}
                  </span>
                  {v.foundingStone && (
                    <span className="inline-flex border border-obsidian/10 bg-stone-linen/45 px-3 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-tobacco no-justify">
                      Founding stone
                    </span>
                  )}
                </div>
              </div>
              <HeroWordRise
                as="h1"
                words={[v.name + '.']}
                className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter leading-[0.95] text-obsidian mb-6"
                baseDelay={200}
                staggerDelay={130}
              />
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '900ms' }}>
                <p className="hindi-tag text-3xl lg:text-4xl mb-8 no-justify">
                  {v.nameHindi}
                </p>
                <p className="max-w-2xl font-display italic text-2xl md:text-3xl leading-snug text-quarry-gold mb-8 no-justify">
                  {v.oneLine}
                </p>
                <div className="grid max-w-3xl grid-cols-1 gap-px bg-obsidian/10 sm:grid-cols-3 mb-10">
                  {[
                    { icon: MapPin, label: 'Origin', value: v.district },
                    { icon: Layers3, label: 'Formation', value: v.formation.split('—')[0].trim() },
                    { icon: PackageCheck, label: 'Formats', value: `${availableFormats.length} available` },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="bg-warm-white/80 p-5">
                        <Icon size={18} strokeWidth={1.5} className="mb-4 text-quarry-gold" />
                        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/55 no-justify mb-2">
                          {item.label}
                        </p>
                        <p className="font-sans text-sm leading-snug text-obsidian no-justify">
                          {item.value}
                        </p>
                      </div>
                    )
                  })}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/khadane/desk" className="cta-primary no-justify">
                    <Send size={16} strokeWidth={1.6} />
                    Quote for {v.name}
                  </Link>
                  <Link href="/khadane/collection" className="cta-secondary no-justify">
                    <ArrowRight size={16} strokeWidth={1.6} />
                    All varieties
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 border border-quarry-gold/20" aria-hidden />
                <PlaceholderImage
                  variant={v.placeholderClass.replace('placeholder-', '') as any}
                  label={v.code}
                  title={v.name}
                  spec={`${sourceLabel} · ${v.district}`}
                  swapPath={swapPathFor(`/img/varieties/${v.slug}-hero.jpg`)}
                  aspectRatio="aspect-[4/5]"
                  className="relative shadow-[0_32px_80px_rgba(17,17,17,0.16)]"
                />
                <div className="relative mt-4 grid grid-cols-2 gap-px bg-obsidian/10">
                  <div className="bg-warm-white p-4">
                    <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/50 no-justify mb-1">Source</p>
                    <p className="font-sans text-sm text-obsidian no-justify">{sourceLabel}</p>
                  </div>
                  <div className="bg-warm-white p-4">
                    <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/50 no-justify mb-1">Bed</p>
                    <p className="font-sans text-sm text-obsidian no-justify">{splitSummary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 — Provenance */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">PROVENANCE</p>
                <h2 className="section-heading mb-8">
                  Source,
                  <span className="block italic text-quarry-gold">not guesswork.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-8">
              <RevealOnScroll delay={100}>
                <p className="font-display text-3xl md:text-4xl leading-snug text-obsidian no-justify mb-8">
                  {v.provenanceLine || v.inHandHeadline}
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="editorial-body max-w-3xl mb-8">
                  {sourceDetail}
                </p>
              </RevealOnScroll>
              {v.editorialBody?.length ? (
                <RevealOnScroll delay={300}>
                  <div className="grid grid-cols-1 gap-6 border-t border-obsidian/10 pt-8 md:grid-cols-2">
                    {v.editorialBody.map((paragraph) => (
                      <p key={paragraph} className="font-sans text-base leading-relaxed text-graphite">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </RevealOnScroll>
              ) : (
                <RevealOnScroll delay={300}>
                  <div className="hairline-gold" />
                </RevealOnScroll>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 03 — Visual reference set */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">IMAGE SET</p>
                <h2 className="section-heading mb-6">
                  Visual reference
                  <span className="block italic text-quarry-gold">set.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  Five compact frames cover material face, surface texture, edge detail, worked format, and source context before a buyer requests samples.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-fr">
            <RevealOnScroll className="lg:col-span-6 lg:row-span-2">
              <PlaceholderImage
                variant={imageSlots[0].variant}
                label={imageSlots[0].label}
                title={imageSlots[0].title}
                spec={imageSlots[0].spec}
                swapPath={imageSlots[0].swapPath}
                aspectRatio="aspect-[4/3] lg:h-full"
                className="shadow-[0_24px_60px_rgba(17,17,17,0.12)]"
              />
            </RevealOnScroll>
            {imageSlots.slice(1, 5).map((slot, i) => (
              <RevealOnScroll key={slot.label} delay={(i + 1) * 80} className="lg:col-span-3">
                <PlaceholderImage
                  variant={slot.variant}
                  label={slot.label}
                  title={slot.title}
                  spec={slot.spec}
                  swapPath={slot.swapPath}
                  aspectRatio="aspect-[4/3]"
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04 — Technical specification */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="mx-auto max-w-6xl">
              <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow-gold mb-5 no-justify">TECHNICAL</p>
                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-obsidian no-justify">
                    Technical Specification
                  </h2>
                </div>
                <Link href="/khadane/desk" className="cta-secondary no-justify">
                  <FileText size={16} strokeWidth={1.6} />
                  Request datasheet
                </Link>
              </div>
              <div className="border-y border-obsidian/10 bg-warm-white">
                {technicalRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-3 border-b border-obsidian/10 px-0 py-5 last:border-b-0 md:grid-cols-[18rem_1fr] md:gap-12 md:px-6"
                  >
                    <p className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-quarry-gold no-justify">
                      {row.label}
                    </p>
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-graphite">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-sans text-base lg:text-lg leading-relaxed text-graphite">
                Full technical datasheet (density, water absorption, compressive strength, flexural strength, freeze-thaw cycles, slip resistance) available on enquiry, or as a downloadable PDF.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 04 — Allied relationship note (if allied) */}
      {v.tier === 'allied' && v.alliedRelationship && (
        <section className="section-padding section-tobacco">
          <div className="container-editorial">
            <div className="max-w-3xl mx-auto text-center">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-8 no-justify">THE NETWORK · ALLIED</p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <p className="font-display italic text-2xl lg:text-3xl text-warm-white leading-snug no-justify">
                  {v.alliedRelationship}
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      )}

      {/* Section 05 — Use-case banner */}
      <section className="section-tobacco border-y border-quarry-gold/15">
        <div className="container-editorial py-12 lg:py-16">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <p className="eyebrow-gold mb-5 no-justify">APPLICATION RANGE</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-warm-white no-justify">
                  Use {v.name}
                  <span className="block italic text-quarry-gold">in unlimited different ways.</span>
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="font-sans text-base lg:text-lg leading-relaxed text-warm-white/75">
                  The catalogue formats are only the starting point. Custom sizes, surfaces, edges, and project drawings can be specified through the export desk.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 06 — Available formats */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">FORMAT COMPATIBILITY</p>
                <h2 className="section-heading mb-6">
                  Standard forms,
                  <span className="block italic text-quarry-gold">
                    custom possibilities.
                  </span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  The list below shows the main catalogue forms this stone can take. It is not the limit of how the stone can be used; final specification can be built around block size, surface, edge profile, drawings, order volume, and current quarry output.
                </p>
              </RevealOnScroll>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-px bg-obsidian/10 sm:grid-cols-2 lg:grid-cols-4">
            {featuredFormats.map((f, i) => (
              <RevealOnScroll key={f.slug} delay={Math.min(i * 40, 400)}>
                <Link href={`/khadane/formats/${f.slug}`} className="group flex min-h-44 flex-col justify-between bg-warm-white p-6 transition-colors duration-400 ease-editorial hover:bg-stone-linen">
                  <div>
                    <p className="font-mono text-xs text-quarry-gold no-justify mb-4">{f.code}</p>
                    <p className="font-display text-2xl leading-tight text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                      {f.name}
                    </p>
                  </div>
                  <p className="mt-8 font-sans text-xs leading-relaxed text-graphite no-justify">
                    {f.oneLine}
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
          {availableFormats.length > featuredFormats.length && (
            <RevealOnScroll delay={400}>
              <div className="mt-10 flex justify-center">
                <Link href="/khadane/formats" className="cta-text no-justify">
                  View all compatible formats <ArrowRight size={15} strokeWidth={1.6} />
                </Link>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      {/* Section 07 — Quote CTA */}
      <section className="section-padding section-dark texture-lines">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-8 no-justify">EXPORT DESK</p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-8 no-justify">
                  Specify {v.name}
                  <span className="block italic text-quarry-gold">against a real order.</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={250}>
                <p className="font-sans text-lg text-warm-white/70 leading-relaxed max-w-2xl">
                  Send the format, surface, edge, size, volume, delivery port, and target timeline. The desk responds within one business day with lead time, sample availability, and route options from Mundra.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5">
              <RevealOnScroll delay={300}>
                <div className="border border-warm-white/12 bg-warm-white/[0.04] p-8 lg:p-10">
                  <div className="space-y-6">
                    {[
                      ['Email', SITE.contact.publicEmail],
                      ['Response', 'Within one business day'],
                      ['Port', SITE.port],
                      ['Samples', 'On enquiry'],
                    ].map(([label, value]) => (
                      <div key={label} className="border-b border-warm-white/10 pb-5 last:border-b-0 last:pb-0">
                        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-quarry-gold no-justify mb-2">{label}</p>
                        <p className="font-sans text-base text-warm-white no-justify">{value}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/khadane/desk" className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-quarry-gold px-8 py-4 font-sans text-sm uppercase tracking-wider text-obsidian transition-colors duration-400 ease-editorial hover:bg-warm-white no-justify">
                    <Send size={16} strokeWidth={1.6} />
                    Send enquiry
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Section 07 — Prev/Next navigation */}
      <section className="section-warm border-t border-obsidian/10">
        <div className="container-editorial py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-4">
            <Link href={`/khadane/collection/${prev.slug}`} className="group block">
              <p className="font-mono text-xs text-tobacco/60 mb-2 no-justify">← PREVIOUS · {prev.code}</p>
              <p className="font-display text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                {prev.name}
              </p>
            </Link>
            <Link href={`/khadane/collection/${next.slug}`} className="group block text-right">
              <p className="font-mono text-xs text-tobacco/60 mb-2 no-justify">NEXT · {next.code} →</p>
              <p className="font-display text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                {next.name}
              </p>
            </Link>
          </div>
        </div>
      </section>

      <BrandWhisper customLine={`${v.name} · ${v.code} · ${v.district}`} />
    </>
  )
}
