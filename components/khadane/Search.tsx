'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search as SearchIcon, X } from 'lucide-react'
import { VARIETIES } from '@/lib/khadane/varieties'
import { FORMATS } from '@/lib/khadane/formats'
import { FIELD_NOTES } from '@/lib/field-notes'
import { SITE } from '@/lib/khadane/site'

interface SearchResult {
  type: 'variety' | 'format' | 'field-note' | 'page'
  title: string
  subtitle: string
  href: string
  code?: string
}

const STATIC_PAGES: SearchResult[] = [
  { type: 'page', title: 'The Quarry', subtitle: 'The working face', href: '/quarry' },
  { type: 'page', title: 'The Yard', subtitle: 'Processing & shipping', href: '/yard' },
  { type: 'page', title: 'The Desk', subtitle: 'Write to us', href: '/desk' },
  { type: 'page', title: 'The Group', subtitle: 'Mohan Lal & Sons', href: '/khadane/group' },
  { type: 'page', title: 'Gallery', subtitle: 'Stone, quarry, yard, in-situ', href: '/khadane/gallery' },
  { type: 'page', title: 'Collection', subtitle: `All ${SITE.varietyCount} varieties`, href: '/khadane/collection' },
  { type: 'page', title: 'Formats', subtitle: `All ${SITE.formatCount} formats`, href: '/khadane/formats' },
  { type: 'page', title: 'Field Notes', subtitle: 'Editorial briefs', href: '/khadane/field-notes' },
  { type: 'page', title: 'About', subtitle: 'About KHADANE™', href: '/khadane/about' },
]

interface SearchProps {
  tone?: 'light' | 'dark'
}

export default function Search({ tone = 'light' }: SearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const routeBase = pathname.startsWith('/khadane') ? '/khadane' : ''
  const withRouteBase = useCallback(
    (href: string) => (routeBase && href.startsWith('/') ? `${routeBase}${href}` : href),
    [routeBase]
  )
  const triggerClass =
    tone === 'dark'
      ? 'border-warm-white/20 text-warm-white/75 hover:text-quarry-gold hover:border-quarry-gold/70'
      : 'border-obsidian/15 text-obsidian/70 hover:text-quarry-gold hover:border-quarry-gold'
  const shortcutClass =
    tone === 'dark'
      ? 'text-warm-white/35 group-hover:text-quarry-gold/70'
      : 'text-tobacco/40 group-hover:text-quarry-gold/60'

  // Build full index once
  const allItems = useMemo<SearchResult[]>(() => {
    const varietyResults: SearchResult[] = VARIETIES.map((v) => ({
      type: 'variety' as const,
      title: v.name,
      subtitle: `${v.code} · ${v.district}`,
      href: `/khadane/collection/${v.slug}`,
      code: v.code,
    }))
    const formatResults: SearchResult[] = FORMATS.map((f) => ({
      type: 'format' as const,
      title: f.name,
      subtitle: `${f.code} · ${f.primaryUse}`,
      href: `/khadane/formats/${f.slug}`,
      code: f.code,
    }))
    const noteResults: SearchResult[] = FIELD_NOTES.map((n) => ({
      type: 'field-note' as const,
      title: n.title,
      subtitle: `${n.id} · ${n.categoryLabel}`,
      href: `/khadane/field-notes/${n.slug}`,
      code: n.id,
    }))
    return [...varietyResults, ...formatResults, ...noteResults, ...STATIC_PAGES]
  }, [])

  // Filter results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return allItems.slice(0, 8)  // Show first 8 by default
    }
    return allItems
      .filter((item) =>
        [item.title, item.subtitle, item.code]
          .filter(Boolean)
          .some((s) => s!.toLowerCase().includes(q))
      )
      .slice(0, 12)
  }, [query, allItems])

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [open])

  // Body scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Keyboard shortcuts: ⌘K / Ctrl+K to open, Esc to close, arrows + Enter to navigate
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      // Open
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
        return
      }
      if (!open) return
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % Math.max(results.length, 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (i === 0 ? results.length - 1 : i - 1))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const item = results[activeIndex]
        if (item) {
          router.push(withRouteBase(item.href))
          setOpen(false)
        }
      }
    },
    [open, results, activeIndex, router, withRouteBase]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <>
      {/* Trigger button — exposed via NavSearchTrigger or used directly */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className={`inline-flex items-center gap-2 px-3 py-2 border transition-colors duration-300 group ${triggerClass}`}
      >
        <SearchIcon size={14} strokeWidth={1.5} />
        <span className="hidden md:inline font-mono text-xs tracking-wider uppercase no-justify">Search</span>
        <span className={`hidden lg:inline font-mono text-[10px] ml-1 no-justify ${shortcutClass}`}>
          ⌘K
        </span>
      </button>

      {/* Palette overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[110] bg-obsidian/80 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-warm-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-obsidian/10">
              <SearchIcon size={18} strokeWidth={1.5} className="text-quarry-gold flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search varieties, formats, field notes…"
                className="flex-1 bg-transparent font-sans text-base text-obsidian placeholder:text-tobacco/40 focus:outline-none"
              />
              <span className="font-mono text-[10px] text-tobacco/40 no-justify hidden md:inline">
                ESC to close
              </span>
              <button
                onClick={() => setOpen(false)}
                className="md:hidden p-1 text-obsidian/60 hover:text-quarry-gold"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 && (
                <div className="px-5 py-10 text-center">
                  <p className="font-display italic text-lg text-tobacco/50 no-justify">
                    Nothing matches that yet.
                  </p>
                  <p className="font-mono text-xs text-tobacco/40 mt-2 no-justify">
                    Try a code (#KHD-001), a name (Kandla Grey), or a keyword (calibration).
                  </p>
                </div>
              )}

              {results.length > 0 && (
                <ul>
                  {results.map((r, idx) => {
                    const active = idx === activeIndex
                    return (
                      <li key={`${r.type}-${r.href}`}>
                        <Link
                          href={withRouteBase(r.href)}
                          onClick={() => setOpen(false)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`flex items-center gap-4 px-5 py-3 transition-colors ${
                            active ? 'bg-stone-linen' : 'hover:bg-stone-linen/50'
                          }`}
                        >
                          {/* Type badge */}
                          <span className="font-mono text-[9px] uppercase tracking-wider text-quarry-gold w-20 flex-shrink-0 no-justify">
                            {r.type === 'variety' && '#KHD'}
                            {r.type === 'format' && '#KHF'}
                            {r.type === 'field-note' && 'FIELD'}
                            {r.type === 'page' && 'PAGE'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-base text-obsidian no-justify truncate">
                              {r.title}
                            </p>
                            <p className="font-mono text-[10px] text-tobacco/60 no-justify truncate">
                              {r.subtitle}
                            </p>
                          </div>
                          <span
                            className={`text-quarry-gold transition-opacity ${
                              active ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {/* Footer hints */}
            <div className="px-5 py-3 border-t border-obsidian/10 flex items-center justify-between bg-stone-linen/30">
              <p className="font-mono text-[10px] text-tobacco/50 no-justify">
                {VARIETIES.length} varieties · {FORMATS.length} formats · {FIELD_NOTES.length} field notes
              </p>
              <p className="font-mono text-[10px] text-tobacco/50 no-justify hidden md:flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ open</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
