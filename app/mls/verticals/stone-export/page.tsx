import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import {
  ENTITIES,
  KHADANE_SCALE,
  FOUNDING,
  CROSS_LINKS,
  LOCATIONS,
} from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'
import PlaceholderImage from '@/components/shared/PlaceholderImage'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Stone & Export — KHADANE™',
  description:
    'Stone and export is operated under KHADANE™, the trade-facing brand of the group. Bijolia, Rajasthan. Direct buyer-to-buyer export since 2026.',
  path: '/verticals/stone-export',
})

/**
 * Stone & Export vertical — BRIDGE page.
 * Short. Institutional context for why stone gets its own brand.
 * Then hands off to khadane.com.
 */
export default function StoneExportBridgePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                01 · Stone &amp; Export
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                The founding vertical.
                <span className="block italic text-mls-gold mt-2">
                  Still the largest.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                {CROSS_LINKS.mlsToKhadane}
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
                  The work the family began in 1972 was stone, and stone has
                  remained the largest part of the group&rsquo;s
                  operations. {KHADANE_SCALE.quarries} quarries across the
                  Bijolia belt are operated under the family&rsquo;s own
                  hand. {KHADANE_SCALE.annualOutput} of annual output moves
                  through multiple in-house processing units to the major
                  Indian sea ports.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <p>
                  For more than twenty-five years, this stone reached its
                  overseas markets through intermediaries — agents,
                  consolidators, traders. The family knew the quarry and
                  the loading port, but rarely the building or garden it
                  ended up in. In 2026 the family consolidated all
                  direct buyer-to-buyer export under KHADANE™, the
                  trade-facing brand of {ENTITIES.dsg.name}.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p>
                  KHADANE™ is the operating brand for the buyer
                  conversation. The collection, the formats, the field
                  notes, the quarry, the yard, the desk — the buyer-facing
                  surfaces of the work — all live there. This page is the
                  reading of why.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5">
              <RevealOnScroll delay={150}>
                <PlaceholderImage
                  label="STONE · DOCUMENTARY"
                  title="The work, at the face."
                  spec="1200 × 1500px · Quarry-face documentary"
                  swapPath="/img/stone-export-quarry.jpg"
                  aspectRatio="aspect-[4/5]"
                  variant="documentary"
                />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* THE HAND-OFF */}
      <section className="bg-mls-ink text-mls-cream py-24 lg:py-40">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                Continue at the trade brand
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] mb-4">
                KHADANE
                <sup className="text-3xl md:text-4xl text-mls-gold align-top">
                  ™
                </sup>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="font-display italic text-2xl text-mls-gold mb-10">
                खदान — The Quarry
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
              <p className="text-lg leading-relaxed text-mls-cream/85 max-w-2xl mb-12">
                The collection, the formats, the catalogue, the field notes,
                the quarry, the yard, and the desk. Open the trade brand.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <Link
                href="/khadane"
                className="inline-flex items-center gap-3 px-10 py-5 bg-mls-gold text-mls-ink text-sm font-body tracking-wider uppercase hover:bg-mls-cream hover:gap-4 transition-all duration-400 ease-editorial"
              >
                Open khadane.com
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* FOOTER LINE */}
      <section className="bg-mls-cream py-16 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate text-center">
            {ENTITIES.footerSignature.toUpperCase()} · {LOCATIONS.bijolia.district.toUpperCase()} · {FOUNDING.yearsEvergreen.toUpperCase()}
          </p>
        </div>
      </section>
    </>
  )
}
