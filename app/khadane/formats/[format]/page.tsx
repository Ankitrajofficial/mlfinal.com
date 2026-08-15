import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FORMATS, getFormat, getPrevFormat, getNextFormat } from '@/lib/khadane/formats'
import { VARIETIES } from '@/lib/khadane/varieties'
import RevealOnScroll from '@/components/khadane/RevealOnScroll'
import HeroWordRise from '@/components/khadane/HeroWordRise'
import PlaceholderImage from '@/components/khadane/PlaceholderImage'
import VisualReferenceSet, { type ReferenceSlot } from '@/components/khadane/VisualReferenceSet'
import BrandWhisper from '@/components/khadane/BrandWhisper'

export function generateStaticParams() {
  return FORMATS.map((f) => ({ format: f.slug }))
}

type FormatPageProps = {
  params: Promise<{ format: string }>
}

export async function generateMetadata({ params }: FormatPageProps) {
  const { format } = await params
  const f = getFormat(format)
  if (!f) return { title: 'Not found' }
  return {
    title: `${f.name} — ${f.code}`,
    description: f.description,
  }
}

export default async function FormatPage({ params }: FormatPageProps) {
  const { format } = await params
  const f = getFormat(format)
  if (!f) notFound()

  const prev = getPrevFormat(f.rank)
  const next = getNextFormat(f.rank)

  const formatVariant = f.placeholderClass.replace('placeholder-', '') as ReferenceSlot['variant']
  // Formats carry a single hero photo — show it as the lead frame and fill the
  // rest with branded placeholders, mirroring the stone "Visual reference set".
  const referenceSlots: ReferenceSlot[] = [
    {
      label: 'FORMAT',
      title: `${f.name} · Worked`,
      spec: `Documentary · ${f.name} in production or completed installation.`,
      swapPath: `/img/formats/${f.slug}-hero.jpg`,
      aspectRatio: 'aspect-[4/3]',
      variant: formatVariant,
      fallbackToPlaceholder: true,
    },
    {
      label: 'SURFACE',
      title: `${f.name} · Surface`,
      spec: 'Macro texture of the worked face and finish.',
      swapPath: `/img/formats/${f.slug}-surface.jpg`,
      aspectRatio: 'aspect-[4/3]',
      variant: formatVariant,
      fallbackToPlaceholder: true,
    },
    {
      label: 'EDGE',
      title: `${f.name} · Edge profile`,
      spec: 'Thickness, edge finish, and dressed profile.',
      swapPath: `/img/formats/${f.slug}-edge.jpg`,
      aspectRatio: 'aspect-[4/3]',
      variant: formatVariant,
      fallbackToPlaceholder: true,
    },
    {
      label: 'INSTALL',
      title: `${f.name} · Installed`,
      spec: 'Completed installation in a project context.',
      aspectRatio: 'aspect-[4/3]',
      variant: 'yard',
      fallbackToPlaceholder: true,
    },
    {
      label: 'DISPATCH',
      title: `${f.name} · Packed for dispatch`,
      spec: 'Crated, strapped, and stacked for export.',
      aspectRatio: 'aspect-[16/10]',
      variant: 'belt',
      fallbackToPlaceholder: true,
    },
  ]

  // Available varieties. Patch v2.1 emptied varietyExceptions everywhere —
  // availability is not a supply constraint, the estate holds all of it. The
  // allied varieties patch then put back exactly one, and it is physics rather
  // than stock: Roofing cannot be made in Basalt Black or Teakwood. The filter
  // stays so the data keeps deciding rather than the component.
  const availableVarieties = VARIETIES.filter(
    (v) => !f.varietyExceptions.includes(v.code),
  )

  // Only regular sizes render. Bespoke stays off the page and on enquiry.
  const regularSizes = (f.sizes ?? []).filter((s) => s.regular)
  // Sub-lines within the format — tread / riser, upright / flat-laid. Formats
  // with a single ungrouped size list come through as one unlabelled group.
  const sizeGroups = regularSizes.reduce<{ group: string | null; sizes: typeof regularSizes }[]>(
    (acc, size) => {
      const group = size.group ?? null
      const last = acc[acc.length - 1]
      if (last && last.group === group) last.sizes.push(size)
      else acc.push({ group, sizes: [size] })
      return acc
    },
    [],
  )

  const soldBy = [f.unit, ...(f.alsoUnits ?? [])].filter(Boolean).join(' · ')

  const specRows = [
    { label: 'Code', value: f.code },
    { label: 'Primary use', value: f.primaryUse },
    { label: 'Variety availability', value: `${availableVarieties.length} of ${VARIETIES.length} varieties` },
    ...(soldBy ? [{ label: 'Sold by', value: soldBy }] : []),
    // Standing production and made-to-order are not the same offer and are
    // not shown as one (patch v2.1).
    { label: 'Surfaces in standing production', value: f.surfacesRegular.join(', ') || 'None — every finish worked to order' },
    { label: 'Surfaces worked to order', value: f.surfacesAvailable.join(', ') || 'On enquiry' },
    { label: 'Edges available', value: f.edgesAvailable.join(', ') || 'On enquiry' },
    ...(f.productionRoutes?.length
      ? [{ label: 'Production route', value: f.productionRoutes.join(' · ') }]
      : []),
  ]

  return (
    <>
      {/* Section 01 — Hero */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <p className="eyebrow-gold mb-6 no-justify">{f.code} · FORMAT</p>
              </div>
              <HeroWordRise
                as="h1"
                words={[f.name + '.']}
                className="font-display text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] text-obsidian mb-8"
                baseDelay={200}
                staggerDelay={130}
              />
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '900ms' }}>
                <p className="font-display italic text-2xl text-quarry-gold mb-10 no-justify max-w-xl">
                  {f.formatHeadline}
                </p>
                <p className="editorial-body max-w-xl mb-10">
                  {f.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/khadane/desk" className="cta-primary no-justify">
                    Quote for {f.name}
                  </Link>
                  <Link href="/khadane/formats" className="cta-secondary no-justify">
                    All formats
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <PlaceholderImage
                variant={f.placeholderClass.replace('placeholder-', '') as any}
                label={f.code}
                title={f.name}
                spec={`Documentary · ${f.name} in production or completed installation`}
                swapPath={`/img/formats/${f.slug}-hero.jpg`}
                aspectRatio="aspect-[4/5]"
                fallbackToPlaceholder
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 — Spec */}
      <section className="section-padding section-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">FORMAT SPEC</p>
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight leading-tight text-obsidian no-justify mb-6">
                  What you should know.
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-obsidian/10">
                {specRows.map((row, i, arr) => (
                  <RevealOnScroll
                    key={row.label}
                    delay={i * 50}
                    className={`h-full ${
                      i === arr.length - 1 && arr.length % 2 === 1 ? 'md:col-span-2' : ''
                    }`}
                  >
                    <div className="h-full bg-warm-white p-6 lg:p-8">
                      <p className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 no-justify mb-2">
                        {row.label}
                      </p>
                      <p className="font-display text-lg lg:text-xl text-obsidian no-justify">
                        {row.value}
                      </p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02a — Sizes. Every format shows a size table or says why it
          has none. Thickness is stated per size, never per format. */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">SIZES</p>
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight leading-tight text-obsidian no-justify mb-6">
                  {sizeGroups.length > 0 ? 'Cut to these sizes.' : 'Cut to specification.'}
                </h2>
                {f.sizeBasis && (
                  <p className="editorial-body">{f.sizeBasis}</p>
                )}
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-8">
              {sizeGroups.length > 0 ? (
                <div className="space-y-8">
                  {sizeGroups.map((group, gi) => (
                    <RevealOnScroll key={group.group ?? `group-${gi}`} delay={gi * 50}>
                      {group.group && (
                        <p className="font-mono text-xs uppercase tracking-eyebrow text-quarry-gold no-justify mb-3">
                          {group.group}
                        </p>
                      )}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-obsidian/20">
                              <th className="text-left font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 no-justify py-3 pr-6">Size (mm)</th>
                              <th className="text-left font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 no-justify py-3 pr-6">Thickness (mm)</th>
                              <th className="text-left font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 no-justify py-3">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.sizes.map((size) => (
                              <tr key={`${group.group ?? ''}-${size.code}`} className="border-b border-obsidian/10">
                                <td className="font-display text-lg text-obsidian no-justify py-3 pr-6 whitespace-nowrap">
                                  {size.code}
                                </td>
                                <td className="font-sans text-sm text-tobacco no-justify py-3 pr-6 whitespace-nowrap">
                                  {size.thicknessesMm.length > 0 ? size.thicknessesMm.join(', ') : 'Per drawing'}
                                </td>
                                <td className="font-sans text-sm text-tobacco/80 no-justify py-3">
                                  {[
                                    size.calibrated ? 'Calibrated' : null,
                                    size.market && size.market !== 'special' ? `${size.market} size` : null,
                                    size.note ?? null,
                                  ]
                                    .filter(Boolean)
                                    .join(' · ') || '—'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </RevealOnScroll>
                  ))}
                  {f.sizeNote && (
                    <RevealOnScroll>
                      <p className="font-sans text-sm text-tobacco/80 no-justify">{f.sizeNote}</p>
                    </RevealOnScroll>
                  )}
                </div>
              ) : (
                <RevealOnScroll>
                  <p className="editorial-body mb-6">
                    {f.sizeNote ??
                      (f.sizeBasis
                        ? 'Tell us the specification and the quote comes back against it.'
                        : 'Sizes are set per order. Tell us the specification and the quote comes back against it.')}
                  </p>
                </RevealOnScroll>
              )}

              {f.thicknessesMm && f.thicknessesMm.length > 0 && sizeGroups.length === 0 && (
                <RevealOnScroll delay={100}>
                  <div className="mt-8 bg-warm-white p-6 lg:p-8">
                    <p className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 no-justify mb-2">
                      Thicknesses (mm)
                    </p>
                    <p className="font-display text-lg lg:text-xl text-obsidian no-justify">
                      {f.thicknessesMm.join(', ')}
                    </p>
                  </div>
                </RevealOnScroll>
              )}

              {f.specDetails && f.specDetails.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-obsidian/10">
                  {f.specDetails.map((detail, i) => (
                    <RevealOnScroll key={detail.label} delay={i * 40} className="h-full">
                      <div className="h-full bg-warm-white p-6">
                        <p className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 no-justify mb-2">
                          {detail.label}
                        </p>
                        <p className="font-sans text-sm text-obsidian no-justify">{detail.value}</p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 02b — Visual reference set */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="eyebrow-gold mb-6 no-justify">IMAGE SET</p>
                <h2 className="section-heading mb-6">
                  Visual reference
                  <span className="block italic text-quarry-gold">set.</span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <p className="editorial-body">
                  Five compact frames cover the worked format, its surface, edge profile, a completed installation, and how it is packed for dispatch.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <VisualReferenceSet slots={referenceSlots} />
        </div>
      </section>

      {/* Section 03 — Available varieties */}
      <section className="section-padding section-warm">
        <div className="container-editorial">
          <div className="mb-12 max-w-3xl">
            <RevealOnScroll>
              <p className="eyebrow-gold mb-6 no-justify">AVAILABLE IN</p>
              <h2 className="section-heading">
                {availableVarieties.length} {availableVarieties.length === 1 ? 'variety' : 'varieties'}
                <span className="block italic text-quarry-gold">produce in {f.name}.</span>
              </h2>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableVarieties.map((v, i) => (
              <RevealOnScroll key={v.slug} delay={Math.min(i * 30, 400)}>
                <Link href={`/khadane/collection/${v.slug}`} className="block p-5 bg-stone-linen/40 hover:bg-stone-linen transition-colors group">
                  <p className="font-mono text-xs text-quarry-gold no-justify mb-2">{v.code}</p>
                  <p className="font-display text-lg text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                    {v.name}
                  </p>
                  <p className="font-mono text-[10px] text-tobacco/50 mt-1 no-justify">{v.tierLabel}</p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04 — Quote CTA */}
      <section className="section-padding section-dark">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <RevealOnScroll>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-warm-white mb-10 no-justify">
                Need {f.name}
                <span className="block italic text-quarry-gold">for a project?</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-sans text-lg text-warm-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
                Tell us the variety, surface, size, and volume. Quote returned within one business day.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <Link href="/khadane/desk" className="inline-flex items-center gap-3 px-10 py-5 bg-quarry-gold text-obsidian font-sans text-sm tracking-wider uppercase hover:bg-warm-white transition-all duration-400 ease-editorial no-justify">
                Quote for {f.name} →
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Section 05 — Prev/Next */}
      <section className="section-warm border-t border-obsidian/10">
        <div className="container-editorial py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-4">
            <Link href={`/khadane/formats/${prev.slug}`} className="group block">
              <p className="font-mono text-xs text-tobacco/60 mb-2 no-justify">← PREVIOUS · {prev.code}</p>
              <p className="font-display text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                {prev.name}
              </p>
            </Link>
            <Link href={`/khadane/formats/${next.slug}`} className="group block text-right">
              <p className="font-mono text-xs text-tobacco/60 mb-2 no-justify">NEXT · {next.code} →</p>
              <p className="font-display text-2xl text-obsidian no-justify group-hover:text-quarry-gold transition-colors">
                {next.name}
              </p>
            </Link>
          </div>
        </div>
      </section>

      <BrandWhisper customLine={`${f.name} · ${f.code}`} />
    </>
  )
}
