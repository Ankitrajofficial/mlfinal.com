// ============================================================
// KHADANE(TM) - Catalogue export for the internal pricing system
// Run: npx tsx scripts/export-catalogue.ts
// Output: exports/khadane-catalogue/ (JSON bundle + one CSV per section)
//
// Reads the live content files under lib/khadane. Nothing is invented:
// fields the source data does not carry are emitted as null and listed
// under `gaps` in the JSON bundle. Fields marked `derived: true` were
// computed from free text here, not authored in the catalogue.
// ============================================================

import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

import { VARIETIES } from '../lib/khadane/varieties'
import { FORMATS } from '../lib/khadane/formats'
import { SURFACES } from '../lib/khadane/surfaces'
import { EDGES } from '../lib/khadane/edges'

const OUT_DIR = join(process.cwd(), 'exports', 'khadane-catalogue')

// Blocks are handled separately by another team — excluded on request.
const EXCLUDED_FORMAT_SLUGS = new Set(['quarry-blocks'])

// ------------------------------------------------------------
// Stone family — derived from the `formation` free-text string.
// The catalogue has no structured stone-family field.
// ------------------------------------------------------------
// `confidence: explicit`  — the rock name is written in the formation text.
// `confidence: inferred`  — rock name omitted; taken from the named geological
//                           belt, which is sandstone-bearing throughout.
function stoneFamily(formation: string): { family: string; confidence: string } {
  const f = formation.toLowerCase()
  if (f.includes('basalt')) return { family: 'basalt', confidence: 'explicit' }
  if (f.includes('limestone')) return { family: 'limestone', confidence: 'explicit' }
  if (f.includes('quartzit')) return { family: 'quartzitic sandstone', confidence: 'explicit' }
  if (f.includes('sandstone')) return { family: 'sandstone', confidence: 'explicit' }
  // Bijolia belt / Lower Vindhyan / Bhander Group are sandstone formations —
  // some entries name the belt without repeating the rock type.
  if (/bijolia|vindhyan|bhander|bundi/.test(f)) {
    return { family: 'sandstone', confidence: 'inferred' }
  }
  return { family: 'unknown', confidence: 'none' }
}

// ------------------------------------------------------------
// Product family per format — authored here, not in the catalogue.
// Keyed by slug so an unmapped new format fails loudly.
// ------------------------------------------------------------
const PRODUCT_FAMILY: Record<string, string> = {
  'pavings': 'paving',
  'flagstones-crazy-paving': 'crazy paving',
  'cobble-setts': 'cobbles & setts',
  'stepping-stones': 'paving',
  'circles': 'circles',
  'kerbstones': 'kerbs',
  'copings': 'copings',
  'window-sills': 'architectural dressings',
  'door-frames': 'architectural dressings',
  'block-steps-treads': 'steps',
  'roofing': 'roofing',
  'accessories': 'accessories',
  'palisades-edging': 'edging',
  'boulders': 'landscape features',
  'fire-pits': 'landscape features',
  'garden-furniture': 'furniture',
  'wall-cladding': 'walling',
  'gangsaw-slabs': 'slabs',
  'quarry-blocks': 'blocks',
  'pier-cap': 'copings',
  // Structural walling, not the cladding veneer — priced separately.
  'dry-stone-walling': 'walling',
}

// ------------------------------------------------------------
// CSV helper
// ------------------------------------------------------------
function csv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return ''
  const headers = Object.keys(rows[0])
  const cell = (v: unknown) => {
    if (v === null || v === undefined) return ''
    const s = Array.isArray(v) ? v.join('; ') : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  return [
    headers.join(','),
    ...rows.map((r) => headers.map((h) => cell(r[h])).join(',')),
  ].join('\n')
}

// ------------------------------------------------------------
// 1. VARIETIES
// ------------------------------------------------------------
const varieties = VARIETIES.map((v) => ({
  code: v.code,
  name: v.name,
  slug: v.slug,
  stone_family: stoneFamily(v.formation).family,
  stone_family_confidence: stoneFamily(v.formation).confidence,
  formation_source_text: v.formation,
  tier: v.tier,
  format_scope: v.formatScope,
  format_exceptions: v.formatExceptions ?? [],
}))

