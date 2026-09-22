import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Self-hosted through next/font: no render-blocking stylesheet from Google,
// files preloaded from our own origin, and a size-adjusted fallback face so
// the swap does not reflow the page. Montserrat was in the old <link> but is
// referenced nowhere in the app, so it is dropped.
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})
const body = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})

/**
 * Root layout.
 *
 * Provides the <html> + <body> shell and the shared next/font faces
 * (Cormorant Garamond + Inter Tight + JetBrains Mono, both sites).
 *
 * Site-specific chrome (Navigation, Footer, per-site metadata) is provided
 * by the route group layouts: app/(mls)/layout.tsx and app/(khadane)/layout.tsx.
 *
 * Host-based routing in middleware.ts decides which route group renders.
 */

export const metadata: Metadata = {
  // Fallback only — per-site metadata in route group layouts.
  title: 'Mohan Lal & Sons',
  description: 'A working group, since 1972.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`scroll-smooth ${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/* Favicons — KHADANE™ transparent K-only mark (Quarry Gold #B8962E) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#B8962E" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#B8962E" />
      </head>
      <body className="antialiased font-body">{children}</body>
    </html>
  )
}
