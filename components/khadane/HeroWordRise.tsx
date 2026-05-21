'use client'

import { useEffect, useState } from 'react'

interface HeroWordRiseProps {
  words: string[]
  className?: string
  baseDelay?: number
  staggerDelay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

export default function HeroWordRise({
  words,
  className = '',
  baseDelay = 100,
  staggerDelay = 110,
  as: Tag = 'h1',
}: HeroWordRiseProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Tag className={`${className} no-justify`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: '0.25em' }}
        >
          <span
            className="inline-block"
            style={{
              transform: mounted ? 'translateY(0)' : 'translateY(110%)',
              opacity: mounted ? 1 : 0,
              transition: `transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)`,
              transitionDelay: `${baseDelay + i * staggerDelay}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}
