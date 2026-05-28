import Link from 'next/link'
import {
  ArrowRight,
  Camera,
  Film,
  Grid3X3,
  Hammer,
  Image as ImageIcon,
  MapPin,
  Mountain,
  PackageCheck,
} from 'lucide-react'
import { GALLERY_ITEMS } from '@/lib/khadane/gallery'
import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import BrandWhisper from '@/components/khadane/BrandWhisper'
import Gallery from '@/components/khadane/Gallery'

export const metadata = {
  title: 'The Gallery — Stone, quarry, yard, installations',
  description: 'An editorial gallery of KHADANE™ — stone close-ups, the working quarry face, the yard, real installations, and stills from the Belt Film.',
}

export default function GalleryPage() {
  const stoneCount = GALLERY_ITEMS.filter((i) => i.category === 'stone').length
  const quarryCount = GALLERY_ITEMS.filter((i) => i.category === 'quarry').length
  const yardCount = GALLERY_ITEMS.filter((i) => i.category === 'yard').length
  const installationCount = GALLERY_ITEMS.filter((i) => i.category === 'installation').length
  const beltFilmCount = GALLERY_ITEMS.filter((i) => i.category === 'belt-film').length
  const categoryCards = [
    {
      icon: ImageIcon,
      label: 'Stone',
      count: stoneCount,
      body: 'Surface close-ups, grain, colour movement, edge condition, and finish references.',
    },
    {
      icon: Mountain,
      label: 'Quarry',
      count: quarryCount,
      body: 'Working faces, strata, extraction, block selection, and source context from Bijolia.',
    },
    {
      icon: Hammer,
      label: 'Yard',
      count: yardCount,
      body: 'Gangsaw, calibration, hand selection, finishing, crating, and loading documentation.',
    },
    {
      icon: MapPin,
      label: 'Installations',
      count: installationCount,
      body: 'Completed paving, public realm, pool surrounds, heritage work, and in-situ use.',
    },
    {
      icon: Film,
      label: 'Belt Film',
      count: beltFilmCount,
      body: 'Frames from the buyer film: geology, workforce, container loading, and the wider belt.',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="section-warm pt-28 pb-16 md:pt-32 lg:min-h-[calc(100vh-10rem)] lg:flex lg:items-center lg:pt-36 lg:pb-20">
        <div className="container-editorial w-full">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">THE GALLERY</p>
            </div>
            <HeroWordRise
              as="h1"
                words={['The', 'visual', 'archive.']}
                className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter leading-[0.98] text-obsidian mb-8"
              baseDelay={250}
                staggerDelay={130}
            />
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1100ms' }}>
                <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-4xl mb-10">
                  Stone face, quarry source, yard process, finished work.
              </p>
                <p className="max-w-3xl font-sans text-lg leading-relaxed text-graphite">
                  A trade-facing image archive for KHADANE™: material details, working quarry records, processing checkpoints, container preparation, and in-situ reference frames for buyers, architects, press, and specifiers.
              </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#archive" className="inline-flex items-center gap-3 bg-obsidian px-8 py-4 font-sans text-sm uppercase tracking-wider text-warm-white transition-colors duration-400 ease-editorial hover:bg-quarry-gold hover:text-obsidian no-justify">
                    <Grid3X3 size={16} strokeWidth={1.6} />
                    Open archive
                  </a>
                  <Link href="/khadane/desk" className="inline-flex items-center gap-3 border border-obsidian/70 px-8 py-4 font-sans text-sm uppercase tracking-wider text-obsidian transition-colors duration-400 ease-editorial hover:bg-obsidian hover:text-warm-white no-justify">
                    <Camera size={16} strokeWidth={1.6} />
                    Request images
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-obsidian/10 bg-stone-linen/55 p-5 lg:p-6 opacity-0 animate-fade-in" style={{ animationDelay: '750ms' }}>
                <div className="mb-5 bg-obsidian p-7 lg:p-8">
                  <div className="mb-16 flex items-center justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-eyebrow text-quarry-gold no-justify">Archive register</span>
                    <Camera size={22} strokeWidth={1.5} className="text-quarry-gold" />
                  </div>
                  <p className="font-display text-6xl text-warm-white no-justify">{GALLERY_ITEMS.length}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-eyebrow text-warm-white/50 no-justify">Editorial frames</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '5', label: 'Categories' },
                    { value: SITE.varietyCount, label: 'Stone catalogue' },
                    { value: SITE.port, label: 'Export route' },
                    { value: 'Press', label: 'Usage on request' },
                  ].map((item) => (
                    <div key={item.label} className="bg-warm-white p-5 lg:p-6">
                      <p className="font-display text-3xl text-obsidian no-justify">{item.value}</p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/55 no-justify">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category register */}
      <section className="section-cream py-12 lg:py-16 border-y border-obsidian/8">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
              {categoryCards.map((cat) => {
                const Icon = cat.icon
                return (
                  <div key={cat.label} className="border border-obsidian/8 bg-warm-white p-6 lg:p-7">
                    <div className="mb-10 flex items-start justify-between gap-5">
                      <Icon size={20} strokeWidth={1.5} className="text-quarry-gold" />
                      <p className="font-display text-4xl text-quarry-gold no-justify">
                        {String(cat.count).padStart(2, '0')}
                      </p>
                    </div>
                    <h2 className="font-display text-3xl text-obsidian no-justify mb-4">{cat.label}</h2>
                    <p className="font-sans text-sm leading-7 text-graphite no-justify">{cat.body}</p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Editorial use */}
      <section className="section-warm py-12 lg:py-16 border-b border-obsidian/8">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-5 no-justify">IMAGE USE</p>
                <h2 className="font-display text-4xl lg:text-5xl leading-tight text-obsidian no-justify">
                  Built for samples,
                  <span className="block italic text-quarry-gold">shortlists, and press.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[
                    { icon: PackageCheck, title: 'Buyer records', body: 'Images support colour, finish, crate, and dispatch references.' },
                    { icon: Camera, title: 'Press access', body: `High-resolution files available from ${SITE.contact.publicEmail}.` },
                    { icon: ArrowRight, title: 'Traceable sequence', body: 'Read frames from quarry source to yard process to installed use.' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="bg-stone-linen/55 p-6">
                        <Icon size={18} strokeWidth={1.5} className="mb-6 text-quarry-gold" />
                        <h3 className="font-display text-2xl text-obsidian no-justify mb-3">{item.title}</h3>
                        <p className="font-sans text-sm leading-6 text-graphite no-justify">{item.body}</p>
                      </div>
                    )
                  })}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="archive" className="section-padding section-warm">
        <div className="container-editorial mb-10 lg:mb-14">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end">
              <div className="lg:col-span-5">
                <p className="eyebrow-gold mb-6 no-justify">BROWSE THE ARCHIVE</p>
                <h2 className="section-heading">
                  Filter by source,
                  <span className="block italic text-quarry-gold">process, or use.</span>
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="editorial-body no-justify">
                  Select a category to review a focused set, then open any frame for caption, code, location, and enlarged view.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        <Gallery />
      </section>

      {/* CTA */}
      <section className="section-padding section-tobacco">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-center">
              <div className="lg:col-span-8">
                <p className="eyebrow-gold mb-6 no-justify">HIGH-RESOLUTION REQUESTS</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-warm-white no-justify">
                  Need specific stone, quarry, yard, or installation frames?
                </h2>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link href="/khadane/desk" className="inline-flex items-center gap-3 bg-quarry-gold px-8 py-4 font-sans text-sm uppercase tracking-wider text-obsidian transition-colors duration-400 ease-editorial hover:bg-warm-white no-justify">
                  Request via desk <ArrowRight size={16} strokeWidth={1.6} />
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Brand whisper close */}
      <BrandWhisper customLine="From the quarry to the container, every frame is ours." />
    </>
  )
}
