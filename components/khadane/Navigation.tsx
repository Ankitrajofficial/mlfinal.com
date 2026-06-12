'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, SITE } from '@/lib/khadane/site'
import Wordmark from './Wordmark'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const routeBase = pathname.startsWith('/khadane') ? '/khadane' : ''
  const homeHref = routeBase || '/'
  const withRouteBase = (href: string) =>
    routeBase && href.startsWith('/') ? `${routeBase}${href}` : href
  const isHome = pathname === homeHref || pathname === `${homeHref}/`
  const [overHero, setOverHero] = useState(isHome)
  const navOnDark = overHero

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setOverHero(isHome && y < window.innerHeight * 0.72)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isHome])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-editorial ${
          overHero
            ? 'bg-transparent border-b border-transparent'
            : 'bg-white border-b border-obsidian/8'
        }`}
      >
        <div
          className={`container-editorial flex items-center justify-between gap-4 transition-all duration-500 ease-editorial ${
            scrolled && !overHero ? 'h-11 lg:h-[58px]' : 'h-12 lg:h-[68px]'
          }`}
        >
          <Wordmark
            theme={navOnDark ? 'dark' : 'light'}
            width={150}
            href={homeHref}
            className={`h-auto transition-all duration-500 ease-editorial ${
              scrolled && !overHero ? 'w-[92px] lg:w-[126px]' : 'w-[104px] lg:w-[150px]'
            }`}
          />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const href = withRouteBase(item.href)
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <li key={item.href}>
                  <Link
                    href={href}
                    className={`relative px-3 py-1.5 font-sans text-xs leading-none tracking-wider uppercase transition-colors duration-400 ${
                      active
                        ? 'text-quarry-gold'
                        : navOnDark
                          ? 'text-warm-white/85 hover:text-quarry-gold'
                          : 'text-obsidian hover:text-quarry-gold'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-px bg-quarry-gold" aria-hidden />
                    )}
                  </Link>
                </li>
              )
            })}
            <li className="ml-2">
              <Link
                href={withRouteBase('/desk')}
                className={`px-4 py-2 border font-sans text-xs leading-none tracking-wider uppercase transition-all duration-400 ease-editorial inline-flex items-center gap-2 ${
                  navOnDark
                    ? 'border-warm-white/35 text-warm-white/85 hover:bg-warm-white hover:text-obsidian'
                    : 'border-obsidian text-obsidian hover:bg-obsidian hover:text-warm-white'
                }`}
              >
                Enquire
                <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="lg:hidden flex flex-col gap-1.5 p-0.5"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className={`block w-6 h-px ${navOnDark ? 'bg-warm-white' : 'bg-obsidian'}`} />
            <span className={`block w-6 h-px ${navOnDark ? 'bg-warm-white' : 'bg-obsidian'}`} />
            <span className={`block w-4 h-px ml-auto ${navOnDark ? 'bg-warm-white' : 'bg-obsidian'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ease-editorial ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-obsidian" />
        <div className="relative h-full flex flex-col">
          <div className="flex h-11 items-center justify-between px-4 border-b border-warm-white/10">
            <Wordmark theme="dark" width={108} linked={false} className="h-auto w-[78px]" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-warm-white text-xl px-2"
            >
              ×
            </button>
          </div>
          <ul className="flex-1 flex flex-col justify-center px-8 gap-1">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.href}>
                <Link
                  href={withRouteBase(item.href)}
                  className="block py-4 font-display text-3xl text-warm-white hover:text-quarry-gold transition-colors"
                  style={{
                    transitionDelay: mobileOpen ? `${idx * 60}ms` : '0ms',
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                    transitionProperty: 'opacity, transform, color',
                    transitionDuration: '600ms',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-8">
              <Link
                href={withRouteBase('/desk')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-quarry-gold text-obsidian font-sans text-sm tracking-wider uppercase"
              >
                Enquire <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
          <div className="px-8 py-8 border-t border-warm-white/10 text-warm-white/60 text-xs font-mono tracking-wider">
            {SITE.contact.publicEmail} · {SITE.contact.publicPhone}
          </div>
        </div>
      </div>
    </>
  )
}
