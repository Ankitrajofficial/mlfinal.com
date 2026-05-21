import { ImageResponse } from 'next/og'

/**
 * MLS Apple touch icon — generated 180×180 PNG.
 * Used by iOS Safari when a page is added to the home screen.
 */

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1A1410',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          position: 'relative',
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 32,
            height: 2,
            background: '#B8962E',
          }}
        />

        {/* Single letter M for the lockup */}
        <div
          style={{
            color: '#B8962E',
            fontSize: 96,
            fontWeight: 700,
            fontFamily: 'serif',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          M
        </div>

        {/* Subscript */}
        <div
          style={{
            color: '#EEEBE0',
            fontSize: 14,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: 8,
            opacity: 0.85,
          }}
        >
          1972
        </div>
      </div>
    ),
    { ...size },
  )
}
