import { ImageResponse } from 'next/og'

/**
 * MLS dynamic favicon — generated PNG.
 * Renders the four-pillars MLS mark abstracted to a single character.
 * Size: 32×32, matched to browser tab icon dimensions.
 */

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1A1410',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#B8962E',
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'serif',
          letterSpacing: '-0.02em',
        }}
      >
        M
      </div>
    ),
    { ...size },
  )
}
