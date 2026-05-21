import Link from 'next/link'
import Image from 'next/image'
import { MLS_SITE, MLS_ASSETS } from '@/lib/site-mls'
import { ENTITIES, FOUNDING, CONTACT, CROSS_LINKS } from '@/lib/facts'

const footerSections = [
  {
    title: 'Company',
    links: [
      { href: '/', label: 'Home' },
      { href: '/our-legacy', label: 'The Legacy' },
      { href: '/csr', label: 'CSR' },
      { href: '/careers', label: 'Careers' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/contact', label: 'The Office' },
    ],
  },
  {
    title: 'Ventures',
    links: [
      { href: '/khadane', label: 'Stone & Export', externalCue: true },
      { href: '/verticals/automotive-fuel', label: 'Automotive & Fuel' },
      { href: '/verticals/hospitality', label: 'Hospitality' },
      { href: '/verticals/student-housing', label: 'Student Housing' },
      { href: '/verticals/student-housing/girls', label: 'Girls Student Housing' },
      { href: '/verticals/food-services', label: 'Food Services' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/resources', label: 'Resources Home' },
      { href: '/resources/blog', label: 'Blog' },
      { href: '/resources/catalogues', label: 'Catalogues' },
      { href: '/resources/brochures', label: 'Brochures' },
      { href: '/resources/press', label: 'Press' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
  {
    title: 'KHADANE',
    links: [
      { href: '/khadane', label: 'KHADANE Home' },
      { href: '/khadane/collection', label: 'Collection' },
      { href: '/khadane/formats', label: 'Formats' },
      { href: '/khadane/gallery', label: 'Gallery' },
      { href: '/khadane/quarry', label: 'The Quarry' },
      { href: '/khadane/yard', label: 'The Yard' },
      { href: '/khadane/desk', label: 'The Desk' },
      { href: '/khadane/field-notes', label: 'Field Notes' },
    ],
  },
] as const

function FooterLink({
  href,
  label,
  externalCue = false,
}: {
  href: string
  label: string
  externalCue?: boolean
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm leading-relaxed text-mls-ink/78 hover:text-mls-gold transition-colors"
    >
      {label}
      {externalCue && <span className="text-xs" aria-hidden>↗</span>}
    </Link>
  )
}

/**
 * MLS Footer — institutional treatment.
 *
 * Five vertical columns reflecting the locked architecture:
 *   1. The Group (logo + signature)
 *   2. Ventures (5 verticals)
 *   3. Resources
 *   4. The Office (contact)
 *   5. KHADANE™ outbound bridge
 *
 * Tobacco-dark band sits below the columns with copyright + family signature.
 */
export default function MLSFooter() {
  return (
    <footer className="bg-mls-cream border-t border-mls-ink/10">
      <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem] py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-4 lg:pr-8">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={MLS_ASSETS.lockup.onLight}
                alt={MLS_SITE.name}
                width={260}
                height={52}
                className="opacity-90"
              />
            </Link>
            <p className="font-display italic text-xl text-mls-tobacco leading-relaxed mb-6 max-w-sm">
              A working group. Operated by the Dhakar family from Bijolia,
              Rajasthan. {FOUNDING.yearsEvergreen}.
            </p>
            <div className="h-px w-16 bg-mls-gold mb-6" aria-hidden />
            <div className="grid grid-cols-2 gap-4 border-y border-mls-ink/10 py-5 mb-6 max-w-sm">
              <div>
                <p className="font-display text-2xl text-mls-gold">
                  {FOUNDING.generations}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-marker text-mls-slate">
                  Generations
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-mls-gold">
                  {FOUNDING.groupYear}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-marker text-mls-slate">
                  Since
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm text-mls-ink/78">
              <a
                href={`mailto:${CONTACT.officeMLS}`}
                className="break-all hover:text-mls-gold transition-colors"
              >
                {CONTACT.officeMLS}
              </a>
              <a
                href={`tel:${CONTACT.groupMain.replace(/\s/g, '')}`}
                className="hover:text-mls-gold transition-colors"
              >
                {CONTACT.groupMain}
              </a>
              <Link
                href="/contact"
                className="font-display italic text-base text-mls-gold hover:text-mls-tobacco transition-colors"
              >
                Write to The Office →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
              {footerSections.map((section) => (
                <nav key={section.title} aria-label={section.title}>
                  <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-5">
                    {section.title}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <FooterLink {...link} />
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-mls-ink/10 pt-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-4">
                  The Office
                </p>
                <div className="flex flex-col gap-3 text-sm text-mls-ink/78">
                  <a
                    href={CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-mls-gold transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${CONTACT.officeMLS}`}
                    className="break-all hover:text-mls-gold transition-colors"
                  >
                    {CONTACT.officeMLS}
                  </a>
                  <a
                    href={`tel:${CONTACT.groupMain.replace(/\s/g, '')}`}
                    className="hover:text-mls-gold transition-colors"
                  >
                    {CONTACT.groupMain}
                  </a>
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-4">
                  Trade Brand
                </p>
                <Link
                  href="/khadane"
                  className="group block max-w-sm"
                  aria-label="Visit KHADANE"
                >
                  <Image
                    src="/brand/khadane/KHADANE_04_transparent_on_light.svg"
                    alt="KHADANE"
                    width={190}
                    height={46}
                    className="mb-4 transition-opacity duration-300 group-hover:opacity-75"
                  />
                  <p className="text-sm text-mls-tobacco/70 leading-relaxed">
                    {CROSS_LINKS.mlsToKhadane}
                  </p>
                  <p className="mt-3 text-xs text-mls-gold inline-flex items-center gap-1">
                    Visit KHADANE <span aria-hidden>↗</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom — tobacco band with copyright + family signature */}
      <div className="bg-mls-tobacco text-mls-cream">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem] py-8 lg:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-mono tracking-wider text-mls-cream/80">
                © {FOUNDING.groupYear}–{FOUNDING.currentYear} {ENTITIES.group.name}
              </p>
              <p className="font-display italic text-base text-mls-cream/90">
                {ENTITIES.footerSignature}
              </p>
            </div>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-mls-cream/70">
              <Link href="/privacy" className="hover:text-mls-gold transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-mls-gold transition-colors">
                Terms
              </Link>
              <a
                href={`mailto:${CONTACT.officeMLS}`}
                className="hover:text-mls-gold transition-colors"
              >
                Contact
              </a>
              <a
                href="https://inook.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mls-gold transition-colors"
              >
                Powered by inook.in
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
