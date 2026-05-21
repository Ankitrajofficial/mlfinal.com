import Link from 'next/link'
import Image from 'next/image'
import { SITE, ASSETS } from '@/lib/khadane/site'

export default function Footer() {
  return (
    <footer className="section-dark texture-lines">
      {/* Top — brand whisper signature */}
      <div className="container-editorial pt-20 lg:pt-28 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <Image
                src={ASSETS.khadane.onDark}
                alt="KHADANE™"
                width={220}
                height={92}
                className="w-[200px] lg:w-[220px] h-auto"
              />
            </div>
            <p className="font-display text-2xl lg:text-3xl italic text-warm-white/90 leading-snug mb-8 no-justify max-w-md">
              The sandstone catalogue of {SITE.groupOperation}.
              <span className="block mt-2 text-quarry-gold not-italic font-sans text-sm uppercase tracking-eyebrow">
                Bijolia · Rajasthan · Since 1972
              </span>
            </p>
            <p className="font-sans text-sm text-warm-white/60 max-w-md leading-relaxed mb-2">
              {SITE.contact.publicEmail}
            </p>
            <p className="font-sans text-sm text-warm-white/60 max-w-md leading-relaxed mb-2">
              {SITE.contact.publicPhone}
            </p>
            <p className="font-sans text-xs text-warm-white/40 max-w-md leading-relaxed mt-4">
              {SITE.contact.hours}
            </p>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h3 className="font-sans text-xs tracking-eyebrow text-quarry-gold uppercase mb-5 no-justify">
                Catalogue
              </h3>
              <ul className="space-y-3">
                <li><Link href="/khadane/collection" className="font-sans text-sm text-warm-white/80 hover:text-quarry-gold transition-colors no-justify">Collection</Link></li>
                <li><Link href="/khadane/formats" className="font-sans text-sm text-warm-white/80 hover:text-quarry-gold transition-colors no-justify">Formats</Link></li>
                <li><Link href="/khadane/gallery" className="font-sans text-sm text-warm-white/80 hover:text-quarry-gold transition-colors no-justify">Gallery</Link></li>
                <li><Link href="/khadane/quarry" className="font-sans text-sm text-warm-white/80 hover:text-quarry-gold transition-colors no-justify">The Quarry</Link></li>
                <li><Link href="/khadane/yard" className="font-sans text-sm text-warm-white/80 hover:text-quarry-gold transition-colors no-justify">The Yard</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-sans text-xs tracking-eyebrow text-quarry-gold uppercase mb-5 no-justify">
                The Desk
              </h3>
              <ul className="space-y-3">
                <li><Link href="/khadane/desk" className="font-sans text-sm text-warm-white/80 hover:text-quarry-gold transition-colors no-justify">Enquire</Link></li>
                <li><Link href="/khadane/about" className="font-sans text-sm text-warm-white/80 hover:text-quarry-gold transition-colors no-justify">About</Link></li>
                <li><Link href="/khadane/group" className="font-sans text-sm text-warm-white/80 hover:text-quarry-gold transition-colors no-justify">The Group</Link></li>
                <li><Link href="/khadane/field-notes" className="font-sans text-sm text-warm-white/80 hover:text-quarry-gold transition-colors no-justify">Field Notes</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="font-sans text-xs tracking-eyebrow text-quarry-gold uppercase mb-5 no-justify">
                The Parent
              </h3>
              <Link href="/khadane/group" className="inline-block mb-4 hover:opacity-80 transition-opacity">
                <Image
                  src={ASSETS.mls.lockup.onDark}
                  alt="Mohan Lal & Sons · Est. 1972"
                  width={280}
                  height={109}
                  className="w-[200px] h-auto"
                />
              </Link>
              <p className="font-sans text-xs text-warm-white/50 leading-relaxed">
                A house of five operations. KHADANE™ is the stone &amp; export vertical.
              </p>
              <a
                href={SITE.parent.site}
                target="_blank"
                rel="noopener"
                className="inline-block mt-3 font-mono text-xs text-warm-white/40 hover:text-quarry-gold transition-colors no-justify"
              >
                mohanlalsonsgroup.com →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hairline */}
      <div className="container-editorial">
        <div className="h-px bg-warm-white/10" />
      </div>

      {/* Bottom — copyright & legal */}
      <div className="container-editorial py-8 lg:py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="font-sans text-xs text-warm-white/40 no-justify">
            {SITE.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-sans text-xs text-warm-white/40 hover:text-quarry-gold transition-colors no-justify">
              Privacy
            </Link>
            <Link href="/terms" className="font-sans text-xs text-warm-white/40 hover:text-quarry-gold transition-colors no-justify">
              Terms
            </Link>
            <span className="font-mono text-xs text-warm-white/30 no-justify">
              v1.0 · {SITE.currentYear}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