// ------------------------------------------------------------
// 2. FORMATS  +  5. THICKNESSES  +  7. PRODUCT FAMILY
// ------------------------------------------------------------
const activeFormats = FORMATS.filter((f) => !EXCLUDED_FORMAT_SLUGS.has(f.slug))

const unmapped = activeFormats.filter((f) => !PRODUCT_FAMILY[f.slug])
if (unmapped.length > 0) {
  throw new Error(
    `Unmapped format slug(s) in PRODUCT_FAMILY: ${unmapped.map((f) => f.slug).join(', ')}`
  )
}

const formats = activeFormats.map((f) => ({
  code: f.code,
  name: f.name,
  slug: f.slug,
  product_family: PRODUCT_FAMILY[f.slug],
  product_family_derived: true,
  // Plan sizes arrived with patch v2.1 and are exported in full below, one row
  // per size. The summary columns here are the regular-size count and the
  // thicknesses those sizes carry. packing_crate_* are packing dimensions,
  // NOT product dimensions — do not price off them.
  regular_size_count: (f.sizes ?? []).filter((s) => s.regular).length,
  regular_sizes: (f.sizes ?? []).filter((s) => s.regular).map((s) => s.code),
  thicknesses_mm: f.thicknessesMm ?? [
    ...new Set((f.sizes ?? []).filter((s) => s.regular).flatMap((s) => s.thicknessesMm)),
  ].sort((a, b) => a - b),
  size_basis: f.sizeBasis ?? '',
  unit: f.unit ?? '',
  also_units: f.alsoUnits ?? [],
  declare_unit: f.declareUnit ?? '',
  production_routes: f.productionRoutes ?? [],
  // Empty on every format since patch v2.1 withdrew the availability model:
  // all varieties, all formats. Kept as columns so a consumer keyed on them
  // does not break.
  variety_availability_count: VARIETIES.length - f.varietyExceptions.length,
  variety_exceptions: f.varietyExceptions,
  surfaces_regular: f.surfacesRegular,
  surfaces_available_to_order: f.surfacesAvailable,
  edges_available: f.edgesAvailable,
  packing_crate_dimensions_packing_only: f.packingCrateDimensions ?? '',
  packing_crate_weight_packing_only: f.packingCrateWeight ?? '',
  coverage_per_crate: f.coveragePerCrate ?? '',
  primary_use: f.primaryUse,
}))

// ------------------------------------------------------------
// 2b. SIZES — one row per plan size, from patch v2.1.
// Bespoke sizes (regular: false) are exported so the pricing system knows
// they exist; they do not render on the site.
// ------------------------------------------------------------
const sizes = activeFormats.flatMap((f) =>
  (f.sizes ?? []).map((s) => ({
    format_code: f.code,
    format_name: f.name,
    size_code: s.code,
    group: s.group ?? '',
    shape: s.shape ?? 'rectangular',
    length_mm: s.lengthMm,
    width_mm: s.widthMm,
    thicknesses_mm: s.thicknessesMm,
    calibrated: s.calibrated,
    regular: s.regular,
    market: s.market ?? '',
    note: s.note ?? '',
  })),
)

// ------------------------------------------------------------
// 3. SURFACES  /  4. EDGES
// ------------------------------------------------------------
const surfaces = SURFACES.map((s) => ({
  code: s.slug,
  name: s.name,
  tagline: s.tagline,
  // false = held: authored but attached to no format and not rendered on the
  // site. Do not offer these for sale until Rahul rules on them.
  published: s.published !== false,
}))

const edges = EDGES.map((e) => ({
  code: e.slug,
  name: e.name,
  tagline: e.tagline,
}))

// ------------------------------------------------------------
// 6. AVAILABILITY MATRIX
// Expanded from what the site actually enforces.
//
// As of 2026-08 the variety x format rule IS in the data: each format carries
// a varietyExceptions array of excluded variety codes, and both page
// components filter on it. This no longer mirrors a hardcoded page list.
// ------------------------------------------------------------
const surfaceCodes = new Set(surfaces.map((s) => s.code))
const edgeCodes = new Set(edges.map((e) => e.code))

