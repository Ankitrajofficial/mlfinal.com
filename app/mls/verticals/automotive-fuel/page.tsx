import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import {
  ENTITIES,
  FOUNDING,
  MLS_SCALE,
  LOCATIONS,
  CONTACT,
} from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'
import PlaceholderImage from '@/components/shared/PlaceholderImage'
import SectionHeader from '@/components/mls/SectionHeader'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Automotive & Fuel',
  description:
    'Dhakar Motors (Ashok Leyland authorised dealer, since 2013, Dabi, Bundi District) and Dharnidhar Fuels (two stations on NH 27 — IOC + Nayara Energy partnerships).',
  path: '/verticals/automotive-fuel',
})

export default function AutomotiveFuelPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                02 · Automotive &amp; Fuel
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                A strategic expansion.
                <span className="block italic text-mls-gold mt-2">
                  From the family&rsquo;s own fleet outward.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                The stone had to move. The trucks had to run. The work
                expanded into the road and the pumps that kept it running.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="bg-mls-cream py-20 lg:py-28 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <SectionHeader
            number="01"
            eyebrow="The shape of the expansion"
            heading="The fleet came first."
            subLine="The retail dealership followed."
            layout="split"
            body={
              <>
                <p>
                  The stone moves by truck. For the first decades, the
                  family operated its own fleet from Bijolia to the loading
                  ports. The work of buying parts, maintaining trucks, and
                  building up that institutional knowledge of commercial
                  vehicles eventually outgrew the fleet itself.
                </p>
                <p>
                  In {MLS_SCALE.dhakarMotorsOpened}, the family opened
                  Dhakar Motors — an Ashok Leyland authorised dealership at
                  Dabi, in {LOCATIONS.dhakarMotorsLocation.split(', ').slice(1).join(', ')}.
                  Dharnidhar Fuels followed, two stations on NH 27 near
                  Nala-ke-Mataji, in partnership with Indian Oil and Nayara
                  Energy.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* DHAKAR MOTORS */}
      <section className="bg-mls-buff/20 py-20 lg:py-32 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <PlaceholderImage
                  label="DHAKAR MOTORS · DABI"
                  title="The dealership floor."
                  spec="1200 × 1500px · Ashok Leyland dealership, working day"
                  swapPath="/img/dhakar-motors.jpg"
                  aspectRatio="aspect-[4/5]"
                  variant="mls-tobacco"
                />
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7 lg:pl-4">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  02 · Dhakar Motors
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] text-mls-ink mb-6">
                  Ashok Leyland,
                  <span className="block italic text-mls-gold mt-2">
                    authorised since {MLS_SCALE.dhakarMotorsOpened}.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <div className="space-y-5 text-lg leading-relaxed text-mls-ink/85">
                  <p>
                    Dhakar Motors operates from Dabi in Bundi District —
                    deliberately placed to serve the commercial-vehicle
                    operators of the stone belt and the highways that pass
                    through it. Sales, service, parts, and operator
                    training, all under one roof.
                  </p>
                  <p>
                    The dealership has been carried by Mr. Rajesh Dhakar
                    since opening. The institutional knowledge of trucks
                    that the family had built up over forty years of moving
                    its own stone is now extended to the operators who buy
                    them from us.
                  </p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 mt-10 pt-8 border-t border-mls-ink/10">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-1">
                      Brand partner
                    </dt>
                    <dd className="font-display text-lg text-mls-ink">
                      Ashok Leyland
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-1">
                      Since
                    </dt>
                    <dd className="font-display text-lg text-mls-ink">
                      {MLS_SCALE.dhakarMotorsOpened}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-1">
                      Location
                    </dt>
                    <dd className="font-display text-lg text-mls-ink">
                      {LOCATIONS.dhakarMotorsLocation}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-1">
                      Direct line
                    </dt>
                    <dd className="font-display text-lg text-mls-ink">
                      <a
                        href={`tel:${CONTACT.rajeshDhakarMotors.replace(/\s/g, '')}`}
                        className="hover:text-mls-gold transition-colors"
                      >
                        {CONTACT.rajeshDhakarMotors}
                      </a>
                    </dd>
                  </div>
                </dl>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* DHARNIDHAR FUELS */}
      <section className="bg-mls-cream py-20 lg:py-32 border-b border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  03 · Dharnidhar Fuels
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] text-mls-ink mb-6">
                  Two stations.
                  <span className="block italic text-mls-gold mt-2">
                    On the highway home.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <div className="space-y-5 text-lg leading-relaxed text-mls-ink/85">
                  <p>
                    Dharnidhar Fuels operates {MLS_SCALE.dharnidharStations.toLowerCase()} on NH 27 near Nala-ke-Mataji, Deogarh —
                    in partnership with Indian Oil and Nayara Energy. The
                    locations are deliberately placed on the artery that
                    carries the family&rsquo;s trucks and the trucks of
                    other operators in the stone belt.
                  </p>
                  <p>
                    Both stations operate to the standards of the brand
                    partners they carry, with the family&rsquo;s own
                    institutional discipline around staff tenure, cleanness
                    of forecourt, and reliability of pumps.
                  </p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 mt-10 pt-8 border-t border-mls-ink/10">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-1">
                      Brand partners
                    </dt>
                    <dd className="font-display text-lg text-mls-ink">
                      Indian Oil · Nayara Energy
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-1">
                      Stations
                    </dt>
                    <dd className="font-display text-lg text-mls-ink">
                      {MLS_SCALE.dharnidharStations}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-1">
                      Highway
                    </dt>
                    <dd className="font-display text-lg text-mls-ink">
                      NH 27
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-1">
                      Locality
                    </dt>
                    <dd className="font-display text-lg text-mls-ink">
                      Nala-ke-Mataji, Deogarh
                    </dd>
                  </div>
                </dl>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <RevealOnScroll delay={150}>
                <PlaceholderImage
                  label="DHARNIDHAR · NH 27"
                  title="Forecourt, working hours."
                  spec="1200 × 1500px · One of the two stations, daytime"
                  swapPath="/img/dharnidhar-fuels.jpg"
                  aspectRatio="aspect-[4/5]"
                  variant="documentary"
                />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* WRITE TO US */}
      <section className="bg-mls-tobacco text-mls-cream py-20 lg:py-28">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                Inquiries
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] mb-6">
                Automotive inquiries route to Dhakar Motors directly. Fuel and
                everything else routes through{' '}
                <span className="italic text-mls-gold">The Office</span>.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-mls-gold text-mls-gold text-sm font-body tracking-wider uppercase hover:bg-mls-gold hover:text-mls-tobacco hover:gap-4 transition-all duration-400"
                >
                  Open the contact page
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-mls-cream py-16 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate text-center">
            {ENTITIES.footerSignature.toUpperCase()} · BIJOLIA · {FOUNDING.yearsEvergreen.toUpperCase()}
          </p>
        </div>
      </section>
    </>
  )
}
