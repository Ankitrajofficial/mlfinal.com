import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { ENTITIES, FOUNDING, MLS_SCALE, CONTACT } from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'
import PlaceholderImage from '@/components/shared/PlaceholderImage'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Hospitality — M3 Boutique Hotel',
  description:
    'M3 Boutique Hotel in Kunhari, Kota — opened in 2016 for the families of students who came for the coaching examinations. M3 Mini Mall adjacent.',
  path: '/verticals/hospitality',
})

export default function HospitalityPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                03 · Hospitality
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                A strategic expansion.
                <span className="block italic text-mls-gold mt-2">
                  Into Kota, for the families.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                The students were already with us. The families visiting them
                needed somewhere quiet to stay. So we built M3.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="bg-mls-cream py-20 lg:py-28 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-mls-ink/85">
              <RevealOnScroll>
                <p>
                  M3 Boutique Hotel was opened in {MLS_SCALE.m3Opened} in
                  Kunhari, the same neighbourhood of Kota where the
                  family&rsquo;s student residences are located. The two
                  operations are within five minutes of each other. The
                  families of students staying with us — at The Princess, at
                  Victoria Palace, in the boys&rsquo; residences — were
                  routinely looking for somewhere to stay when visiting
                  their children. The decision to build M3 was, in that
                  sense, an obligation answered.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <p>
                  M3 is a {MLS_SCALE.m3Rooms.toLowerCase()} hotel — boutique
                  in the literal sense of the word. The kitchen,
                  housekeeping, and reception are run with the same
                  institutional standards as the residences and the food
                  service. The hotel does not run promotions, does not
                  publish room rates online, and accepts direct enquiries.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5">
              <RevealOnScroll delay={150}>
                <PlaceholderImage
                  label="M3 · KUNHARI · KOTA"
                  title="The lobby, late afternoon."
                  spec="1200 × 1500px · M3 interior, available light"
                  swapPath="/img/m3-lobby.jpg"
                  aspectRatio="aspect-[4/5]"
                  variant="mls-tobacco"
                />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* M3 MINI MALL */}
      <section className="bg-mls-buff/20 py-20 lg:py-28 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <PlaceholderImage
                  label="M3 MINI MALL · KUNHARI"
                  title="The walkway, between buildings."
                  spec="1200 × 1500px · M3 Mini Mall facade or corridor"
                  swapPath="/img/m3-mini-mall.jpg"
                  aspectRatio="aspect-[4/5]"
                  variant="mls-cream"
                />
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  02 · M3 Mini Mall
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.05] text-mls-ink mb-6">
                  Adjacent to the hotel.
                  <span className="block italic text-mls-gold mt-2">
                    Built for the neighbourhood.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <div className="space-y-5 text-lg leading-relaxed text-mls-ink/85">
                  <p>
                    M3 Mini Mall sits adjacent to the hotel — small,
                    walkable, with the kind of shops a family living or
                    visiting in Kunhari actually needs. Stationery, daily
                    provisions, food, and a few specialised retailers.
                  </p>
                  <p>
                    It was built as a fixture of the Kunhari neighbourhood,
                    not as a commercial post. The tenant mix is curated by
                    the family with the residents in mind.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVE */}
      <section className="bg-mls-ink text-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  Reserve a room
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
                  Write to reception
                  <span className="block italic text-mls-gold mt-2">
                    for available dates.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="text-lg leading-relaxed text-mls-cream/85 max-w-xl">
                  M3 does not publish rates online. Send your dates and
                  number of guests; we&rsquo;ll reply with availability and
                  pricing for those specific dates, usually{' '}
                  {CONTACT.slaHospitality}.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-mls-cream/15">
              <RevealOnScroll delay={150}>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-cream/60 mb-2">
                      Reception
                    </p>
                    <a
                      href={`tel:${CONTACT.m3HotelReception.replace(/\s/g, '')}`}
                      className="font-display text-xl text-mls-cream hover:text-mls-gold transition-colors"
                    >
                      {CONTACT.m3HotelReception}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-cream/60 mb-2">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT.officeMLS}?subject=M3%20Hotel%20Reservation`}
                      className="font-display text-xl text-mls-cream hover:text-mls-gold transition-colors break-all"
                    >
                      {CONTACT.officeMLS}
                    </a>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-mls-gold text-mls-gold text-sm font-body tracking-wider uppercase hover:bg-mls-gold hover:text-mls-ink transition-all duration-400"
                    >
                      Open the contact page
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mls-cream py-16 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate text-center">
            {ENTITIES.footerSignature.toUpperCase()} · KUNHARI, KOTA · {FOUNDING.yearsEvergreen.toUpperCase()}
          </p>
        </div>
      </section>
    </>
  )
}