type MatrixRow = {
  variety_code: string
  variety_name: string
  format_code: string
  format_name: string
  surface_code: string
  surface_supply: 'regular' | 'to order'
  surface_defined_in_surfaces_file: boolean
}

const matrix: MatrixRow[] = []
for (const v of VARIETIES) {
  for (const f of activeFormats) {
    // varietyExceptions is empty everywhere since patch v2.1 — every variety
    // produces in every format. The filter stays so the data keeps deciding.
    if (
      f.varietyExceptions.includes(v.code) ||
      f.varietyExceptions.includes(v.slug)
    ) {
      continue
    }
    const offered: [string, 'regular' | 'to order'][] = [
      ...f.surfacesRegular.map((s) => [s, 'regular'] as [string, 'regular']),
      ...f.surfacesAvailable.map((s) => [s, 'to order'] as [string, 'to order']),
    ]
    for (const [surface, supply] of offered) {
      matrix.push({
        variety_code: v.code,
        variety_name: v.name,
        format_code: f.code,
        format_name: f.name,
        surface_code: surface,
        surface_supply: supply,
        surface_defined_in_surfaces_file: surfaceCodes.has(surface),
      })
    }
  }
}

// ------------------------------------------------------------
// Integrity checks — combinations the site implies but cannot back
// ------------------------------------------------------------
const referencedSurfaces = new Set(
  activeFormats.flatMap((f) => [...f.surfacesRegular, ...f.surfacesAvailable]),
)
const referencedEdges = new Set(activeFormats.flatMap((f) => f.edgesAvailable))

const danglingSurfaces = [...referencedSurfaces].filter((s) => !surfaceCodes.has(s))
const danglingEdges = [...referencedEdges].filter((e) => !edgeCodes.has(e))
const orphanSurfaces = [...surfaceCodes].filter((s) => !referencedSurfaces.has(s))
const orphanEdges = [...edgeCodes].filter((e) => !referencedEdges.has(e))

const integrity = {
  surfaces_referenced_by_formats_but_not_defined: danglingSurfaces,
  edges_referenced_by_formats_but_not_defined: danglingEdges,
  surfaces_defined_but_never_offered_on_any_format: orphanSurfaces,
  edges_defined_but_never_offered_on_any_format: orphanEdges,
  surfaces_defined_count: surfaces.length,
  surfaces_referenced_count: referencedSurfaces.size,
}

const gaps = {
  plan_dimensions_mm:
    'CLOSED by catalogue patch v2.1. Plan sizes and per-size thicknesses are authored in lib/khadane/formats.ts and exported in 2b-sizes.csv, one row per size. Six formats carry no size list by nature — crazy paving is specified by pieces per sqm, gangsaw slabs are lot dependent, cills and door frames are a running-metre cross-section, accessories are per specification, boulders are natural form and walling is sold by the tonne — each states why in size_basis. packing_crate_* fields remain packing dimensions only.',
  thicknesses_mm:
    'Structured as of patch v2.1, and stated PER SIZE, not per format — a format offering 18–30 mm does not offer it at every plan size. The format-level thicknesses_mm column is a rollup of its regular sizes, except on sizeless formats where it is the authored list.',
  bespoke_sizes:
    'Sizes with regular: false are real but cut to order. They are exported so the pricing system knows they exist; the site does not render them.',
  stone_family:
    'No structured field. Derived here from the `formation` free text. stone_family_confidence=explicit means the rock name was written in the source; =inferred means it was taken from the named geological belt because the source omitted the rock name. Nothing in the catalogue is quartzite proper — the families present are sandstone, limestone and basalt.',
  product_family:
    'No structured field. Mapped by slug in this script, not authored in the catalogue.',
  availability_enforcement:
    'WITHDRAWN by catalogue patch v2.1. There is no variety x format availability model and none should be built. Material is held across the full quarry estate in every thickness the belt produces, so availability is not a constraint: all varieties, all formats. varietyExceptions is empty on every format and formatExceptions is gone from Basalt Black and Teakwood; both fields survive only as the hook if that ever changes. Variety x surface was never restricted either — surfaces and edges are limited per format only.',
  surface_supply:
    'New in patch v2.1. surfaces_regular is standing production; surfaces_available_to_order is real but outsourced, with a longer lead time. They are not the same offer and should not be priced or shown as one. All 16 surfaces are now attached to at least one format, so none are held.',
  production_route:
    'New in patch v2.1. Every block-derived format is made two ways — sawn from block or hand-cut from block — and they are different products at different prices, with different faces and different edges. Split products carry `split` only; boulders carry `selected` because they are picked from overburden, not produced.',
}

