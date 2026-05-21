import { SITE } from '@/lib/khadane/site'
import RevealOnScroll from './RevealOnScroll'

interface BrandWhisperProps {
  variant?: 'default' | 'short' | 'gold'
  customLine?: string
}

export default function BrandWhisper({ variant = 'default', customLine }: BrandWhisperProps) {
  if (customLine) {
    return (
      <div className="container-editorial py-20 lg:py-28 text-center">
        <RevealOnScroll>
          <p className="font-display italic text-xl md:text-2xl lg:text-3xl text-quarry-gold no-justify max-w-2xl mx-auto leading-snug">
            {customLine}
          </p>
        </RevealOnScroll>
      </div>
    )
  }

  if (variant === 'short') {
    return (
      <div className="container-editorial py-20 lg:py-28 text-center">
        <RevealOnScroll>
          <p className="font-display italic text-2xl lg:text-3xl text-quarry-gold no-justify">
            {SITE.tagline}
          </p>
        </RevealOnScroll>
      </div>
    )
  }

  if (variant === 'gold') {
    return (
      <div className="section-tobacco py-24 lg:py-32 text-center">
        <div className="container-editorial">
          <RevealOnScroll>
            <p className="font-display italic text-3xl lg:text-4xl text-quarry-gold no-justify mb-6">
              {SITE.hindiTag}
            </p>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-warm-white/60 no-justify">
              {SITE.signature}
            </p>
          </RevealOnScroll>
        </div>
      </div>
    )
  }

  return (
    <div className="container-editorial py-20 lg:py-28">
      <div className="text-center max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="font-display italic text-2xl md:text-3xl text-obsidian no-justify mb-6 leading-snug">
            {SITE.signature}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={150}>
          <div className="hairline-gold mx-auto" />
        </RevealOnScroll>
      </div>
    </div>
  )
}
