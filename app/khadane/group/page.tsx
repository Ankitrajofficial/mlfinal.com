import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Factory,
  Handshake,
  Hotel,
  Mail,
  MapPin,
  Route,
  School,
  Utensils,
  Warehouse,
} from 'lucide-react'
import { SITE, ASSETS } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'The Group',
  description:
    'Mohan Lal & Sons is a working enterprise across stone and export, automotive and fuel, hospitality, student housing, and food services, based in Bijolia since 1972.',
}

const groupStats = [
  { icon: BadgeCheck, value: String(SITE.foundationYear), label: 'Founded in Bijolia' },
  { icon: Building2, value: '5', label: 'Operating verticals' },
  { icon: Factory, value: '23', label: 'Sandstone catalogue' },
  { icon: MapPin, value: 'Bhilwara', label: 'Regional base' },
]

const operatingPrinciples = [
  {
    title: 'Built locally, operated directly',
    body: 'Each vertical was started by the family and continues to operate from the same regional base in Bhilwara District.',
  },
  {
    title: 'Stone remains the centre of gravity',
    body: 'KHADANE carries the group’s founding trade forward through owned quarries, allied quarry relationships, processing, and export.',
  },
  {
    title: 'Continuity buyers can read',
    body: 'The group’s local roots, multi-decade workforce, and direct operating model make the source, yard, and export desk accountable.',
  },
]

const verticals = [
  {
    code: 'I',
    icon: Factory,
    name: 'Stone & Export',
    brand: 'KHADANE™ · Dhakar Stone Impex',
    note: 'The founding vertical',
    description:
      'Twenty-three sandstones quarried and allied across Rajasthan, Madhya Pradesh, and Uttar Pradesh. Cut, dressed, packed, and shipped from the Bijolia yard for international buyers.',
    href: '/khadane/collection',
  },
  {
    code: 'II',
    icon: Route,
    name: 'Automotive & Fuel',
    brand: 'Dhakar Motors · Dharnidhar Fuels',
    note: 'Regional mobility',
    description:
      'Automotive dealership, sales and service, supported by fuel retail operations serving the Bhilwara-Kota corridor.',
  },
  {
    code: 'III',
    icon: Hotel,
    name: 'Hospitality',
    brand: 'M3 Hotel',
    note: 'Kota hospitality',
    description:
      'A hospitality presence built for student families, trade visitors, and the working network moving through central Rajasthan.',
  },
  {
    code: 'IV',
    icon: School,
    name: 'Student Housing',
    brand: 'Multiple PG campuses · Kota',
    note: 'Residential operations',
    description:
      'Paying-guest residences for medical and engineering entrance students, operated around clean rooms, supervised food, and parent trust.',
  },
  {
    code: 'V',
    icon: Utensils,
    name: 'Food Services',
    brand: 'Vyanjanam · Divine Food Services',
    note: 'Daily kitchens',
    description:
      'Saatvik food services for Kota’s student population and the regional workforce, including monthly mess plans and event catering.',
  },
]

const khadaneRole = [
  {
    icon: MapPin,
    title: 'Named quarry origins',
    body: 'Owned blocks and allied quarry sources are identified openly in the catalogue instead of being presented as anonymous stock.',
  },
  {
    icon: Warehouse,
    title: 'Bijolia processing yard',
    body: 'Blocks move through gangsaws, calibration, finishing, edging, inspection, crating, and dispatch documentation before export.',
  },
  {
    icon: Handshake,
    title: 'Direct buyer desk',
    body: 'No broker layer is placed between the family’s quarries, the yard, and the international buyer enquiry desk.',
  },
]

const buyerDesk = [
  { label: 'Enquiry', value: SITE.contact.publicEmail },
  { label: 'Location', value: 'Bijolia, Bhilwara District, Rajasthan' },
  { label: 'Catalogue', value: `${SITE.varietyCount} varieties · ${SITE.formatCount} formats` },
  { label: 'Samples', value: 'Dispatched within 5 business days' },
]

