import { buildMetadata } from '@/lib/seo'
import {
  ENTITIES,
  FOUNDING,
  CONTACT,
  SIGNATURE_LINES,
} from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Privacy',
  description:
    'How Mohan Lal & Sons handles your information. Read by the family before publication.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                Privacy
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                How we handle
                <span className="block italic text-mls-gold mt-2">
                  your information.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                {SIGNATURE_LINES.readByFamilyBeforePublication}.
              </p>
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
                  Who we are
                </h2>
                <p>
                  This privacy notice applies to{' '}
                  <strong>{ENTITIES.group.name}</strong> ({ENTITIES.group.acronym}),
                  a family enterprise based in Bijolia, Rajasthan, India.
                  The same office is responsible for the operation of
                  mohanlalsonsgroup.com and the trade brand site
                  khadane.com.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-mls-ink mb-4">
                  What we collect
                </h2>
                <p>
                  We collect the information you give us when you write to
                  us — name, email, phone number where you provide it, and
                  the content of your message. We do this so we can
                  respond to your enquiry. We do not run advertising or
                  marketing analytics that profile you across the web.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-mls-ink mb-4">
                  How we use it
                </h2>
                <p>
                  Your information is used to answer your enquiry, to keep
                  a record of correspondence the family has had with you,
                  and to route your enquiry to the right hand in the family
                  — most often The Office, in some cases directly to the
                  vertical concerned. Stone enquiries route to KHADANE™.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-mls-ink mb-4">
                  Who we share with
                </h2>
                <p>
                  We do not sell your information to anyone. We share it
                  only with the email service we use to deliver enquiries
                  (Resend) and, where you have written to KHADANE™ from
                  this site, with the KHADANE™ desk within the family.
                  That is the extent of it.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-mls-ink mb-4">
                  Your rights
                </h2>
                <p>
                  You can ask us at any time what we hold about you, ask
                  for it to be corrected, or ask for it to be deleted.
                  Write to{' '}
                  <a
                    href={`mailto:${CONTACT.officeMLS}?subject=Privacy%20Request`}
                    className="text-mls-gold hover:underline underline-offset-4"
                  >
                    {CONTACT.officeMLS}
                  </a>
                  . We respond within one business day.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={500}>
              <div className="pt-8 border-t border-mls-ink/10">
                <p className="font-mono text-xs text-mls-slate">
                  Last reviewed: {FOUNDING.currentYear} · The family reviews
                  this notice when material changes are made to the
                  operation. It is updated here when it is.
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
