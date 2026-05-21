'use client'

import Image from 'next/image'
import { useState } from 'react'

interface PlaceholderImageProps {
  /** The path to swap in once the real photograph lands. */
  swapPath?: string
  /** Used in the placeholder caption — visible to Ankit until swap. */
  label: string
  title: string
  spec?: string
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/3]" or "aspect-square" */
  aspectRatio?: string
  className?: string
  /** Optional background palette variant for the placeholder. */
  variant?:
    | 'mls-cream'
    | 'mls-tobacco'
    | 'mls-deep'
    | 'vyanjanam-dark'
    | 'documentary'
}

/**
 * Renders the swap image if available, falls back to a styled placeholder
 * with the spec note visible — so Ankit knows what to drop in.
 *
 * Designed for both MLS and KHADANE pages where documentary photographs
 * are pending; the placeholder reads honestly during the interim.
 */
export default function PlaceholderImage({
  swapPath,
  label,
  title,
  spec,
  aspectRatio = 'aspect-[4/3]',
  className = '',
  variant = 'documentary',
}: PlaceholderImageProps) {
  const [imgFailed, setImgFailed] = useState(false)

  const variantStyles: Record<string, string> = {
    'mls-cream':
      'bg-[linear-gradient(135deg,#EEEBE0_0%,#D9C9A8_50%,#C8B48A_100%)]',
    'mls-tobacco':
      'bg-[linear-gradient(135deg,#1A1410_0%,#4A3520_60%,#7A5038_100%)]',
    'mls-deep':
      'bg-[linear-gradient(180deg,#1A1410_0%,#2C2418_70%,#4A3520_100%)]',
    'vyanjanam-dark':
      'bg-[linear-gradient(180deg,#000000_0%,#1A1A1A_100%)]',
    documentary:
      'bg-[linear-gradient(135deg,#3D2B1A_0%,#5A4030_50%,#8B6F4E_100%)]',
  }

  // If swapPath exists and didn't fail, try to render it.
  const showImage = swapPath && !imgFailed

  return (
    <div
      className={`relative overflow-hidden ${aspectRatio} ${variantStyles[variant]} ${className}`}
    >
      {showImage ? (
        <Image
          src={swapPath}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <>
          {/* Texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, transparent 0, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 3px)',
            }}
          />
          {/* Caption layer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 text-mls-cream/85">
            <p className="font-mono text-[10px] tracking-marker uppercase text-mls-gold/90 mb-3">
              {label}
            </p>
            <p className="font-display italic text-xl md:text-2xl mb-2 max-w-md text-mls-cream/95">
              {title}
            </p>
            {spec && (
              <p className="font-mono text-[10px] leading-relaxed opacity-70 max-w-md">
                {spec}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
