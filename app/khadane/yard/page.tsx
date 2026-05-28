import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  ClipboardCheck,
  Factory,
  PackageCheck,
  Ruler,
  Send,
  Ship,
  Truck,
} from 'lucide-react'
import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'The Yard — Processing, calibration, shipping',
  description: 'The Bijolia processing yard, where the cut decisions happen. Block arrival, gangsaw, finishing lines, quality check, crating, dispatch.',
}

export default function YardPage() {
  const checkpoints = [
    {
      num: '01',
      title: 'Arrival',
      body: 'Raw blocks arrive from owned quarries and allied partner quarries. Each block is logged by source village, variety, and approximate weight.',
      icon: Truck,
      variant: 'quarry' as const,
      record: 'Source village · variety · block weight',
      swapPath: '/img/gallery/quarry/block-lift.jpg',
    },
    {
      num: '02',
      title: 'Selection',
      body: 'Blocks are inspected, graded, and chalk-marked by variety lot. This decides whether the block moves to slabs, paving, cobbles, detail, or custom work.',
      icon: ClipboardCheck,
      variant: 'yard' as const,
      record: 'Grade · lot mark · production route',
      swapPath: '/img/gallery/yard/hand-picking.jpg',
    },
    {
      num: '03',
      title: 'Gangsaw',
      body: 'Selected blocks move to the gangsaw line, where parallel blades cut raw slabs of consistent thickness in a single pass.',
      icon: Factory,
      variant: 'stone' as const,
      record: 'Blade setting · slab thickness · batch',
      swapPath: '/img/gallery/yard/gangsaw-line.jpg',
    },
    {
      num: '04',
      title: 'Finishing',
      body: 'Raw slabs move through calibration, surface treatment, and edging. Each station works to the agreed surface, edge, and thickness specification.',
      icon: Ruler,
      variant: 'stone-warm' as const,
      record: 'Surface · edge · tolerance',
      swapPath: '/img/gallery/yard/surface-finishing.jpg',
    },
    {
      num: '05',
      title: 'Crating',
      body: 'Finished pieces are inspected, counted, and packed into labelled crates with variety, format, thickness, surface, edge, quantity, and order reference.',
      icon: PackageCheck,
      variant: 'belt' as const,
      record: 'Crate label · quantity · order reference',
      swapPath: '/img/gallery/yard/crates.jpg',
    },
    {
      num: '06',
      title: 'Dispatch',
      body: 'Crates leave the yard by truck for Mundra Port, the primary loading point for KHADANE international exports.',
      icon: Ship,
      variant: 'yard' as const,
      record: 'Truck dispatch · export documents · port route',
      swapPath: '/img/gallery/yard/container-loading.jpg',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-warm pt-28 pb-14 md:pt-32 lg:min-h-[calc(100vh-10rem)] lg:flex lg:items-center lg:pt-36 lg:pb-20">
        <div className="container-editorial w-full">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <p className="eyebrow-gold mb-8 no-justify">THE PROCESS</p>
              </div>
              <HeroWordRise
                as="h1"
                words={['The', 'Yard.']}
                className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter leading-[0.98] text-obsidian mb-8"
                baseDelay={250}
                staggerDelay={130}
              />
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1300ms' }}>
                <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl mb-10">
                  The sequence at Bijolia.
                </p>
                <div className="max-w-2xl">
                  <p className="editorial-body">
                    Raw blocks arrive from the quarry face. Finished crates leave for Mundra. Between those two points, the yard grades, saws, calibrates, finishes, edges, checks, crates, labels, and documents the stone.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#checkpoints" className="cta-primary no-justify">
                    <Factory size={16} strokeWidth={1.6} />
                    Six checkpoints
                  </a>
                  <Link href="/khadane/desk" className="cta-secondary no-justify">
                    <Send size={16} strokeWidth={1.6} />
                    Visit or specify
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 border border-obsidian/8 bg-stone-linen/30 p-4 lg:p-5">
                {[
                  { icon: Truck, label: 'Receiving', value: 'Block log' },
                  { icon: Factory, label: 'Cutting', value: 'Gangsaw' },
                  { icon: PackageCheck, label: 'Packing', value: 'Crate label' },
                  { icon: Ship, label: 'Dispatch', value: SITE.port },
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

      {/* Operating promise */}
      <section className="section-cream py-12 lg:py-16 border-y border-obsidian/8">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {[
                {
                  icon: BadgeCheck,
                  title: 'Source held through processing',
                  body: 'The source village and variety lot follow the block from receiving area to finished crate.',
                },
                {
                  icon: Ruler,
                  title: 'Specification before dispatch',
                  body: 'Format, surface, edge, thickness, and size are checked before the material leaves the yard.',
                },
                {
                  icon: PackageCheck,
                  title: 'Crates documented for export',
                  body: 'Finished pieces are labelled, counted, packed, and prepared for the Mundra route.',
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

      {/* Process steps */}
      <section id="checkpoints" className="section-padding section-warm">
        <div className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">SIX CHECKPOINTS</p>
                <h2 className="section-heading">
                  From block arrival
                  <span className="block italic text-quarry-gold">to dispatch.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  The yard sequence is designed for traceability and production clarity. Each checkpoint creates a decision record before material moves to the next station.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {checkpoints.map((step, i) => {
              const Icon = step.icon
              return (
                <RevealOnScroll key={step.num} delay={Math.min(i * 60, 360)}>
                  <article className="flex h-full flex-col bg-warm-white transition-colors duration-400 ease-editorial hover:bg-stone-linen/70">
                    <PlaceholderImage
                      variant={step.variant}
                      label={`CHECKPOINT ${step.num}`}
                      title={step.title}
                      spec={step.record}
                      swapPath={step.swapPath}
                      aspectRatio="aspect-[16/10]"
                    />
                    <div className="flex flex-1 flex-col p-6 lg:p-7">
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <p className="font-mono text-xs text-quarry-gold no-justify">PROCESS · {step.num}</p>
                        <Icon size={20} strokeWidth={1.5} className="text-quarry-gold" />
                      </div>
                      <h3 className="font-display text-3xl leading-tight text-obsidian no-justify mb-4">
                        {step.title}.
                      </h3>
                      <p className="font-sans text-sm leading-relaxed text-graphite">
                        {step.body}
                      </p>
                      <div className="mt-auto border-t border-obsidian/10 pt-5">
                        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/45 no-justify mb-2">Record</p>
                        <p className="font-sans text-xs leading-relaxed text-obsidian no-justify">{step.record}</p>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* Yard records */}
      <section className="section-padding section-tobacco">
        <div className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">YARD RECORDS</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white no-justify">
                  The record follows
                  <span className="block italic text-quarry-gold">the stone.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="font-sans text-lg text-warm-white/75 leading-relaxed">
                  The Yard page is about custody, not catalogue browsing. Each checkpoint leaves a practical record: where the block came from, how it was routed, what finish was applied, how it was packed, and what left for the port.
                </p>
              </RevealOnScroll>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {[
              { label: 'Receiving log', count: '01' },
              { label: 'Grading mark', count: '02' },
              { label: 'Finish sign-off', count: '03' },
              { label: 'Crate label', count: '04' },
              { label: 'Dispatch file', count: '05' },
            ].map((d, i) => (
              <RevealOnScroll key={d.label} delay={i * 80}>
                <div className="bg-warm-white/[0.05] border border-warm-white/10 p-6 lg:p-8 text-center">
                  <p className="font-display text-5xl text-quarry-gold mb-3 no-justify">{d.count}</p>
                  <p className="font-sans text-xs uppercase tracking-eyebrow text-warm-white no-justify">{d.label}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation and visit CTA */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">BUYER ACCESS</p>
                <h2 className="section-heading mb-8">
                  Visit the yard,
                  <span className="block italic text-quarry-gold">or specify from your desk.</span>
                </h2>
                <p className="editorial-body max-w-2xl">
                  Buyers visiting India for trade fairs, factory audits, or specification meetings can visit the Bijolia yard by prior appointment. Remote buyers can request sample sets, loading photographs, crate references, and route documentation through the desk.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5">
              <RevealOnScroll delay={150}>
                <div className="bg-warm-white p-8 lg:p-10 border border-obsidian/10">
                  <div className="space-y-6">
                    {[
                      ['Location', 'Bijolia, Bhilwara District, Rajasthan'],
                      ['Port', SITE.port],
                      ['Response', 'Within one business day'],
                      ['Desk', SITE.contact.publicEmail],
                    ].map(([label, value]) => (
                      <div key={label} className="border-b border-obsidian/10 pb-5 last:border-b-0 last:pb-0">
                        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/45 no-justify mb-2">{label}</p>
                        <p className="font-sans text-base text-obsidian no-justify">{value}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/khadane/desk" className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-obsidian px-8 py-4 font-sans text-sm uppercase tracking-wider text-warm-white transition-colors duration-400 ease-editorial hover:bg-tobacco no-justify">
                    Write to The Desk
                    <ArrowRight size={16} strokeWidth={1.6} />
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <BrandWhisper />
    </>
  )
}
