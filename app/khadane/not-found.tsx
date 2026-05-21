import Link from 'next/link'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export default function NotFound() {
  return (
    <>
      <section className="section-padding section-warm">
        <div className="container-editorial max-w-2xl mx-auto text-center">
          <p className="eyebrow-gold mb-8 no-justify">ERROR 404</p>
          <h1 className="font-display text-6xl md:text-8xl tracking-tighter text-obsidian no-justify mb-8">
            Off the path.
          </h1>
          <p className="font-display italic text-2xl text-quarry-gold no-justify mb-12">
            This page is not in the catalogue.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="cta-primary no-justify">Back to the homepage →</Link>
            <Link href="/khadane/collection" className="cta-secondary no-justify">Browse the collection</Link>
          </div>
        </div>
      </section>
      <BrandWhisper />
    </>
  )
}
