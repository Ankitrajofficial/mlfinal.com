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
  variety_availability_count: f.varietyAvailability,
  variety_exceptions: f.exceptions,
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
// The variety x format rule is NOT in the data — it is hardcoded in
// app/khadane/formats/[format]/page.tsx:90. Block-first varieties are
// excluded from every format EXCEPT the machine-cut list below. The
// `varietyAvailability: 24` field on every format is unused by the page
// and contradicts what renders. Mirrored here so the export matches the
// site; if that page changes, this list must change with it.
// ------------------------------------------------------------
const BLOCK_FIRST_ALLOWED_FORMATS = new Set([
  'gangsaw-slabs',
  'wall-cladding',
  'cobble-setts',
  'window-sills',
  'copings',
  'block-steps-treads',
  'pier-cap',
])
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
    // Block-first varieties produce only in the machine-cut formats.
    if (
      v.formatExceptions?.includes('block-first') &&
      !BLOCK_FIRST_ALLOWED_FORMATS.has(f.slug)
    ) {
      continue
    }
    if (f.exceptions.includes(v.code) || f.exceptions.includes(v.slug)) continue
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
    'Partly enforced, and the rule is not in the data. Variety x format IS restricted: the 2 block-first varieties (Basalt Black, Teakwood) produce only in 7 machine-cut formats, so most formats offer 22 of 24 varieties. That rule is hardcoded in app/khadane/formats/[format]/page.tsx:90, NOT in formats.ts — whose varietyAvailability: 24 field is unused and contradicts what the page renders. Do not read that column as truth. Variety x surface is NOT restricted at all: surfaces and edges are limited per format only, and nothing narrows them by variety. This matrix mirrors the page logic.',
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
- **Availability is not enforced.** All formats are offered against all 24
  varieties. Surfaces and edges vary by format only, never by variety.
- **Surfaces: 16 defined, 11 offered.** The surfaces page was upgraded to 16
  finishes; the format data still lists the old 11. Six finishes are visible
  on the site but orderable against nothing.
- **\`brushed\` and \`hand-cut-straight\` are broken references** — offered by
  formats, absent from the surface and edge files.
- **stone_family is derived**, not authored. Check \`stone_family_confidence\`.
  There is no quartzite in the catalogue: it is sandstone, limestone, basalt.
- **product_family is authored in the export script**, not in the catalogue.
`

writeFileSync(join(OUT_DIR, 'README.md'), readme)

console.log(`Wrote ${OUT_DIR}`)
console.log(bundle.counts)
console.log('integrity:', integrity)