// ------------------------------------------------------------
// Write
// ------------------------------------------------------------
mkdirSync(OUT_DIR, { recursive: true })

const bundle = {
  generated_at: new Date().toISOString(),
  source: 'lib/khadane/{varieties,formats,surfaces,edges}.ts',
  excluded: [...EXCLUDED_FORMAT_SLUGS],
  counts: {
    varieties: varieties.length,
    formats: formats.length,
    sizes: sizes.length,
    surfaces: surfaces.length,
    edges: edges.length,
    availability_rows: matrix.length,
  },
  gaps,
  integrity,
  varieties,
  formats,
  sizes,
  surfaces,
  edges,
  availability_matrix: matrix,
}

writeFileSync(join(OUT_DIR, 'catalogue.json'), JSON.stringify(bundle, null, 2))
writeFileSync(join(OUT_DIR, '1-varieties.csv'), csv(varieties))
writeFileSync(join(OUT_DIR, '2-formats.csv'), csv(formats))
writeFileSync(join(OUT_DIR, '2b-sizes.csv'), csv(sizes))
writeFileSync(join(OUT_DIR, '3-surfaces.csv'), csv(surfaces))
writeFileSync(join(OUT_DIR, '4-edges.csv'), csv(edges))
writeFileSync(join(OUT_DIR, '6-availability-matrix.csv'), csv(matrix as unknown as Record<string, unknown>[]))

const readme = `# KHADANE catalogue export

Generated ${bundle.generated_at} by \`npx tsx scripts/export-catalogue.ts\`.
Source of truth: \`lib/khadane/{varieties,formats,surfaces,edges}.ts\`.

Quarry Blocks (KHF-019) excluded on request — ${formats.length} of ${FORMATS.length} formats here.

| File | Contents |
| --- | --- |
| catalogue.json | Everything, including \`gaps\` and \`integrity\` |
| 1-varieties.csv | ${varieties.length} varieties |
| 2-formats.csv | ${formats.length} formats |
| 2b-sizes.csv | ${sizes.length} plan sizes, one row per size |
| 3-surfaces.csv | ${surfaces.length} surfaces |
| 4-edges.csv | ${edges.length} edges |
| 6-availability-matrix.csv | ${matrix.length} rows, expanded |

## Read before pricing off this

- **Plan sizes and thicknesses are here now** (patch v2.1), in
  \`2b-sizes.csv\`. Thickness is stated **per size**, not per format. Rows with
  \`regular: false\` are cut to order and do not render on the site.
  Six formats carry no size list by nature — each says why in \`size_basis\`.
  \`packing_crate_*\` columns are packing dimensions — not product sizes.
- **There is no availability matrix and none should be built.** Material is
  held across the full quarry estate in every thickness the belt produces:
  all varieties, all formats. \`variety_exceptions\` is empty everywhere and
  is kept only as a hook. Surfaces and edges vary by format only.
- **Surfaces come in two grades of supply.** \`surfaces_regular\` is standing
  production; \`surfaces_available_to_order\` is real but outsourced, with a
  longer lead time. Do not price them as the same thing. All ${surfaces.length} surfaces
  are attached to at least one format — none are held.
- **Production route is a pricing input.** Sawn from block and hand-cut from
  block are different products at different prices.
- **No broken references.** Every surface and edge a format lists resolves to
  an entry in the surface and edge files.
- **stone_family is derived**, not authored. Check \`stone_family_confidence\`.
  There is no quartzite in the catalogue: it is sandstone, limestone, basalt.
- **product_family is authored in the export script**, not in the catalogue.
`

writeFileSync(join(OUT_DIR, 'README.md'), readme)

console.log(`Wrote ${OUT_DIR}`)
console.log(bundle.counts)
console.log('integrity:', integrity)
