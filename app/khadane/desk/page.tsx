import Link from 'next/link'
import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import BrandWhisper from '@/components/khadane/BrandWhisper'
import EnquiryForm from '@/components/khadane/EnquiryForm'

export const metadata = {
  title: 'The Desk — Write to us',
  description: 'Tell us the variety, format, finish, size, and volume. Quote returned within one business day.',
}

export default function DeskPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="max-w-5xl">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">06 · THE DESK</p>
            </div>
            <HeroWordRise
              as="h1"
              words={['Write', 'to', 'us.']}
              className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.95] text-obsidian mb-10"
              baseDelay={250}
              staggerDelay={140}
            />
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1100ms' }}>
              <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl mb-8">
                Quote within one business day.
              </p>
              <p className="editorial-body max-w-2xl">
                Tell us the variety, format, finish, size, and volume. We'll return a quote with the lead time, shipping option, and any catalogue alternatives — usually within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Contact split */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">ENQUIRY FORM</p>
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight leading-tight text-obsidian no-justify mb-10">
                  The fields below cover most of what we'll need.
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <EnquiryForm />
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5">
              <RevealOnScroll delay={150}>
                <div className="bg-warm-white p-8 lg:p-10 border border-obsidian/10">
                  <p className="eyebrow-gold mb-6 no-justify">DIRECT CHANNELS</p>
                  <h3 className="font-display text-2xl text-obsidian no-justify mb-8">
                    Prefer to write direct?
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 mb-2 no-justify">Email</p>
                      <a href={`mailto:${SITE.contact.publicEmail}`} className="font-sans text-lg text-obsidian hover:text-quarry-gold transition-colors no-justify">
                        {SITE.contact.publicEmail}
                      </a>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 mb-2 no-justify">Phone</p>
                      <a href={`tel:${SITE.contact.publicPhone.replace(/\s/g, '')}`} className="font-sans text-lg text-obsidian hover:text-quarry-gold transition-colors no-justify">
                        {SITE.contact.publicPhone}
                      </a>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 mb-2 no-justify">WhatsApp</p>
                      <a href={SITE.contact.whatsappUrl} target="_blank" rel="noopener" className="font-sans text-lg text-obsidian hover:text-quarry-gold transition-colors no-justify">
                        Message us →
                      </a>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 mb-2 no-justify">Hours</p>
                      <p className="font-sans text-sm text-graphite no-justify">{SITE.contact.hours}</p>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-obsidian/10">
                    <p className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 mb-3 no-justify">Bijolia · Field Office</p>
                    <p className="font-sans text-sm text-graphite leading-relaxed">
                      Bijolia, Bhilwara District<br />
                      Rajasthan, India · 311603
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-obsidian/10">
                    <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/40 no-justify">
                      Every enquiry receives a reference number:<br />
                      KHD-ENQ-YYYYMMDD-NNNN
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <BrandWhisper />
    </>
  )
}
