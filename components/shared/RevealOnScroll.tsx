'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  className?: string
  threshold?: number
  rootMargin?: string
}

/**
 * Reveals children with a subtle fade + lift when scrolled into view.
 * Respects prefers-reduced-motion automatically (no transform/transition then).
 * Shared between MLS and KHADANE; works without any wrapper.
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px -80px 0px',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin])

  return (
    <div
      ref={ref}
      data-delay={delay}
      className={`${className} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700 ease-editorial`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
