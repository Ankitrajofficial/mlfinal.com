import Link from 'next/link'
import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'The Yard — Processing, calibration, shipping',
  description: 'Three processing units. BS EN tolerances. Container loading at our own facility. Direct to Mundra Port.',
}

export default function YardPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="max-w-5xl">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">05 · THE YARD</p>
            </div>
            <HeroWordRise
              as="h1"
              words={['Where', 'stone', 'becomes', 'a', 'shipment.']}
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05] text-obsidian mb-10"
              baseDelay={250}
              staggerDelay={130}
            />
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1500ms' }}>
              <p className="font-display italic text-2xl text-quarry-gold no-justify max-w-2xl">
                Processing. Calibration. Inspection. Loading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three-statement intro */}
      <section className="section-padding section-cream">
        <div className="container-editorial max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="section-heading mb-12">
              Three processing units.
              <span className="block italic text-quarry-gold mt-3">BS EN tolerances.</span>
              <span className="block mt-3">One container line.</span>
            </h2>
          </RevealOnScroll>
        </div>
      </section>

      {/* Process steps */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="space-y-24 lg:space-y-32">
            {[
              {
                num: '01',
                title: 'Extraction & block selection.',
                body: 'Blocks are selected at the quarry face for grain consistency, freedom from cracks and inclusions, and dimensional viability. Marked, batched, and dispatched to the yard.',
                variant: 'quarry' as const,
              },
              {
                num: '02',
                title: 'Cutting & calibration.',
                body: 'Multi-blade gangsaw for large slabs. Block-cutters for paving and tile sections. Calibration to BS EN tolerances for 22mm export-default and project-specific thicknesses.',
                variant: 'yard' as const,
              },
              {
                num: '03',
                title: 'Surface finishing.',
                body: 'Fourteen surface finishes available. Riven (split-face), sandblasted, sawn, honed, polished, brushed, flamed, antique, leather, bush-hammered — selected per project.',
                variant: 'stone' as const,
              },
              {
                num: '04',
                title: 'Hand-picking & quality control.',
                body: 'Every order is hand-picked against approved samples. Variation managed within agreed batch tolerance. Reject pile photographed and reported per shipment.',
                variant: 'stone-warm' as const,
              },
              {
                num: '05',
                title: 'Container loading.',
                body: 'Loading at our own facility before transit to Mundra Port. Crate or wooden pallet, fumigated where required. Loading photographs supplied per container.',
                variant: 'belt' as const,
              },
            ].map((step, i) => (
              <RevealOnScroll key={step.num} delay={100}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <PlaceholderImage
                      variant={step.variant}
                      label={`STEP ${step.num}`}
                      title={step.title}
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                  <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <p className="font-mono text-sm text-quarry-gold mb-4 no-justify">PROCESS · {step.num}</p>
                    <h3 className="font-display text-3xl lg:text-4xl tracking-tight leading-tight text-obsidian no-justify mb-6">
                      {step.title}
                    </h3>
                    <p className="editorial-body">{step.body}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Five-dimension reminder */}
      <section className="section-padding section-tobacco">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="eyebrow-gold mb-6 no-justify">THE TRADE SPEC</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white no-justify">
                Every order specified
                <span className="block italic text-quarry-gold">in five dimensions.</span>
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-warm-white/10">
            {[
              { label: 'Variety', count: '21' },
              { label: 'Format', count: '14' },
              { label: 'Cutting', count: '4' },
              { label: 'Surface', count: '14' },
              { label: 'Size', count: '13' },
            ].map((d, i) => (
              <RevealOnScroll key={d.label} delay={i * 80}>
                <div className="bg-tobacco p-6 lg:p-8 text-center">
                  <p className="font-display text-5xl text-quarry-gold mb-3 no-justify">{d.count}</p>
                  <p className="font-sans text-xs uppercase tracking-eyebrow text-warm-white no-justify">{d.label}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="section-padding section-cream">
        <div className="container-editorial max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="section-heading mb-8">
              Have a project
              <span className="block italic text-quarry-gold">to specify?</span>
            </h2>
            <p className="editorial-body mb-10">
              Tell us the variety, format, finish, size, and volume. Quote returned within one business day with lead time and shipping option.
            </p>
            <Link href="/khadane/desk" className="cta-primary no-justify">
              Write to The Desk →
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      <BrandWhisper />
    </>
  )
}
