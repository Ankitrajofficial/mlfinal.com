'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'
import RevealOnScroll from './RevealOnScroll'

export interface ReferenceSlot {
  label: string
  title: string
  spec: string
  swapPath?: string
  aspectRatio: string
  variant:
    | 'stone'
    | 'quarry'
    | 'yard'
    | 'stone-grey'
    | 'stone-warm'
    | 'stone-red'
    | 'stone-green'
    | 'portrait'
    | 'belt'
  /** Show the branded gradient placeholder when no real image exists. */
  fallbackToPlaceholder?: boolean
  /** 'cover' (default) fills the frame and may crop; 'contain' fits the whole
   *  image inside the frame with no crop (may letterbox). */
  objectFit?: 'cover' | 'contain'
}

export default function VisualReferenceSet({ slots }: { slots: ReferenceSlot[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const active = openIndex !== null ? slots[openIndex] : null

  // Only real images are navigable; placeholders are skipped.
  const navIndices = slots
    .map((slot, i) => (slot.swapPath ? i : -1))
    .filter((i) => i !== -1)

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpenIndex((current) => {
        if (current === null || navIndices.length === 0) return current
        const pos = navIndices.indexOf(current)
        const nextPos = (pos + dir + navIndices.length) % navIndices.length
        return navIndices[nextPos]
      })
    },
    [navIndices],
  )

  // Lock scroll + wire keyboard controls while the lightbox is open.
  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [openIndex, step])

  const renderFrame = (slot: ReferenceSlot, index: number, aspectRatio: string, className = '') => {
    const zoomable = Boolean(slot.swapPath)
    const image = (
      <PlaceholderImage
        variant={slot.variant}
        label={slot.label}
        title={slot.title}
        spec={slot.spec}
        swapPath={slot.swapPath}
        fallbackToPlaceholder={slot.fallbackToPlaceholder}
        objectFit={slot.objectFit}
        aspectRatio={aspectRatio}
        className={className}
      />
    )

    if (!zoomable) return image

    return (
      <button
        type="button"
        onClick={() => setOpenIndex(index)}
        aria-label={`View ${slot.title} enlarged`}
        className="group block w-full cursor-zoom-in text-left transition-opacity duration-300 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-quarry-gold"
      >
        {image}
      </button>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-fr">
        <RevealOnScroll className="lg:col-span-6 lg:row-span-2">
          {renderFrame(
            slots[0],
            0,
            'aspect-[4/3] lg:h-full',
            'shadow-[0_24px_60px_rgba(17,17,17,0.12)]',
          )}
        </RevealOnScroll>
        {slots.slice(1, 5).map((slot, i) => (
          <RevealOnScroll key={slot.label} delay={(i + 1) * 80} className="lg:col-span-3">
            {renderFrame(slot, i + 1, 'aspect-[4/3]')}
          </RevealOnScroll>
        ))}
      </div>

      {active && active.swapPath && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-obsidian/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close enlarged image"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-warm-white/25 bg-obsidian/50 text-warm-white transition-colors duration-300 hover:bg-warm-white hover:text-obsidian lg:right-8 lg:top-8"
          >
            <X size={20} strokeWidth={1.6} />
          </button>

          {navIndices.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-warm-white/25 bg-obsidian/50 text-warm-white transition-colors duration-300 hover:bg-warm-white hover:text-obsidian lg:left-8"
              >
                <ChevronLeft size={22} strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-warm-white/25 bg-obsidian/50 text-warm-white transition-colors duration-300 hover:bg-warm-white hover:text-obsidian lg:right-8"
              >
                <ChevronRight size={22} strokeWidth={1.6} />
              </button>
            </>
          )}

          <figure
            className="flex max-h-full max-w-6xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.swapPath}
              alt={active.title}
              className="max-h-[82vh] w-auto max-w-full object-contain shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
            />
            <figcaption className="mt-4 flex items-center justify-center gap-3 text-center font-mono text-[11px] uppercase tracking-eyebrow text-warm-white/60">
              <span>{active.title}</span>
              {navIndices.length > 1 && openIndex !== null && (
                <span className="text-quarry-gold/70">
                  {navIndices.indexOf(openIndex) + 1} / {navIndices.length}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
