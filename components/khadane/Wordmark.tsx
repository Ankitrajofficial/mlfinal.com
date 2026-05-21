import Image from 'next/image'
import Link from 'next/link'
import { ASSETS } from '@/lib/khadane/site'

interface WordmarkProps {
  theme?: 'light' | 'dark'        // theme = the SURFACE the mark sits on
  width?: number
  className?: string
  linked?: boolean
  href?: string
}

export default function Wordmark({
  theme = 'light',
  width = 200,
  className = '',
  linked = true,
  href = '/',
}: WordmarkProps) {
  const src = theme === 'dark' ? ASSETS.khadane.onDark : ASSETS.khadane.onLight
  const height = Math.round(width * 0.3)  // KHADANE wordmark aspect ratio

  const img = (
    <Image
      src={src}
      alt="KHADANE™"
      width={width}
      height={height}
      priority
      className={className}
    />
  )

  if (linked) {
    return <Link href={href} aria-label="KHADANE — home" className="inline-block">{img}</Link>
  }
  return img
}
