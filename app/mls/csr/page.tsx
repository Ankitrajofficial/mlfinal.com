import { buildMetadata } from '@/lib/seo'
import {
  ENTITIES,
  FOUNDING,
  INSTITUTIONAL_PARTNER,
  CONTACT,
} from '@/lib/facts'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import RevealOnScroll from '@/components/shared/RevealOnScroll'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'CSR',
  description:
    "The family's institutional commitments — long-tenured workforce, community-fixture operations in Kunhari, sourcing chain transparency, direct buyer relationships. The CSR is the way the operations run.",
  path: '/csr',
})

/**
 * CSR page — four-commitment institutional treatment.
 *
 * Per FACTS Section 13: the family does NOT operate a separate CSR program.
 * Instead, the CSR is the way the operations run. Four commitments,
 * each anchored in an operational truth already locked elsewhere on the site.
 */
export default function CSRPage() {
  const commitments = [
    {
      num: '01',
      title: 'Long-tenured workforce as a standard.',
      body: `The family's commitment to its workforce is measured in years of tenure, not in program enrolments. Mr. ${INSTITUTIONAL_PARTNER.name} joined in ${INSTITUTIONAL_PARTNER.tenureStart} and stands as family. The institutional pattern repeats across the quarry floor, the residences, the kitchen, and the road.`,
    },
    {
      num: '02',
      title: 'A community fixture, not a commercial post.',
      body: "In Kota's Kunhari neighbourhood, every operation the group runs — the residences, M3 Hotel, M3 Mini Mall, Vyanjanam — was built as a fixture of the neighbourhood, not as a transactional service. The family lives, eats, and operates from within the community it serves.",
    },
    {
      num: '03',
      title: 'A sourcing chain we can name.',
      body: "From the dairy farm in Bijolia to the buttermilk on a student's tray in Kota, the food the family serves travels a route the family can name. Sourcing chain transparency is the family's commitment to the people who depend on the meal — and on the people who grow and tend the source.",
    },
    {
      num: '04',
      title: 'Direct buyer relationships.',
      body: 'The shift to direct buyer-to-buyer export under KHADANE™ in 2026 was a CSR decision as much as a commercial one. Eliminating intermediaries means quarry workers see the price closer to source, and the family\'s institutional standing reaches the buyer directly. No layer between the work and the receiver of it.',
    },
  ]

  return (
    <>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                CSR · {ENTITIES.group.acronym}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                The CSR is
                <span className="block italic text-mls-gold mt-2">
                  how the work runs.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                The family does not run a separate CSR programme. Four
                institutional commitments are surfaced here, each grounded
                in operational truth.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          THE FOUR COMMITMENTS
          ============================================================ */}
      <section className="bg-mls-buff/20 py-20 lg:py-32 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-16">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
                Four commitments
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-mls-ink tracking-tight">
                Read in order.
              </h2>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-mls-ink/10">
            {commitments.map((c, i) => (
              <RevealOnScroll key={c.num} delay={i * 80}>
                <div className="bg-mls-cream p-8 lg:p-12 h-full flex flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                    {c.num}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight leading-tight text-mls-ink mb-5">
                    {c.title}
                  </h3>
                  <p className="text-base lg:text-lg leading-relaxed text-mls-ink/80">
                    {c.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          THE CLOSING LINE — the strong institutional thesis
          ============================================================ */}
      <section className="bg-mls-ink text-mls-cream py-24 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-8">
                The Reading
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <p className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-10">
                The family does not run a separate
                <span className="italic text-mls-gold"> CSR programme.</span>
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="font-display italic text-3xl md:text-4xl text-mls-cream/90 leading-snug">
                The CSR is the way the operations run.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={350}>
              <div className="mt-12 pt-10 border-t border-mls-cream/15">
                <p className="text-sm leading-relaxed text-mls-cream/70 max-w-2xl mb-6">
                  For questions about the family&rsquo;s operating
                  philosophy, partnerships, or sourcing principles, write to
                  the office. {FOUNDING.yearsEvergreen}.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-mls-gold text-mls-gold text-sm font-body tracking-wider uppercase hover:bg-mls-gold hover:text-mls-ink hover:gap-4 transition-all duration-400 ease-editorial"
                >
                  Write to The Office
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER LINE
          ============================================================ */}
      <section className="bg-mls-cream py-16 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate text-center">
            {ENTITIES.footerSignature.toUpperCase()} ·{' '}
            BIJOLIA · {FOUNDING.yearsEvergreen}
          </p>
        </div>
      </section>
    </>
  )
}
