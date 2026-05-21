import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { ENTITIES, FOUNDING, CONTACT } from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Brochures',
  description:
    'Vertical-specific brochures for partners, families, and visiting press. Available on request.',
  path: '/resources/brochures',
})

export default function BrochuresPage() {
  return (
    <>
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                Brochures · Resources
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                Vertical-specific
                <span className="block italic text-mls-gold mt-2">
                  reading materials.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                For partners, for families considering a residence, for
                visiting press.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-mls-buff/20 py-20 lg:py-28 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'M3 Hotel — for visiting families.',
                detail: 'Reservation context, services, the neighbourhood.',
                href: '/verticals/hospitality',
              },
              {
                title: "The Girls' Campus — for parents.",
                detail: 'The Princess + Victoria Palace, the day at the campus, the kitchen.',
                href: '/verticals/student-housing/girls',
              },
              {
                title: 'Vyanjanam — for prospective subscribers.',
                detail: 'The kitchen, the sourcing chain, the plans.',
                href: '/verticals/food-services',
              },
              {
                title: 'The Stone Catalogue — for trade buyers.',
                detail: 'Full catalogue at the trade brand.',
                href: '/khadane',
                external: true,
              },
            ].map((b, i) => {
              const Wrapper = b.external ? 'a' : Link
              const wrapperProps = b.external
                ? { href: b.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: b.href }
              return (
                <RevealOnScroll key={b.title} delay={i * 80}>
                  <Wrapper
                    {...(wrapperProps as any)}
                    className="block bg-mls-cream p-7 lg:p-8 h-full border border-mls-ink/10 hover:bg-mls-cream/60 group transition-colors duration-400"
                  >
                    <h3 className="font-display text-2xl text-mls-ink tracking-tight leading-tight mb-3 group-hover:text-mls-gold transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-mls-ink/75 mb-5">
                      {b.detail}
                    </p>
                    <p className="inline-flex items-center gap-2 text-mls-gold text-sm font-body tracking-wider group-hover:gap-3 transition-all">
                      Read the vertical{' '}
                      {b.external ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </p>
                  </Wrapper>
                </RevealOnScroll>
              )
            })}
          </div>

          <RevealOnScroll delay={400}>
            <p className="mt-12 text-base text-mls-slate italic max-w-3xl">
              Printable PDF brochures are available on request. Write to{' '}
              <a
                href={`mailto:${CONTACT.officeMLS}?subject=Brochure%20Request`}
                className="text-mls-gold underline-offset-4 hover:underline"
              >
                {CONTACT.officeMLS}
              </a>{' '}
              and tell us which vertical you need material for.
            </p>
          </RevealOnScroll>
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
