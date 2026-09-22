'use client'

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  ReactNode,
  ElementType,
} from 'react'

type RevealElement = 'div' | 'section' | 'article' | 'aside' | 'li' | 'span'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: RevealElement
  threshold?: number
}

// Flips to true once the first client render has committed. Lets a mount tell
// hydration (server HTML is already painted; never hide it) apart from a
// client-side navigation (fresh DOM, safe to animate before first paint).
let hydrated = false

// Entrance delays are halved and capped so a long stagger never leaves a
// block invisible while the reader is already looking at it.
const MAX_DELAY_MS = 250

type RevealState = 'static' | 'hidden' | 'revealed'

export default function RevealOnScroll({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  threshold = 0,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null)
  // The server renders with no reveal class at all, so the HTML is visible
  // with or without JavaScript. Hiding is opted into on the client only.
  const [state, setState] = useState<RevealState>('static')
  const Component = Tag as ElementType

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const inView = el.getBoundingClientRect().top < window.innerHeight
    // On hydration the browser has already painted this block. Hiding it now
    // would blink it off and fade it back in.
    if (inView && !hydrated) return

    setState('hidden')
  }, [])

  useEffect(() => {
    hydrated = true
  }, [])

  useEffect(() => {
    if (state !== 'hidden') return
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('revealed')
          obs.disconnect()
        }
      },
      // Start the transition before the block reaches the viewport so it is
      // already moving when it comes into view.
      { threshold, rootMargin: '0px 0px 120px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [state, threshold])

  const revealClass =
    state === 'static' ? '' : state === 'hidden' ? 'reveal' : 'reveal revealed'
  const transitionDelay = Math.min(Math.round(delay / 2), MAX_DELAY_MS)

  return (
    <Component
      ref={ref}
      className={`${revealClass} ${className}`.trim()}
      style={state === 'static' ? undefined : { transitionDelay: `${transitionDelay}ms` }}
    >
      {children}
    </Component>
  )
}
