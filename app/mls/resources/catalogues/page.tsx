import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { ENTITIES, FOUNDING } from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Catalogues',
  description:
    'The KHADANE™ trade catalogue — varieties, formats, and the supporting documents buyers need.',
  path: '/resources/catalogues',
})

export default function CataloguesPage() {
  return (
    <>
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                Catalogues · Resources
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                The catalogue
                <span className="block italic text-mls-gold mt-2">
                  lives at KHADANE™.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                Stone varieties, production formats, technical sheets, and
                the field notes that go alongside them.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-mls-ink text-mls-cream py-24 lg:py-32 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-8">
                Open KHADANE
                <sup className="text-2xl text-mls-gold align-top">™</sup>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
              <p className="text-lg leading-relaxed text-mls-cream/85 mb-10 max-w-2xl">
                The trade brand carries the working catalogue — the
                collection of varieties, the formats they ship in, the field
                notes the family writes alongside the work, and the
                technical sheets for the desk.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
              <Link
                href="/khadane/collection"
                className="inline-flex items-center gap-3 px-10 py-5 bg-mls-gold text-mls-ink text-sm font-body tracking-wider uppercase hover:bg-mls-cream hover:gap-4 transition-all duration-400 ease-editorial"
              >
                Open the collection
                <ArrowUpRight className="w-5 h-5" />
              </Link>
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
