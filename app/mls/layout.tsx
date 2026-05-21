import type { Metadata } from 'next'
import { MLS_SITE } from '@/lib/site-mls'
import { ENTITIES } from '@/lib/facts'
import { buildOrganizationLD } from '@/lib/seo'
import MLSHeader from '@/components/mls/Header'
import MLSFooter from '@/components/mls/Footer'
import AppMotionConfig from '@/components/shared/MotionConfig'

export const metadata: Metadata = {
  metadataBase: new URL(MLS_SITE.url),
  title: {
    default: `${MLS_SITE.name} — ${MLS_SITE.tagline}`,
    template: `%s · ${MLS_SITE.name}`,
  },
  description: MLS_SITE.description,
  keywords: [
    'Mohan Lal & Sons',
    'MLS group',
    'Dhakar family enterprise',
    'Bijolia',
    'Bhilwara',
    'Rajasthan family business',
    'Stone & Export',
    'KHADANE',
    'M3 Hotel Kota',
    'Vyanjanam Kota',
    'Dhakar Motors',
    'Dharnidhar Fuels',
    'Kota student housing',
    'Kunhari Kota',
  ],
  authors: [{ name: ENTITIES.group.name }],
  creator: ENTITIES.group.name,
  publisher: ENTITIES.group.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: MLS_SITE.url,
    siteName: MLS_SITE.name,
    title: `${MLS_SITE.name} — ${MLS_SITE.tagline}`,
    description: MLS_SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${MLS_SITE.name} — ${MLS_SITE.tagline}`,
    description: MLS_SITE.description,
  },
  robots: { index: true, follow: true },
  // icons: auto-discovered from app/mls/icon.tsx + app/mls/apple-icon.tsx
}

export default function MLSLayout({ children }: { children: React.ReactNode }) {
  const orgLD = buildOrganizationLD('mls')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLD) }}
      />

      <AppMotionConfig>
        <div className="bg-mls-cream text-mls-ink min-h-screen flex flex-col" data-site="mls">
          <MLSHeader />
          <main className="flex-1 pt-20 lg:pt-24">{children}</main>
          <MLSFooter />
        </div>
      </AppMotionConfig>
    </>
  )
}
