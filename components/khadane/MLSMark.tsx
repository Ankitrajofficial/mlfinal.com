import Image from 'next/image'
import { ASSETS } from '@/lib/khadane/site'

interface MLSMarkProps {
  theme?: 'light' | 'dark'
  width?: number
  className?: string
  variant?: 'mark' | 'lockup'
}

export default function MLSMark({
  theme = 'light',
  width = 60,
  className = '',
  variant = 'mark',
}: MLSMarkProps) {
  if (variant === 'lockup') {
    const src = theme === 'dark' ? ASSETS.mls.lockup.onDark : ASSETS.mls.lockup.onLight
    const height = Math.round(width * 0.389)  // 700/1800
    return (
      <Image
        src={src}
        alt="Mohan Lal & Sons · Est. 1972 · Bijolia, Rajasthan"
        width={width}
        height={height}
        className={className}
      />
    )
  }

  const src = theme === 'dark' ? ASSETS.mls.mark.onDark : ASSETS.mls.mark.onLight
  return (
    <Image
      src={src}
      alt="Mohan Lal & Sons · Four Pillars"
      width={width}
      height={width}
      className={className}
    />
  )
}
