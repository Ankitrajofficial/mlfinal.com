import { ImageResponse } from 'next/og'
import { ENTITIES, FOUNDING } from '@/lib/facts'

/**
 * MLS Open Graph image.
 * 1200 × 630px. Rendered once at build time and cached.
 * Applied to every MLS page that doesn't define its own.
 */

export const runtime = 'edge'
export const alt = `${ENTITIES.group.name} — A working group, since ${FOUNDING.groupYear}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#EEEBE0',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Gold accent line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '8px',
            width: '100%',
            background: '#B8962E',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            letterSpacing: '0.2em',
            color: '#999690',
            textTransform: 'uppercase',
            marginTop: 32,
          }}
        >
          {ENTITIES.group.acronym} · {FOUNDING.yearsEvergreen}
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 108,
            lineHeight: 1.02,
            color: '#1A1410',
            marginTop: 40,
            letterSpacing: '-0.02em',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>A working group.</span>
          <span style={{ fontStyle: 'italic', color: '#B8962E' }}>
            Since {FOUNDING.groupYear}.
          </span>
        </div>

        {/* Subline */}
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            fontStyle: 'italic',
            color: '#4A3520',
            marginTop: 36,
            maxWidth: '880px',
            lineHeight: 1.3,
          }}
        >
          Five verticals. One family. Operated by hand, from Bijolia,
          Rajasthan.
        </div>

        {/* Footer band */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#4A3520',
            color: '#EEEBE0',
            padding: '20px 80px',
            fontSize: 18,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{ENTITIES.group.name}</span>
          <span style={{ color: '#B8962E' }}>mohanlalsonsgroup.com</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
