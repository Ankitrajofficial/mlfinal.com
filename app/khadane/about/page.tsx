import Link from 'next/link'
import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'About KHADANE™',
  description: 'KHADANE™ is the customer-facing trade brand of Dhakar Stone Impex, the export operation of the Dhakar Stones Group within Mohan Lal & Sons.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="max-w-5xl">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">ABOUT</p>
            </div>
            <HeroWordRise
              as="h1"
              words={['A', 'house', 'of', 'stone.']}
              className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.95] text-obsidian mb-10"
              baseDelay={250}
              staggerDelay={130}
            />
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1100ms' }}>
              <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl mb-8">
                Since 1972. Direct from Bijolia. Shipped worldwide.
              </p>
              <p className="editorial-body max-w-2xl">
                KHADANE™ is the customer-facing trade brand of {SITE.exportOperation}, the export operation of the {SITE.groupOperation} within {SITE.groupParent}. We quarry, process, and ship Indian sandstone direct from the Bijolia belt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Operation */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-24 lg:mb-32">
            <div className="lg:col-span-6">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">THE OPERATION</p>
                <h2 className="section-heading mb-8">
                  Quarry,
                  <span className="block italic text-quarry-gold">processing,</span>
                  port.
                </h2>
                <p className="editorial-body mb-6">
                  The full operational chain sits in-house: extraction in Bijolia, processing across three units, container loading at our own facility before transit to Mundra Port on the Gujarat coast.
                </p>
                <p className="editorial-body">
                  Nothing about the supply chain is outsourced. The stone you receive moved through one set of hands — ours.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-6">
              <RevealOnScroll>
                <PlaceholderImage
                  variant="yard"
                  label="OPERATIONS"
                  title="In-house chain."
                  spec="1600 × 1200px · Documentary processing yard"
                  swapPath="/img/about/operations.jpg"
                  aspectRatio="aspect-[4/3]"
                />
              </RevealOnScroll>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <RevealOnScroll>
                <PlaceholderImage
                  variant="stone-warm"
                  label="HERITAGE"
                  title="A house of five operations."
                  spec="1600 × 1200px · MLS contextual photography"
                  swapPath="/img/about/heritage.jpg"
                  aspectRatio="aspect-[4/3]"
                />
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">THE HOUSE</p>
                <h2 className="section-heading mb-8">
                  Five operations.
                  <span className="block italic text-quarry-gold">One family.</span>
                </h2>
                <p className="editorial-body mb-6">
                  Mohan Lal &amp; Sons operates across five verticals: Stone &amp; Export (KHADANE™), Automotive &amp; Fuel, Hospitality, Student Housing, and Food Services. Each operates independently. KHADANE™ is the international face of the stone vertical.
                </p>
                <Link href="/khadane/group" className="cta-text mt-4">The full group →</Link>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* The Promise */}
      <section className="section-padding section-tobacco">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <p className="eyebrow-gold mb-6 no-justify">THE PROMISE</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-10 no-justify">
                What you order
                <span className="block italic text-quarry-gold">is what you ship.</span>
              </h2>
              <p className="font-sans text-lg text-warm-white/80 leading-relaxed max-w-2xl mx-auto">
                We sample. You approve. We hand-pick to that approved sample. Every container is photographed during loading. Specifications are met or we don't ship.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-cream">
        <div className="container-editorial text-center max-w-3xl mx-auto">
          <RevealOnScroll>
            <h2 className="section-heading mb-8">
              Have a project
              <span className="block italic text-quarry-gold">to talk about?</span>
            </h2>
            <Link href="/khadane/desk" className="cta-primary no-justify">Write to The Desk →</Link>
          </RevealOnScroll>
        </div>
      </section>

      <BrandWhisper />
    </>
  )
}
