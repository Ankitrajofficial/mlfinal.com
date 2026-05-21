import { buildMetadata } from '@/lib/seo'
import { ENTITIES, FOUNDING, SIGNATURE_LINES } from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Press',
  description:
    'Press coverage of the group, the verticals, and the family — as it appears. Not curated highlights, not edited for tone.',
  path: '/resources/press',
})

export default function PressPage() {
  return (
    <>
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                Press · Resources
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                {SIGNATURE_LINES.notCuratedHighlights}.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                Coverage of the group, the verticals, and the family — as
                it appears in the record.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-mls-buff/20 py-20 lg:py-28 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                The archive is being assembled
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-mls-ink mb-6">
                As coverage accumulates,
                <span className="block italic text-mls-gold mt-2">
                  it will be added here verbatim.
                </span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="text-lg leading-relaxed text-mls-ink/85 max-w-2xl">
                The family does not maintain a press office, and there is
                no PR retainer between us and the journalists who write
                about the work. Coverage is added to this archive as it
                lands — full text where possible, link otherwise. We do
                not curate the archive for tone.
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
