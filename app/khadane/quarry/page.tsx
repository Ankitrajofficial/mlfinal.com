import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Layers3,
  MapPin,
  Mountain,
  Pickaxe,
  Route,
  Truck,
} from 'lucide-react'
import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'The Quarry',
  description:
    'The Bijolia sandstone belt of Rajasthan. KHADANE’s owned quarries and the broader working belt, photographed from the cut.',
}

const quarryVillages = [
  'Aroli',
  'Bansi Paharpur',
  'Bari',
  'Baseri',
  'Behat-Pichhore area',
  'Bhawanipura',
  'Bhooti',
  'Choti Bijolia',
  'Dabi-Budhpura area',
  'Garda',
  'Jethwai',
  'Kaansiya',
  'Khadipur',
  'Khoki',
  'Kota basalt cluster',
  'Moolsagar',
  'Nayanagar',
  'Parana',
  'Sadaram Ji ka Khera',
  'Sarmathura',
  'Udpuriya',
]

const photoSlots = [
  {
    label: 'AERIAL · 01',
    title: 'The Bijolia belt, at scale.',
    spec: 'Wide aerial of quarry country across the horizon.',
    swapPath: '/img/gallery/quarry/block-lift.jpg',
    variant: 'quarry' as const,
  },
  {
    label: 'FACE · 01',
    title: 'Cut wall. Bedding plane visible.',
    spec: 'Quarry face at working depth, horizontal bedding lines visible.',
    swapPath: '/img/gallery/quarry/working-face-dawn.jpg',
    variant: 'stone-warm' as const,
  },
  {
    label: 'EXTRACTION · 01',
    title: 'A block separates from the bed.',
    spec: 'Block extraction in progress, drill marks visible.',
    swapPath: '/img/gallery/quarry/block-selection.jpg',
    variant: 'quarry' as const,
  },
  {
    label: 'LOADING · 01',
    title: 'Loading for the yard.',
    spec: 'Quarry trucks loading raw blocks for transport to Bijolia.',
    swapPath: '/img/gallery/quarry/dust-haze.jpg',
    variant: 'yard' as const,
  },
]

