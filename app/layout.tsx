import type { Metadata } from 'next'
import './globals.css'

/**
 * Root layout.
 *
 * Provides the <html> + <body> shell and loads shared fonts
 * (Cormorant Garamond + Inter Tight + JetBrains Mono — shared by both sites).
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Favicons + Apple touch icon — generated from the locked SVG marks */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#B8962E" />
      </head>
      <body className="antialiased font-body">{children}</body>
    </html>
  )
}
