import Link from 'next/link'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export const metadata = {
  title: 'Field Notes — Editorial briefs from the belt',
  description: 'Editorial briefs from the Bijolia sandstone belt. Geology, process, trade. Written from the quarry.',
}

const NOTES = [
  {
    code: 'FN-001',
    category: 'GEOLOGY',
    title: 'Why Bijolia sandstone sits where it does.',
    excerpt: 'The Vindhyan Supergroup is one of the largest preserved sedimentary basins on Earth. Bijolia sits on its western edge. Why that geology produces the stone it does.',
    date: 'Q2 · 2026',
    variant: 'stone-warm' as const,
  },
  {
    code: 'FN-002',
    category: 'PROCESS',
    title: 'Calibration, explained.',
    excerpt: 'A 22mm Kandla Grey slab shouldn\'t arrive at 24mm. Tolerance is the unsung discipline of the export trade. How we hit it, batch after batch.',
    date: 'Q2 · 2026',
    variant: 'stone-grey' as const,
  },
  {
    code: 'FN-003',
    category: 'TRADE',
    title: 'FOB, FOR, CIF: what UK buyers actually need.',
    excerpt: 'The shipping terms most often confused — and what they mean for your landed cost. A practical primer for first-time importers.',
    date: 'Q2 · 2026',
    variant: 'yard' as const,
  },
  {
    code: 'FN-004',
    category: 'GEOLOGY',
    title: 'The colour of stone: where it comes from.',
    excerpt: 'Iron oxidation, organic content, mineral inclusion. Why Autumn Brown is brown and Kandla Grey is grey, written in the rock.',
    date: 'Q1 · 2026',
    variant: 'stone' as const,
  },
  {
    code: 'FN-005',
    category: 'NETWORK',
    title: 'Allied does not mean traded.',
    excerpt: 'How direct-source allied relationships work in practice — and what separates them from the broker chains that dominate the trade.',
    date: 'Q1 · 2026',
    variant: 'stone-red' as const,
  },
  {
    code: 'FN-006',
    category: 'PROCESS',
    title: 'Hand-picking: what we actually inspect.',
    excerpt: 'A short field guide to the inspection criteria — grain consistency, edge condition, surface uniformity, dimensional tolerance.',
    date: 'Q1 · 2026',
    variant: 'stone-warm' as const,
  },
]

export default function FieldNotesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="max-w-5xl">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">06 · FIELD NOTES</p>
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
            {NOTES.map((note, i) => (
              <RevealOnScroll key={note.code} delay={i * 80}>
                <article className="group">
                  <PlaceholderImage
                    variant={note.variant}
                    label={note.code}
                    title={note.category}
                    aspectRatio="aspect-[4/3]"
                    className="mb-6 transition-transform duration-600 ease-editorial group-hover:scale-[1.01]"
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <p className="font-mono text-xs text-quarry-gold no-justify">{note.category}</p>
                    <span className="text-tobacco/30">·</span>
                    <p className="font-mono text-xs text-tobacco/60 no-justify">{note.date}</p>
                  </div>
                  <h3 className="font-display text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors mb-3 leading-snug">
                    {note.title}
                  </h3>
                  <p className="font-sans text-sm text-graphite leading-relaxed mb-4">
                    {note.excerpt}
                  </p>
                  <p className="font-mono text-xs text-tobacco/40 no-justify">
                    Coming soon →
                  </p>
                </article>
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
