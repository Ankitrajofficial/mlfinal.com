import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { CONTACT, FOUNDING, ENTITIES, LOCATIONS } from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Careers',
  description:
    'Working with the Dhakar family at Mohan Lal & Sons. How the family hires, what we look for, and where to write if you would like to be considered.',
  path: '/careers',
})

/**
 * Careers page — institutional voice, restrained.
 * No "join our team" marketing. Three values + one paragraph on hiring philosophy
 * + honest empty state for current roles.
 */
export default function CareersPage() {
  const values = [
    {
      num: '01',
      title: 'Tenure as a standard.',
      body: "We expect to work with the same people for a long time. The institutional pattern of the family is that the people who join us tend to stay. We hire with that expectation on both sides.",
    },
    {
      num: '02',
      title: 'Operational honesty.',
      body: 'The work runs on what the family actually does. There is no marketing department. There is no separate HR function. Communication is direct, and decisions are taken close to the work.',
    },
    {
      num: '03',
      title: 'Quiet competence.',
      body: 'We look for people who can be trusted to operate without supervision and who do not need recognition to do good work. The family notices, the work notices, and the rest is private.',
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
                Careers · {ENTITIES.group.acronym}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                Working with
                <span className="block italic text-mls-gold mt-2">
                  the family.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                How the family hires, what we look for, and where to write
                if you would like to be considered.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          PHILOSOPHY
          ============================================================ */}
      <section className="bg-mls-cream py-20 lg:py-28 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  How we hire
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-mls-ink">
                  We do not list roles
                  <span className="block italic text-mls-gold mt-2">
                    we cannot fill carefully.
                  </span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-mls-ink/85">
              <RevealOnScroll>
                <p>
                  The family does not run an open hiring funnel. Roles are
                  identified when they are needed and filled with people who
                  can be trusted to carry them. Most of the people working
                  in the group today were either known to the family or
                  came in through someone the family already knew.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <p>
                  If you read the work and find that it speaks to you, write
                  to the office. Tell us what you can do, where you have
                  worked before, and what kind of work you would like to be
                  considered for. The family reads every letter that arrives.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          THE THREE VALUES
          ============================================================ */}
      <section className="bg-mls-buff/20 py-20 lg:py-28 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-12">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
                What we look for
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-mls-ink tracking-tight">
                Three values, named plainly.
              </h2>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-mls-ink/10">
            {values.map((v, i) => (
              <RevealOnScroll key={v.num} delay={i * 80}>
                <div className="bg-mls-cream p-8 lg:p-10 h-full">
                  <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                    {v.num}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight leading-tight text-mls-ink mb-5">
                    {v.title}
                  </h3>
                  <p className="text-base leading-relaxed text-mls-ink/80">
                    {v.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CURRENT OPENINGS — honest empty state
          ============================================================ */}
      <section className="bg-mls-cream py-20 lg:py-28">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                Current openings
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-mls-ink mb-6">
                None listed at this time.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-lg leading-relaxed text-mls-ink/85 mb-6">
                When a role is open and we are accepting applications, it
                will be named here, with the vertical it belongs to and what
                the work involves. Until then, this page reads honestly
                about the state of the hiring.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
              <p className="font-display italic text-lg text-mls-tobacco mb-10">
                You are still welcome to write. Letters of interest are read
                even when no role is open.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          WRITE TO US
          ============================================================ */}
      <section className="bg-mls-tobacco text-mls-cream py-24 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  Write to us
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
                  At The Office,
                  <span className="block italic text-mls-gold mt-2">
                    at one address.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="text-lg leading-relaxed text-mls-cream/85 max-w-xl">
                  Tell us about your work. Tell us where you would like to
                  be considered. We read each letter and reply within one
                  business day.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-mls-cream/15">
              <RevealOnScroll delay={150}>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-cream/60 mb-2">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT.officeMLS}?subject=Careers%20%E2%80%94%20Letter%20of%20Interest`}
                      className="font-display text-xl text-mls-cream hover:text-mls-gold transition-colors break-all"
                    >
                      {CONTACT.officeMLS}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-cream/60 mb-2">
                      Phone
                    </p>
                    <a
                      href={`tel:${CONTACT.groupMain.replace(/\s/g, '')}`}
                      className="font-display text-xl text-mls-cream hover:text-mls-gold transition-colors"
                    >
                      {CONTACT.groupMain}
                    </a>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-mls-cream/40 text-mls-cream text-sm font-body tracking-wider uppercase hover:bg-mls-cream hover:text-mls-tobacco transition-all duration-400"
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

      {/* ============================================================
          FOOTER LINE
          ============================================================ */}
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
