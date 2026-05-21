import { buildMetadata } from '@/lib/seo'
import {
  ENTITIES,
  FOUNDING,
  CONTACT,
  LOCATIONS,
  SIGNATURE_LINES,
} from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'
import MLSEnquiryForm from '@/components/mls/MLSEnquiryForm'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Contact — The Office',
  description:
    'Write to The Office. Read by the family. We respond within one business day.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                The Office
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7.5rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                Write to us
                <span className="block italic text-mls-gold mt-2">
                  at one address.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                {SIGNATURE_LINES.readByFamily}.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* FORM + DIRECT CONTACT */}
      <section className="bg-mls-cream py-20 lg:py-28 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
                  Send an enquiry
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-mls-ink tracking-tight mb-10">
                  The form below routes to The Office.
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={150}>
                <MLSEnquiryForm />
              </RevealOnScroll>
            </div>

            {/* Direct contact */}
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-mls-ink/10">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
                  Or reach us directly
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <div className="space-y-8">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-2">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT.officeMLS}`}
                      className="font-display text-xl text-mls-ink hover:text-mls-gold transition-colors break-all"
                    >
                      {CONTACT.officeMLS}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-2">
                      Phone
                    </p>
                    <a
                      href={`tel:${CONTACT.groupMain.replace(/\s/g, '')}`}
                      className="font-display text-xl text-mls-ink hover:text-mls-gold transition-colors"
                    >
                      {CONTACT.groupMain}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-2">
                      WhatsApp
                    </p>
                    <a
                      href={CONTACT.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-xl text-mls-ink hover:text-mls-gold transition-colors"
                    >
                      +91 98285 71143
                    </a>
                  </div>
                  <div className="pt-6 border-t border-mls-ink/10">
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-2">
                      Hours
                    </p>
                    <p className="text-base text-mls-ink/85">
                      {CONTACT.hours}
                    </p>
                    <p className="text-sm text-mls-slate mt-2 italic">
                      Replies within {CONTACT.slaStandard}.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="bg-mls-buff/20 py-20 lg:py-28 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-12">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
                Where we work from
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-mls-ink tracking-tight">
                Two geographies.
              </h2>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr gap-px bg-mls-ink/10">
            <RevealOnScroll className="h-full">
              <div className="bg-mls-cream p-8 lg:p-10 min-h-[18rem] h-full flex flex-col">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-marker text-mls-gold mb-3">
                    Bijolia · The Quarry &amp; the family home
                  </p>
                  <h3 className="font-display text-2xl lg:text-3xl text-mls-ink tracking-tight leading-tight mb-4">
                    {LOCATIONS.bijoliaOfficeAddress.street}
                  </h3>
                  <p className="text-base text-mls-ink/85 mb-1">
                    {LOCATIONS.bijoliaOfficeAddress.city},{' '}
                    {LOCATIONS.bijoliaOfficeAddress.state}{' '}
                    {LOCATIONS.bijoliaOfficeAddress.pin}
                  </p>
                  <p className="text-base text-mls-ink/85">
                    {LOCATIONS.bijoliaOfficeAddress.country}
                  </p>
                </div>
                <p className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-marker text-mls-slate">
                  {LOCATIONS.bijolia.coords}
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100} className="h-full">
              <div className="bg-mls-cream p-8 lg:p-10 min-h-[18rem] h-full flex flex-col">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-marker text-mls-gold mb-3">
                    Kota · The Kunhari cluster
                  </p>
                  <h3 className="font-display text-2xl lg:text-3xl text-mls-ink tracking-tight leading-tight mb-4">
                    Kunhari, Kota
                  </h3>
                  <p className="text-base text-mls-ink/85 mb-4">
                    {LOCATIONS.kota.state}, India
                  </p>
                  <p className="text-sm text-mls-ink/75">
                    M3 Boutique Hotel · M3 Mini Mall · The Princess · Victoria
                    Palace · Boys&rsquo; PGs · Vyanjanam
                  </p>
                </div>
                <p className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-marker text-mls-slate">
                  {LOCATIONS.kota.coords}
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
