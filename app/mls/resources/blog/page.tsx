import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { ENTITIES, FOUNDING, SIGNATURE_LINES } from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Blog',
  description:
    'The institutional reading of the work. Written by members of the family. Edited by no one.',
  path: '/resources/blog',
})

export default function BlogPage() {
  return (
    <>
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                Blog · Resources
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7.5rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                {SIGNATURE_LINES.editedByNoOne}.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                Written by members of the family. Without a desk between
                the writer and the reader.
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
                The archive begins shortly
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-mls-ink mb-6">
                The first entries
                <span className="block italic text-mls-gold mt-2">
                  are being written.
                </span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="text-lg leading-relaxed text-mls-ink/85 max-w-2xl mb-10">
                The blog begins as the family begins. There is no editorial
                team waiting in the wings, and there will not be one. Entries
                are written by family members in their own voice, when they
                have something worth writing.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={350}>
              <Link
                href="/our-legacy"
                className="inline-flex items-center gap-3 text-mls-gold hover:gap-4 transition-all font-display italic text-lg"
              >
                Read the legacy in the meantime <ArrowRight className="w-4 h-4" />
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
