import type { ReactNode } from 'react'

interface VyanjanamSectionProps {
  children: ReactNode
  className?: string
  eyebrow?: string
}

/**
 * Black-gradient section wrapper — Vyanjanam brand treatment.
 * Used on /food-services/ and anywhere Vyanjanam is foregrounded.
 *
 * Palette per FACTS-CANONICAL v2.0 Section 12:
 *   Background: linear-gradient #000000 → #1A1A1A
 *   Text: Pure White / Subtle Grey / Light Grey
 *   Accent: White (no gold inside Vyanjanam treatment)
 */
export default function VyanjanamSection({
  children,
  className = '',
  eyebrow,
}: VyanjanamSectionProps) {
  return (
    <section
      className={`relative bg-vyanjanam-hero text-vyanjanam-white ${className}`}
      data-brand="vyanjanam"
    >
      {/* Optional eyebrow strip across the top */}
      {eyebrow && (
        <div className="border-b border-vyanjanam-white/10">
          <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem] py-4">
            <p className="font-mono text-[10px] uppercase tracking-marker text-vyanjanam-light">
              {eyebrow}
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem] py-20 lg:py-32">
        {children}
      </div>

      {/* Subtle vertical-line texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0, transparent 80px, rgba(255,255,255,0.5) 80px, rgba(255,255,255,0.5) 81px)',
        }}
      />
    </section>
  )
}
