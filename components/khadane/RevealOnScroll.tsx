'use client'

import { useEffect, useRef, useState, ReactNode, ElementType } from 'react'

type RevealElement = 'div' | 'section' | 'article' | 'aside' | 'li' | 'span'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: RevealElement
  threshold?: number
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  threshold = 0.15,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const Component = Tag as ElementType

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? 'revealed' : ''} ${className}`}
      data-delay={delay}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  )
}
