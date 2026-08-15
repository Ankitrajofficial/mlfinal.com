// ============================================================
// KHADANE(TM) — Buyer asset export
// ------------------------------------------------------------
// Stages every image the site actually serves into a foldered
// tree with ORIGINAL filenames preserved, plus the mapping that
// makes the folder mean something.
//
//   npx tsx scripts/export-assets.ts
//
// Output: exports/khadane-assets/  (gitignored)
//
// Resolution is done by importing the site's own modules and
// calling getVarietyImage(), so the export cannot drift from
// what the pages render. Do not reimplement the slot logic here.
// ============================================================

import { copyFileSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'
import { execFileSync } from 'node:child_process'

import { VARIETIES } from '../lib/khadane/varieties'
import { FORMATS } from '../lib/khadane/formats'
import { SURFACES } from '../lib/khadane/surfaces'
import { EDGES } from '../lib/khadane/edges'
import { GALLERY_ITEMS } from '../lib/khadane/gallery'
import { getVarietyImage, hasVarietyImage } from '../lib/khadane/variety-images'

const ROOT = process.cwd()
const PUBLIC = join(ROOT, 'public')
const OUT = join(ROOT, 'exports', 'khadane-assets')

// ── Slot vocabulary ─────────────────────────────────────────
// The seven slots a variety page can fill. Labels are what the
// buyer-facing mapping shows; the raw slot name is kept too so
// the column can be joined back against the code.
const VARIETY_SLOTS = [
  ['hero', 'Hero'],
  ['thumb', 'Thumbnail'],
  ['slabFace', 'Slab face'],
  ['surfaceClose', 'Surface close-up'],
  ['edgeProfile', 'Edge profile'],
  ['workedFormat', 'Worked format'],
  ['sourceContext', 'Source context'],
] as const

type Row = {
  filename: string
  variety_code: string
  variety_name: string
  format_code: string
  format_name: string
  shot_type: string
  slot: string
  caption: string
  credit: string
  is_render: string
  pixel_width: string
  pixel_height: string
  print_width_in_at_300dpi: string
  source_path: string
  export_path: string
  note: string
}

// ── Shot notes lifted from the variety-images source comments ──
// Those comments are the only record of what each slot actually
// SHOWS — filenames lie (slate-grey has slots 1 and 3 crossed).
// Parse the comment that sits immediately above each slot key.
function parseSlotNotes(): Map<string, string> {
  const src = readFileSync(join(ROOT, 'lib/khadane/variety-images.ts'), 'utf8')
  const lines = src.split('\n')
  const notes = new Map<string, string>()
  let slug = ''
  let pending: string[] = []

  for (const line of lines) {
    const keyMatch = line.match(/^\s{2}'([a-z0-9-]+)':\s*[{(]/)
    if (keyMatch) {
      slug = keyMatch[1]
      pending = []
      continue
    }
    const comment = line.match(/^\s*\/\/\s?(.*)$/)
    if (comment) {
      pending.push(comment[1].trim())
      continue
    }
    const slotMatch = line.match(/^\s*(hero|thumb|slabFace|surfaceClose|edgeProfile|workedFormat|sourceContext)\s*:/)
    if (slotMatch && slug) {
      if (pending.length) notes.set(`${slug}::${slotMatch[1]}`, pending.join(' '))
      pending = []
      continue
    }
    if (line.trim() && !line.trim().startsWith('...')) pending = []
  }
  return notes
}

const SLOT_NOTES = parseSlotNotes()

// ── Pixel dimensions, via sips (macOS built-in; no dependency) ──
const dimCache = new Map<string, { w: number; h: number }>()
function dimensions(abs: string): { w: number; h: number } | null {
  if (dimCache.has(abs)) return dimCache.get(abs)!
  if (abs.endsWith('.svg')) return null
  try {
    const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', abs], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    const w = Number(out.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0)
    const h = Number(out.match(/pixelHeight:\s*(\d+)/)?.[1] ?? 0)
    if (!w || !h) return null
    const d = { w, h }
    dimCache.set(abs, d)
    return d
  } catch {
    return null
  }
}

const rows: Row[] = []
const flags: string[] = []

// dest path -> the web path it was copied from, so a second file wanting the
// same name can be told apart from the same file being staged twice.
const claimed = new Map<string, string>()

function stage(webPath: string, folder: string, meta: Partial<Row>) {
  const abs = join(PUBLIC, webPath.replace(/^\//, ''))
  if (!existsSync(abs)) {
    flags.push(`MISSING FILE · ${meta.variety_code || meta.format_code || ''} · referenced but not on disk: ${webPath}`)
    return
  }

  // Original filename preserved verbatim — the mapping is what carries
  // meaning, not the name. Renaming here would invalidate the client's
  // existing references.
  const filename = basename(abs)

  // Distinct varieties reuse identical slot filenames (five different
  // slab-face.jpg reach the gallery folder). Flattening them would silently
  // drop all but the first. Keep the filename and disambiguate with the
  // source's own parent directory instead.
  let relDir = folder
  let rel = join(relDir, filename)
  if (claimed.has(rel) && claimed.get(rel) !== webPath) {
    relDir = join(folder, basename(dirname(abs)))
    rel = join(relDir, filename)
    if (claimed.has(rel) && claimed.get(rel) !== webPath) {
      flags.push(`FILENAME COLLISION · ${rel} · ${claimed.get(rel)} vs ${webPath}`)
      return
    }
  }

  // Already staged this exact file here — nothing to do.
  if (claimed.get(rel) === webPath) return

  const destDir = join(OUT, relDir)
  mkdirSync(destDir, { recursive: true })
  copyFileSync(abs, join(destDir, filename))
  claimed.set(rel, webPath)

  const d = dimensions(abs)
  rows.push({
    filename,
    variety_code: '',
    variety_name: '',
    format_code: '',
    format_name: '',
    shot_type: '',
    slot: '',
    caption: '',
    // No photographer or rights field exists anywhere in the codebase.
    // Emitted empty on purpose — do not invent attribution.
    credit: '',
    is_render: '',
    pixel_width: d ? String(d.w) : '',
    pixel_height: d ? String(d.h) : '',
    print_width_in_at_300dpi: d ? (d.w / 300).toFixed(1) : '',
    source_path: webPath,
    export_path: rel,
    note: '',
    ...meta,
  })
}

// ── 1. Varieties ────────────────────────────────────────────
for (const v of VARIETIES) {
  const folder = join('by-variety', `${v.code}-${v.slug}`)

  for (const [slot, label] of VARIETY_SLOTS) {
    if (!hasVarietyImage(v.slug, slot)) continue

    const conventional = `/img/varieties/${v.slug}/${slot
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()}.jpg`
    const resolved = getVarietyImage(v.slug, slot, conventional)

    // Drive-hosted slots cannot be staged from here — record them in the
    // mapping with their Drive URL so the row is still usable.
    if (resolved.startsWith('http')) {
      // These IDs did not resolve via the Drive API when spot-checked
      // (2026-08-06). The page still renders an <img> at the URL, so a dead
      // ID shows as a broken image rather than falling back to a placeholder.
      flags.push(
        `DRIVE-HOSTED SLOT · ${v.code} ${v.name} · ${slot} · no local file; ` +
          `renders straight from Drive: ${resolved} — verify this still loads in a browser`,
      )
      rows.push({
        filename: '',
        variety_code: v.code,
        variety_name: v.name,
        format_code: '',
        format_name: '',
        shot_type: label,
        slot,
        caption: '',
        credit: '',
        is_render: '',
        pixel_width: '',
        pixel_height: '',
        print_width_in_at_300dpi: '',
        source_path: resolved,
        export_path: '',
        note: 'DRIVE-HOSTED — not staged; see Drive URL in source_path',
      })
      continue
    }

    const note = SLOT_NOTES.get(`${v.slug}::${slot}`) ?? ''
    const isRender = /\brender(ed|s)?\b/i.test(note)

    // The re-slug (2026-08) left asset folders on the old names. Record it
    // so nobody reads the path as the variety identity.
    //
    // Only meaningful for paths of the form /img/varieties/<slug>/<file>.
    // Hero and thumb often sit loose in /img/varieties/ with no subfolder at
    // all, and treating their filename as a folder name reports drift that
    // isn't there.
    const parts = resolved.split('/')
    const dirSlug = parts.length === 5 && resolved.startsWith('/img/varieties/') ? parts[3] : ''
    const strayFolder =
      dirSlug && dirSlug !== v.slug
        ? `asset folder is /${dirSlug}/, not /${v.slug}/ (2026-08 re-slug)`
        : ''

    if (strayFolder) {
      flags.push(`SLUG DRIFT · ${v.code} ${v.name} · ${slot} · ${strayFolder}`)
    }

    stage(resolved, folder, {
      variety_code: v.code,
      variety_name: v.name,
      shot_type: label,
      slot,
      is_render: isRender ? 'YES — CGI/visualisation, not photography' : 'no',
      note: [note, strayFolder].filter(Boolean).join(' | '),
    })
  }
}

// ── 2. Formats ──────────────────────────────────────────────
// Formats carry no image data at all; pages try these three paths by
// convention. Most formats have only the hero.
for (const f of FORMATS) {
  const folder = join('by-format', `${f.code}-${f.slug}`)
  const slots: Array<[string, string]> = [
    [`/img/formats/${f.slug}-hero.jpg`, 'Hero'],
    [`/img/formats/${f.slug}-surface.jpg`, 'Surface'],
    [`/img/formats/${f.slug}-edge.jpg`, 'Edge'],
  ]
  let found = 0
  for (const [path, label] of slots) {
    if (!existsSync(join(PUBLIC, path.replace(/^\//, '')))) continue
    found++
    stage(path, folder, {
      format_code: f.code,
      format_name: f.name,
      shot_type: label,
      slot: label.toLowerCase(),
    })
  }
  if (found === 0) flags.push(`NO IMAGERY · ${f.code} ${f.name} · no format shots exist`)
}

// ── 3. Surfaces and edges ───────────────────────────────────
for (const group of [
  { items: SURFACES, kind: 'surface' },
  { items: EDGES, kind: 'edge' },
]) {
  for (const fin of group.items) {
    const folder = join(`by-${group.kind}`, fin.slug)
    const held = (fin as { published?: boolean }).published === false
    if (fin.heroJpg) {
      stage(fin.heroJpg, folder, {
        shot_type: `${group.kind === 'surface' ? 'Surface' : 'Edge'} hero — ${fin.name}`,
        slot: 'hero',
        note: held ? 'HELD — published: false, does not render on the site' : '',
      })
    }
    for (const img of fin.images ?? []) {
      if (!img.jpg) continue
      stage(img.jpg, folder, {
        shot_type: `${fin.name} on ${img.variety || 'unspecified'}`,
        slot: 'sample',
        note: held ? 'HELD — published: false, does not render on the site' : '',
      })
    }
  }
}

// ── 4. Gallery ──────────────────────────────────────────────
// The only place real captions exist.
for (const g of GALLERY_ITEMS) {
  const v = VARIETIES.find((x) => x.code === g.varietyCode)
  stage(g.swapPath, join('by-gallery', g.category), {
    variety_code: g.varietyCode ?? '',
    variety_name: v?.name ?? '',
    shot_type: g.title,
    slot: g.category,
    caption: g.caption ?? '',
    note: g.location ? `Location: ${g.location}` : '',
  })
}

// ── 5. Unused — in the repo, on no page ─────────────────────
const staged = new Set(rows.map((r) => r.source_path))
const onDisk = execFileSync(
  'find',
  [join(PUBLIC, 'img'), join(PUBLIC, 'images'), '-type', 'f', '-name', '*.jpg', '-o', '-type', 'f', '-name', '*.webp'],
  { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
)
  .split('\n')
  .filter(Boolean)

for (const abs of onDisk) {
  const webPath = abs.replace(PUBLIC, '')
  if (staged.has(webPath)) continue
  if (!/\/(varieties|formats|gallery|quarry|yard|about|group|field-notes|khadane)\//.test(webPath)) continue
  stage(webPath, 'unused', {
    shot_type: 'UNUSED — present in repo, referenced by no page',
    slot: 'unused',
  })
}

// ── Write mapping + flags ───────────────────────────────────
mkdirSync(OUT, { recursive: true })

const COLUMNS: (keyof Row)[] = [
  'filename', 'variety_code', 'variety_name', 'format_code', 'format_name',
  'shot_type', 'slot', 'caption', 'credit', 'is_render',
  'pixel_width', 'pixel_height', 'print_width_in_at_300dpi',
  'source_path', 'export_path', 'note',
]

const esc = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s)
const csv = [
  COLUMNS.join(','),
  ...rows.map((r) => COLUMNS.map((c) => esc(String(r[c] ?? ''))).join(',')),
].join('\n')

writeFileSync(join(OUT, 'mapping.csv'), csv)
writeFileSync(join(OUT, 'mapping.json'), JSON.stringify(rows, null, 2))

const renders = rows.filter((r) => r.is_render.startsWith('YES'))

// Low-res only counts what could plausibly land on a buyer page. Thumbnails
// are meant to be small and unused shots aren't in the deliverable, so
// including them would inflate the number into something nobody trusts.
const pdfCandidates = rows.filter(
  (r) => r.export_path && r.slot !== 'thumb' && r.slot !== 'unused' && r.pixel_width,
)
const lowRes = pdfCandidates.filter((r) => Number(r.pixel_width) < 1800)
const printGrade = pdfCandidates.filter((r) => Number(r.pixel_width) >= 3000)

// ── Page copy ───────────────────────────────────────────────
// exports/khadane-catalogue carries geology and availability for pricing; it
// does not carry the prose that sits on the page. These two files do.
mkdirSync(join(OUT, 'content'), { recursive: true })

const varietyCopy = VARIETIES.map((v) => ({
  code: v.code,
  name: v.name,
  name_hindi: v.nameHindi,
  slug: v.slug,
  tier: v.tierLabel,
  tagline: v.oneLine,
  headline: v.inHandHeadline,
  provenance_line: v.provenanceLine ?? '',
  editorial_body: (v.editorialBody ?? []).join('\n\n'),
  district: v.district,
  primary_location: v.primaryLocation,
  additional_locations: v.additionalLocations ?? '',
  quarry_network_note: v.quarryNetworkNote ?? '',
  formation: v.formation,
  trade_names: v.tradeNames,
  alternate_names: (v.alternateNames ?? []).join(' | '),
  renamed_by_khadane: v.renamedByKhadane ?? '',
  worked_since: v.workedSince ?? '',
  splittable: v.splittable ?? '',
  splittability_note: v.splittabilityNote ?? '',
  format_scope: v.formatScope,
  founding_stone: v.foundingStone ? 'yes' : 'no',
  allied_relationship: v.alliedRelationship ?? '',
}))

const formatCopy = FORMATS.map((f) => ({
  code: f.code,
  name: f.name,
  slug: f.slug,
  tagline: f.oneLine,
  headline: f.formatHeadline,
  description: f.description,
  primary_use: f.primaryUse,
  surfaces_regular: f.surfacesRegular.join(' | '),
  surfaces_available_to_order: f.surfacesAvailable.join(' | '),
  edges_available: f.edgesAvailable.join(' | '),
  production_routes: (f.productionRoutes ?? []).join(' | '),
  size_basis: f.sizeBasis ?? '',
  // Only regular sizes render on the site; bespoke stays on enquiry.
  regular_sizes: (f.sizes ?? [])
    .filter((s) => s.regular)
    .map((s) => `${s.code} @ ${s.thicknessesMm.join('/')}mm${s.calibrated ? ' cal' : ''}`)
    .join(' | '),
  bespoke_sizes: (f.sizes ?? [])
    .filter((s) => !s.regular)
    .map((s) => `${s.code} @ ${s.thicknessesMm.join('/')}mm`)
    .join(' | '),
  variety_exceptions: f.varietyExceptions.join(' | '),
  // PACKING data, not product data. Do not price off these.
  packing_crate_dimensions: f.packingCrateDimensions ?? '',
  packing_crate_weight: f.packingCrateWeight ?? '',
  coverage_per_crate: f.coveragePerCrate ?? '',
  container_loading: f.containerLoading ?? '',
}))

function toCsv(objs: Record<string, string>[]): string {
  if (!objs.length) return ''
  const cols = Object.keys(objs[0])
  return [cols.join(','), ...objs.map((o) => cols.map((c) => esc(String(o[c] ?? ''))).join(','))].join('\n')
}

writeFileSync(join(OUT, 'content', 'variety-page-content.csv'), toCsv(varietyCopy as never))
writeFileSync(join(OUT, 'content', 'format-page-content.csv'), toCsv(formatCopy as never))

writeFileSync(
  join(OUT, 'FLAGS.md'),
  [
    '# KHADANE asset export — flags',
    '',
    `Generated by \`npx tsx scripts/export-assets.ts\`.`,
    '',
    '## Read this before laying out a buyer PDF',
    '',
    `- **${renders.length} images are CGI renders, not photographs.** They are marked`,
    '  `is_render` in the mapping. They are application visualisations —',
    '  courtyards, patios, Versailles layouts. Presenting them as photography of',
    '  supplied stone would misrepresent the product.',
    `- **${lowRes.length} of ${pdfCandidates.length} candidate images are under 1800px wide** and have no`,
    '  larger master in the repo. At 300dpi they print under 6 inches. Only',
    `  ${printGrade.length} are 3000px or wider — genuinely full-page print grade. The`,
    '  `print_width_in_at_300dpi` column gives the honest maximum for each.',
    '  (Counts exclude thumbnails and unused shots, which are not PDF candidates.)',
    '- **Higher-resolution masters exist on Drive.** The `Owned` folder holds DNG',
    '  raws (80–90MB) and 13–16MB JPEGs per variety that were never brought into',
    '  the repo. Source the PDF from those, not from these web assets, wherever a',
    '  large reproduction is needed.',
    '- **No credit data exists.** There is no photographer or rights field anywhere',
    '  in the codebase. The `credit` column is empty by design, not by oversight.',
    '- **Filenames do not describe contents.** Use `shot_type` and `note`, never the',
    '  filename. Slate Grey has slots 1 and 3 deliberately crossed over.',
    '',
    '## Automated flags',
    '',
    ...(flags.length ? flags.map((f) => `- ${f}`) : ['- None.']),
    '',
  ].join('\n'),
)

console.log(`Staged ${rows.filter((r) => r.export_path).length} files to ${OUT}`)
console.log(`  ${renders.length} renders · ${lowRes.length} under 1800px · ${flags.length} flags`)
console.log(`  mapping.csv, mapping.json, FLAGS.md written`)
