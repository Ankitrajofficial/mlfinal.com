// ============================================================
// KHADANE(TM) - Format Catalogue Data
// Source: update.md, then catalogue patch v1 and v2.1 (2026-08)
// 21 formats, 16 surface treatments, 4 edge profiles
// ============================================================

// How a block-derived piece is produced. Sawn and hand-cut-from-block are
// different products at different prices, with different faces and edges
// (patch v2.1). Split products — anything parted along the natural bed —
// carry `split` only. `selected` is Boulders: picked from overburden, not
// produced at all.
export type ProductionRoute = 'split' | 'sawn' | 'hand-cut' | 'selected'

// A plan size the format is cut to. Added 2026-08: dimensions and thicknesses
// previously existed nowhere as structured data, only inside prose. Patch v2.1
// supplied the confirmed spec for twenty formats.
export interface FormatSize {
  code: string // e.g. "900x600"
  lengthMm: number
  widthMm: number
  // The standing thicknesses for THIS size. Thickness is per size, never per
  // format — a format offering 18–30 mm does not offer it at every plan size.
  thicknessesMm: number[]
  calibrated: boolean
  // true = standing range, renders on the site.
  // false = bespoke; stays off the page and on enquiry.
  regular: boolean
  // Sub-line within the format — "tread", "riser", "flat-laid", "Z-panel".
  group?: string
  shape?: 'rectangular' | 'round'
  // Which trade asks for the size. `special` sizes are cut to order.
  market?: 'UK' | 'EU' | 'special'
  note?: string
}

// A mixed-size patio pack. `composition` is pieces per plan size, in the order
// the format's regular sizes are listed.
export interface PatioPack {
  code: string
  composition: number[]
  thicknessMm: number
  nominalSqm: number
}

// Confirmed spec that is real but does not fit the size table — profiles,
// kit compositions, coverage rules, sub-line ranges.
export interface SpecDetail {
  label: string
  value: string
}

export interface Format {
  code: string
  rank: number
  slug: string
  name: string
  oneLine: string
  formatHeadline: string
  description: string
  // DEPRECATED 2026-08 — still 24 on every format, unused by any page. The
  // export derives the real count. Safe to delete once nothing reads it.
  varietyAvailability: number
  // Variety codes this format cannot be supplied in. Empty everywhere as of
  // patch v2.1: material is held across the full quarry estate in every
  // thickness the belt produces, so availability is not a constraint. All
  // varieties, all formats. The field stays as the hook if that ever changes;
  // do not build a matrix behind it.
  varietyExceptions: string[]
  primaryUse: string
  // How the format is sold and measured. Omitted where patch v2.1 did not
  // state it (KHF-019).
  unit?: string
  alsoUnits?: string[]
  // Customs declaration unit. Export documentation only — never rendered.
  declareUnit?: string
  // Standing production: made to stock, no lead-time premium.
  surfacesRegular: string[]
  // Real but worked to order, with a longer lead time. Not the same offer as
  // surfacesRegular and should not be shown as equal to it (patch v2.1).
  surfacesAvailable: string[]
  edgesAvailable: string[]
  productionRoutes?: ProductionRoute[]
  // Plan sizes and thicknesses. Render only entries with regular: true.
  sizes?: FormatSize[]
  // Why this format has no standing size list. Set only where sizes is absent.
  sizeBasis?: string
  sizeNote?: string
  // Format-level thicknesses. Valid ONLY where sizes is absent — otherwise
  // thickness belongs on the size.
  thicknessesMm?: number[]
  // The thickness the format actually ships in volume.
  volumeThicknessMm?: number
  // Roofing only. Published lengths are peg-to-tail; the stone continues this
  // much further above the peg hole. Carried for weight and packing and NOT
  // published — do not render it, do not add it to a published length.
  overallLengthOffsetMm?: number[]
  profiles?: string[]
  packs?: PatioPack[]
  specDetails?: SpecDetail[]
  // NB: packingCrate* are PACKING data, not product data. Renamed from
  // crateDimensions / crateWeight in patch v2.1 so nobody prices off them.
  packingCrateDimensions?: string
  packingCrateWeight?: string
  coveragePerCrate?: string
  containerLoading?: string
  placeholderClass: string
}

// Window Cills and Door Frames are cut to the same sections — one list, so
// the two cannot drift apart. Face width x stop, in inches; one solid piece.
const SILL_SECTIONS_INCH: [number, number][] = [
  [3.5, 2], [3.5, 2.5], [4, 2], [4, 2.5], [5, 2], [5, 2.5], [5, 3],
  [5.25, 2.5], [5.5, 2.5], [5.5, 3], [6, 2], [6, 2.5], [6, 3],
  [10, 2], [10, 2.5], [10, 3], [10.5, 2.5],
]

const SILL_SECTIONS_TEXT = SILL_SECTIONS_INCH.map(([w, s]) => `${w} × ${s}`).join(', ') + ' in'

