import Link from 'next/link'
import { FORMATS } from '@/lib/khadane/formats'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'The Formats — 14 sandstone formats',
  description: 'Fourteen production formats spanning raw blocks, calibrated paving, architectural cladding, copings, and landscape accessories.',
}

export default function FormatsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="max-w-5xl">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">02 · THE FORMATS</p>
            </div>
            <HeroWordRise
              as="h1"
              words={['Fourteen', 'ways', 'to', 'ship', 'stone.']}
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05] text-obsidian mb-10"
              baseDelay={250}
              staggerDelay={130}
            />
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1500ms' }}>
              <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl mb-12">
                Raw block to finished landscape. Every order in five dimensions.
              </p>
              <div className="max-w-2xl">
                <p className="editorial-body">
                  Every shipment is specified across five dimensions: Variety × Format × Cutting × Surface × Size. Format is the second of those dimensions — and the one that determines what stone arrives at your site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Format grid */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="mb-12 max-w-3xl">
              <p className="eyebrow mb-6 no-justify">14 PRODUCTION FORMATS</p>
              <h2 className="section-heading">
                From raw blocks
                <span className="block italic text-quarry-gold">to garden accessories.</span>
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-obsidian/10">
            {FORMATS.map((f, i) => (
              <RevealOnScroll key={f.slug} delay={Math.min(i * 40, 400)}>
                <Link href={`/formats/${f.slug}`} className="block bg-warm-white p-8 lg:p-10 group hover:bg-stone-linen transition-colors duration-400 ease-editorial h-full">
                  <p className="font-mono text-xs text-quarry-gold no-justify mb-4">{f.code}</p>
                  <h3 className="font-display text-3xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors mb-4 leading-tight">
                    {f.name}
                  </h3>
                  <p className="font-sans text-sm text-graphite leading-relaxed mb-6">
                    {f.oneLine}
                  </p>
                  {f.bsEN && (
                    <p className="font-mono text-xs text-tobacco/60 no-justify mb-3">
                      Aligns with {f.bsEN}
                    </p>
                  )}
                  <p className="font-mono text-xs text-tobacco/40 no-justify">
                    {f.varietyAvailability} {f.varietyAvailability === 1 ? 'variety' : 'varieties'}
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <BrandWhisper variant="gold" />
    </>
  )
}
