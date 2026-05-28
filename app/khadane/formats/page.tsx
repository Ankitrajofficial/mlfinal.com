import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Layers3,
  PackageCheck,
  Ruler,
  Ship,
  SlidersHorizontal,
} from 'lucide-react'
import { FORMATS } from '@/lib/khadane/formats'
import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'The Formats — 19 sandstone formats',
  description: 'Every form the trade asks for, plus the surface treatments and edge profiles that finish the stone before it ships.',
}

export default function FormatsPage() {
  const featuredFormats = FORMATS.slice(0, 6)
  const categories = [
    {
      label: 'Paving & Patio',
      note: 'Volume landscape formats for patios, courtyards, driveways, garden paths, and outdoor rooms.',
      slugs: ['pavings', 'flagstones-crazy-paving', 'cobble-setts', 'stepping-stones', 'circles'],
    },
    {
      label: 'Architectural Detail',
      note: 'Linear and profiled pieces for walls, openings, steps, copings, roofing, and custom detailing.',
      slugs: ['kerbstones', 'copings', 'window-sills', 'door-frames', 'block-steps-treads', 'roofing', 'accessories'],
    },
    {
      label: 'Landscape & Garden',
      note: 'Outdoor feature formats for edging, retaining, furniture, fire features, and natural landscape work.',
      slugs: ['palisades-edging', 'boulders', 'fire-pits', 'garden-furniture'],
    },
    {
      label: 'Wall, Raw & Custom',
      note: 'Large-format, vertical, raw-block, and buyer-specific material for yards and architectural projects.',
      slugs: ['wall-cladding', 'gangsaw-slabs', 'quarry-blocks'],
    },
  ].map((category) => ({
    ...category,
    formats: category.slugs
      .map((slug) => FORMATS.find((format) => format.slug === slug))
      .filter((format): format is (typeof FORMATS)[number] => Boolean(format)),
  }))

  const FormatCard = ({
    f,
    delay,
    dark = false,
  }: {
    f: (typeof FORMATS)[number]
    delay: number
    dark?: boolean
  }) => (
    <RevealOnScroll delay={delay}>
      <Link href={`/khadane/formats/${f.slug}`} className="group block h-full">
        <div className={`flex h-full flex-col ${dark ? 'bg-warm-white/[0.04]' : 'bg-warm-white'} transition-colors duration-400 ease-editorial ${dark ? 'hover:bg-warm-white/[0.07]' : 'hover:bg-stone-linen/70'}`}>
          <PlaceholderImage
            variant={f.placeholderClass.replace('placeholder-', '') as any}
            label={f.code}
            title={f.name}
            spec={f.primaryUse}
            swapPath={`/img/formats/${f.slug}-hero.jpg`}
            aspectRatio="aspect-[16/10]"
            className="transition-transform duration-700 ease-editorial group-hover:scale-[1.015]"
          />
          <div className="flex flex-1 flex-col p-6 lg:p-7">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-quarry-gold no-justify">{f.code}</p>
              <ArrowRight size={16} strokeWidth={1.5} className={`shrink-0 transition-transform group-hover:translate-x-1 ${dark ? 'text-warm-white/45 group-hover:text-quarry-gold' : 'text-tobacco/45 group-hover:text-quarry-gold'}`} />
            </div>
            <h3 className={`font-display text-3xl leading-tight no-justify transition-colors group-hover:text-quarry-gold ${dark ? 'text-warm-white' : 'text-obsidian'}`}>
              {f.name}
            </h3>
            <p className={`mt-4 font-sans text-sm leading-relaxed line-clamp-3 ${dark ? 'text-warm-white/65' : 'text-graphite'}`}>
              {f.description}
            </p>
            <div className={`mt-auto grid grid-cols-2 gap-4 border-t pt-5 ${dark ? 'border-warm-white/10' : 'border-obsidian/10'}`}>
              <div>
                <p className={`font-mono text-[9px] uppercase tracking-eyebrow no-justify ${dark ? 'text-warm-white/35' : 'text-tobacco/45'}`}>Surfaces</p>
                <p className={`mt-1 font-sans text-xs no-justify ${dark ? 'text-warm-white/75' : 'text-obsidian'}`}>{f.surfacesAvailable.length || 'On enquiry'}</p>
              </div>
              <div>
                <p className={`font-mono text-[9px] uppercase tracking-eyebrow no-justify ${dark ? 'text-warm-white/35' : 'text-tobacco/45'}`}>Edges</p>
                <p className={`mt-1 font-sans text-xs no-justify ${dark ? 'text-warm-white/75' : 'text-obsidian'}`}>{f.edgesAvailable.length || 'On enquiry'}</p>
              </div>
            </div>
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
                <p className="eyebrow-gold mb-8 no-justify">THE FORMS</p>
              </div>
              <HeroWordRise
                as="h1"
                words={['Formats.']}
                className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter leading-[0.98] text-obsidian mb-8"
                baseDelay={250}
                staggerDelay={130}
              />
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1300ms' }}>
                <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl mb-10">
                  Form first. Surface and edge after.
                </p>
                <div className="max-w-2xl">
                  <p className="editorial-body">
                    The format page is the buyer’s map of what the stone can become: paving, copings, kerbstones, slabs, cladding, blocks, roof tiles, furniture, and custom architectural parts. Surface treatment and edge profile finish the form before it ships.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#format-categories" className="cta-primary no-justify">
                    <Boxes size={16} strokeWidth={1.6} />
                    View formats
                  </a>
                  <Link href="/khadane/desk" className="cta-secondary no-justify">
                    <Ruler size={16} strokeWidth={1.6} />
                    Custom drawing
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 border border-obsidian/8 bg-stone-linen/30 p-4 lg:p-5">
                {[
                  { icon: Boxes, label: 'Standard forms', value: `${SITE.formatCount}` },
                  { icon: SlidersHorizontal, label: 'Surface treatments', value: `${SITE.surfaceTreatmentCount}` },
                  { icon: Layers3, label: 'Edge profiles', value: `${SITE.edgeProfileCount}` },
                  { icon: Ruler, label: 'Custom drawings', value: 'On request' },
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

      {/* Format reading strip */}
      <section className="section-cream py-12 lg:py-16 border-y border-obsidian/8">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              {[
                { step: '01', title: 'Form', body: 'The physical object being ordered: slab, sett, coping, sill, block, tile, or custom part.' },
                { step: '02', title: 'Surface', body: 'The face treatment: natural riven, honed, sandblast, flamed, brushed, leather, or another catalogue finish.' },
                { step: '03', title: 'Edge', body: 'The visible profile: hand cut, hand-cut straight, machine cut, or bullnose where the format allows it.' },
                { step: '04', title: 'Packing unit', body: 'How the format is shipped: crate, pallet, slab rack, raw block loading, or per-drawing custom packing.' },
              ].map((item) => (
                <div key={item.step} className="bg-warm-white p-6 lg:p-7">
                  <p className="font-mono text-xs text-quarry-gold no-justify mb-5">{item.step}</p>
                  <h2 className="font-display text-2xl text-obsidian no-justify mb-3">{item.title}</h2>
                  <p className="font-sans text-sm leading-relaxed text-graphite">{item.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured preview */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <RevealOnScroll>
              <div>
                <p className="eyebrow-gold mb-5 no-justify">FAST READ</p>
                <h2 className="section-heading">
                  Common export
                  <span className="block italic text-quarry-gold">formats.</span>
                </h2>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
              <p className="max-w-xl font-sans text-base leading-relaxed text-graphite">
                These high-frequency formats cover most buyer enquiries. The full list below includes architectural detail, garden features, raw blocks, and custom work.
              </p>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredFormats.map((f, i) => (
              <FormatCard key={f.slug} f={f} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* Format categories */}
      <section className="section-padding section-cream">
        <div id="format-categories" className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">{SITE.formatCount} PRODUCTION FORMATS</p>
                <h2 className="section-heading">
                  From raw blocks
                  <span className="block italic text-quarry-gold">to garden accessories.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  Formats are grouped by how buyers specify them: paving and patio, architectural detail, landscape and garden, and raw or custom material. Every format page carries use cases, compatible stones, surfaces, and edge options.
                </p>
              </RevealOnScroll>
            </div>
          </div>
          <div className="space-y-16 lg:space-y-20">
            {categories.map((category, categoryIndex) => (
              <section key={category.label}>
                <RevealOnScroll>
                  <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-5">
                      <p className="eyebrow-gold mb-4 no-justify">{String(categoryIndex + 1).padStart(2, '0')} · {category.label}</p>
                      <h3 className="font-display text-4xl lg:text-5xl tracking-tight leading-tight text-obsidian no-justify">
                        {category.label}
                      </h3>
                    </div>
                    <p className="lg:col-span-7 font-sans text-base lg:text-lg leading-relaxed text-graphite">
                      {category.note}
                    </p>
                  </div>
                </RevealOnScroll>
                <div className="grid grid-cols-1 gap-5 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.formats.map((f, i) => (
                    <FormatCard key={f.slug} f={f} delay={Math.min(i * 50, 350)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-dark texture-lines">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-8 no-justify">CUSTOM WORK</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white no-justify mb-8">
                  Need a format
                  <span className="block italic text-quarry-gold">outside the catalogue?</span>
                </h2>
                <p className="font-sans text-lg text-warm-white/70 leading-relaxed max-w-2xl">
                  Send drawings, target thickness, surface, edge, quantity, and port. The desk will confirm whether the selected stone can hold the requested format.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5">
              <RevealOnScroll delay={150}>
                <Link href="/khadane/desk" className="inline-flex w-full items-center justify-center gap-3 bg-quarry-gold px-8 py-5 font-sans text-sm uppercase tracking-wider text-obsidian transition-colors duration-400 ease-editorial hover:bg-warm-white no-justify">
                  <Ruler size={16} strokeWidth={1.6} />
                  Send custom specification
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <BrandWhisper />
    </>
  )
}
