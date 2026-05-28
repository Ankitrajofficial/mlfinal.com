import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'Terms',
  description: 'KHADANE™ trade terms and site terms of use.',
}

export default function TermsPage() {
  return (
    <>
      <section className="section-padding section-warm">
        <div className="container-editorial max-w-3xl mx-auto">
          <RevealOnScroll>
            <p className="eyebrow-gold mb-8 no-justify">TERMS</p>
            <h1 className="font-display text-5xl md:text-6xl tracking-tighter leading-[1.05] text-obsidian no-justify mb-12">
              Terms of use &amp; trade.
            </h1>
            <div className="space-y-8 editorial-body">
              <div>
                <h2 className="font-display text-2xl text-obsidian no-justify mb-4">Site terms</h2>
                <p>
                  This site is published by KHADANE™ / {SITE.exportOperation}, the export operation of the {SITE.groupOperation} within {SITE.groupParent}. All content, photography, and design is the intellectual property of {SITE.exportOperation}.
                </p>
                <p className="mt-4">
                  Variety codes (KHD-O-01 to KHD-A-09), format codes (KHF-001 to KHF-019), and the KHADANE™ wordmark are trademarks of {SITE.exportOperation}.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-obsidian no-justify mb-4">Quotation &amp; trade</h2>
                <p>
                  Quotations are valid for the period stated on the quotation document. Pricing is governed by the agreed shipping term (FOB, FOR, CIF, EXW) and the agreed port of loading. Quotations exclude duties, port charges at destination, and any landed-cost components beyond the agreed shipping term.
                </p>
                <p className="mt-4">
                  Quotation acceptance constitutes a purchase order. Production lead times begin from receipt of pro-forma invoice payment or letter of credit confirmation, as agreed.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-obsidian no-justify mb-4">Specifications &amp; tolerances</h2>
                <p>
                  Sandstone is a natural material. Colour, grain, and pattern variation within agreed batch tolerances is inherent and not grounds for rejection. Dimensional tolerances follow agreed export specifications per format and per project. Approved samples are the reference standard for hand-picking.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-obsidian no-justify mb-4">Disputes</h2>
                <p>
                  Disputes are subject to the jurisdiction of courts in Bhilwara, Rajasthan, India. Photographic documentation of loading is provided for every shipment as evidence of dispatch condition.
                </p>
              </div>

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
