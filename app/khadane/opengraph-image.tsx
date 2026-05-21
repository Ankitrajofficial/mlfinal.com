import { ImageResponse } from 'next/og'
import { KHADANE_SCALE, FOUNDING } from '@/lib/facts'

/**
 * KHADANE™ Open Graph image.
 * 1200 × 630px. Rendered once at build time and cached.
 * Applied to every KHADANE page that doesn't define its own.
 *
 * Palette uses the KHADANE v1.0 locked palette:
 *   Obsidian #111111 background, Stone Linen #E8E3D7 text,
 *   Quarry Gold #B8962E accent. ™ Montserrat ExtraBold convention preserved
 *   via supplied glyphs (renderer falls back to default serif if not embedded).
 */

export const runtime = 'edge'
export const alt = `KHADANE™ — खदान, The Quarry · Bijolia, Rajasthan · Since ${FOUNDING.groupYear}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#111111',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          fontFamily: 'serif',
          position: 'relative',
          color: '#E8E3D7',
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
            letterSpacing: '0.22em',
            color: '#999690',
            textTransform: 'uppercase',
            marginTop: 32,
          }}
        >
          Bijolia · Rajasthan · {FOUNDING.yearsEvergreen}
        </div>

        {/* Wordmark — KHA gold, DANE stone */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginTop: 60,
            fontSize: 140,
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            fontWeight: 900,
          }}
        >
          <span style={{ color: '#B8962E' }}>KHA</span>
          <span style={{ color: '#E8E3D7' }}>DANE</span>
          <span
            style={{
              fontSize: 36,
              color: '#E8E3D7',
              marginLeft: 6,
              transform: 'translateY(-70px)',
              display: 'flex',
            }}
          >
            ™
          </span>
        </div>

        {/* Tagline in gold */}
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            fontStyle: 'italic',
            color: '#B8962E',
            marginTop: 16,
          }}
        >
          खदान — The Quarry
        </div>

        {/* Sub-line */}
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: '#E8E3D7',
            opacity: 0.85,
            marginTop: 32,
            maxWidth: '880px',
            lineHeight: 1.4,
          }}
        >
          {KHADANE_SCALE.quarries} quarries · {KHADANE_SCALE.annualOutput} annual output ·{' '}
          {KHADANE_SCALE.countries} across {KHADANE_SCALE.continents}.
        </div>

        {/* Footer band */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#1A1410',
            color: '#E8E3D7',
            padding: '20px 80px',
            fontSize: 18,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>The trade brand of Mohan Lal &amp; Sons</span>
          <span style={{ color: '#B8962E' }}>khadane.com</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
