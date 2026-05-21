import type { ReactNode } from 'react'
import RevealOnScroll from '@/components/shared/RevealOnScroll'

interface SectionHeaderProps {
  /** e.g. "02" — section number */
  number?: string
  /** e.g. "THE FIVE VERTICALS" */
  eyebrow: string
  /** Main heading (display font) */
  heading: ReactNode
  /** Optional italic sub-line in gold */
  subLine?: ReactNode
  /** Optional body paragraph */
  body?: ReactNode
  /** Layout: stacked (default) or split (heading left, body right) */
  layout?: 'stacked' | 'split'
  /** Optional CTA element */
  cta?: ReactNode
  /** Restrict heading max-width for readability */
  maxWidth?: string
  className?: string
}

/**
 * SectionHeader — consistent rhythm primitive used across MLS sections.
 * Encapsulates the locked eyebrow → heading → sub-line → body pattern.
 */
export default function SectionHeader({
  number,
  eyebrow,
  heading,
  subLine,
  body,
  layout = 'stacked',
  cta,
  maxWidth = 'max-w-3xl',
  className = '',
}: SectionHeaderProps) {
  const eyebrowDisplay = number ? `${number} · ${eyebrow}` : eyebrow

  if (layout === 'split') {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 ${className}`}>
        <div className="lg:col-span-5">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
              {eyebrowDisplay}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-mls-ink mb-6">
              {heading}
              {subLine && (
                <span className="block italic text-mls-gold mt-2">{subLine}</span>
              )}
            </h2>
          </RevealOnScroll>
        </div>
        <div className="lg:col-span-7">
          {body && (
            <RevealOnScroll delay={200}>
              <div className="text-lg leading-relaxed text-mls-ink/85 space-y-5">
                {body}
              </div>
            </RevealOnScroll>
          )}
          {cta && (
            <RevealOnScroll delay={300}>
              <div className="mt-8">{cta}</div>
            </RevealOnScroll>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`${maxWidth} ${className}`}>
      <RevealOnScroll>
        <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
          {eyebrowDisplay}
        </p>
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-mls-ink mb-6">
          {heading}
          {subLine && (
            <span className="block italic text-mls-gold mt-2">{subLine}</span>
          )}
        </h2>
      </RevealOnScroll>
      {body && (
        <RevealOnScroll delay={200}>
          <div className="text-lg leading-relaxed text-mls-ink/85 space-y-5 mt-8">
            {body}
          </div>
        </RevealOnScroll>
      )}
      {cta && (
        <RevealOnScroll delay={300}>
          <div className="mt-8">{cta}</div>
        </RevealOnScroll>
      )}
    </div>
  )
}
