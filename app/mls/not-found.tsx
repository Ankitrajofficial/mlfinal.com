import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-mls-cream min-h-[70vh] flex items-center">
      <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem] w-full">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
            404 · Not Found
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tighter leading-[1.05] text-mls-ink mb-8">
            The page you are looking for
            <span className="block italic text-mls-gold mt-2">is not here.</span>
          </h1>
          <p className="text-lg leading-relaxed text-mls-ink/80 mb-10 max-w-2xl">
            It may have moved, or the address may have been entered incorrectly. Use the navigation above, or return to the homepage.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-mls-ink text-mls-cream text-sm font-body tracking-wider uppercase hover:bg-mls-tobacco hover:gap-4 transition-all duration-400"
            >
              Return home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-mls-ink text-mls-ink text-sm font-body tracking-wider uppercase hover:bg-mls-ink hover:text-mls-cream hover:gap-4 transition-all duration-400"
            >
              Write to The Office
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
