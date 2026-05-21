import Link from 'next/link'
import { VARIETIES, getOwnedVarieties, getAlliedVarieties } from '@/lib/khadane/varieties'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'The Collection — 21 sandstone varieties',
  description: 'Twelve owned varieties from quarries we operate in the Bijolia belt. Nine allied varieties sourced direct from heritage partners across India.',
}

export default function CollectionPage() {
  const owned = getOwnedVarieties()
  const allied = getAlliedVarieties()

  return (
    <>
      {/* Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="max-w-5xl">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">01 · THE COLLECTION</p>
            </div>
            <HeroWordRise
              as="h1"
              words={['Twenty-one', 'sandstone', 'varieties.']}
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05] text-obsidian mb-10"
              baseDelay={250}
              staggerDelay={140}
            />
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1200ms' }}>
              <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl">
                Twelve owned. Nine allied. All Indian.
              </p>
              <div className="mt-12 max-w-2xl">
                <p className="editorial-body">
                  Our owned varieties come from quarries we operate ourselves in the Bijolia sandstone belt. Our allied varieties come from heritage partners we have worked with for decades, sourced direct and shipped under {`Dhakar Stone Impex`} custody.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Owned varieties */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="mb-12 lg:mb-16 max-w-3xl">
              <p className="eyebrow-gold mb-6 no-justify">OWNED &amp; OPERATED · 12 VARIETIES</p>
              <h2 className="section-heading mb-6">
                From quarries
                <span className="block italic text-quarry-gold">we own.</span>
              </h2>
              <p className="editorial-body">
                The Bijolia belt sits across the Bhilwara and Bundi districts of southern Rajasthan. We've operated here for over five decades.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {owned.map((v, i) => (
              <RevealOnScroll key={v.slug} delay={Math.min(i * 40, 400)}>
                <Link href={`/khadane/collection/${v.slug}`} className="group block">
                  <PlaceholderImage
                    variant={v.placeholderClass.replace('placeholder-', '') as any}
                    label={v.code}
                    title={v.name}
                    aspectRatio="aspect-[3/4]"
                    className="transition-transform duration-600 ease-editorial group-hover:scale-[1.02]"
                  />
                  <div className="mt-3">
                    <p className="font-display text-lg text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                      {v.name}
                    </p>
                    <p className="font-mono text-xs text-tobacco/60 mt-1 no-justify">{v.code}</p>
                    <p className="font-sans text-xs text-graphite mt-2 line-clamp-2 leading-snug">
                      {v.oneLine}
                    </p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Allied varieties */}
      <section className="section-padding section-tobacco">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="mb-12 lg:mb-16 max-w-3xl">
              <p className="eyebrow-gold mb-6 no-justify">ALLIED · THE NETWORK · 9 VARIETIES</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-6 no-justify">
                Sourced direct
                <span className="block italic text-quarry-gold">from heritage partners.</span>
              </h2>
              <p className="font-sans text-lg text-warm-white/80 leading-relaxed">
                Some varieties — Agra Red from Dholpur, Jodhpur Chittar, Jaisalmer Yellow, Sagar Black, Teakwood from Nagaur — sit outside the Bijolia belt. For these we work direct with operators who have produced these stones for generations.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-5">
            {allied.map((v, i) => (
              <RevealOnScroll key={v.slug} delay={Math.min(i * 50, 400)}>
                <Link href={`/khadane/collection/${v.slug}`} className="group block">
                  <div className="aspect-[3/4] placeholder-base placeholder-stone-warm border border-quarry-gold/20 transition-transform duration-600 ease-editorial group-hover:scale-[1.02]">
                    <div className="placeholder-caption">
                      <span className="ph-label">{v.code}</span>
                      <span className="ph-title text-warm-white/90">{v.name}</span>
                      <span className="ph-spec">{v.district}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-display text-lg text-warm-white no-justify group-hover:text-quarry-gold transition-colors">
                      {v.name}
                    </p>
                    <p className="font-mono text-xs text-warm-white/50 mt-1 no-justify">{v.code} · {v.district}</p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <BrandWhisper />
    </>
  )
}
