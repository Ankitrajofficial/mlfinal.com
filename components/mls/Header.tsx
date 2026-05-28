'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { MLS_NAV, MLS_ASSETS, MLS_SITE } from '@/lib/site-mls'

/**
 * MLS Header — institutional/parent site.
 * Restrained, fixed at top, condenses on scroll.
 * Adheres to the "quiet institutional dominance" voice locked for MLS.
 */
export default function MLSHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const navTextClass = 'text-mls-ink/80 hover:text-mls-gold'
  const menuLineClass = 'bg-mls-ink'

  // Scroll-aware condensation.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  // Close dropdown on click outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    if (openMenu) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [openMenu])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-mls-ink/8 shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition-all duration-500 ease-editorial"
    >
      <div className="mx-auto px-4 md:px-12 lg:px-16 max-w-[88rem]">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'h-12 lg:h-18' : 'h-14 lg:h-24'
          }`}
        >
          {/* MLS Lockup */}
          <Link
            href="/"
            className="group flex min-w-0 flex-1 items-center gap-3 lg:flex-none"
            aria-label={`${MLS_SITE.name} — Home`}
          >
            <Image
              src={MLS_ASSETS.mark.onLight}
              alt=""
              width={48}
              height={48}
              className={`shrink-0 transition-all duration-500 ease-editorial ${
                scrolled ? 'h-8 w-8 lg:h-10 lg:w-10' : 'h-9 w-9 lg:h-12 lg:w-12'
              }`}
              priority
            />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display text-[1.08rem] font-semibold text-mls-ink transition-colors duration-300 group-hover:text-mls-gold md:text-[1.55rem]">
                {MLS_SITE.name}
              </span>
              <span className="mt-1 hidden font-body text-[0.62rem] uppercase tracking-marker text-mls-gold sm:block">
                Since 1972 · Bijolia
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {MLS_NAV.map((item) => {
              const hasChildren = 'children' in item && item.children
              const isExternal = 'external' in item && item.external

              if (hasChildren) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(openMenu === item.label ? null : item.label)
                      }
                      className={`px-4 py-2 text-sm font-body tracking-wide transition-colors duration-300 ${
                        openMenu === item.label ? 'text-mls-gold' : ''
                      } ${navTextClass}`}
                      aria-expanded={openMenu === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 min-w-[240px] bg-mls-cream border border-mls-ink/10 shadow-xl py-2 transition-all duration-300 ${
                        openMenu === item.label
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-1 pointer-events-none'
                      }`}
                    >
                      {item.children.map((child) => {
                        const childIsExternal =
                          'external' in child &&
                          typeof child.external === 'string'
                        return childIsExternal ? (
                          <a
                            key={child.href}
                            href={String(child.external)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-5 py-3 text-sm text-mls-ink/80 hover:bg-mls-cream hover:text-mls-gold transition-colors duration-200"
                          >
                            <span>{child.label}</span>
                            <span className="text-mls-slate text-xs" aria-hidden>
                              ↗
                            </span>
                          </a>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-3 text-sm text-mls-ink/80 hover:bg-mls-cream hover:text-mls-gold transition-colors duration-200"
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              }

              if (isExternal) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 text-sm font-body tracking-wide transition-colors duration-300 inline-flex items-center gap-1 ${navTextClass}`}
                  >
                    {item.label}
                    <span className="text-xs" aria-hidden>
                      ↗
                    </span>
                  </a>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-body tracking-wide transition-colors duration-300 ${
                    pathname === item.href
                      ? 'text-mls-gold'
                      : navTextClass
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-px transition-all duration-300 ${menuLineClass} ${
                  mobileOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-px transition-opacity duration-300 ${menuLineClass} ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-px transition-all duration-300 ${menuLineClass} ${
                  mobileOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-editorial ${
            mobileOpen ? 'max-h-[80vh] pb-8 border-t border-mls-ink/10 pt-4' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {MLS_NAV.map((item) => {
              const hasChildren = 'children' in item && item.children
              if (hasChildren) {
                return (
                  <div key={item.href} className="border-b border-mls-ink/5 last:border-b-0">
                    <p className="px-2 py-3 text-[10px] uppercase tracking-marker text-mls-slate">
                      {item.label}
                    </p>
                    <div className="flex flex-col">
                      {item.children.map((child) => {
                        const childIsExternal =
                          'external' in child && typeof child.external === 'string'
                        return childIsExternal ? (
                          <a
                            key={child.href}
                            href={String(child.external)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 text-base text-mls-ink/80 hover:text-mls-gold"
                          >
                            {child.label} ↗
                          </a>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="px-4 py-3 text-base text-mls-ink/80 hover:text-mls-gold"
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2 py-3 text-base text-mls-ink/80 hover:text-mls-gold border-b border-mls-ink/5 last:border-b-0"
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