export default function QuarryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-dark texture-lines pt-28 pb-14 md:pt-32 lg:min-h-[calc(100vh-10rem)] lg:flex lg:items-center lg:pt-36 lg:pb-20">
        <div className="container-editorial w-full">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <p className="eyebrow-gold mb-8 no-justify">THE SOURCE</p>
              </div>
              <HeroWordRise
                as="h1"
                words={['The', 'Quarry.']}
                className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter leading-[0.98] text-warm-white mb-8"
                baseDelay={250}
                staggerDelay={130}
              />
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1300ms' }}>
                <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl mb-10">
                  A working belt of Bijolia. Founding beds still in extraction since 1972.
                </p>
                <div className="max-w-2xl">
                  <p className="font-sans text-lg leading-relaxed text-warm-white/75">
                    KHADANE works the Bijolia sandstone belt of Rajasthan: owned quarry holdings across the Bhilwara and Bundi sides of the Vindhyan deposit, joined by direct allied quarry relationships beyond the family’s own blocks.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#villages" className="inline-flex items-center gap-3 bg-quarry-gold px-8 py-4 font-sans text-sm uppercase tracking-wider text-obsidian transition-colors duration-400 ease-editorial hover:bg-warm-white no-justify">
                    <MapPin size={16} strokeWidth={1.6} />
                    Quarry villages
                  </a>
                  <Link href="/khadane/yard" className="inline-flex items-center gap-3 border border-warm-white/35 px-8 py-4 font-sans text-sm uppercase tracking-wider text-warm-white transition-colors duration-400 ease-editorial hover:bg-warm-white hover:text-obsidian no-justify">
                    <Truck size={16} strokeWidth={1.6} />
                    To the yard
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 border border-warm-white/10 bg-warm-white/[0.04] p-4 lg:p-5">
                {[
                  { icon: Mountain, label: 'Belt', value: 'Bijolia' },
                  { icon: BadgeCheck, label: 'Founding year', value: String(SITE.foundationYear) },
                  { icon: MapPin, label: 'Villages', value: '16+' },
                  { icon: Layers3, label: 'Formation', value: 'Vindhyan' },
                ].map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="opacity-0 animate-fade-in bg-obsidian/50 p-6 lg:p-7"
                      style={{ animationDelay: `${900 + i * 120}ms` }}
                    >
                      <Icon size={20} strokeWidth={1.5} className="mb-6 text-quarry-gold" />
                      <p className="font-display text-3xl text-warm-white no-justify">{stat.value}</p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-eyebrow text-warm-white/45 no-justify">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Belt summary */}
      <section className="section-cream py-12 lg:py-16 border-y border-obsidian/8">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {[
                {
                  icon: Layers3,
                  title: 'Vindhyan sandstone belt',
                  body: 'The broader formation runs across both the Bhilwara and Bundi sides of the deposit.',
                },
                {
                  icon: Pickaxe,
                  title: 'Working faces, not staged sets',
                  body: 'The quarry record is built from working faces, extraction crews, bedding planes, raw blocks, and loading points.',
                },
                {
                  icon: Route,
                  title: 'Source to yard',
                  body: 'Raw blocks extracted from the quarries travel by truck to the Bijolia yard for cutting, surfacing, edging, crating, and dispatch.',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="bg-warm-white p-8 lg:p-10">
                    <Icon size={24} strokeWidth={1.5} className="mb-8 text-quarry-gold" />
                    <h2 className="font-display text-3xl text-obsidian no-justify mb-4">{item.title}</h2>
                    <p className="font-sans text-sm leading-relaxed text-graphite">{item.body}</p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Villages */}
      <section id="villages" className="section-padding section-warm">
        <div className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">QUARRY VILLAGES</p>
                <h2 className="section-heading">
                  Named origins,
                  <span className="block italic text-quarry-gold">not anonymous stock.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  Each variety in the catalogue carries the name of its origin village in its provenance line. These are owned blocks, owned crews, owned equipment, and allied partner quarry locations whose source is stated openly.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <RevealOnScroll delay={200}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {quarryVillages.map((village) => (
                <div key={village} className="bg-stone-linen/55 px-4 py-4">
                  <p className="font-sans text-sm text-obsidian no-justify">{village}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Documentary record */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">PHOTO RECORD</p>
                <h2 className="section-heading">
                  The quarry,
                  <span className="block italic text-quarry-gold">station by station.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  The photographs on this page are meant to show the working faces, the extraction crews, the bedding planes at the cut, and the raw blocks before they move to the yard.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:gap-6 md:grid-cols-2">
            {photoSlots.map((slot, i) => (
              <RevealOnScroll key={slot.label} delay={Math.min(i * 80, 300)}>
                <PlaceholderImage
                  variant={slot.variant}
                  label={slot.label}
                  title={slot.title}
                  spec={slot.spec}
                  swapPath={slot.swapPath}
                  aspectRatio="aspect-[16/10]"
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous beds */}
      <section className="section-padding section-tobacco">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">CONTINUOUS BEDS</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white no-justify">
                  Kandla Grey.
                  <span className="block italic text-quarry-gold">Slate Grey.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="font-sans text-lg text-warm-white/78 leading-relaxed mb-8">
                  Two stones in the catalogue have been worked without interruption since the founding year. Both are quarried from family-owned blocks; both shaped how the operation grew.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    ['Kandla Grey', 'kandla-grey', 'First quarried from the Parana block.'],
                    ['Slate Grey', 'slate-grey', 'Worked from the Dabi-Budhpura area.'],
                  ].map(([name, slug, note]) => (
                    <Link key={slug} href={`/khadane/collection/${slug}`} className="group bg-warm-white/[0.05] border border-warm-white/10 p-6 transition-colors hover:bg-warm-white/[0.08]">
                      <p className="font-display text-2xl text-warm-white no-justify group-hover:text-quarry-gold transition-colors">{name}</p>
                      <p className="mt-3 font-sans text-sm text-warm-white/62 no-justify">{note}</p>
                      <p className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-quarry-gold no-justify transition-all group-hover:gap-3">
                        View stone <ArrowRight size={13} strokeWidth={1.6} />
                      </p>
                    </Link>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Handoff */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-6">
              <RevealOnScroll>
                <PlaceholderImage
                  variant="yard"
                  label="QUARRY TO YARD"
                  title="Raw blocks leave for Bijolia."
                  spec="Truck loading raw blocks for the processing yard."
                  swapPath="/img/gallery/yard/gangsaw-line.jpg"
                  aspectRatio="aspect-[4/3]"
                />
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-6">
              <RevealOnScroll delay={150}>
                <p className="eyebrow-gold mb-6 no-justify">FROM SOURCE TO PROCESS</p>
                <h2 className="section-heading mb-8">
                  From the quarry,
                  <span className="block italic text-quarry-gold">to the yard.</span>
                </h2>
                <p className="editorial-body mb-8">
                  Raw blocks extracted from the quarries travel by truck to the Bijolia processing yard, where cutting, calibration, surface treatment, edging, quality check, crating, and dispatch happen.
                </p>
                <Link href="/khadane/yard" className="cta-primary no-justify">
                  The Yard <ArrowRight size={16} strokeWidth={1.6} />
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <BrandWhisper variant="gold" />
    </>
  )
}
