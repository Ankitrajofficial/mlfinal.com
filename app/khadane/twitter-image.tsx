// Re-export the OG image for Twitter. Same artwork, same dimensions.
// Twitter accepts 1200x630 for large summary cards.
import Image from './opengraph-image'
import { FOUNDING } from '@/lib/facts'

export const runtime = 'edge'
export const alt = `KHADANE™ — खदान, The Quarry · Bijolia, Rajasthan · Since ${FOUNDING.groupYear}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default Image
