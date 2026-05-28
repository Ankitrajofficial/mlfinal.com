import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FORMATS, getFormat, getPrevFormat, getNextFormat } from '@/lib/khadane/formats'
import { VARIETIES } from '@/lib/khadane/varieties'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export function generateStaticParams() {
  return FORMATS.map((f) => ({ format: f.slug }))
}

type FormatPageProps = {
  params: Promise<{ format: string }>
}

export async function generateMetadata({ params }: FormatPageProps) {
  const { format } = await params
  const f = getFormat(format)
  if (!f) return { title: 'Not found' }
  return {
    title: `${f.name} — ${f.code}`,
    description: f.description,
  }
}

export default async function FormatPage({ params }: FormatPageProps) {
  const { format } = await params
  const f = getFormat(format)
  if (!f) notFound()

  const prev = getPrevFormat(f.rank)
  const next = getNextFormat(f.rank)

  // Available varieties — varieties that produce in this format
  const availableVarieties =
    f.slug === 'quarry-blocks'
      ? VARIETIES
      : VARIETIES.filter((v) => !v.formatExceptions?.includes('block-first') || ['gangsaw-slabs', 'wall-cladding', 'cobble-setts', 'window-sills', 'copings', 'block-steps-treads'].includes(f.slug))

  return (
    <>
      {/* Section 01 — Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <p className="eyebrow-gold mb-6 no-justify">{f.code} · FORMAT</p>
              </div>
              <HeroWordRise
                as="h1"
                words={[f.name + '.']}
                className="font-display text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] text-obsidian mb-8"
                baseDelay={200}
                staggerDelay={130}
              />
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '900ms' }}>
                <p className="font-display italic text-2xl text-quarry-gold mb-10 no-justify max-w-xl">
                  {f.formatHeadline}
                </p>
                <p className="editorial-body max-w-xl mb-10">
                  {f.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/khadane/desk" className="cta-primary no-justify">
                    Quote for {f.name}
                  </Link>
                  <Link href="/khadane/formats" className="cta-secondary no-justify">
                    All formats
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <PlaceholderImage
                variant={f.placeholderClass.replace('placeholder-', '') as any}
                label={f.code}
                title={f.name}
                spec={`Documentary · ${f.name} in production or completed installation`}
                swapPath={`/img/formats/${f.slug}-hero.jpg`}
                aspectRatio="aspect-[4/5]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 — Spec */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">FORMAT SPEC</p>
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight leading-tight text-obsidian no-justify mb-6">
                  What you should know.
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-obsidian/10">
                {[
                  { label: 'Code', value: f.code },
                  { label: 'Primary use', value: f.primaryUse },
                  { label: 'Variety availability', value: `${availableVarieties.length} of 23 varieties` },
                  { label: 'Surfaces available', value: f.surfacesAvailable.join(', ') || 'On enquiry' },
                  { label: 'Edges available', value: f.edgesAvailable.join(', ') || 'On enquiry' },
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

      {/* Section 03 — Available varieties */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="mb-12 max-w-3xl">
            <RevealOnScroll>
              <p className="eyebrow-gold mb-6 no-justify">AVAILABLE IN</p>
              <h2 className="section-heading">
                {availableVarieties.length} {availableVarieties.length === 1 ? 'variety' : 'varieties'}
                <span className="block italic text-quarry-gold">produce in {f.name}.</span>
              </h2>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableVarieties.map((v, i) => (
              <RevealOnScroll key={v.slug} delay={Math.min(i * 30, 400)}>
                <Link href={`/khadane/collection/${v.slug}`} className="block p-5 bg-stone-linen/40 hover:bg-stone-linen transition-colors group">
                  <p className="font-mono text-xs text-quarry-gold no-justify mb-2">{v.code}</p>
                  <p className="font-display text-lg text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                    {v.name}
                  </p>
                  <p className="font-mono text-[10px] text-tobacco/50 mt-1 no-justify">{v.tierLabel}</p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04 — Quote CTA */}
      <section className="section-padding section-dark">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <RevealOnScroll>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-10 no-justify">
                Need {f.name}
                <span className="block italic text-quarry-gold">for a project?</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-sans text-lg text-warm-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
                Tell us the variety, finish, size, and volume. Quote returned within one business day.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <Link href="/khadane/desk" className="inline-flex items-center gap-3 px-10 py-5 bg-quarry-gold text-obsidian font-sans text-sm tracking-wider uppercase hover:bg-warm-white transition-all duration-400 ease-editorial no-justify">
                Quote for {f.name} →
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Section 05 — Prev/Next */}
      <section className="section-warm border-t border-obsidian/10">
        <div className="container-editorial py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-4">
            <Link href={`/khadane/formats/${prev.slug}`} className="group block">
              <p className="font-mono text-xs text-tobacco/60 mb-2 no-justify">← PREVIOUS · {prev.code}</p>
              <p className="font-display text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                {prev.name}
              </p>
            </Link>
            <Link href={`/khadane/formats/${next.slug}`} className="group block text-right">
              <p className="font-mono text-xs text-tobacco/60 mb-2 no-justify">NEXT · {next.code} →</p>
              <p className="font-display text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                {next.name}
              </p>
            </Link>
          </div>
        </div>
      </section>

      <BrandWhisper customLine={`${f.name} · ${f.code}`} />
    </>
  )
}
