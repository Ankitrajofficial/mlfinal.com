'use client'

import { useState, useEffect, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import {
  GALLERY_ITEMS,
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
} from '@/lib/khadane/gallery'
import PlaceholderImage from './PlaceholderImage'
import RevealOnScroll from './RevealOnScroll'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  const items = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_ITEMS
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  // The first item is the cinematic hero
  const heroItem = items[0]
  // The next 3 items form the editorial mosaic
  const mosaicItems = items.slice(1, 4)
  // The rest form the masonry grid
  const masonryItems = items.slice(4)

  // Lightbox navigation
  const openLightbox = (item: GalleryItem) => setLightboxItem(item)
  const closeLightbox = () => setLightboxItem(null)

  const currentIndex = lightboxItem ? items.findIndex((i) => i.id === lightboxItem.id) : -1
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : items[items.length - 1]
  const nextItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : items[0]

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!lightboxItem) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') setLightboxItem(prevItem)
      if (e.key === 'ArrowRight') setLightboxItem(nextItem)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxItem, prevItem, nextItem])

  // Body scroll lock when lightbox open
  useEffect(() => {
    if (lightboxItem) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxItem])

  return (
    <>
      {/* Filter controls */}
      <div className="container-editorial mb-12 lg:mb-16">
        <div className="border border-obsidian/8 bg-stone-linen/45 p-4 lg:flex lg:items-center lg:justify-between lg:gap-6">
          <div className="mb-4 flex items-center gap-3 lg:mb-0">
            <SlidersHorizontal size={17} strokeWidth={1.5} className="text-quarry-gold" />
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tobacco/60 no-justify">Archive filter</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            {GALLERY_CATEGORIES.map((cat) => {
              const active = cat.value === activeCategory
              const count = cat.value === 'all'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((i) => i.category === cat.value).length
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`group inline-flex items-center gap-2 border px-4 py-3 font-sans text-xs uppercase tracking-eyebrow transition-all duration-400 ease-editorial no-justify ${
                    active
                      ? 'border-obsidian bg-obsidian text-warm-white'
                      : 'border-obsidian/15 bg-warm-white text-obsidian hover:border-quarry-gold hover:text-quarry-gold'
                  }`}
                >
                  {cat.label}
                  <span className={`font-mono text-[10px] ${active ? 'text-quarry-gold' : 'text-tobacco/40 group-hover:text-quarry-gold/70'} transition-colors`}>
                    {String(count).padStart(2, '0')}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* No items state — shouldn't happen but safe */}
      {items.length === 0 && (
        <div className="container-editorial text-center py-20">
          <p className="font-display italic text-2xl text-tobacco/60">No items in this category yet.</p>
        </div>
      )}

      {/* ============================================================
          TIER 1 — CINEMATIC FULL-BLEED HERO (first item)
          ============================================================ */}
      {heroItem && (
        <RevealOnScroll>
          <div className="container-editorial mb-12 lg:mb-20">
            <button
              onClick={() => openLightbox(heroItem)}
              className="group block w-full border border-obsidian/10 bg-obsidian text-left overflow-hidden"
              aria-label={`Open ${heroItem.title} in lightbox`}
            >
              <div className="relative">
                <PlaceholderImage
                  variant={heroItem.placeholderVariant}
                  label={heroItem.id}
                  title={heroItem.title}
                  spec={heroItem.caption}
                  swapPath={heroItem.swapPath}
                  aspectRatio="aspect-[16/9] lg:aspect-[21/9]"
                  className="transition-transform duration-1000 ease-editorial group-hover:scale-[1.02]"
                />
                {/* Bottom scrim + caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent pt-24 pb-8 lg:pb-12 px-8 lg:px-16">
                  <div className="flex items-end justify-between gap-6">
                    <div className="max-w-2xl">
                      <p className="font-mono text-xs text-quarry-gold mb-3 no-justify">
                        {heroItem.id} {heroItem.varietyCode && ` · ${heroItem.varietyCode}`}
                      </p>
                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-warm-white no-justify mb-3 leading-tight">
                        {heroItem.title}
                      </h3>
                      {heroItem.caption && (
                        <p className="font-display italic text-lg lg:text-xl text-warm-white/80 no-justify">
                          {heroItem.caption}
                        </p>
                      )}
                    </div>
                    <p className="hidden md:block font-mono text-xs text-warm-white/40 no-justify whitespace-nowrap pb-1">
                      Tap to enlarge →
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </RevealOnScroll>
      )}

      {/* ============================================================
          TIER 2 — EDITORIAL MOSAIC (3 asymmetric items)
          Magazine-style: one tall + two stacked
          ============================================================ */}
      {mosaicItems.length > 0 && (
        <div className="container-editorial mb-12 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Tall feature — left */}
            {mosaicItems[0] && (
              <RevealOnScroll delay={100} className="lg:col-span-7">
                <GalleryTile
                  item={mosaicItems[0]}
                  onClick={openLightbox}
                  aspectRatio="aspect-[4/5] lg:aspect-[6/7]"
                />
              </RevealOnScroll>
            )}
            {/* Two stacked — right */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4 lg:gap-6">
              {mosaicItems[1] && (
                <RevealOnScroll delay={200}>
                  <GalleryTile
                    item={mosaicItems[1]}
                    onClick={openLightbox}
                    aspectRatio="aspect-[4/3]"
                  />
                </RevealOnScroll>
              )}
              {mosaicItems[2] && (
                <RevealOnScroll delay={300}>
                  <GalleryTile
                    item={mosaicItems[2]}
                    onClick={openLightbox}
                    aspectRatio="aspect-[4/3]"
                  />
                </RevealOnScroll>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TIER 3 — MASONRY GRID (varied heights, the rest)
          CSS columns for true masonry with no JS
          ============================================================ */}
      {masonryItems.length > 0 && (
        <div className="container-editorial">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6 [column-fill:_balance]">
            {masonryItems.map((item, i) => {
              // Vary aspect ratios for natural masonry feel
              const aspectClass = {
                tall: 'aspect-[3/5]',
                wide: 'aspect-[16/10]',
                square: 'aspect-square',
                standard: 'aspect-[4/5]',
                hero: 'aspect-[16/9]',
              }[item.layoutHint]

              return (
                <RevealOnScroll
                  key={item.id}
                  delay={Math.min(i * 50, 400)}
                  className="break-inside-avoid mb-4 lg:mb-6 block"
                >
                  <GalleryTile item={item} onClick={openLightbox} aspectRatio={aspectClass} />
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      )}

      {/* ============================================================
          LIGHTBOX
          ============================================================ */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[100] bg-obsidian/97 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 lg:top-8 lg:right-8 p-3 text-warm-white/60 hover:text-quarry-gold transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* Prev / Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxItem(prevItem)
            }}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 text-warm-white/40 hover:text-quarry-gold transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxItem(nextItem)
            }}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 text-warm-white/40 hover:text-quarry-gold transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>

          {/* Image + caption */}
          <div
            className="relative max-w-6xl w-full mx-auto px-6 lg:px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <PlaceholderImage
                variant={lightboxItem.placeholderVariant}
                label={lightboxItem.id}
                title={lightboxItem.title}
                spec={lightboxItem.caption}
                swapPath={lightboxItem.swapPath}
                aspectRatio="aspect-[16/10] lg:aspect-[16/9]"
              />
            </div>

            {/* Caption */}
            <div className="mt-6 lg:mt-8 max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <p className="font-mono text-xs text-quarry-gold no-justify">{lightboxItem.id}</p>
                {lightboxItem.varietyCode && (
                  <>
                    <span className="text-warm-white/30">·</span>
                    <p className="font-mono text-xs text-warm-white/60 no-justify">
                      {lightboxItem.varietyCode}
                    </p>
                  </>
                )}
                {lightboxItem.location && (
                  <>
                    <span className="text-warm-white/30">·</span>
                    <p className="font-mono text-xs text-warm-white/60 no-justify">
                      {lightboxItem.location}
                    </p>
                  </>
                )}
              </div>
              <h3 className="font-display text-3xl lg:text-4xl text-warm-white no-justify mb-3 leading-tight">
                {lightboxItem.title}
              </h3>
              {lightboxItem.caption && (
                <p className="font-display italic text-lg lg:text-xl text-warm-white/80 no-justify">
                  {lightboxItem.caption}
                </p>
              )}
              <p className="font-mono text-[10px] text-warm-white/30 mt-6 no-justify">
                {currentIndex + 1} / {items.length}
                {' · '}
                Esc to close · ← → to navigate
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Tile sub-component ───
function GalleryTile({
  item,
  onClick,
  aspectRatio,
}: {
  item: GalleryItem
  onClick: (item: GalleryItem) => void
  aspectRatio: string
}) {
  return (
    <button
      onClick={() => onClick(item)}
      className="group block w-full overflow-hidden border border-obsidian/8 bg-warm-white text-left transition-colors duration-400 ease-editorial hover:border-quarry-gold/45"
      aria-label={`Open ${item.title}`}
    >
      <div className="relative overflow-hidden bg-obsidian">
        <PlaceholderImage
          variant={item.placeholderVariant}
          label={item.id}
          title={item.title}
          spec={item.caption}
          swapPath={item.swapPath}
          aspectRatio={aspectRatio}
          className="transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]"
        />
        {/* Hover scrim */}
        <div className="absolute inset-0 bg-obsidian/0 transition-all duration-500 ease-editorial group-hover:bg-obsidian/25" />
        <div className="absolute right-4 top-4 bg-obsidian/80 px-3 py-2 font-mono text-[10px] uppercase tracking-eyebrow text-quarry-gold no-justify">
          Open
        </div>
      </div>
      <div className="p-5 lg:p-6">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-quarry-gold no-justify mb-3">
          {item.id}{item.varietyCode ? ` · ${item.varietyCode}` : ''}
        </p>
        <h4 className="font-display text-2xl leading-tight text-obsidian no-justify mb-3">
          {item.title}
        </h4>
        {item.caption && (
          <p className="font-sans text-sm leading-6 text-graphite no-justify">
            {item.caption}
          </p>
        )}
      </div>
    </button>
  )
}
