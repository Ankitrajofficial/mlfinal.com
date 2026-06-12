import type { Metadata } from 'next'
import Navigation from '@/components/khadane/Navigation'
import Footer from '@/components/khadane/Footer'
import StickyCTA from '@/components/khadane/StickyCTA'

export const metadata: Metadata = {
  metadataBase: new URL('https://khadane.com'),
  title: {
    default: 'KHADANE™ — The sandstone catalogue of the Bijolia belt. Rajasthan. Since 1972.',
    template: '%s · KHADANE™',
  },
  description:
    'KHADANE™ works the Bijolia sandstone belt of Rajasthan, quarrying and exporting twenty-three sandstones across nineteen formats since 1972.',
  keywords: [
    'Indian sandstone',
    'Bijolia sandstone',
    'Rajasthan sandstone',
    'sandstone export',
    'natural stone',
    'paving slabs',
    'Kandla Grey',
    'Autumn Brown',
    'Garda Green',
    'KHADANE',
    'Mohan Lal & Sons',
  ],
  authors: [{ name: 'KHADANE™' }],
  creator: 'KHADANE™',
  publisher: 'KHADANE™',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://khadane.com',
    siteName: 'KHADANE™',
    title: 'KHADANE™ — The sandstone catalogue of the Bijolia belt',
    description:
      'Twenty-three sandstones across nineteen formats. Quarried in Bijolia, Rajasthan. Since 1972.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KHADANE™ — Bijolia, Rajasthan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KHADANE™ — Bijolia sandstone, exported direct.',
    description: 'Twenty-three sandstones across nineteen formats. Since 1972.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function KhadaneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-warm-white text-obsidian min-h-screen" data-site="khadane">
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  )
}
