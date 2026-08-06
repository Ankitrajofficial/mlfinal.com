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
  // The catalogue carries no per-format plan sizes. crate_* below are
  // packing dimensions, NOT product dimensions — do not price off them.
  plan_length_mm: null,
  plan_width_mm: null,
  thicknesses_mm: null,
  // Derived, not read from f.varietyAvailability — that stored field is stale
  // (still 24 everywhere) and is superseded by varietyExceptions.
  variety_availability_count: VARIETIES.length - f.varietyExceptions.length,
  variety_exceptions: f.varietyExceptions,
  surfaces_available: f.surfacesAvailable,
  edges_available: f.edgesAvailable,
  crate_dimensions_packing_only: f.crateDimensions ?? '',
  crate_weight_packing_only: f.crateWeight ?? '',
  coverage_per_crate: f.coveragePerCrate ?? '',
  primary_use: f.primaryUse,
}))

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
  surface_defined_in_surfaces_file: boolean
}

const matrix: MatrixRow[] = []
for (const v of VARIETIES) {
  for (const f of activeFormats) {
    // Availability lives in the format data only (2026-08).
    if (
      f.varietyExceptions.includes(v.code) ||
      f.varietyExceptions.includes(v.slug)
    ) {
      continue
    }
    for (const surface of f.surfacesAvailable) {
      matrix.push({
        variety_code: v.code,
        variety_name: v.name,
        format_code: f.code,
        format_name: f.name,
        surface_code: surface,
        surface_defined_in_surfaces_file: surfaceCodes.has(surface),
      })
    }
  }
}

// ------------------------------------------------------------
// Integrity checks — combinations the site implies but cannot back
// ------------------------------------------------------------
const referencedSurfaces = new Set(activeFormats.flatMap((f) => f.surfacesAvailable))
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
    'Not in the catalogue. No per-format length/width is authored anywhere in lib/khadane. crate_* fields are packing dimensions only.',
  thicknesses_mm:
    'Not in the catalogue as structured data. Thickness appears only inside prose description fields.',
  stone_family:
    'No structured field. Derived here from the `formation` free text. stone_family_confidence=explicit means the rock name was written in the source; =inferred means it was taken from the named geological belt because the source omitted the rock name. Nothing in the catalogue is quartzite proper — the families present are sandstone, limestone and basalt.',
  product_family:
    'No structured field. Mapped by slug in this script, not authored in the catalogue.',
  availability_enforcement:
    'Enforced, and as of 2026-08 the rule lives in the data. Each format carries a varietyExceptions array of excluded variety codes; both the collection and format page components filter on it, so there is one source of truth. The 2 block-first varieties (KHD-A-02 Basalt Black, KHD-A-09 Teakwood) are excluded from 12 of 20 formats and produce only in the 8 block-derived or machine-cut ones, so those 12 formats offer 22 of 24 varieties. The stored varietyAvailability: 24 field is stale and unused — variety_availability_count above is derived from varietyExceptions instead. Variety x surface is NOT restricted at all: surfaces and edges are limited per format only, and nothing narrows them by variety.',
  held_surfaces:
    'Surfaces carry a `published` flag. 6 of 16 are held (published: false) — authored but attached to no format and not rendered on the site. They are exported so the catalogue stays complete; do not offer them for sale until they are attached to a format.',
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
    surfaces: surfaces.length,
    edges: edges.length,
    availability_rows: matrix.length,
  },
  gaps,
  integrity,
  varieties,
  formats,
  surfaces,
  edges,
  availability_matrix: matrix,
}

writeFileSync(join(OUT_DIR, 'catalogue.json'), JSON.stringify(bundle, null, 2))
writeFileSync(join(OUT_DIR, '1-varieties.csv'), csv(varieties))
writeFileSync(join(OUT_DIR, '2-formats.csv'), csv(formats))
writeFileSync(join(OUT_DIR, '3-surfaces.csv'), csv(surfaces))
writeFileSync(join(OUT_DIR, '4-edges.csv'), csv(edges))
writeFileSync(join(OUT_DIR, '6-availability-matrix.csv'), csv(matrix as unknown as Record<string, unknown>[]))

const readme = `# KHADANE catalogue export

Generated ${bundle.generated_at} by \`npx tsx scripts/export-catalogue.ts\`.
Source of truth: \`lib/khadane/{varieties,formats,surfaces,edges}.ts\`.

Quarry Blocks (KHF-019) excluded on request — 19 of 20 formats here.

| File | Contents |
| --- | --- |
| catalogue.json | Everything, including \`gaps\` and \`integrity\` |
| 1-varieties.csv | ${varieties.length} varieties |
| 2-formats.csv | ${formats.length} formats |
| 3-surfaces.csv | ${surfaces.length} surfaces |
| 4-edges.csv | ${edges.length} edges |
| 6-availability-matrix.csv | ${matrix.length} rows, expanded |

## Read before pricing off this

- **No plan dimensions, no thicknesses.** The catalogue does not carry them.
  \`crate_*\` columns are packing dimensions — not product sizes.
- **Availability IS enforced, from the data.** Each format carries
  \`variety_exceptions\`. Basalt Black and Teakwood are block-first and produce
  only in the 8 block-derived or machine-cut formats; the other 12 offer 22 of
  24 varieties. Surfaces and edges still vary by format only, never by variety.
- **Surfaces: 16 defined, 10 offered.** The 6 unattached finishes are now
  flagged \`published: false\` and no longer render on the site. They are
  exported for completeness — do not offer them for sale.
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
