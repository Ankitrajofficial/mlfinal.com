import Link from 'next/link'
import { ArrowRight, Send } from 'lucide-react'
import { PUBLISHED_SURFACES } from '@/lib/khadane/surfaces'
import { EDGES } from '@/lib/khadane/edges'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import FinishBlock from '@/components/khadane/FinishBlock'

// Counts track PUBLISHED_SURFACES so holding or publishing a finish cannot
// leave the copy claiming a number the page does not render.
export const metadata = {
  title: `Surfaces & Edges — ${PUBLISHED_SURFACES.length} finishes, four edge profiles`,
  description: `The ${PUBLISHED_SURFACES.length} surface finishes and four edge profiles KHADANE works to order. From sawn and honed to flamed, shotblast, and rockfaced. Photographed on the stone itself.`,
}

export default function SurfacesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding section-cream pt-36 lg:pt-44">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">SURFACES &amp; EDGES</p>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-obsidian no-justify">
                  The worked
                  <span className="block italic text-quarry-gold">face.</span>
                </h1>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-6 lg:self-end">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  Every stone leaves the yard with a surface and an edge that were chosen, not defaulted. {PUBLISHED_SURFACES.length} finishes and four edge profiles cover the range the trade specifies. Each one below is photographed on the stone itself, at the yard.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Published finishes */}
      <section id="finishes" className="section-padding section-warm">
        <div className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">{PUBLISHED_SURFACES.length} FINISHES</p>
                <h2 className="section-heading mb-6">
                  From smooth
                  <span className="block italic text-quarry-gold">to textured.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  The order runs smooth to textured. Sawn and honed at one end, riven and rockfaced at the other. Where a finish carries more than one photograph, the thumbnails expand.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PUBLISHED_SURFACES.map((finish, i) => (
              <RevealOnScroll key={finish.slug} delay={Math.min(i * 40, 400)}>
                <FinishBlock finish={finish} index={i} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Four edges */}
      <section id="edges" className="section-padding section-tobacco">
        <div className="container-editorial">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">FOUR EDGES</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-6 no-justify">
                  Where the stone
                  <span className="block italic text-quarry-gold">meets the joint.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="font-sans text-base leading-relaxed text-warm-white/70">
                  Machine cut for tight contemporary jointing, straight handcut and hand cut for character, bullnose for steps and pool edges. The edge is specified with the order, format by format.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {EDGES.map((edge, i) => (
              <RevealOnScroll key={edge.slug} delay={Math.min(i * 60, 400)}>
                <FinishBlock finish={edge} index={i} dark />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-5 no-justify">SPECIFY IT</p>
                <h2 className="section-heading">
                  Name the stone, the format,
                  <span className="block italic text-quarry-gold">the surface, the edge.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <RevealOnScroll delay={150}>
                <Link
                  href="/khadane/desk"
                  className="inline-flex items-center gap-3 bg-obsidian px-8 py-4 font-sans text-sm uppercase tracking-wider text-warm-white transition-colors hover:bg-tobacco no-justify"
                >
                  <Send size={16} strokeWidth={1.6} />
                  Write to the desk
                  <ArrowRight size={16} strokeWidth={1.6} />
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
