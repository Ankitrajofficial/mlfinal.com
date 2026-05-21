import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'Privacy',
  description: 'KHADANE™ privacy practices regarding enquiry data.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="section-padding section-warm">
        <div className="container-editorial max-w-3xl mx-auto">
          <RevealOnScroll>
            <p className="eyebrow-gold mb-8 no-justify">PRIVACY</p>
            <h1 className="font-display text-5xl md:text-6xl tracking-tighter leading-[1.05] text-obsidian no-justify mb-12">
              How we handle your enquiry data.
            </h1>
            <div className="space-y-8 editorial-body">
              <p>
                <strong className="font-sans text-obsidian">What we collect:</strong> When you submit an enquiry through The Desk, we collect your name, email, phone (if provided), company, country, and the specifics of your project enquiry — variety, format, volume, and project notes.
              </p>
              <p>
                <strong className="font-sans text-obsidian">How we use it:</strong> We use this data exclusively to respond to your enquiry, prepare a quote, and follow up if you become a customer. Data is held within KHADANE™ / {SITE.exportOperation} / {SITE.groupOperation}.
              </p>
              <p>
                <strong className="font-sans text-obsidian">What we don't do:</strong> We do not sell your data. We do not share your enquiry with third parties. We do not enrol you in newsletters without your explicit subscription.
              </p>
              <p>
                <strong className="font-sans text-obsidian">Retention:</strong> Enquiry data is retained for as long as the customer relationship is active and for a reasonable period after, in line with Indian and EU data norms. You may request deletion at any time by writing to {SITE.contact.publicEmail}.
              </p>
              <p>
                <strong className="font-sans text-obsidian">Cookies:</strong> This site uses essential cookies only. No tracking, no advertising cookies.
              </p>
              <p>
                <strong className="font-sans text-obsidian">Updates:</strong> If this policy changes materially, we will publish the new version with a date stamp.
              </p>
              <p className="font-mono text-xs text-tobacco/60 no-justify mt-12">
                Last updated · {SITE.currentYear}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      <BrandWhisper />
    </>
  )
}
