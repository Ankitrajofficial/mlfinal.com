import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { ENTITIES, FOUNDING } from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Resources',
  description:
    'Resources from the group — the blog, the press archive, brochures, and the KHADANE™ catalogue.',
  path: '/resources',
})

export default function ResourcesHubPage() {
  const resources = [
    {
      href: '/resources/blog',
      label: 'Blog',
      body: 'The institutional reading of the work. Written by members of the family. The archive begins shortly.',
    },
    {
      href: '/resources/catalogues',
      label: 'Catalogues',
      body: 'The KHADANE™ trade catalogue and supporting documents for buyers.',
      external: true,
    },
    {
      href: '/resources/press',
      label: 'Press',
      body: 'Press coverage of the group, the verticals, and the family — as it appears.',
    },
    {
      href: '/resources/brochures',
      label: 'Brochures',
      body: 'Vertical-specific brochures for partners, families, and visiting press.',
    },
  ]

  return (
    <>
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                Resources
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                The reading,
                <span className="block italic text-mls-gold mt-2">
                  the record, the work.
                </span>
              </h1>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-mls-cream py-20 lg:py-28 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-mls-ink/10">
            {resources.map((r, i) => (
              <RevealOnScroll key={r.href} delay={i * 80}>
                <Link href={r.href} className="block bg-mls-cream p-8 lg:p-12 h-full hover:bg-mls-buff/30 transition-colors duration-400 group">
                  <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-3xl lg:text-4xl text-mls-ink tracking-tight leading-tight mb-5 group-hover:text-mls-gold transition-colors">
                    {r.label}
                  </h3>
                  <p className="text-base leading-relaxed text-mls-ink/80 mb-6">
                    {r.body}
                  </p>
                  <p className="inline-flex items-center gap-2 text-mls-gold text-sm font-body tracking-wider group-hover:gap-3 transition-all">
                    Open <ArrowRight className="w-4 h-4" />
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
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
