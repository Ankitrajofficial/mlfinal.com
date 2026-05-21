import type { ReactNode } from 'react'

interface DivineDarkSectionProps {
  children: ReactNode
  className?: string
}

/**
 * Dark-treatment wrapper for Divine Dining mentions on /student-housing/girls/
 * and /food-services/ Section 02.
 *
 * Divine Dining is currently NAMED-ONLY at launch per FACTS Section 12 —
 * no separate logo or palette. The treatment uses the deep institutional palette
 * (MLS Deep Brown → MLS Tobacco) to feel adjacent to but distinct from Vyanjanam.
 */
export default function DivineDarkSection({
  children,
  className = '',
}: DivineDarkSectionProps) {
  return (
    <section
      className={`relative bg-gradient-to-b from-mls-ink to-mls-tobacco text-mls-cream ${className}`}
      data-brand="divine-dining"
    >
      <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem] py-20 lg:py-32">
        {children}
      </div>

      {/* Subtle horizontal texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        aria-hidden
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0, transparent 120px, rgba(238,235,224,0.3) 120px, rgba(238,235,224,0.3) 121px)',
        }}
      />
    </section>
  )
}
