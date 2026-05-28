import { buildMetadata } from '@/lib/seo'
import { ENTITIES, FOUNDING, SIGNATURE_LINES } from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'
import PlaceholderImage from '@/components/shared/PlaceholderImage'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Gallery',
  description:
    'The work, as it appears. Photographs from the verticals — stone at the quarry, the residences in Kunhari, the kitchen at Vyanjanam, the road. Not curated, not staged.',
  path: '/gallery',
})

export default function GalleryPage() {
  return (
    <>
      {/* SECTION 01 — HERO */}
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                The Gallery
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7.5rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                {SIGNATURE_LINES.workAsItAppears}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                Photographs from the verticals. Stone at the quarry, the
                residences in Kunhari, the kitchen at Vyanjanam, the road.
                Not staged.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* SECTION 02 — STONE */}
      <section className="bg-mls-buff/20 py-20 lg:py-28 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-10">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
                02 · Stone
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-mls-ink tracking-tight">
                At the quarry, at the yard.
              </h2>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { l: 'STONE · 001', t: 'Block selection, morning.', p: '/img/mls-gallery/quarry-face.jpg' },
              { l: 'STONE · 002', t: 'Calibration line.', p: '/img/mls-gallery/yard-work.jpg' },
              { l: 'STONE · 003', t: 'Loading, the Mundra container.', p: '/img/mls-gallery/quarry-road.jpg' },
              { l: 'STONE · 004', t: 'Hands at the face.', p: '/img/mls-gallery/yard-overview.jpg' },
            ].map((item, i) => (
              <RevealOnScroll key={item.l} delay={i * 80}>
                <PlaceholderImage
                  label={item.l}
                  title={item.t}
                  swapPath={item.p}
                  aspectRatio="aspect-[3/4]"
                  variant="documentary"
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03 — KUNHARI CLUSTER */}
      <section className="bg-mls-cream py-20 lg:py-28 border-b border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-10">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
                03 · The Kunhari cluster
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-mls-ink tracking-tight">
                M3, Princess, Victoria, Vyanjanam.
              </h2>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { l: 'M3 · MALL', t: 'M3 mall and banquet frontage.', v: 'mls-tobacco' as const, p: '/img/m3-mini-mall.webp' },
              { l: 'PRINCESS · DAY', t: 'The morning walk to class.', v: 'documentary' as const, p: '/img/mls-gallery/princess-day.jpg' },
              { l: 'VICTORIA · STUDY', t: 'Library hours, evening.', v: 'mls-cream' as const, p: '/img/mls-gallery/victoria-study.jpg' },
              { l: 'VYANJANAM · SERVICE', t: 'Lunch, the busy hour.', v: 'vyanjanam-dark' as const, p: '/img/mls-gallery/vyanjanam-service.jpg' },
            ].map((item, i) => (
              <RevealOnScroll key={item.l} delay={i * 80}>
                <PlaceholderImage
                  label={item.l}
                  title={item.t}
                  swapPath={item.p}
                  aspectRatio="aspect-square"
                  variant={item.v}
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04 — PHOTOGRAPHER ACKNOWLEDGEMENT (locked empty state) */}
      <section className="bg-mls-ink text-mls-cream py-20 lg:py-28">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                04 · The photographers
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] mb-6">
                Working photographers
                <span className="block italic text-mls-gold mt-2">
                  commissioned across the verticals.
                </span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="text-lg leading-relaxed text-mls-cream/85 max-w-2xl">
                The archive will name them as the work continues. Photographs
                are commissioned on documentary terms — no posed shots, no
                stylists, no models. The work, as it appears.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* SECTION 05 — THE ARCHIVE */}
      <section className="bg-mls-cream py-20 lg:py-28">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                05 · The archive
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-mls-ink mb-6">
                Photographs accumulate
                <span className="block italic text-mls-gold mt-2">
                  as the work runs.
                </span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="text-lg leading-relaxed text-mls-ink/85 max-w-2xl">
                The gallery is a working archive. New photographs are added
                as photographers document the verticals. Where a photograph
                is pending, the page reads honestly about that.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-mls-cream py-16 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate text-center">
            {ENTITIES.footerSignature.toUpperCase()} · {FOUNDING.yearsEvergreen.toUpperCase()}
          </p>
        </div>
      </section>
    </>
  )
}
