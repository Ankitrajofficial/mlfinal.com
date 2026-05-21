import { GALLERY_ITEMS } from '@/lib/khadane/gallery'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import BrandWhisper from '@/components/khadane/BrandWhisper'
import Gallery from '@/components/khadane/Gallery'

export const metadata = {
  title: 'The Gallery — Stone, quarry, yard, installations',
  description: 'An editorial gallery of KHADANE™ — stone close-ups, the working quarry face, the yard, real installations, and stills from the Belt Film.',
}

export default function GalleryPage() {
  const stoneCount = GALLERY_ITEMS.filter((i) => i.category === 'stone').length
  const quarryCount = GALLERY_ITEMS.filter((i) => i.category === 'quarry').length
  const yardCount = GALLERY_ITEMS.filter((i) => i.category === 'yard').length
  const installationCount = GALLERY_ITEMS.filter((i) => i.category === 'installation').length
  const beltFilmCount = GALLERY_ITEMS.filter((i) => i.category === 'belt-film').length

  return (
    <>
      {/* Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="max-w-5xl">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="eyebrow-gold mb-8 no-justify">THE GALLERY</p>
            </div>
            <HeroWordRise
              as="h1"
              words={['Stone,', 'quarry,', 'yard,', 'in-situ.']}
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05] text-obsidian mb-10"
              baseDelay={250}
              staggerDelay={140}
            />
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1500ms' }}>
              <p className="font-display italic text-2xl md:text-3xl text-quarry-gold no-justify max-w-3xl mb-12">
                {GALLERY_ITEMS.length} frames. Five categories. One story.
              </p>
              <p className="editorial-body max-w-2xl">
                An editorial gallery of KHADANE™. The stone in close-up. The quarry where it sits in the ground. The yard where it becomes a shipment. The installations where it ends its journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category counts strip */}
      <section className="section-cream py-10 lg:py-14 border-y border-obsidian/8">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-obsidian/10 max-w-4xl mx-auto">
              {[
                { label: 'Stone', count: stoneCount },
                { label: 'Quarry', count: quarryCount },
                { label: 'Yard', count: yardCount },
                { label: 'Installations', count: installationCount },
                { label: 'Belt Film', count: beltFilmCount },
              ].map((cat) => (
                <div key={cat.label} className="bg-stone-linen/30 p-5 lg:p-6 text-center">
                  <p className="font-display text-3xl lg:text-4xl text-quarry-gold no-justify mb-2">
                    {String(cat.count).padStart(2, '0')}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tobacco no-justify">
                    {cat.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding section-warm">
        <Gallery />
      </section>

      {/* Brand whisper close */}
      <BrandWhisper customLine="From the quarry to the container, every frame is ours." />
    </>
  )
}
