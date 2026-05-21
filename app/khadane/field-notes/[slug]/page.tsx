import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  FIELD_NOTES,
  getFieldNote,
  getPrevFieldNote,
  getNextFieldNote,
} from '@/lib/field-notes'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export function generateStaticParams() {
  return FIELD_NOTES.map((n) => ({ slug: n.slug }))
}

type FieldNotePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: FieldNotePageProps) {
  const { slug } = await params
  const note = getFieldNote(slug)
  if (!note) return { title: 'Not found' }
  return {
    title: `${note.title} · ${note.id}`,
    description: note.excerpt,
  }
}

export default async function FieldNotePage({ params }: FieldNotePageProps) {
  const { slug } = await params
  const note = getFieldNote(slug)
  if (!note) notFound()

  const prev = getPrevFieldNote(note.slug)
  const next = getNextFieldNote(note.slug)

  return (
    <>
      {/* Hero — full bleed photo + title */}
      <section className="section-warm pt-12 lg:pt-20">
        <div className="container-editorial max-w-4xl">
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <Link href="/khadane/field-notes" className="font-mono text-xs text-tobacco/60 hover:text-quarry-gold transition-colors no-justify inline-block mb-8">
              ← Field Notes
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="font-mono text-xs text-quarry-gold no-justify">{note.id}</span>
              <span className="text-tobacco/30">·</span>
              <span className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/80 no-justify">{note.categoryLabel}</span>
              <span className="text-tobacco/30">·</span>
              <span className="font-mono text-xs text-tobacco/60 no-justify">{note.date}</span>
              <span className="text-tobacco/30">·</span>
              <span className="font-mono text-xs text-tobacco/60 no-justify">{note.readMinutes} min read</span>
            </div>
          </div>
          <HeroWordRise
            as="h1"
            words={note.title.split(' ')}
            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-obsidian mb-10"
            baseDelay={250}
            staggerDelay={70}
          />
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1400ms' }}>
            <p className="font-display italic text-2xl text-quarry-gold no-justify leading-snug">
              {note.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Feature image */}
      <section className="section-warm pt-16 lg:pt-24 pb-12">
        <div className="container-editorial max-w-5xl">
          <RevealOnScroll>
            <PlaceholderImage
              variant={note.placeholderVariant}
              label={note.id}
              title={note.categoryLabel}
              aspectRatio="aspect-[16/9]"
              swapPath={`/img/field-notes/${note.slug}.jpg`}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* Article body */}
      <section className="pb-20 lg:pb-32 section-warm">
        <div className="container-editorial max-w-3xl">
          {note.sections.map((section, sIdx) => (
            <RevealOnScroll key={sIdx} delay={50}>
              <div className="mb-12 lg:mb-16">
                {section.heading && (
                  <h2 className="font-display text-3xl lg:text-4xl tracking-tight leading-tight text-obsidian no-justify mb-8 mt-4">
                    {section.heading}
                  </h2>
                )}
                {section.body.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="font-sans text-base lg:text-lg leading-relaxed text-graphite mb-6"
                    style={{ textAlign: 'justify', hyphens: 'auto' }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </RevealOnScroll>
          ))}

          {note.closingNote && (
            <RevealOnScroll>
              <div className="pt-8 mt-8 border-t border-obsidian/10 text-center">
                <p className="font-display italic text-2xl lg:text-3xl text-quarry-gold no-justify leading-snug">
                  {note.closingNote}
                </p>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      {/* Prev / Next */}
      <section className="section-cream border-t border-obsidian/10">
        <div className="container-editorial py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-4">
            <Link href={`/khadane/field-notes/${prev.slug}`} className="group block">
              <p className="font-mono text-xs text-tobacco/60 mb-2 no-justify">← PREVIOUS · {prev.id}</p>
              <p className="font-display text-xl lg:text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors leading-tight">
                {prev.title}
              </p>
            </Link>
            <Link href={`/khadane/field-notes/${next.slug}`} className="group block text-right">
              <p className="font-mono text-xs text-tobacco/60 mb-2 no-justify">NEXT · {next.id} →</p>
              <p className="font-display text-xl lg:text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors leading-tight">
                {next.title}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Subscribe block */}
      <section className="section-padding section-dark">
        <div className="container-editorial max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <p className="eyebrow-gold mb-8 no-justify">DELIVERED MONTHLY</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight leading-[1.1] text-warm-white mb-6 no-justify">
              The Field Notes letter.
            </h2>
            <p className="font-sans text-base text-warm-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
              One brief per month. Geology, process, or trade. Sent only to specifiers and importers.
            </p>
            <a
              href="mailto:exports@khadane.com?subject=Subscribe%20to%20Field%20Notes"
              className="inline-flex items-center gap-3 px-8 py-4 bg-quarry-gold text-obsidian font-sans text-sm tracking-wider uppercase hover:bg-warm-white transition-all duration-400 ease-editorial no-justify"
            >
              Subscribe →
            </a>
          </RevealOnScroll>
        </div>
      </section>

      <BrandWhisper customLine={`${note.title} · ${note.id}`} />
    </>
  )
}
