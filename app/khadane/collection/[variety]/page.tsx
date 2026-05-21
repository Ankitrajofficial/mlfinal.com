import Link from 'next/link'
import { notFound } from 'next/navigation'
import { VARIETIES, getVariety, getPrevVariety, getNextVariety } from '@/lib/khadane/varieties'
import { FORMATS } from '@/lib/khadane/formats'
import { SITE } from '@/lib/khadane/site'
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

  const prev = getPrevVariety(v.rank)
  const next = getNextVariety(v.rank)

  // Format availability for this variety
  const availableFormats = v.formatExceptions?.includes('blocks-only')
    ? FORMATS.filter((f) => f.slug === 'quarry-blocks')
    : FORMATS

  return (
    <>
      {/* Section 01 — Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <p className="eyebrow-gold mb-6 no-justify">
                  {v.code} · {v.tierLabel.toUpperCase()}
                </p>
              </div>
              <HeroWordRise
                as="h1"
                words={[v.name + '.']}
                className="font-display text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] text-obsidian mb-6"
                baseDelay={200}
                staggerDelay={130}
              />
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '900ms' }}>
                <p className="hindi-tag text-3xl lg:text-4xl mb-10 no-justify">
                  {v.nameHindi}
                </p>
                <p className="font-display italic text-2xl text-quarry-gold mb-8 no-justify max-w-xl">
                  {v.oneLine}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/khadane/desk" className="cta-primary no-justify">
                    Quote for {v.name}
                  </Link>
                  <Link href="/khadane/collection" className="cta-secondary no-justify">
                    All varieties
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <PlaceholderImage
                variant={v.placeholderClass.replace('placeholder-', '') as any}
                label={v.code}
                title={v.name}
                spec={`Hero image · ${v.district} · 22mm calibrated slab on neutral background`}
                swapPath={`/img/varieties/${v.slug}-hero.jpg`}
                aspectRatio="aspect-[4/5]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 — In hand headline */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <p className="eyebrow mb-6 no-justify">IN HAND</p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="section-heading mb-10">{v.inHandHeadline}</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <div className="hairline-gold mx-auto" />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Section 03 — Spec sheet */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">SPEC SHEET</p>
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight leading-tight text-obsidian mb-6 no-justify">
                  What you should know.
                </h2>
                <p className="editorial-body">
                  The trade-relevant facts at a glance. For full specification including BS EN data, request the technical sheet from The Desk.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-obsidian/10">
                {[
                  { label: 'Code', value: v.code },
                  { label: 'Tier', value: v.tierLabel },
                  { label: 'District', value: v.district },
                  { label: 'Formation', value: v.formation },
                  { label: 'Trade names', value: v.tradeNames },
                  { label: 'Format scope', value: v.formatScope },
                  ...(v.alternateNames ? [{ label: 'Also marketed as', value: v.alternateNames.join(', ') }] : []),
                ].map((row, i) => (
                  <RevealOnScroll key={row.label} delay={i * 50}>
                    <div className="bg-warm-white p-6 lg:p-8">
                      <p className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 no-justify mb-2">
                        {row.label}
                      </p>
                      <p className="font-display text-lg lg:text-xl text-obsidian no-justify">
                        {row.value}
                      </p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
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

      {/* Section 05 — Available formats */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="mb-12 lg:mb-16 max-w-3xl">
            <RevealOnScroll>
              <p className="eyebrow-gold mb-6 no-justify">FORMATS</p>
              <h2 className="section-heading mb-6">
                Available in
                <span className="block italic text-quarry-gold">
                  {availableFormats.length === 1 ? 'one format only' : `${availableFormats.length} formats`}.
                </span>
              </h2>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableFormats.map((f, i) => (
              <RevealOnScroll key={f.slug} delay={Math.min(i * 40, 400)}>
                <Link href={`/khadane/formats/${f.slug}`} className="block p-5 bg-warm-white hover:bg-stone-linen transition-colors group">
                  <p className="font-mono text-xs text-quarry-gold no-justify mb-3">{f.code}</p>
                  <p className="font-display text-lg text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                    {f.name}
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section 06 — Quote CTA */}
      <section className="section-padding section-dark">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <RevealOnScroll>
              <p className="eyebrow-gold mb-8 no-justify">QUOTE</p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-10 no-justify">
                Working on a project
                <span className="block italic text-quarry-gold">that needs {v.name}?</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-sans text-lg text-warm-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
                Tell us the format, finish, size, and volume. Quote returned within one business day.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <Link href="/khadane/desk" className="inline-flex items-center gap-3 px-10 py-5 bg-quarry-gold text-obsidian font-sans text-sm tracking-wider uppercase hover:bg-warm-white transition-all duration-400 ease-editorial no-justify">
                Quote for {v.name} →
              </Link>
            </RevealOnScroll>
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