export const FORMATS: Format[] = [
  {
    "code": "KHF-001",
    "rank": 1,
    "slug": "pavings",
    "name": "Pavings",
    "oneLine": "The volume export. Calibrated and natural, every size the trade asks for.",
    "formatHeadline": "The volume export. Calibrated and natural, every size the trade asks for.",
    "description": "Pavings are the highest-volume format KHADANE ships. The catalogue covers every calibrated single size the UK and EU trade specifies, plus the standard mixed-size patio packs that landscapers order by the crate. Natural hand-cut options sit alongside the calibrated range for buyers who want the unworked edge character.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Garden patios and courtyards, Residential driveways (with thickness specification), Public realm pedestrian areas, Pool surrounds and terraces",
    "unit": "sqm",
    "alsoUnits": ["sqft"],
    "declareUnit": "SQM",
    "surfacesRegular": [
      "natural-riven",
      "tumbled"
    ],
    "surfacesAvailable": [
      "sawn",
      "honed",
      "sandblast",
      "shotblast",
      "matte",
      "shotblasted-cotton",
      "blasted-flamed",
      "riven-shotblasted",
      "sparkling"
    ],
    // Split product: plain hand-cut, never straight-handcut (patch v2.1).
    "edgesAvailable": [
      "hand-cut",
      "machine-cut"
    ],
    "productionRoutes": ["split"],
    "sizes": [
      { "code": "900x600", "lengthMm": 900, "widthMm": 600, "thicknessesMm": [18, 20, 22, 30], "calibrated": true, "regular": true },
      { "code": "600x600", "lengthMm": 600, "widthMm": 600, "thicknessesMm": [18, 20, 22, 30], "calibrated": true, "regular": true },
      { "code": "600x290", "lengthMm": 600, "widthMm": 290, "thicknessesMm": [18, 20, 22, 30], "calibrated": true, "regular": true },
      { "code": "290x290", "lengthMm": 290, "widthMm": 290, "thicknessesMm": [18, 20, 22, 30], "calibrated": true, "regular": true },
      { "code": "600x150", "lengthMm": 600, "widthMm": 150, "thicknessesMm": [18, 20, 22, 30], "calibrated": true, "regular": false, "market": "special" },
      { "code": "800x200", "lengthMm": 800, "widthMm": 200, "thicknessesMm": [18, 20, 22, 30], "calibrated": true, "regular": false, "market": "special" }
    ],
    "volumeThicknessMm": 22,
    "packs": [
      { "code": "MIX-72", "composition": [18, 18, 18, 18], "thicknessMm": 18, "nominalSqm": 20.8458 },
      { "code": "MIX-66", "composition": [17, 17, 18, 14], "thicknessMm": 22, "nominalSqm": 19.6094 },
      { "code": "MIX-48", "composition": [13, 13, 13, 9], "thicknessMm": 22, "nominalSqm": 14.7189 },
      { "code": "MIX-48-30", "composition": [12, 12, 12, 12], "thicknessMm": 30, "nominalSqm": 13.8972 }
    ],
    "packingCrateDimensions": "1200 × 1000 × 1000 mm",
    "packingCrateWeight": "1100–1300 kg",
    "coveragePerCrate": "Varies by size and thickness",
    "containerLoading": "~22 crates per 20-ft container",
    "placeholderClass": "placeholder-stone"
  },
  {
    "code": "KHF-002",
    "rank": 2,
    "slug": "flagstones-crazy-paving",
    "name": "Flagstones / Crazy Paving",
    "oneLine": "Random-form irregular paving. For garden paths and organic-layout patios.",
    "formatHeadline": "Random-form irregular paving. For garden paths and organic-layout patios.",
    "description": "Flagstones are random-form fragments sorted from the bed before calibration. The irregular outlines are the character of the format; landscapers fit pieces together on site to produce the dry-stone look of traditional English garden paths. Sold by the crate at a standard coverage rate.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Garden paths and stepping-stone routes, Organic-layout patios, Cottage-garden and naturalistic landscapes, Dry-stone-style paving in heritage contexts",
    "unit": "sqm",
    "alsoUnits": ["tonne"],
    "declareUnit": "SQM",
    "surfacesRegular": [
      "natural-riven"
    ],
    "surfacesAvailable": [
      "sawn",
      "tumbled"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "productionRoutes": ["split"],
    // No standing size list: random form, specified by pieces per square metre.
    "sizeBasis": "Random form. Specified by pieces per square metre, not by plan size — 3 to 20 pieces per sqm depending on how large a fragment the layout wants.",
    "thicknessesMm": [20, 22, 25, 30, 35],
    "specDetails": [
      { "label": "Pieces per sqm", "value": "3–20" },
      { "label": "Calibrated", "value": "Yes" }
    ],
    "packingCrateDimensions": "1200 × 1000 × 1000 mm",
    "packingCrateWeight": "1100 kg",
    "coveragePerCrate": "10 sqm nominal per crate",
    "containerLoading": "~22 crates / 220 sqm per 20-ft",
    "placeholderClass": "placeholder-stone"
  },
  {
    "code": "KHF-003",
    "rank": 3,
    "slug": "cobble-setts",
    "name": "Cobble Setts",
    "oneLine": "Hand-cut and machine-cut cobbles. Driveways, courtyards, kerbed edges.",
    "formatHeadline": "Hand-cut and machine-cut cobbles. Driveways, courtyards, kerbed edges.",
    "description": "Cobble setts are the trade workhorse for driveways and courtyards. Hand-cut options carry six natural faces; machine-cut options run to tight tolerances for tight-pattern installations. Standard thickness 50 mm for most uses; 70 mm for vehicular and 100 mm for heavy industrial.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Residential and commercial driveways, Courtyards and forecourts, Kerbed driveway edges, Fountain and water-feature surrounds",
    "unit": "sqm",
    "alsoUnits": ["sqft"],
    "declareUnit": "SQM",
    "surfacesRegular": [
      "natural-riven",
      "tumbled"
    ],
    "surfacesAvailable": [
      "sawn",
      "riven-shotblasted",
      "shotblasted-cotton"
    ],
    "edgesAvailable": [
      "hand-cut",
      "machine-cut"
    ],
    "productionRoutes": ["split"],
    // calibrated: false throughout — calibration is optional on setts, not the
    // standing state. Ask for it and it is quoted.
    "sizes": [
      { "code": "200x100", "lengthMm": 200, "widthMm": 100, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "market": "UK" },
      { "code": "100x100", "lengthMm": 100, "widthMm": 100, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "market": "UK" },
      { "code": "200x50", "lengthMm": 200, "widthMm": 50, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "market": "UK", "note": "Machine-cut only — too narrow to split." },
      { "code": "140x140", "lengthMm": 140, "widthMm": 140, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "market": "EU" },
      { "code": "200x140", "lengthMm": 200, "widthMm": 140, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "market": "EU" },
      { "code": "150x150", "lengthMm": 150, "widthMm": 150, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": false, "market": "special" },
      { "code": "200x150", "lengthMm": 200, "widthMm": 150, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": false, "market": "special" }
    ],
    "volumeThicknessMm": 50,
    "specDetails": [
      { "label": "Calibration", "value": "Optional — quoted on request, not the standing state" }
    ],
    "packingCrateDimensions": "1200 × 1000 × 1000 mm",
    "packingCrateWeight": "1200 kg",
    "coveragePerCrate": "9 sqm at 50 mm (45 ÷ thickness in cm)",
    "containerLoading": "~22 crates per 20-ft / ~198 sqm at 50 mm",
    "placeholderClass": "placeholder-stone"
  },
  {
    "code": "KHF-004",
    "rank": 4,
    "slug": "stepping-stones",
    "name": "Stepping Stones",
    "oneLine": "Single-piece path elements. Garden routes and lawn paths.",
    "formatHeadline": "Single-piece path elements. Garden routes and lawn paths.",
    "description": "Stepping stones are individual large-format pieces set into lawns and gardens to mark a walking route. Random-form variants carry the natural outline; cut circles and squares offer the geometric option.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Garden walking paths, Lawn routes between features, Pool-side walking surfaces, Japanese-style stepping-stone gardens",
    "unit": "sqm",
    "alsoUnits": ["piece"],
    "declareUnit": "PCS",
    "surfacesRegular": [
      "natural-riven"
    ],
    "surfacesAvailable": [
      "sandblast",
      "tumbled"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "productionRoutes": ["split"],
    "sizes": [
      { "code": "600x300", "lengthMm": 600, "widthMm": 300, "thicknessesMm": [22, 30, 40, 50], "calibrated": false, "regular": true },
      { "code": "600x400", "lengthMm": 600, "widthMm": 400, "thicknessesMm": [22, 30, 40, 50], "calibrated": false, "regular": true },
      { "code": "600x450", "lengthMm": 600, "widthMm": 450, "thicknessesMm": [22, 30, 40, 50], "calibrated": false, "regular": true },
      { "code": "300x450", "lengthMm": 300, "widthMm": 450, "thicknessesMm": [22, 30, 40, 50], "calibrated": false, "regular": true },
      { "code": "300x500", "lengthMm": 300, "widthMm": 500, "thicknessesMm": [22, 30, 40, 50], "calibrated": false, "regular": true },
      { "code": "305 round", "lengthMm": 305, "widthMm": 305, "thicknessesMm": [22, 30, 40, 50], "calibrated": false, "regular": true, "shape": "round", "note": "Cut from a square blank — 21.5 percent offcut." }
    ],
    "placeholderClass": "placeholder-stone-warm"
  },
  {
    "code": "KHF-005",
    "rank": 5,
    "slug": "circles",
    "name": "Circles",
    "oneLine": "Patio centrepiece sets. Multi-piece radial cuts forming complete discs.",
    "formatHeadline": "Patio centrepiece sets. Multi-piece radial cuts forming complete discs.",
    "description": "Circle sets are multi-piece radial cuts that assemble into complete patio centrepieces. Standard diameters from 1500 mm domestic up to 3000 mm public realm. The centre disc and surrounding rings are cut from the same bed for tonal continuity.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Patio centrepiece features, Garden focal areas, Public-realm gathering points, Memorial and commemorative paving",
    "unit": "kit",
    "declareUnit": "SQM",
    "surfacesRegular": [
      "natural-riven"
    ],
    "surfacesAvailable": [
      "honed",
      "sandblast",
      "sawn"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "productionRoutes": ["split"],
    "sizes": [
      { "code": "1500 dia", "lengthMm": 1500, "widthMm": 1500, "thicknessesMm": [22, 30], "calibrated": false, "regular": true, "shape": "round" },
      { "code": "1800 dia", "lengthMm": 1800, "widthMm": 1800, "thicknessesMm": [22, 30], "calibrated": false, "regular": true, "shape": "round" },
      { "code": "2400 dia", "lengthMm": 2400, "widthMm": 2400, "thicknessesMm": [22, 30], "calibrated": false, "regular": true, "shape": "round" },
      { "code": "2700 dia", "lengthMm": 2700, "widthMm": 2700, "thicknessesMm": [22, 30], "calibrated": false, "regular": true, "shape": "round" },
      { "code": "3000 dia", "lengthMm": 3000, "widthMm": 3000, "thicknessesMm": [22, 30], "calibrated": false, "regular": true, "shape": "round" },
      { "code": "3300 dia", "lengthMm": 3300, "widthMm": 3300, "thicknessesMm": [22, 30], "calibrated": false, "regular": true, "shape": "round" },
      { "code": "3600 dia", "lengthMm": 3600, "widthMm": 3600, "thicknessesMm": [22, 30], "calibrated": false, "regular": true, "shape": "round" }
    ],
    "sizeNote": "Any diameter is cut to order. Area is πr², so a 3000 mm circle is 7.07 sqm.",
    "specDetails": [
      { "label": "Squaring-off kit", "value": "8 pieces at 1500 mm, 12 at 2400 mm, 20 at 3300 mm" },
      { "label": "Packing", "value": "One kit per crate" }
    ],
    "placeholderClass": "placeholder-stone"
  },
  {
    "code": "KHF-006",
    "rank": 6,
    "slug": "kerbstones",
    "name": "Kerbstones",
    "oneLine": "Path and driveway edging. Linear lengths in standard cross-sections.",
    "formatHeadline": "Path and driveway edging. Linear lengths in standard cross-sections.",
    "description": "Kerbstones edge paths, driveways, and lawn beds. Standard cross-sections in 1-metre lengths; longer pieces and custom sections on request. The bullnose top is the most common UK specification.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Driveway edging, Path-and-lawn separation, Garden-bed boundaries, Public realm pathway edging",
    "unit": "rm",
    "declareUnit": "PCS",
    "surfacesRegular": [],
    "surfacesAvailable": [
      "natural-riven",
      "sawn",
      "sandblast",
      "flamed"
    ],
    "edgesAvailable": [
      "straight-handcut",
      "machine-cut",
      "bullnose"
    ],
    "productionRoutes": ["sawn", "hand-cut"],
    // Upright kerbs are stated length x width x height; the height is the
    // thickness column. Flat-laid kerbs are stated length x width on bed.
    "sizes": [
      { "code": "300x100x100", "lengthMm": 300, "widthMm": 100, "thicknessesMm": [100], "calibrated": false, "regular": true, "group": "Upright" },
      { "code": "450x150x150", "lengthMm": 450, "widthMm": 150, "thicknessesMm": [150], "calibrated": false, "regular": true, "group": "Upright" },
      { "code": "450x250x100", "lengthMm": 450, "widthMm": 250, "thicknessesMm": [100], "calibrated": false, "regular": true, "group": "Upright" },
      { "code": "450x300x150", "lengthMm": 450, "widthMm": 300, "thicknessesMm": [150], "calibrated": false, "regular": true, "group": "Upright" },
      { "code": "600x300x150", "lengthMm": 600, "widthMm": 300, "thicknessesMm": [150], "calibrated": false, "regular": true, "group": "Upright" },
      { "code": "1000x250", "lengthMm": 1000, "widthMm": 250, "thicknessesMm": [100, 120, 150, 180], "calibrated": false, "regular": true, "group": "Flat-laid" },
      { "code": "1000x300", "lengthMm": 1000, "widthMm": 300, "thicknessesMm": [100, 120, 150, 180], "calibrated": false, "regular": true, "group": "Flat-laid" },
      { "code": "1000x350", "lengthMm": 1000, "widthMm": 350, "thicknessesMm": [100, 120, 150, 180], "calibrated": false, "regular": true, "group": "Flat-laid" },
      { "code": "500x250", "lengthMm": 500, "widthMm": 250, "thicknessesMm": [100, 120, 150, 180], "calibrated": false, "regular": true, "group": "Flat-laid" },
      { "code": "500x300", "lengthMm": 500, "widthMm": 300, "thicknessesMm": [100, 120, 150, 180], "calibrated": false, "regular": true, "group": "Flat-laid" },
      { "code": "500x350", "lengthMm": 500, "widthMm": 350, "thicknessesMm": [100, 120, 150, 180], "calibrated": false, "regular": true, "group": "Flat-laid" }
    ],
    "profiles": ["square", "bullnose", "half-battered", "bevelled", "channel"],
    "specDetails": [
      { "label": "Dressed faces", "value": "One-sided or two-sided" }
    ],
    "placeholderClass": "placeholder-stone-warm"
  },
  {
    "code": "KHF-007",
    "rank": 7,
    "slug": "copings",
    "name": "Copings",
    "oneLine": "Pool, wall, and parapet finishing. Single-bullnose, full-bullnose, mitred corners.",
    "formatHeadline": "Pool, wall, and parapet finishing. Single-bullnose, full-bullnose, mitred corners.",
    "description": "Copings finish the top edge of walls, pool surrounds, and parapets. The bullnose profile rounds the visible edge for a softer architectural finish; corner pieces are pre-mitred to the standard 90°. Pool-coping variants carry the deeper bullnose for safer wet-area edges.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Pool coping and surrounds, Garden wall capping, Parapet finishing on roof terraces, Architectural step-edge finishing",
    "unit": "sqm",
    "alsoUnits": ["piece", "rm"],
    "declareUnit": "SQM",
    "surfacesRegular": [
      "natural-riven"
    ],
    "surfacesAvailable": [
      "honed",
      "sandblast",
      "sawn",
      "flamed",
      "tumbled",
      "matte",
      "hand-chiseled"
    ],
    "edgesAvailable": [
      "straight-handcut",
      "bullnose",
      "machine-cut"
    ],
    "productionRoutes": ["sawn", "hand-cut"],
    // 40 and 50 mm are the standing thicknesses. 30 and 60 mm are cut to
    // order — carried in sizeNote, not in the size rows, so they do not read
    // as stock.
    "sizes": [
      { "code": "600x160", "lengthMm": 600, "widthMm": 160, "thicknessesMm": [40, 50], "calibrated": true, "regular": true },
      { "code": "600x300", "lengthMm": 600, "widthMm": 300, "thicknessesMm": [40, 50], "calibrated": true, "regular": true },
      { "code": "600x600", "lengthMm": 600, "widthMm": 600, "thicknessesMm": [40, 50], "calibrated": true, "regular": true },
      { "code": "1000x300", "lengthMm": 1000, "widthMm": 300, "thicknessesMm": [40, 50], "calibrated": true, "regular": true },
      { "code": "1000x350", "lengthMm": 1000, "widthMm": 350, "thicknessesMm": [40, 50], "calibrated": true, "regular": true },
      { "code": "1000x400", "lengthMm": 1000, "widthMm": 400, "thicknessesMm": [40, 50], "calibrated": true, "regular": true },
      { "code": "1200x300", "lengthMm": 1200, "widthMm": 300, "thicknessesMm": [40, 50], "calibrated": true, "regular": true },
      { "code": "1200x350", "lengthMm": 1200, "widthMm": 350, "thicknessesMm": [40, 50], "calibrated": true, "regular": true },
      { "code": "1200x400", "lengthMm": 1200, "widthMm": 400, "thicknessesMm": [40, 50], "calibrated": true, "regular": true },
      { "code": "1200x450", "lengthMm": 1200, "widthMm": 450, "thicknessesMm": [40, 50], "calibrated": true, "regular": true },
      { "code": "1200x900", "lengthMm": 1200, "widthMm": 900, "thicknessesMm": [40, 50], "calibrated": true, "regular": true }
    ],
    "sizeNote": "30 mm and 60 mm are cut to order at every size. Drip groove optional.",
    "packingCrateDimensions": "1200 × 1000 × 800 mm",
    "packingCrateWeight": "~1100 kg",
    "coveragePerCrate": "~30 linear metres at standard size",
    "containerLoading": "",
    "placeholderClass": "placeholder-stone-warm"
  },
  {
    "code": "KHF-008",
    "rank": 8,
    "slug": "window-sills",
    "name": "Window Cills",
    "oneLine": "Exterior architectural lengths. Drip-edge profile, mitred or square ends.",
    "formatHeadline": "Exterior architectural lengths. Drip-edge profile, mitred or square ends.",
    "description": "Window cills are exterior architectural lengths sat below window openings. The underside drip groove channels water away from the building face; the top surface holds a fine sawn finish. Standard 1200 mm length; custom on request.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Exterior window architecture, Door-frame headers and reveals, Architectural string-course bands, Decorative wall course interruptions",
    "unit": "rm",
    "alsoUnits": ["rft"],
    "declareUnit": "SQM",
    "surfacesRegular": [],
    "surfacesAvailable": [
      "honed",
      "sawn",
      "sandblast",
      "flamed"
    ],
    "edgesAvailable": [
      "machine-cut",
      "bullnose"
    ],
    "productionRoutes": ["sawn", "hand-cut"],
    "sizeBasis": "Sold by the running metre in a fixed cross-section, cut to the opening — there is no plan size. Section is stated as face width × stop, and each cill is one solid piece, not a built-up assembly.",
    "profiles": ["SP", "DP", "4P", "MDL"],
    "specDetails": [
      { "label": "Sections (face width × stop)", "value": SILL_SECTIONS_TEXT }
    ],
    "placeholderClass": "placeholder-stone-warm"
  },
  {
    "code": "KHF-009",
    "rank": 9,
    "slug": "door-frames",
    "name": "Door Frames",
    "oneLine": "Architectural door surrounds. Custom per drawing.",
    "formatHeadline": "Architectural door surrounds. Custom per drawing.",
    "description": "Door frames are architectural surrounds for entrances — jambs, headers, and thresholds cut to per-drawing specification. KHADANE works to architect drawings with stone dressed and finished at the Bijolia yard before dispatch.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Heritage building restoration, Architectural entrance surrounds, Temple and institutional doorways, Custom residential entrances",
    "unit": "rm",
    "alsoUnits": ["rft"],
    "declareUnit": "SQM",
    // Cut to the same sections as Window Cills (KHF-008) — same list, one source.
    "surfacesRegular": [],
    "surfacesAvailable": [
      "honed",
      "sawn",
      "sandblast",
      "flamed"
    ],
    "edgesAvailable": [
      "machine-cut",
      "bullnose"
    ],
    "productionRoutes": ["sawn", "hand-cut"],
    "sizeBasis": "Sold by the running metre in a fixed cross-section, cut per drawing — there is no plan size. Sections are the Window Cills list; a 3 ft × 7 ft door takes approximately 17.5 running feet.",
    "profiles": ["SP", "DP", "4P", "MDL"],
    "specDetails": [
      { "label": "Sections (face width × stop)", "value": SILL_SECTIONS_TEXT },
      { "label": "Run per door", "value": "≈17.5 running feet for a 3 ft × 7 ft opening" }
    ],
    "placeholderClass": "placeholder-stone-warm"
  },
  {
    "code": "KHF-010",
    "rank": 10,
    "slug": "block-steps-treads",
    "name": "Block Steps & Treads",
    "oneLine": "Garden steps and terrace treads. Bullnose front edge standard.",
    "formatHeadline": "Garden steps and terrace treads. Bullnose front edge standard.",
    "description": "Block steps are single-piece tread elements with the bullnose front edge cut in during the finishing stage. Standard length 1000 mm; wider 1200 mm and 1500 mm available for commercial and public-realm installations.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Garden step risers, Terraced-garden treads, Public-realm staircase treads, Pool-deck step risers",
    "unit": "sqm",
    "alsoUnits": ["piece"],
    "declareUnit": "PCS",
    "surfacesRegular": [],
    "surfacesAvailable": [
      "natural-riven",
      "honed",
      "sandblast",
      "sawn",
      "flamed",
      "matte",
      "blasted-flamed",
      "hand-chiseled"
    ],
    // Cut from block, so no plain hand-cut: straight-handcut is the hand edge.
    "edgesAvailable": [
      "straight-handcut",
      "bullnose",
      "machine-cut"
    ],
    "productionRoutes": ["sawn", "hand-cut"],
    "sizes": [
      { "code": "600x300", "lengthMm": 600, "widthMm": 300, "thicknessesMm": [30, 40, 50], "calibrated": true, "regular": true, "group": "Tread" },
      { "code": "900x300", "lengthMm": 900, "widthMm": 300, "thicknessesMm": [30, 40, 50], "calibrated": true, "regular": true, "group": "Tread" },
      { "code": "900x350", "lengthMm": 900, "widthMm": 350, "thicknessesMm": [30, 40, 50], "calibrated": true, "regular": true, "group": "Tread" },
      { "code": "900x400", "lengthMm": 900, "widthMm": 400, "thicknessesMm": [30, 40, 50], "calibrated": true, "regular": true, "group": "Tread", "note": "UK standard at 40 mm." },
      { "code": "900x450", "lengthMm": 900, "widthMm": 450, "thicknessesMm": [30, 40, 50], "calibrated": true, "regular": true, "group": "Tread" },
      { "code": "1200x350", "lengthMm": 1200, "widthMm": 350, "thicknessesMm": [30, 40, 50], "calibrated": true, "regular": true, "group": "Tread" },
      { "code": "1000x300", "lengthMm": 1000, "widthMm": 300, "thicknessesMm": [100, 150, 200, 250], "calibrated": false, "regular": true, "group": "Block step" },
      { "code": "1000x350", "lengthMm": 1000, "widthMm": 350, "thicknessesMm": [100, 150, 200, 250], "calibrated": false, "regular": true, "group": "Block step" },
      { "code": "1200x350", "lengthMm": 1200, "widthMm": 350, "thicknessesMm": [100, 150, 200, 250], "calibrated": false, "regular": true, "group": "Block step" },
      { "code": "1200x400", "lengthMm": 1200, "widthMm": 400, "thicknessesMm": [100, 150, 200, 250], "calibrated": false, "regular": true, "group": "Block step" },
      { "code": "1500x400", "lengthMm": 1500, "widthMm": 400, "thicknessesMm": [100, 150, 200, 250], "calibrated": false, "regular": true, "group": "Block step" },
      { "code": "1500x600", "lengthMm": 1500, "widthMm": 600, "thicknessesMm": [100, 150, 200, 250], "calibrated": false, "regular": true, "group": "Block step" },
      { "code": "2000x450", "lengthMm": 2000, "widthMm": 450, "thicknessesMm": [100, 150, 200, 250], "calibrated": false, "regular": true, "group": "Block step" },
      { "code": "2000x600", "lengthMm": 2000, "widthMm": 600, "thicknessesMm": [100, 150, 200, 250], "calibrated": false, "regular": true, "group": "Block step" },
      { "code": "900x150", "lengthMm": 900, "widthMm": 150, "thicknessesMm": [40], "calibrated": true, "regular": true, "group": "Riser", "note": "Matches the tread width, same variety and finish." },
      { "code": "900x200", "lengthMm": 900, "widthMm": 200, "thicknessesMm": [40], "calibrated": true, "regular": true, "group": "Riser", "note": "Matches the tread width, same variety and finish." }
    ],
    "sizeNote": "Above 300 kg a step ships as a single piece on a bearer, not crated.",
    "packingCrateDimensions": "1500 × 800 × 800 mm",
    "packingCrateWeight": "~1000 kg",
    "coveragePerCrate": "12–18 pieces per crate depending on size",
    "containerLoading": "~14 crates per 20-ft",
    "placeholderClass": "placeholder-yard"
  },
  {
    "code": "KHF-011",
    "rank": 11,
    "slug": "roofing",
    "name": "Roofing",
    "oneLine": "Slate-bedded roofing tiles. Heritage and rural-architecture roofing.",
    "formatHeadline": "Slate-bedded roofing tiles. Heritage and rural-architecture roofing.",
    "description": "Roofing tiles are thin-cut slate-bedded sandstone for heritage and rural architectural roofing. Available only from varieties with the right bedding character; not all KHADANE stones split thin enough for roofing use.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Heritage building roofing, Rural architectural roofing, Garden buildings and outbuildings, Decorative roof feature courses",
    "unit": "sqm_roof",
    "declareUnit": "SQM",
    "surfacesRegular": [
      "natural-riven"
    ],
    "surfacesAvailable": [],
    "edgesAvailable": [
      "hand-cut"
    ],
    "productionRoutes": ["split"],
    // Lengths are peg-to-tail: measured from the peg hole to the tail. That is
    // the UK convention and the dimension a roofer sets battens by. The stone
    // continues 30–50 mm above the hole — see the offset below, which is
    // packing and weight data and is NOT published.
    "sizes": [
      { "code": "770x200", "lengthMm": 770, "widthMm": 200, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "770x250", "lengthMm": 770, "widthMm": 250, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "770x300", "lengthMm": 770, "widthMm": 300, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "710x200", "lengthMm": 710, "widthMm": 200, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "710x250", "lengthMm": 710, "widthMm": 250, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "710x300", "lengthMm": 710, "widthMm": 300, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "660x200", "lengthMm": 660, "widthMm": 200, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "660x250", "lengthMm": 660, "widthMm": 250, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "660x300", "lengthMm": 660, "widthMm": 300, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "460x200", "lengthMm": 460, "widthMm": 200, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "460x250", "lengthMm": 460, "widthMm": 250, "thicknessesMm": [22], "calibrated": true, "regular": true },
      { "code": "460x300", "lengthMm": 460, "widthMm": 300, "thicknessesMm": [22], "calibrated": true, "regular": true }
    ],
    "overallLengthOffsetMm": [30, 50],
    "sizeNote": "Lengths are peg-to-tail. Tiles arrive pre-drilled with quarry-fettled edges, laid in diminishing courses; a batten schedule is supplied with the order.",
    "specDetails": [
      { "label": "Coverage", "value": "2.2 sqm of stone per 1 sqm of roof" },
      { "label": "Pre-drilled", "value": "Yes" },
      { "label": "Edge finish", "value": "Quarry-fettled" }
    ],
    "coveragePerCrate": "2.2 sqm of stone per 1 sqm of roof",
    "placeholderClass": "placeholder-stone"
  },
  {
    "code": "KHF-012",
    "rank": 12,
    "slug": "accessories",
    "name": "Accessories",
    "oneLine": "Coping returns, drainage edges, custom small parts. Per specification.",
    "formatHeadline": "Coping returns, drainage edges, custom small parts. Per specification.",
    "description": "Accessories are the small custom parts that complete a stone installation — coping returns, drainage channel edges, threshold strips, and matched small elements that the larger formats don't cover. Quoted per specification.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Coping return pieces, Drainage channel edges, Threshold strips, Custom small architectural parts",
    "unit": "piece",
    "declareUnit": "PCS",
    "surfacesRegular": [],
    "surfacesAvailable": [
      "honed",
      "sandblast",
      "sawn",
      "flamed"
    ],
    "edgesAvailable": [
      "machine-cut",
      "bullnose"
    ],
    "productionRoutes": ["sawn", "hand-cut"],
    "sizeBasis": "Cut per specification, so there is no standing size list. The one repeating size is the stone ball, at four diameters.",
    "specDetails": [
      { "label": "Tier", "value": "Cut, not carved" },
      { "label": "Items", "value": "Stone balls, plinths, pedestals, planters, bird bath bowls, bench slabs" },
      { "label": "Ball diameters", "value": "200, 300, 450, 600 mm" }
    ],
    "placeholderClass": "placeholder-stone"
  },
  {
    "code": "KHF-013",
    "rank": 13,
    "slug": "palisades-edging",
    "name": "Palisades & Edging",
    "oneLine": "Vertical edging stones. Garden borders, retaining edges, terraced beds.",
    "formatHeadline": "Vertical edging stones. Garden borders, retaining edges, terraced beds.",
    "description": "Palisades are vertical edging stones set into the ground to retain garden beds, mark boundaries, or form terraced steps. Square cross-section, varying heights for different border depths.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Garden bed retaining edges, Terraced-bed boundaries, Driveway shoulder edging, Low-rise garden walls",
    "unit": "sqm",
    "alsoUnits": ["piece", "rm"],
    "declareUnit": "PCS",
    "surfacesRegular": [
      "natural-riven",
      "tumbled"
    ],
    "surfacesAvailable": [
      "sandblast",
      "flamed"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "productionRoutes": ["split"],
    "sizes": [
      { "code": "1000x200", "lengthMm": 1000, "widthMm": 200, "thicknessesMm": [70, 80, 90], "calibrated": false, "regular": true, "group": "Palisade — fixed height" },
      { "code": "1000x250", "lengthMm": 1000, "widthMm": 250, "thicknessesMm": [70, 80, 90], "calibrated": false, "regular": true, "group": "Palisade — fixed height" },
      { "code": "300x100", "lengthMm": 300, "widthMm": 100, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "group": "Edging" },
      { "code": "600x100", "lengthMm": 600, "widthMm": 100, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "group": "Edging" },
      { "code": "600x150", "lengthMm": 600, "widthMm": 150, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "group": "Edging" },
      { "code": "600x200", "lengthMm": 600, "widthMm": 200, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "group": "Edging" },
      { "code": "900x150", "lengthMm": 900, "widthMm": 150, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "group": "Edging" },
      { "code": "900x200", "lengthMm": 900, "widthMm": 200, "thicknessesMm": [30, 40, 50, 60, 80], "calibrated": false, "regular": true, "group": "Edging" }
    ],
    "specDetails": [
      { "label": "Palisade — mixed height", "value": "250–2000 mm high, 120 mm wide, 110 / 120 / 130 mm thick" },
      { "label": "Weight per running metre", "value": "height mm × thickness mm × 0.00225 = kg per rm of run" }
    ],
    "placeholderClass": "placeholder-stone"
  },
  {
    "code": "KHF-014",
    "rank": 14,
    "slug": "boulders",
    "name": "Boulders",
    "oneLine": "Natural-form landscape features. Quoted on enquiry by size and weight.",
    "formatHeadline": "Natural-form landscape features. Quoted on enquiry by size and weight.",
    "description": "Boulders are natural-form, undressed stones for landscape features — garden focal points, water feature anchors, and natural-look retaining elements. Sold by weight; sizes from 300 mm garden boulders up to 1500 mm landscape features.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Garden focal points, Water feature anchors, Natural-look retaining elements, Sculpture-park installations",
    "unit": "piece",
    "alsoUnits": ["tonne"],
    "declareUnit": "PCS",
    "surfacesRegular": [
      "natural-riven"
    ],
    "surfacesAvailable": [],
    "edgesAvailable": [
      "hand-cut"
    ],
    // Not produced — selected from quarry overburden.
    "productionRoutes": ["selected"],
    "sizeBasis": "Natural form, selected by size range from quarry overburden. No two are the same, so there is no size list.",
    "specDetails": [
      { "label": "Rockery", "value": "200–400 mm, sold by the tonne" },
      { "label": "Feature", "value": "500–1500 mm, sold by the piece and individually photographed" },
      { "label": "Monolith", "value": "600–1500 mm, drilling optional" }
    ],
    "placeholderClass": "placeholder-yard"
  },
  {
    "code": "KHF-015",
    "rank": 15,
    "slug": "fire-pits",
    "name": "Fire Pits",
    "oneLine": "Multi-piece garden fire pit assemblies. Ring and bowl formats.",
    "formatHeadline": "Multi-piece garden fire pit assemblies. Ring and bowl formats.",
    "description": "Fire pits assemble from multi-piece sets — a base ring plus radial wall pieces. Standard diameters from 800 mm to 1200 mm. The stone is fire-tested at the yard before dispatch.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Garden fire features, Outdoor entertaining areas, Pool-side fire pits, Public-realm gathering points",
    "unit": "kit",
    "declareUnit": "PCS",
    // The standing finish is a chiselled face on a sawn body.
    "surfacesRegular": [
      "hand-chiseled",
      "sawn"
    ],
    "surfacesAvailable": [
      "natural-riven",
      "sandblast",
      "tumbled"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "productionRoutes": ["sawn"],
    "sizes": [
      { "code": "404x200x75", "lengthMm": 404, "widthMm": 200, "thicknessesMm": [75], "calibrated": false, "regular": true, "group": "1454 mm kit — walling", "note": "50 pieces per kit." },
      { "code": "492x260x50", "lengthMm": 492, "widthMm": 260, "thicknessesMm": [50], "calibrated": false, "regular": true, "group": "1454 mm kit — coping", "note": "9 pieces per kit." }
    ],
    "sizeNote": "Sold as a complete kit, not by the piece. The liner is NOT included.",
    "specDetails": [
      { "label": "1454 mm kit", "value": "1454 mm external, 927 mm internal, 430 mm high — 59 pieces" },
      { "label": "1200 mm kit", "value": "1200 mm external, 840 mm internal, 360 mm high" },
      { "label": "Packing", "value": "One kit per crate" }
    ],
    "placeholderClass": "placeholder-stone"
  },
  {
    "code": "KHF-016",
    "rank": 16,
    "slug": "garden-furniture",
    "name": "Garden Furniture",
    "oneLine": "Benches, tables, planters. Custom per drawing.",
    "formatHeadline": "Benches, tables, planters. Custom per drawing.",
    "description": "Garden furniture pieces are cut per architect or designer drawing — benches, tables, planters, and custom landscape elements. Standard pieces ship in three to six weeks; custom designs longer.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Garden benches and seating, Outdoor dining tables, Stone planters and urns, Custom landscape features",
    "unit": "piece",
    "declareUnit": "PCS",
    "surfacesRegular": [],
    "surfacesAvailable": [
      "natural-riven",
      "honed",
      "sandblast",
      "sawn",
      "flamed",
      "tumbled"
    ],
    "edgesAvailable": [
      "machine-cut",
      "bullnose"
    ],
    "productionRoutes": ["sawn", "hand-cut"],
    "sizes": [
      { "code": "1200x350x75", "lengthMm": 1200, "widthMm": 350, "thicknessesMm": [75], "calibrated": false, "regular": true, "group": "Bench — three-piece seat" },
      { "code": "1500x400x75", "lengthMm": 1500, "widthMm": 400, "thicknessesMm": [75], "calibrated": false, "regular": true, "group": "Bench — three-piece seat" },
      { "code": "1800x400x100", "lengthMm": 1800, "widthMm": 400, "thicknessesMm": [100], "calibrated": false, "regular": true, "group": "Bench — three-piece seat" },
      { "code": "1200x400x450", "lengthMm": 1200, "widthMm": 400, "thicknessesMm": [450], "calibrated": false, "regular": true, "group": "Bench — monolithic", "note": "450 mm is the seat height, cut from one block." },
      { "code": "1500x450x450", "lengthMm": 1500, "widthMm": 450, "thicknessesMm": [450], "calibrated": false, "regular": true, "group": "Bench — monolithic", "note": "450 mm is the seat height, cut from one block." },
      { "code": "900 round", "lengthMm": 900, "widthMm": 900, "thicknessesMm": [], "calibrated": false, "regular": true, "group": "Table top", "shape": "round" },
      { "code": "900 square", "lengthMm": 900, "widthMm": 900, "thicknessesMm": [], "calibrated": false, "regular": true, "group": "Table top" },
      { "code": "400x400x700", "lengthMm": 400, "widthMm": 400, "thicknessesMm": [700], "calibrated": false, "regular": true, "group": "Table pedestal", "note": "700 mm is the pedestal height." }
    ],
    "sizeNote": "Table top thickness is set per drawing — the standing spec does not fix one.",
    "placeholderClass": "placeholder-stone"
  },
  {
    "code": "KHF-017",
    "rank": 17,
    "slug": "wall-cladding",
    "name": "Wall Cladding",
    "oneLine": "Exterior and interior wall cladding. Flat-back, corner, and stacked formats.",
    "formatHeadline": "Exterior and interior wall cladding. Flat-back, corner, and stacked formats.",
    "description": "Wall cladding sits flush against backing walls (flat-back format) or builds dimensional surface (stacked / Z-strip format). Interior thicknesses run lighter; exterior thicknesses run heavier for weight-bearing on backing structure.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Exterior building facades, Feature interior walls, Garden retaining walls (decorative face), Architectural accent walls",
    "unit": "sqm",
    "declareUnit": "SQM",
    "surfacesRegular": [],
    "surfacesAvailable": [
      "natural-riven",
      "honed",
      "sandblast",
      "flamed",
      "rockfaced",
      "sawn",
      "cotton-brush",
      "leather",
      "shotblast",
      "matte",
      "shotblasted-cotton",
      "blasted-flamed",
      "riven-shotblasted",
      "hand-chiseled",
      "sparkling"
    ],
    "edgesAvailable": [
      "hand-cut",
      "machine-cut"
    ],
    "productionRoutes": ["split", "sawn"],
    "sizes": [
      { "code": "550x200", "lengthMm": 550, "widthMm": 200, "thicknessesMm": [30, 35, 40], "calibrated": false, "regular": true, "group": "Z-panel" },
      { "code": "600x150", "lengthMm": 600, "widthMm": 150, "thicknessesMm": [30, 35, 40], "calibrated": false, "regular": true, "group": "Z-panel" },
      { "code": "600x200", "lengthMm": 600, "widthMm": 200, "thicknessesMm": [30, 35, 40], "calibrated": false, "regular": true, "group": "Z-panel" },
      { "code": "350x250x200", "lengthMm": 350, "widthMm": 250, "thicknessesMm": [30, 40], "calibrated": false, "regular": true, "group": "Corner", "note": "200 mm return. Five per linear metre of corner." },
      { "code": "305x610", "lengthMm": 305, "widthMm": 610, "thicknessesMm": [20, 25, 30], "calibrated": false, "regular": true, "group": "Large format" },
      { "code": "610x610", "lengthMm": 610, "widthMm": 610, "thicknessesMm": [20, 25, 30], "calibrated": false, "regular": true, "group": "Large format" },
      { "code": "1200x600", "lengthMm": 1200, "widthMm": 600, "thicknessesMm": [20, 25, 30], "calibrated": false, "regular": true, "group": "Large format" }
    ],
    "sizeNote": "Mini and loose strip are the same product, laid in random courses rather than to a plan size.",
    "specDetails": [
      { "label": "Mini / loose strip", "value": "50–300 mm high, 200–600 mm long, 10–25 mm thick" },
      { "label": "Rockface", "value": "20 and 25 mm" },
      { "label": "Corner coverage", "value": "5 pieces per linear metre" }
    ],
    "packingCrateDimensions": "1200 × 1000 × 800 mm",
    "packingCrateWeight": "~1100 kg",
    "coveragePerCrate": "19.6 sqm at 25 mm thickness",
    "containerLoading": "",
    "placeholderClass": "placeholder-stone-warm"
  },
  {
    "code": "KHF-018",
    "rank": 18,
    "slug": "gangsaw-slabs",
    "name": "Sandstone Slabs",
    "oneLine": "Large-format slabs cut from raw blocks. For custom cladding and bespoke work.",
    "formatHeadline": "Large-format slabs cut from raw blocks. For custom cladding and bespoke work.",
    "description": "Gangsaw slabs are large-format cuts taken directly from raw quarry blocks via the yard's gangsaw line. Buyers specify thickness, and the slab gets cut to size at the destination yard. Used for custom cladding installations, sculpture bases, and bespoke architectural work.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Large-format cladding installations, Sculpture and monument bases, Bespoke architectural work, Stockyard inventory for buyers cutting on-site",
    "unit": "sqm",
    "declareUnit": "SQM",
    "surfacesRegular": [],
    "surfacesAvailable": [
      "sawn",
      "honed",
      "sandblast",
      "flamed"
    ],
    "edgesAvailable": [
      "machine-cut"
    ],
    "productionRoutes": ["sawn"],
    "sizeBasis": "Lot dependent. A gangsaw slab is as large as the block it came out of, so there is no standing size — the buyer specifies thickness and cuts to size at their own yard.",
    "thicknessesMm": [18, 20, 25, 30],
    "specDetails": [
      // Patch v2.1 says slabs ship upright in an A-frame, not crated. The crate
      // figures below predate it and have not been withdrawn — one of the two
      // is wrong. Left standing for the yard to reconcile.
      { "label": "Packing", "value": "Ships upright in an A-frame, not crated" }
    ],
    "packingCrateDimensions": "2500 × 1300 × 600 mm",
    "packingCrateWeight": "~2200 kg per crate",
    "coveragePerCrate": "",
    "containerLoading": "~10 crates per 20-ft",
    "placeholderClass": "placeholder-yard"
  },
  {
    "code": "KHF-019",
    "rank": 19,
    "slug": "quarry-blocks",
    "name": "Quarry Blocks",
    "oneLine": "Raw blocks direct from the quarry. For sculptors, mason yards, and dressed-stone buyers.",
    "formatHeadline": "Raw blocks direct from the quarry. For sculptors, mason yards, and dressed-stone buyers.",
    "description": "Quarry blocks are sold raw, direct from KHADANE's quarries, to sculptors, mason yards, and dressed-stone buyers cutting in-house. The blocks ship as extracted, with chalk-marked grading by variety. Standard sizes by approximate dimension; weight given per block.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Sculptor and mason yard supply, Architectural restoration projects, In-house dressed-stone production, Custom monumental work",
    // Not in the patch v2.1 payload — blocks are handled by another team.
    // Left as authored apart from the schema fields every format now carries.
    "surfacesRegular": [],
    "surfacesAvailable": [
      "natural-riven"
    ],
    "edgesAvailable": [],
    "packingCrateWeight": "~4.5–8.5 tonnes per block",
    "coveragePerCrate": "",
    "containerLoading": "2–3 blocks per 20-ft container",
    "placeholderClass": "placeholder-yard"
  },
  {
    "code": "KHF-020",
    "rank": 20,
    "slug": "pier-cap",
    "name": "Pier Cap",
    "oneLine": "The finishing cap for gate piers and boundary pillars. Weathered top, clean overhang.",
    "formatHeadline": "The finishing cap for gate piers and boundary pillars. Weathered top, clean overhang.",
    "description": "Pier caps are the dressed stone tops that finish gate piers, boundary pillars, and wall terminations. KHADANE cuts them to the pier dimension with a weathered or flat top and a clean drip overhang that throws water clear of the pier face. Supplied in standard pier sizes or cut to your drawing.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Gate and entrance pier tops, Boundary pillar caps, Garden and wall pier terminations, Driveway entrance features",
    "unit": "piece",
    "alsoUnits": ["sqm"],
    "declareUnit": "PCS",
    "surfacesRegular": [],
    "surfacesAvailable": [
      "natural-riven",
      "honed",
      "sawn",
      "rockfaced"
    ],
    "edgesAvailable": [
      "straight-handcut",
      "bullnose",
      "machine-cut"
    ],
    "productionRoutes": ["sawn", "hand-cut"],
    // Caps are square. Size the cap at the pier dimension plus 100 mm so the
    // overhang throws water clear of the pier face.
    "sizes": [
      { "code": "254x254", "lengthMm": 254, "widthMm": 254, "thicknessesMm": [50, 75], "calibrated": false, "regular": true },
      { "code": "300x300", "lengthMm": 300, "widthMm": 300, "thicknessesMm": [50, 75], "calibrated": false, "regular": true },
      { "code": "381x381", "lengthMm": 381, "widthMm": 381, "thicknessesMm": [50, 75], "calibrated": false, "regular": true },
      { "code": "450x450", "lengthMm": 450, "widthMm": 450, "thicknessesMm": [50, 75], "calibrated": false, "regular": true },
      { "code": "510x510", "lengthMm": 510, "widthMm": 510, "thicknessesMm": [50, 75], "calibrated": false, "regular": true },
      { "code": "533x533", "lengthMm": 533, "widthMm": 533, "thicknessesMm": [50, 75], "calibrated": false, "regular": true },
      { "code": "610x610", "lengthMm": 610, "widthMm": 610, "thicknessesMm": [50, 75], "calibrated": false, "regular": true }
    ],
    "sizeNote": "Thicknesses are for the flat cap. Cap size = pier size + 100 mm.",
    "specDetails": [
      { "label": "Imperial sizes", "value": "10, 15, 18, 21 and 24 in" },
      { "label": "Top", "value": "Weathered or flat" },
      { "label": "Options", "value": "Pre-drilled and drip groove, both optional" }
    ],
    "packingCrateDimensions": "Cut to pier dimension",
    "packingCrateWeight": "By size and thickness",
    "coveragePerCrate": "Per piece or per drawing",
    "containerLoading": "By order volume",
    "placeholderClass": "placeholder-stone"
  },
  {
    // NEW in patch v2.1. Structural walling stone, distinct from Wall Cladding
    // (KHF-017): cladding is a 10–40 mm veneer fixed to a wall, walling is
    // 100–225 mm of stone that builds the wall.
    "code": "KHF-021",
    "rank": 21,
    "slug": "dry-stone-walling",
    "name": "Dry Stone Walling",
    "oneLine": "Structural walling stone. Sold by the tonne, in bed depths that build the wall.",
    "formatHeadline": "Structural walling stone. Sold by the tonne, in bed depths that build the wall.",
    "description": "Dry stone walling is the stone the wall is made of, not the stone fixed to its face. Where cladding is a 10 to 40 mm veneer, walling runs 100 to 225 mm deep and carries its own load. Supplied in random lengths for traditional coursing, or squared and coursed for a regular bed. Sold by the tonne in one-tonne bags, with the wall face area stated alongside so a run can be ordered without converting.",
    "varietyAvailability": 24,
    "varietyExceptions": [],
    "primaryUse": "Dry stone garden and boundary walls, Retaining walls, Field and estate walling, Cottage and heritage walling repair",
    "unit": "tonne",
    "declareUnit": "MTS",
    "surfacesRegular": [],
    "surfacesAvailable": [
      "tumbled"
    ],
    "edgesAvailable": [],
    "sizeBasis": "Sold by the tonne in random lengths of 250 to 450 mm, specified by bed depth and course height rather than by plan size.",
    "thicknessesMm": [100, 125, 150, 175, 200, 225],
    "volumeThicknessMm": 140,
    "specDetails": [
      // Bed depth IS the thickness for walling — carried in thicknessesMm above
      // rather than repeated here.
      { "label": "Coverage", "value": "4.0 sqm of wall face per tonne at 100 mm; 3.0 sqm per tonne at 150–225 mm" },
      { "label": "Course heights", "value": "100, 140, 180, 215 mm — 140 mm is the volume course" },
      { "label": "Lengths", "value": "Random, 250–450 mm" },
      { "label": "Types", "value": "Random, coursed, sawn, ashlar, cottage" },
      { "label": "Faces", "value": "Pitched, split or tumbled" },
      { "label": "Hedgehogs", "value": "140 mm wide, 50 / 66 / 75 mm thick" },
      { "label": "Packing", "value": "One tonne bags" }
    ],
    "placeholderClass": "placeholder-yard"
  }
]

export function getFormat(slug: string): Format | undefined {
  return FORMATS.find((f) => f.slug === slug)
}

export function getPrevFormat(currentRank: number): Format {
  const prevRank = currentRank === 1 ? FORMATS.length : currentRank - 1
  return FORMATS.find((f) => f.rank === prevRank)!
}

export function getNextFormat(currentRank: number): Format {
  const nextRank = currentRank === FORMATS.length ? 1 : currentRank + 1
  return FORMATS.find((f) => f.rank === nextRank)!
}
