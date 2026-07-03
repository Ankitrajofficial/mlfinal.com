'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import type { Finish } from '@/lib/khadane/surfaces'

/**
 * One finish (or edge profile): a single hero image plus expandable
 * thumbnails. Thumbs render only when the finish carries more than one
 * photograph; clicking a thumbnail promotes it to the hero.
 */
export default function FinishBlock({
  finish,
  index,
  dark = false,
}: {
  finish: Finish
  index: number
  dark?: boolean
}) {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const current = finish.images[active] ?? finish.images[0]
  const hasMore = finish.images.length > 1

  return (
    <div className={`flex h-full flex-col ${dark ? 'bg-warm-white/[0.04]' : 'bg-warm-white'}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={current ? current.jpg : finish.heroJpg}
          alt={`${finish.name} finish${current ? ` — shown in ${current.variety}` : ''} · KHADANE`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-quarry-gold no-justify">
            {String(index + 1).padStart(2, '0')}
          </p>
          {current && (
            <p className={`font-mono text-[10px] uppercase tracking-eyebrow no-justify ${dark ? 'text-warm-white/40' : 'text-tobacco/50'}`}>
              Shown in {current.variety}
            </p>
          )}
        </div>

        <h3 className={`font-display text-2xl leading-tight no-justify ${dark ? 'text-warm-white' : 'text-obsidian'}`}>
          {finish.name}
        </h3>
        <p className="mt-1 font-display text-base italic text-quarry-gold no-justify">{finish.tagline}</p>
        <p className={`mt-3 font-sans text-sm leading-relaxed ${dark ? 'text-warm-white/65' : 'text-graphite'}`}>
          {finish.description}
        </p>

        {hasMore && (
          <div className="mt-5 border-t pt-4" style={{ borderColor: dark ? 'rgba(250,248,243,0.1)' : 'rgba(26,20,16,0.1)' }}>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className={`inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider no-justify transition-colors ${dark ? 'text-quarry-gold hover:text-warm-white' : 'text-tobacco hover:text-quarry-gold'}`}
              aria-expanded={expanded}
            >
              {expanded ? 'Fewer photographs' : `All ${finish.images.length} photographs`}
              <ChevronDown
                size={14}
                strokeWidth={1.6}
                className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>

            {expanded && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {finish.images.map((img, i) => (
                  <button
                    key={img.file}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative aspect-square overflow-hidden transition-opacity ${i === active ? 'ring-1 ring-quarry-gold' : 'opacity-75 hover:opacity-100'}`}
                    aria-label={`Show ${finish.name} in ${img.variety}`}
                  >
                    <Image
                      src={img.thumb}
                      alt={`${finish.name} — ${img.variety} thumbnail`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
