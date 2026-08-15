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

  // "900x600" reads as a product code; "900 × 600" reads as a dimension.
  // Only touch codes that are purely digits and separators — Circles and
  // Boulders carry "1500 dia" and "900 round", which stay as written.
  const prettySize = (code: string) =>
    /^\d+(x\d+)+$/.test(code) ? code.split('x').join(' × ') : code

  // Thickness and calibration are stated per size, but on most formats every
  // size in a group carries the same value — Roofing repeats "22" twelve
  // times, Copings repeats one set eleven times. Anything uniform across the
  // group is hoisted out and said once; the table then carries only what
  // actually varies. Where nothing but the size varies, there is no table to
  // draw and the sizes render as a plain list.
  const describeGroup = (sizes: typeof regularSizes) => {
    const uniq = (xs: string[]) => [...new Set(xs)]
    const thicknessKeys = uniq(sizes.map((s) => s.thicknessesMm.join(',')))
    const calibrationKeys = uniq(sizes.map((s) => String(s.calibrated)))
    return {
      uniformThickness:
        thicknessKeys.length === 1 && sizes[0].thicknessesMm.length > 0
          ? sizes[0].thicknessesMm
          : null,
      uniformCalibrated: calibrationKeys.length === 1 ? sizes[0].calibrated : null,
    }
  }

  // Only 11 of the 104 standing sizes carry a note, so a Notes column is blank
  // on nine rows out of ten and reads as missing data rather than as nothing to
  // say. The note belongs to one size, so it sits with that size.
  const SizeCell = ({ size }: { size: (typeof regularSizes)[number] }) => (
    <>
      <span className="flex items-baseline gap-3">
        <span className="font-display text-lg text-obsidian no-justify tabular-nums lining-nums whitespace-nowrap">
          {prettySize(size.code)}
        </span>
        {size.market && size.market !== 'special' && (
          <span className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-quarry-gold">
            {size.market}
          </span>
        )}
      </span>
      {size.note && (
        <span className="block font-sans text-sm text-tobacco/70 no-justify mt-1 max-w-md">
          {size.note}
        </span>
      )}
    </>
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
            {/* Sticky so the heading stays with the table on the long size
                lists rather than scrolling away and leaving the column empty. */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <RevealOnScroll>
                <p className="eyebrow mb-6 no-justify">SIZES</p>
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight leading-tight text-obsidian no-justify mb-6">
                  {sizeGroups.length > 0 ? 'Cut to these sizes.' : 'Cut to specification.'}
                </h2>
                {f.sizeBasis && (
                  <p className="editorial-body">{f.sizeBasis}</p>
                )}
                {regularSizes.length > 0 && (
                  <p className="font-sans text-sm text-tobacco/70 no-justify mt-6">
                    {regularSizes.length} standing {regularSizes.length === 1 ? 'size' : 'sizes'}.
                    {' '}Anything else is cut to your drawing.
                  </p>
                )}
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-8">
              {sizeGroups.length > 0 ? (
                <div className="space-y-8">
                  {sizeGroups.map((group, gi) => {
                    const meta = describeGroup(group.sizes)
                    // A table earns its place only when something varies down
                    // the column. If thickness and calibration are constant and
                    // no size carries a note, the sizes are just a list.
                    // Thickness is the only thing that can still need a column;
                    // notes now ride along with their size.
                    const needsTable = !meta.uniformThickness
                    return (
                    <RevealOnScroll key={group.group ?? `group-${gi}`} delay={gi * 50}>
                      {group.group && (
                        <p className="font-mono text-xs uppercase tracking-eyebrow text-quarry-gold no-justify mb-3">
                          {group.group}
                        </p>
                      )}

                      {/* Whatever holds true for every size in the group, said
                          once here instead of repeated down a column. */}
                      {(meta.uniformThickness || meta.uniformCalibrated !== null) && (
                        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-obsidian/20 pb-4 mb-1">
                          {meta.uniformThickness && (
                            <p className="no-justify">
                              <span className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60">Thickness </span>
                              <span className="font-sans text-sm text-obsidian tabular-nums">
                                {meta.uniformThickness.join(', ')} mm
                              </span>
                            </p>
                          )}
                          {meta.uniformCalibrated !== null && (
                            <p className="no-justify">
                              <span className="font-mono text-xs uppercase tracking-eyebrow text-tobacco/60">Cut </span>
                              <span className="font-sans text-sm text-obsidian">
                                {meta.uniformCalibrated ? 'Calibrated' : 'Uncalibrated'}
                              </span>
                            </p>
                          )}
                        </div>
                      )}

                      {needsTable ? (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-obsidian/20">
                                <th className="text-left font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 no-justify py-3 pr-6">Size (mm)</th>
                                {!meta.uniformThickness && (
                                  <th className="text-left font-mono text-xs uppercase tracking-eyebrow text-tobacco/60 no-justify py-3 pr-6 align-top">Thickness (mm)</th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {group.sizes.map((size) => (
                                <tr key={`${group.group ?? ''}-${size.code}`} className="border-b border-obsidian/10">
                                  <td className="py-3 pr-6 align-top">
                                    <SizeCell size={size} />
                                  </td>
                                  {!meta.uniformThickness && (
                                    <td className="font-sans text-sm text-tobacco no-justify py-3 pr-6 whitespace-nowrap tabular-nums align-top">
                                      {size.thicknessesMm.length > 0 ? size.thicknessesMm.join(', ') : 'Per drawing'}
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        // Per-cell borders, not a 1px gap over a coloured
                        // container: a size count that does not divide by the
                        // column count would paint the leftover cells grey.
                        <ul className="grid grid-cols-2 sm:grid-cols-3 border-t border-l border-obsidian/10 mt-4">
                          {group.sizes.map((size) => (
                            <li
                              key={`${group.group ?? ''}-${size.code}`}
                              className="bg-warm-white px-4 py-4 border-r border-b border-obsidian/10"
                            >
                              <SizeCell size={size} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </RevealOnScroll>
                    )
                  })}
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

              {/* Dividers are drawn per cell, not as a 1px grid gap over a
                  coloured container. Eleven of the formats carry an odd number
                  of details, and the old approach painted the leftover cell as
                  an empty grey block. */}
              {f.specDetails && f.specDetails.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 border-t border-l border-obsidian/10">
                  {f.specDetails.map((detail, i) => (
                    <RevealOnScroll key={detail.label} delay={i * 40} className="h-full">
                      <div className="h-full bg-warm-white p-6 border-r border-b border-obsidian/10">
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
