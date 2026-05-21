import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

interface VerticalCardProps {
  /** Route href OR external URL. */
  href: string
  /** Set true if href is an external site (renders an outbound arrow). */
  external?: boolean
  /** e.g. "01" */
  number: string
  /** e.g. "Stone & Export" */
  title: string
  /** Trade brand line, e.g. "KHADANE™" */
  brand: string
  /** Editorial sub-line, e.g. "The founding vertical. Still the largest." */
  framing: string
  /** Optional 1-2 sentence body. */
  body?: string
  /** Optional compact facts for taller cards. */
  details?: Array<{
    label: string
    value: string
  }>
  /** Optional palette modifier — default is cream surface. */
  variant?: 'cream' | 'tobacco' | 'dark'
}

/**
 * Card primitive for the Five Verticals grid.
 * Used on the MLS homepage and on /verticals/ index page.
 * Variants let us inflect tone (tobacco for hospitality, dark for stone export bridge, etc.).
 */
export default function VerticalCard({
  href,
  external = false,
  number,
  title,
  brand,
  framing,
  body,
  details,
  variant = 'cream',
}: VerticalCardProps) {
  const isOutbound = external && /^https?:\/\//.test(href)
  const variantStyles = {
    cream: 'bg-mls-cream text-mls-ink border-mls-ink/10 hover:bg-mls-buff/40',
    tobacco: 'bg-mls-tobacco text-mls-cream border-mls-cream/15 hover:bg-mls-ink',
    dark: 'bg-mls-ink text-mls-cream border-mls-cream/15 hover:bg-mls-tobacco',
  }

  const accent =
    variant === 'cream' ? 'text-mls-gold' : 'text-mls-gold'

  const Inner = (
    <div
      className={`group relative h-full flex flex-col justify-between p-8 lg:p-10 border transition-colors duration-500 ease-editorial ${variantStyles[variant]}`}
    >
      {/* Top: number + brand */}
      <div>
        <div className="flex items-baseline justify-between mb-6">
          <span className="font-mono text-[10px] uppercase tracking-marker opacity-60">
            {number}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-marker opacity-50">
            Vertical
          </span>
        </div>

        <h3 className="font-display text-3xl lg:text-4xl tracking-tight leading-[1.1] mb-2">
          {title}
        </h3>
        <p className={`font-mono text-[11px] uppercase tracking-marker mb-6 ${accent}`}>
          {brand}
        </p>

        <p className="font-display italic text-lg lg:text-xl leading-snug mb-4 opacity-90">
          {framing}
        </p>

        {body && (
          <p className="text-sm leading-relaxed opacity-75 mt-4">{body}</p>
        )}

        {details && details.length > 0 && (
          <div className="mt-8 grid gap-4">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="border-t border-current/15 pt-4"
              >
                <p className="font-mono text-[9px] uppercase tracking-marker opacity-50 mb-2">
                  {detail.label}
                </p>
                <p className="text-sm leading-relaxed opacity-80">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom: visit cue */}
      <div className="mt-10 pt-6 border-t border-current/15 inline-flex items-center gap-2 text-sm">
        <span className={`${accent} group-hover:gap-3 transition-all flex items-center gap-2`}>
          {external ? 'Visit khadane.com' : 'See the work'}
          {external ? (
            <ArrowUpRight className="w-4 h-4" aria-hidden />
          ) : (
            <ArrowRight className="w-4 h-4" aria-hidden />
          )}
        </span>
      </div>
    </div>
  )

  if (isOutbound) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {Inner}
      </a>
    )
  }

  return (
    <Link href={href} className="block h-full">
      {Inner}
    </Link>
  )
}
