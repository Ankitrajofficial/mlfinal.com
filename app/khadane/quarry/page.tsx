import Link from 'next/link'
import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'The Quarry — Bijolia, Rajasthan',
  description: 'A working geology over eight centuries old. The Bijolia sandstone belt sits across the Bhilwara and Bundi districts of southern Rajasthan.',
}

export default function QuarryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end section-dark texture-lines overflow-hidden">
        <div className="absolute inset-0">
          <PlaceholderImage
            variant="quarry"
            label="QUARRY · HERO"
            title="The Bijolia working face."
            spec="2400 × 1600px · Documentary landscape, working quarry with stone strata"
            swapPath="/img/quarry/hero.jpg"
            aspectRatio="absolute inset-0"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian" />
        </div>
        <div className="relative z-10 container-editorial pb-16 lg:pb-24 pt-32 lg:pt-40">
          <div className="max-w-4xl">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">03 · THE QUARRY</p>
            </div>
            <HeroWordRise
              as="h1"
              words={['We', 'are', 'the', 'source.', 'Not', 'the', 'broker.']}
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05] text-warm-white mb-10"
              baseDelay={400}
              staggerDelay={120}
            />
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '2000ms' }}>
              <p className="font-display italic text-2xl text-quarry-gold no-justify max-w-2xl">
                Bijolia · Bhilwara District · Rajasthan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three-statement intro */}
      <section className="section-warm py-20 lg:py-28">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <RevealOnScroll>
              <h2 className="section-heading mb-12">
                Eight centuries of working geology.
                <span className="block italic text-quarry-gold mt-3">Five decades of family operation.</span>
                <span className="block mt-3">One source. Quarried and shipped.</span>
              </h2>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="section-cream py-16 lg:py-24">
        <div className="container-editorial">
          <div className="mb-10 lg:mb-12 max-w-3xl">
            <RevealOnScroll>
              <p className="eyebrow-gold mb-5 no-justify">QUARRY CAPACITY</p>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.08] text-obsidian no-justify">
                The numbers are operational,
                <span className="block italic text-quarry-gold mt-2">not decorative.</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <p className="mt-6 max-w-2xl font-sans text-base lg:text-lg leading-relaxed text-graphite">
                The Bijolia belt is where the catalogue begins: owned quarries,
                direct extraction, processing custody, and export capacity under
                one house.
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr gap-px bg-obsidian/10">
            {[
              {
                num: SITE.bijoliaBeltYears.toString(),
                label: 'Years of recorded sandstone production',
                note: 'A stone belt with dated working history around Bijolia.',
              },
              {
                num: SITE.quarryCount,
                label: 'Quarries in operation',
                note: 'Owned and operated sources across the sandstone belt.',
              },
              {
                num: '2M+',
                label: 'Sq.m annual output',
                note: SITE.annualOutput,
              },
              {
                num: SITE.workforceCount,
                label: 'Workforce',
                note: 'Extraction, selection, processing, packing, and dispatch.',
              },
            ].map((s, i) => (
              <RevealOnScroll key={s.label} delay={i * 80} className="h-full">
                <div className="flex h-full min-h-[19rem] flex-col justify-between bg-warm-white p-8 lg:p-10">
                  <div>
                    <p className="font-display text-5xl lg:text-6xl text-quarry-gold no-justify mb-5">
                      {s.num}
                    </p>
                    <p className="font-sans text-xs uppercase tracking-eyebrow text-tobacco no-justify">
                      {s.label}
                    </p>
                  </div>
                  <p className="mt-10 border-t border-obsidian/10 pt-5 font-sans text-sm leading-relaxed text-graphite">
                    {s.note}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* The Geology */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <RevealOnScroll>
                <PlaceholderImage
                  variant="stone-warm"
                  label="GEOLOGY · STRATA"
                  title="Vindhyan Supergroup."
                  spec="1600 × 1200px · Cross-section of working quarry showing strata layers"
                  swapPath="/img/quarry/geology-strata.jpg"
                  aspectRatio="aspect-[4/3]"
                />
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-6">
              <RevealOnScroll delay={100}>
                <p className="eyebrow mb-6 no-justify">THE GEOLOGY</p>
                <h2 className="section-heading mb-8">
                  Vindhyan Supergroup.
                  <span className="block italic text-quarry-gold">Bhander Group.</span>
                </h2>
                <p className="editorial-body mb-6">
                  The Bijolia sandstone belt sits on the western edge of the Vindhyan Supergroup — one of the largest preserved sedimentary basins on Earth. The Bhander Group, where most of our varieties originate, is roughly 1 billion years old.
                </p>
                <p className="editorial-body">
                  This geology produces the fine-grained, dense, dimensionally stable sandstones that ship around the world. Kandla Grey, Autumn Brown, Raj Green, Raveena White, Camel Dust, Kaansiya Red, Rainbow, Dual Tone — all from this belt.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Direct-source */}
      <section className="section-padding section-tobacco">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">DIRECT-SOURCE</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-8 no-justify">
                  No middlemen.
                  <span className="block italic text-quarry-gold">No repackaging.</span>
                </h2>
                <p className="font-sans text-lg text-warm-white/80 leading-relaxed mb-6">
                  Every owned variety comes from a quarry we control end to end. Extraction. Selection. Block dimensioning. Pre-processing inspection. We do not buy through brokers and we do not relabel stone from other suppliers.
                </p>
                <p className="font-sans text-lg text-warm-white/80 leading-relaxed">
                  For our allied varieties — Agra Red, Jaisalmer Yellow, Sagar Black, Teakwood — we work direct with heritage operators we've known for decades. Allied does not mean traded; allied means sourced direct, processed and shipped under our custody.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <RevealOnScroll>
                <PlaceholderImage
                  variant="quarry"
                  label="QUARRY · WORKING FACE"
                  title="Direct-source extraction."
                  spec="1600 × 1200px · Active extraction with workforce visible"
                  swapPath="/img/quarry/extraction.jpg"
                  aspectRatio="aspect-[4/3]"
                />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding section-cream">
        <div className="container-editorial text-center max-w-3xl mx-auto">
          <RevealOnScroll>
            <h2 className="section-heading mb-8">
              See the catalogue
              <span className="block italic text-quarry-gold">this geology produces.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/khadane/collection" className="cta-primary no-justify">The Collection →</Link>
              <Link href="/khadane/yard" className="cta-secondary no-justify">The Yard →</Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <BrandWhisper variant="gold" />
    </>
  )
}
