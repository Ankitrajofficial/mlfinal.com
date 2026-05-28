'use client'

import Image from 'next/image'
import { useState } from 'react'

interface PlaceholderImageProps {
  className?: string
  variant?:
    | 'stone'
    | 'quarry'
    | 'yard'
    | 'stone-grey'
    | 'stone-warm'
    | 'stone-red'
    | 'stone-green'
    | 'portrait'
    | 'belt'
  label?: string
  title?: string
  spec?: string
  aspectRatio?: string
  swapPath?: string
  showCaption?: boolean
}

export default function PlaceholderImage({
  className = '',
  variant = 'stone',
  label = 'PLACEHOLDER',
  title,
  spec,
  aspectRatio = 'aspect-[4/3]',
  swapPath,
  showCaption = true,
}: PlaceholderImageProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const variantClass = `placeholder-${variant}`
  const showImage = Boolean(swapPath && !imgFailed)

  // Hide the container entirely when no real image is available.
  if (!showImage) {
    // `spec` and `showCaption` are unused in this mode but kept in the props API for callers.
    void spec
    void showCaption
    return null
  }

  return (
    <div className={`placeholder-base ${variantClass} ${aspectRatio} ${className}`}>
      {/^https?:\/\//.test(swapPath as string) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={swapPath as string}
          alt={title || label}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <Image
          src={swapPath as string}
          alt={title || label}
          fill
          sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          onError={() => setImgFailed(true)}
        />
      )}
    </div>
  )
}
