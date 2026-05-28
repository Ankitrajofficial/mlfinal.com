import Link from 'next/link'
import { ArrowRight, BadgeCheck, Gem, Layers3, MapPin, PackageCheck } from 'lucide-react'
import { VARIETIES, getOwnedVarieties, getAlliedVarieties } from '@/lib/khadane/varieties'
import { SITE } from '@/lib/khadane/site'
import { getVarietyImage } from '@/lib/khadane/variety-images'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'The Collection — 23 sandstone varieties',
  description: 'Twenty-three sandstones, owned and allied. Each one, the surfaces and edges and formats it can take.',
}

export default function CollectionPage() {
  const owned = getOwnedVarieties()
  const allied = getAlliedVarieties()
  const founding = VARIETIES.filter((v) => v.foundingStone)
  const heroStones = VARIETIES.slice(0, 6)

  const StoneCard = ({
    v,
    dark = false,
    delay,
  }: {
    v: (typeof VARIETIES)[number]
    dark?: boolean
    delay: number
  }) => (
    <RevealOnScroll delay={delay}>
      <Link href={`/khadane/collection/${v.slug}`} className="group block h-full">
        <div className={`flex h-full flex-col ${dark ? 'bg-warm-white/[0.04]' : 'bg-warm-white'} transition-colors duration-400 ease-editorial ${dark ? 'hover:bg-warm-white/[0.07]' : 'hover:bg-stone-linen/70'}`}>
          <PlaceholderImage
            variant={v.placeholderClass.replace('placeholder-', '') as any}
            label={v.code}
            title={v.name}
            spec={v.district}
            aspectRatio="aspect-[4/3]"
            swapPath={getVarietyImage(v.slug, 'thumb', getVarietyImage(v.slug, 'hero', `/img/varieties/${v.slug}-thumb.jpg`))}
            className="transition-transform duration-700 ease-editorial group-hover:scale-[1.015]"
          />
          <div className="flex flex-1 flex-col p-5 lg:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-quarry-gold no-justify">
                {v.code}
              </span>
              {v.foundingStone && (
                <span className={`border px-2 py-1 font-mono text-[9px] uppercase tracking-eyebrow no-justify ${dark ? 'border-warm-white/15 text-warm-white/60' : 'border-obsidian/10 text-tobacco/60'}`}>
                  Founding
                </span>
              )}
            </div>
            <h3 className={`font-display text-2xl leading-tight no-justify transition-colors group-hover:text-quarry-gold ${dark ? 'text-warm-white' : 'text-obsidian'}`}>
              {v.name}
            </h3>
            <p className={`mt-2 font-sans text-xs leading-relaxed line-clamp-2 ${dark ? 'text-warm-white/60' : 'text-graphite'}`}>
              {v.oneLine}
            </p>
            <div className={`mt-5 grid grid-cols-2 gap-px border-t pt-4 ${dark ? 'border-warm-white/10' : 'border-obsidian/10'}`}>
              <div>
                <p className={`font-mono text-[9px] uppercase tracking-eyebrow no-justify ${dark ? 'text-warm-white/35' : 'text-tobacco/45'}`}>Origin</p>
                <p className={`mt-1 font-sans text-xs no-justify ${dark ? 'text-warm-white/75' : 'text-obsidian'}`}>{v.district}</p>
              </div>
              <div>
                <p className={`font-mono text-[9px] uppercase tracking-eyebrow no-justify ${dark ? 'text-warm-white/35' : 'text-tobacco/45'}`}>Scope</p>
                <p className={`mt-1 font-sans text-xs no-justify ${dark ? 'text-warm-white/75' : 'text-obsidian'}`}>{v.formatScope}</p>
              </div>
            </div>
            <p className={`mt-5 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider no-justify transition-all group-hover:gap-3 ${dark ? 'text-quarry-gold' : 'text-tobacco'}`}>
              View stone <ArrowRight size={13} strokeWidth={1.6} />
            </p>
          </div>
        </div>
      </Link>
    </RevealOnScroll>
  )

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-warm pt-28 pb-14 md:pt-32 lg:min-h-[calc(100vh-10rem)] lg:flex lg:items-center lg:pt-36 lg:pb-20">
        <div className="container-editorial w-full">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <p className="eyebrow-gold mb-8 no-justify">THE CATALOGUE</p>
              </div>
              <HeroWordRise
                as="h1"
                words={['The', 'Collection.']}
                className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter leading-[0.98] text-obsidian mb-8 max-w-[11ch]"
                baseDelay={250}
                staggerDelay={140}
              />
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1200ms' }}>
                <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl">
                  Twenty-three stones. Fourteen owned. Nine allied.
                </p>
                <div className="mt-10 max-w-2xl">
                  <p className="editorial-body">
                    Each stone carries its source, formation, splittability, working history, and compatible formats. Owned material is separated from allied material so buyers can read the catalogue without guesswork.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#owned" className="cta-primary no-justify">
                    <Gem size={16} strokeWidth={1.6} />
                    Owned stones
                  </a>
                  <a href="#allied" className="cta-secondary no-justify">
                    <ArrowRight size={16} strokeWidth={1.6} />
                    Allied network
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 border border-obsidian/8 bg-stone-linen/30 p-4 lg:p-5">
                {[
                  { icon: Gem, label: 'Catalogue', value: `${SITE.varietyCount} stones` },
                  { icon: BadgeCheck, label: 'Owned', value: `${SITE.ownedVarieties} varieties` },
                  { icon: MapPin, label: 'Network', value: `${SITE.alliedVarieties} allied` },
                  { icon: PackageCheck, label: 'Formats', value: `${SITE.formatCount} forms` },
                ].map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="opacity-0 animate-fade-in bg-warm-white p-6 lg:p-7"
                      style={{ animationDelay: `${900 + i * 120}ms` }}
                    >
                      <Icon size={20} strokeWidth={1.5} className="mb-6 text-quarry-gold" />
                      <p className="font-display text-3xl text-obsidian no-justify">{stat.value}</p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/55 no-justify">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding stones / quick preview */}
      <section className="section-cream py-12 lg:py-16 border-y border-obsidian/8">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-4 no-justify">FOUNDING STONES</p>
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight leading-tight text-obsidian no-justify">
                  The two beds that started the catalogue.
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {founding.map((v, i) => (
                <RevealOnScroll key={v.slug} delay={i * 100}>
                  <Link href={`/khadane/collection/${v.slug}`} className="group flex items-center justify-between gap-6 bg-warm-white p-6 transition-colors hover:bg-stone-linen/60">
                    <div>
                      <p className="font-mono text-xs text-quarry-gold no-justify mb-2">{v.code}</p>
                      <p className="font-display text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors">{v.name}</p>
                      <p className="mt-2 font-sans text-sm text-graphite no-justify">{v.workedSince || 'Since 1972'}</p>
                    </div>
                    <ArrowRight size={18} strokeWidth={1.5} className="shrink-0 text-tobacco/50 transition-transform group-hover:translate-x-1 group-hover:text-quarry-gold" />
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue strip */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <RevealOnScroll>
              <div>
                <p className="eyebrow-gold mb-5 no-justify">FAST READ</p>
                <h2 className="section-heading">
                  Six stones,
                  <span className="block italic text-quarry-gold">one catalogue language.</span>
                </h2>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
              <p className="max-w-xl font-sans text-base leading-relaxed text-graphite">
                Every stone detail page follows the same structure: provenance, image set, technical specification, format compatibility, and export enquiry route.
              </p>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {heroStones.map((v, i) => (
              <RevealOnScroll key={v.slug} delay={i * 60}>
                <Link href={`/khadane/collection/${v.slug}`} className="group block bg-warm-white p-5 transition-colors hover:bg-stone-linen/70">
                  <div className={`mb-5 h-20 placeholder-base ${v.placeholderClass}`} />
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-quarry-gold no-justify mb-2">{v.code}</p>
                  <p className="font-display text-xl leading-tight text-obsidian no-justify group-hover:text-quarry-gold transition-colors">{v.name}</p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Owned varieties */}
      <section id="owned" className="section-padding section-cream">
        <div className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">OWNED · {SITE.ownedVarieties} VARIETIES</p>
                <h2 className="section-heading mb-6">
                  From quarries
                  <span className="block italic text-quarry-gold">we own.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  The Bijolia belt sits across the Bhilwara and Bundi sides of the broader sandstone region. The owned catalogue includes the founding stones and the newer beds opened across the 1980s, 1990s, 2000s, and 2010s.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {owned.map((v, i) => (
              <StoneCard key={v.slug} v={v} delay={Math.min(i * 40, 400)} />
            ))}
          </div>
        </div>
      </section>

      {/* Allied varieties */}
      <section id="allied" className="section-padding section-tobacco">
        <div className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">ALLIED · THE NETWORK · {SITE.alliedVarieties} VARIETIES</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-6 no-justify">
                  Sourced direct
                  <span className="block italic text-quarry-gold">from heritage partners.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="font-sans text-lg text-warm-white/80 leading-relaxed">
                  Some varieties sit outside the Bijolia belt. For these we work direct with operators across Rajasthan, Madhya Pradesh, and Uttar Pradesh whose work and word are trusted. Allied does not mean traded; it means the source is named and the custody is clear.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allied.map((v, i) => (
              <StoneCard key={v.slug} v={v} dark delay={Math.min(i * 50, 400)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-warm">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-5 lg:gap-6 lg:grid-cols-3">
              {[
                {
                  icon: Layers3,
                  title: 'Surfaces and edges',
                  body: 'Every stone can be specified against surface treatments and edge profiles before dispatch.',
                },
                {
                  icon: PackageCheck,
                  title: 'Format range',
                  body: 'Nineteen catalogue forms are the standard route. Custom sizes and drawings are handled by the desk.',
                },
                {
                  icon: MapPin,
                  title: 'Named provenance',
                  body: 'Each variety page carries source location, formation, and working history for clear buyer review.',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="bg-warm-white p-8 lg:p-10">
                    <Icon size={24} strokeWidth={1.5} className="mb-8 text-quarry-gold" />
                    <h3 className="font-display text-3xl text-obsidian no-justify mb-4">{item.title}</h3>
                    <p className="font-sans text-sm leading-relaxed text-graphite">{item.body}</p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <BrandWhisper />
    </>
  )
}
