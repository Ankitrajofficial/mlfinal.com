import { buildMetadata } from '@/lib/seo'
import { ENTITIES, FOUNDING, CONTACT, LOCATIONS } from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Terms',
  description:
    'Terms of use for mohanlalsonsgroup.com — written plainly, in the institutional voice.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <>
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                Terms of use
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                Written plainly,
                <span className="block italic text-mls-gold mt-2">
                  in our own voice.
                </span>
              </h1>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-mls-cream py-20 lg:py-28 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl space-y-12 text-lg leading-relaxed text-mls-ink/85">
            <RevealOnScroll>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-mls-ink mb-4">
                  About this site
                </h2>
                <p>
                  This site is operated by {ENTITIES.group.name}, a family
                  enterprise based in Bijolia, Rajasthan, India. The
                  content reflects the work of the group as the family
                  reads it. Where photographs are pending, the site reads
                  honestly about that.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-mls-ink mb-4">
                  Information accuracy
                </h2>
                <p>
                  The institutional facts on this site — the founding
                  year, the family roster, the operational scale of the
                  verticals — are read and verified by the family. Pricing,
                  availability, lead times, and similar transactional
                  information are not published here; for those, write to
                  The Office directly.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-mls-ink mb-4">
                  Acceptable use
                </h2>
                <p>
                  Read the site, share what you find useful, write to us
                  with questions. Don&rsquo;t scrape it for commercial
                  republication, don&rsquo;t copy the family&rsquo;s
                  writing to your own materials, don&rsquo;t use the
                  KHADANE™ wordmark or the MLS lockup outside the
                  context of the family&rsquo;s own work.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-mls-ink mb-4">
                  Brand &amp; intellectual property
                </h2>
                <p>
                  KHADANE™ is a trade mark of the family&rsquo;s stone
                  export operation. The MLS lockup, the four-pillars mark,
                  and the Vyanjanam handwritten Hindi wordmark are the
                  property of the family. Use them only with our written
                  permission.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-mls-ink mb-4">
                  Disputes
                </h2>
                <p>
                  Any dispute arising from or relating to the use of this
                  site is subject to the jurisdiction of courts in{' '}
                  {LOCATIONS.bijolia.district.replace(' District', '')},
                  Rajasthan, India.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={500}>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-mls-ink mb-4">
                  Get in touch
                </h2>
                <p>
                  For questions about these terms, write to{' '}
                  <a
                    href={`mailto:${CONTACT.officeMLS}`}
                    className="text-mls-gold hover:underline underline-offset-4"
                  >
                    {CONTACT.officeMLS}
                  </a>
                  .
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={600}>
              <div className="pt-8 border-t border-mls-ink/10">
                <p className="font-mono text-xs text-mls-slate">
                  Last updated: {FOUNDING.currentYear}
                </p>
              </div>
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
