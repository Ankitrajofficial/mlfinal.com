import Link from 'next/link'
import { FIELD_NOTES } from '@/lib/field-notes'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'Field Notes — Editorial briefs from the belt',
  description: 'Editorial briefs from the Bijolia sandstone belt. Geology, process, trade. Written from the quarry.',
}


export default function FieldNotesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="max-w-5xl">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">FIELD NOTES</p>
            </div>
            <HeroWordRise
              as="h1"
              words={['Editorial', 'briefs', 'from', 'the', 'belt.']}
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05] text-obsidian mb-10"
              baseDelay={250}
              staggerDelay={120}
            />
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1500ms' }}>
              <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl mb-8">
                Geology. Process. Trade. Written from the quarry.
              </p>
              <p className="editorial-body max-w-2xl">
                Short briefs covering the working knowledge behind the catalogue. Useful for specifiers, traders, and anyone working with Indian sandstone for the first time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notes shelf */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {FIELD_NOTES.map((note, i) => (
              <RevealOnScroll key={note.id} delay={i * 80}>
                <Link href={`/khadane/field-notes/${note.slug}`} className="group block">
                  <PlaceholderImage
                    variant={note.placeholderVariant}
                    label={note.id}
                    title={note.categoryLabel}
                    swapPath={`/img/field-notes/${note.slug}.jpg`}
                    aspectRatio="aspect-[4/3]"
                    className="mb-6 transition-transform duration-600 ease-editorial group-hover:scale-[1.01]"
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <p className="font-mono text-xs text-quarry-gold no-justify">{note.categoryLabel}</p>
                    <span className="text-tobacco/30">·</span>
                    <p className="font-mono text-xs text-tobacco/60 no-justify">{note.date}</p>
                  </div>
                  <h3 className="font-display text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors mb-3 leading-snug">
                    {note.title}
                  </h3>
                  <p className="font-sans text-sm text-graphite leading-relaxed mb-4">
                    {note.excerpt}
                  </p>
                  <p className="font-mono text-xs text-tobacco/55 group-hover:text-quarry-gold transition-colors no-justify">
                    {note.readMinutes} min read →
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe block */}
      <section className="section-padding section-dark">
        <div className="container-editorial max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <p className="eyebrow-gold mb-8 no-justify">DELIVERED MONTHLY</p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.1] text-warm-white mb-8 no-justify">
              The Field Notes letter.
            </h2>
            <p className="font-sans text-lg text-warm-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
              One brief per month. Geology, process, or trade. Sent only to specifiers and importers.
            </p>
            <a href="mailto:exports@khadane.com?subject=Subscribe%20to%20Field%20Notes" className="inline-flex items-center gap-3 px-10 py-5 bg-quarry-gold text-obsidian font-sans text-sm tracking-wider uppercase hover:bg-warm-white transition-all duration-400 ease-editorial no-justify">
              Subscribe →
            </a>
          </RevealOnScroll>
        </div>
      </section>

      <BrandWhisper />
    </>
  )
}
