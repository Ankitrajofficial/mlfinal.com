import Link from 'next/link'
import Image from 'next/image'
import { SITE, ASSETS } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'The Group — Mohan Lal & Sons',
  description: 'KHADANE™ is the stone & export vertical of Mohan Lal & Sons — a family enterprise established in 1972 in Bijolia, Rajasthan. The full house operates across five verticals.',
}

const VERTICALS = [
  {
    code: 'I',
    name: 'Stone & Export',
    brand: 'KHADANE™',
    operation: 'Dhakar Stones Group · Dhakar Stone Impex',
    description: 'Indian sandstone quarried in the Bijolia belt. The international export vertical of the house.',
    href: '/',
    color: 'quarry',
  },
  {
    code: 'II',
    name: 'Automotive & Fuel',
    brand: 'Dhakar Motors · Dharnidhar Fuels',
    operation: 'Family-owned dealership and fuel operations',
    description: 'Automotive sales and service, along with fuel station operations across the Bijolia region.',
    color: 'stone',
  },
  {
    code: 'III',
    name: 'Hospitality',
    brand: 'M3 Hotel',
    operation: 'Hospitality operation',
    description: 'Hospitality operation serving the Bhilwara–Bijolia corridor.',
    color: 'stone-warm',
  },
  {
    code: 'IV',
    name: 'Student Housing',
    brand: 'Multiple PGs · Kota',
    operation: 'Student accommodation operations',
    description: 'Student accommodation operations in Kota, the test preparation capital of India.',
    color: 'yard',
  },
  {
    code: 'V',
    name: 'Food Services',
    brand: 'Vyanjanam',
    operation: 'Divine Food Services',
    description: 'Saatvik meal services for the Kota student community. The newest vertical in the house.',
    color: 'stone-warm',
  },
]

export default function GroupPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="max-w-5xl">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">08 · THE GROUP</p>
            </div>
            <HeroWordRise
              as="h1"
              words={['A', 'house', 'of', 'five.']}
              className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.95] text-obsidian mb-10"
              baseDelay={250}
              staggerDelay={140}
            />
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1100ms' }}>
              <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl mb-12">
                Established 1972 · Bijolia · Bhilwara District · Rajasthan
              </p>
              <Link
                href="/mls"
                aria-label="Open Mohan Lal & Sons homepage"
                className="flex justify-start max-w-md transition-opacity hover:opacity-80"
              >
                <Image
                  src={ASSETS.mls.lockup.onLight}
                  alt="Mohan Lal & Sons · Est. 1972"
                  width={500}
                  height={195}
                  className="w-full h-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture statement */}
      <section className="section-padding section-cream">
        <div className="container-editorial max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="section-heading mb-12">
              {SITE.groupParent} operates
              <span className="block italic text-quarry-gold mt-2">across five verticals.</span>
              <span className="block mt-2">KHADANE™ is the first.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={250}>
            <p className="editorial-body">
              The family enterprise was established in 1972 by Mohan Lal Dhakar in Bijolia. The current generation operates across stone export, automotive, hospitality, student housing, and food services. Each vertical is independently run with its own operational team.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* The Five */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="mb-12 lg:mb-16 max-w-3xl">
              <p className="eyebrow mb-6 no-justify">THE FIVE</p>
              <h2 className="section-heading">
                Five independent
                <span className="block italic text-quarry-gold">operations.</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="space-y-24 lg:space-y-32">
            {VERTICALS.map((v, i) => (
              <RevealOnScroll key={v.code} delay={100}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <PlaceholderImage
                      variant={v.color as any}
                      label={`VERTICAL ${v.code}`}
                      title={v.name}
                      aspectRatio="aspect-[4/5]"
                    />
                  </div>
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <p className="font-mono text-sm text-quarry-gold mb-4 no-justify">VERTICAL · {v.code}</p>
                    <h3 className="font-display text-4xl lg:text-5xl tracking-tight leading-tight text-obsidian no-justify mb-3">
                      {v.name}
                    </h3>
                    <p className="font-display italic text-2xl text-quarry-gold no-justify mb-6">
                      {v.brand}
                    </p>
                    <p className="font-mono text-xs text-tobacco/60 uppercase tracking-eyebrow no-justify mb-6">
                      {v.operation}
                    </p>
                    <p className="editorial-body mb-6">
                      {v.description}
                    </p>
                    {v.href && (
                      <Link href={v.href} className="cta-text">
                        Inside KHADANE™ →
                      </Link>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Parent site link */}
      <section className="section-padding section-tobacco">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <RevealOnScroll>
              <Link
                href="/mls"
                aria-label="Open Mohan Lal & Sons homepage"
                className="mb-10 flex justify-center transition-opacity hover:opacity-80"
              >
                <Image
                  src={ASSETS.mls.lockup.onDark}
                  alt="Mohan Lal & Sons"
                  width={400}
                  height={156}
                  className="w-[260px] lg:w-[400px] h-auto"
                />
              </Link>
              <p className="font-display italic text-2xl lg:text-3xl text-warm-white leading-snug mb-10 no-justify">
                For the full house — across all five verticals — visit our parent site.
              </p>
              <a
                href={SITE.parent.site}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-3 px-8 py-4 border border-quarry-gold text-quarry-gold font-sans text-sm tracking-wider uppercase hover:bg-quarry-gold hover:text-obsidian transition-all duration-400 ease-editorial no-justify"
              >
                mohanlalsonsgroup.com →
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <BrandWhisper customLine={SITE.signature} />
    </>
  )
}