export default function GroupPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-warm pt-28 pb-16 md:pt-32 lg:min-h-[calc(100vh-10rem)] lg:flex lg:items-center lg:pt-36 lg:pb-20">
        <div className="container-editorial w-full">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <p className="eyebrow-gold mb-8 no-justify">MOHAN LAL & SONS · BIJOLIA · SINCE 1972</p>
              </div>
              <HeroWordRise
                as="h1"
                words={['The', 'Group.']}
                className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter leading-[0.98] text-obsidian mb-8"
                baseDelay={250}
                staggerDelay={130}
              />
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '950ms' }}>
                <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-4xl mb-10">
                  Five verticals. One house. A working enterprise rooted in Bijolia.
                </p>
                <p className="max-w-3xl font-sans text-lg leading-relaxed text-graphite">
                  Mohan Lal & Sons operates across stone and export, automotive and fuel, hospitality, student housing, and food services. KHADANE™ is the stone export vertical of that house, also known to the trade as Dhakar Stones Group.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#verticals" className="inline-flex items-center gap-3 bg-obsidian px-8 py-4 font-sans text-sm uppercase tracking-wider text-warm-white transition-colors duration-400 ease-editorial hover:bg-quarry-gold hover:text-obsidian no-justify">
                    <Building2 size={16} strokeWidth={1.6} />
                    The five verticals
                  </a>
                  <Link href="/khadane/desk" className="inline-flex items-center gap-3 border border-obsidian/70 px-8 py-4 font-sans text-sm uppercase tracking-wider text-obsidian transition-colors duration-400 ease-editorial hover:bg-obsidian hover:text-warm-white no-justify">
                    <Mail size={16} strokeWidth={1.6} />
                    Buyer desk
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-obsidian/10 bg-stone-linen/55 p-5 lg:p-6 opacity-0 animate-fade-in" style={{ animationDelay: '750ms' }}>
                <div className="mb-8 flex justify-center border-b border-obsidian/10 pb-8">
                  <Image
                    src={ASSETS.mls.lockup.onLight}
                    alt="Mohan Lal & Sons"
                    width={420}
                    height={164}
                    className="h-auto w-[260px] lg:w-[320px]"
                    priority
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {groupStats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="bg-warm-white p-6 lg:p-7">
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
        </div>
      </section>

      {/* Operating statement */}
      <section className="section-cream py-12 lg:py-16 border-y border-obsidian/8">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {operatingPrinciples.map((item) => (
                <div key={item.title} className="bg-warm-white p-8 lg:p-10">
                  <p className="font-mono text-xs uppercase tracking-eyebrow text-quarry-gold no-justify mb-8">Operating principle</p>
                  <h2 className="font-display text-3xl text-obsidian no-justify mb-4">{item.title}</h2>
                  <p className="font-sans text-sm leading-relaxed text-graphite">{item.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* The five verticals */}
      <section id="verticals" className="section-padding section-warm">
        <div className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">THE FIVE VERTICALS</p>
                <h2 className="section-heading">
                  A portfolio built
                  <span className="block italic text-quarry-gold">around regional work.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  The group’s businesses serve the same working corridor that shaped the stone trade: Bijolia, Bhilwara, Kota, and the routes between quarry, yard, port, students, families, and regional industry.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5 xl:gap-6">
            {verticals.map((vertical, index) => {
              const Icon = vertical.icon
              return (
                <RevealOnScroll key={vertical.code} delay={Math.min(index * 80, 300)}>
                  <article className="flex h-full min-h-[430px] min-w-0 flex-col justify-between border border-obsidian/8 bg-stone-linen/55 p-7 transition-colors duration-400 ease-editorial hover:bg-warm-white">
                    <div>
                      <div className="mb-10 flex items-start justify-between gap-5">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-quarry-gold no-justify">Vertical</p>
                          <p className="mt-2 font-display text-2xl text-obsidian no-justify">{vertical.code}</p>
                        </div>
                        <span className="grid h-10 w-10 shrink-0 place-items-center border border-quarry-gold/35 text-quarry-gold">
                          <Icon size={18} strokeWidth={1.5} />
                        </span>
                      </div>
                      <h3 className="font-display text-3xl leading-tight text-obsidian no-justify mb-4">{vertical.name}</h3>
                      <p className="font-display italic text-lg leading-snug text-quarry-gold no-justify mb-7">{vertical.brand}</p>
                      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/55 no-justify mb-5">{vertical.note}</p>
                      <p className="font-sans text-sm leading-7 text-graphite no-justify">{vertical.description}</p>
                    </div>
                    {vertical.href && (
                      <div className="mt-10 border-t border-obsidian/10 pt-6">
                        <Link href={vertical.href} className="inline-flex items-center gap-3 font-sans text-sm uppercase tracking-wider text-obsidian transition-colors hover:text-quarry-gold no-justify">
                          Open catalogue <ArrowRight size={16} strokeWidth={1.6} />
                        </Link>
                      </div>
                    )}
                  </article>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* KHADANE inside the group */}
      <section className="section-padding section-dark texture-lines">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">KHADANE INSIDE THE GROUP</p>
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] text-warm-white no-justify mb-8">
                  The export face
                  <span className="block italic text-quarry-gold">of the stone vertical.</span>
                </h2>
                <p className="font-sans text-lg leading-relaxed text-warm-white/72">
                  Stone moves from owned and allied quarries to the Bijolia yard for processing, then to Mundra port for export. The sequence is direct, documented, and visible across the quarry, yard, collection, and desk pages.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  {khadaneRole.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="bg-warm-white/[0.06] p-7 lg:p-8">
                        <Icon size={22} strokeWidth={1.5} className="mb-8 text-quarry-gold" />
                        <h3 className="font-display text-2xl text-warm-white no-justify mb-4">{item.title}</h3>
                        <p className="font-sans text-sm leading-relaxed text-warm-white/65">{item.body}</p>
                      </div>
                    )
                  })}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Documentary frame */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <PlaceholderImage
                  variant="yard"
                  label="GROUP · HERO"
                  title="A working enterprise. Since 1972."
                  spec="Wide operational photograph: office, yard, quarry, or dispatch team at scale."
                  swapPath="/img/group/hero.jpg"
                  aspectRatio="aspect-[4/5]"
                />
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="eyebrow-gold mb-6 no-justify">SOURCING & WORKFORCE</p>
                <h2 className="section-heading mb-8">
                  Direct logistics,
                  <span className="block italic text-quarry-gold">long-tenure people.</span>
                </h2>
                <div className="space-y-6">
                  <p className="editorial-body">
                    The KHADANE workforce across quarry, yard, and office is the operational base behind the catalogue. Many people have worked with the group for over a decade, and some across two generations of their own families.
                  </p>
                  <p className="editorial-body">
                    That continuity matters commercially: buyers receive material from known beds, processed in a known yard, packed against a known order, and handled by a desk that can trace the stone back to source.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer desk */}
      <section className="section-padding section-tobacco">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <Link
                  href="/mls"
                  aria-label="Open Mohan Lal & Sons homepage"
                  className="mb-10 flex justify-start transition-opacity hover:opacity-80"
                >
                  <Image
                    src={ASSETS.mls.lockup.onDark}
                    alt="Mohan Lal & Sons"
                    width={400}
                    height={156}
                    className="h-auto w-[260px] lg:w-[340px]"
                  />
                </Link>
                <h2 className="font-display text-4xl lg:text-5xl leading-tight text-warm-white no-justify mb-6">
                  Trade enquiries move through the KHADANE desk.
                </h2>
                <p className="font-sans text-base leading-relaxed text-warm-white/70 mb-8">
                  For the full house, visit Mohan Lal & Sons. For sandstone sourcing, formats, datasheets, samples, and export orders, write to KHADANE.
                </p>
                <a
                  href={SITE.parent.site}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-3 border border-quarry-gold px-8 py-4 font-sans text-sm uppercase tracking-wider text-quarry-gold transition-all duration-400 ease-editorial hover:bg-quarry-gold hover:text-obsidian no-justify"
                >
                  Mohan Lal & Sons <ArrowRight size={16} strokeWidth={1.6} />
                </a>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <div className="grid grid-cols-1 gap-px bg-warm-white/10 md:grid-cols-2">
                  {buyerDesk.map((item) => (
                    <div key={item.label} className="bg-obsidian/35 p-7 lg:p-8">
                      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-quarry-gold no-justify mb-4">{item.label}</p>
                      <p className="font-sans text-lg leading-snug text-warm-white no-justify">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/khadane/desk" className="inline-flex items-center gap-3 bg-quarry-gold px-8 py-4 font-sans text-sm uppercase tracking-wider text-obsidian transition-colors duration-400 ease-editorial hover:bg-warm-white no-justify">
                    Open the desk <ArrowRight size={16} strokeWidth={1.6} />
                  </Link>
                  <a href={`mailto:${SITE.contact.publicEmail}`} className="inline-flex items-center gap-3 border border-warm-white/35 px-8 py-4 font-sans text-sm uppercase tracking-wider text-warm-white transition-colors duration-400 ease-editorial hover:bg-warm-white hover:text-obsidian no-justify">
                    Email export desk <Mail size={16} strokeWidth={1.6} />
                  </a>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <BrandWhisper customLine={SITE.signature} />
    </>
  )
}
