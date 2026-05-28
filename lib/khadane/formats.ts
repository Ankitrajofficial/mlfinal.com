// ============================================================
// KHADANE(TM) - Format Catalogue Data
// Source: update.md
// 19 formats, 11 surface treatments, 4 edge profiles
// ============================================================

export interface Format {
  code: string
  rank: number
  slug: string
  name: string
  oneLine: string
  formatHeadline: string
  description: string
  varietyAvailability: number
  exceptions: string[]
  primaryUse: string
  surfacesAvailable: string[]
  edgesAvailable: string[]
  crateDimensions?: string
  crateWeight?: string
  coveragePerCrate?: string
  containerLoading?: string
  placeholderClass: string
}

export const FORMATS: Format[] = [
  {
    "code": "KHF-001",
    "rank": 1,
    "slug": "pavings",
    "name": "Pavings",
    "oneLine": "The volume export. Calibrated and natural, every size the trade asks for.",
    "formatHeadline": "The volume export. Calibrated and natural, every size the trade asks for.",
    "description": "Pavings are the highest-volume format KHADANE ships. The catalogue covers every calibrated single size the UK and EU trade specifies, plus the standard mixed-size patio packs that landscapers order by the crate. Natural hand-cut options sit alongside the calibrated range for buyers who want the unworked edge character.",
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Garden patios and courtyards, Residential driveways (with thickness specification), Public realm pedestrian areas, Pool surrounds and terraces",
    "surfacesAvailable": [
      "natural-riven",
      "honed",
      "sandblast",
      "flamed",
      "rockfaced",
      "sawn",
      "tumbled",
      "brushed",
      "cotton-brush",
      "leather",
      "shotblast"
    ],
    "edgesAvailable": [
      "hand-cut",
      "hand-cut-straight",
      "machine-cut",
      "bullnose"
    ],
    "crateDimensions": "1200 × 1000 × 1000 mm",
    "crateWeight": "1100–1300 kg",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Garden paths and stepping-stone routes, Organic-layout patios, Cottage-garden and naturalistic landscapes, Dry-stone-style paving in heritage contexts",
    "surfacesAvailable": [
      "natural-riven",
      "tumbled",
      "sandblast"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "crateDimensions": "1200 × 1000 × 1000 mm",
    "crateWeight": "1100 kg",
    "coveragePerCrate": "~15 sqm at 25 mm",
    "containerLoading": "~22 crates / 330 sqm per 20-ft",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Residential and commercial driveways, Courtyards and forecourts, Kerbed driveway edges, Fountain and water-feature surrounds",
    "surfacesAvailable": [
      "natural-riven",
      "sawn",
      "tumbled",
      "flamed"
    ],
    "edgesAvailable": [
      "hand-cut",
      "machine-cut"
    ],
    "crateDimensions": "1200 × 1000 × 1000 mm",
    "crateWeight": "1200 kg",
    "coveragePerCrate": "~10 sqm at 50 mm thickness",
    "containerLoading": "~22 crates per 20-ft / ~220 sqm",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Garden walking paths, Lawn routes between features, Pool-side walking surfaces, Japanese-style stepping-stone gardens",
    "surfacesAvailable": [
      "natural-riven",
      "sandblast",
      "tumbled"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Patio centrepiece features, Garden focal areas, Public-realm gathering points, Memorial and commemorative paving",
    "surfacesAvailable": [
      "natural-riven",
      "honed",
      "sandblast",
      "sawn"
    ],
    "edgesAvailable": [
      "hand-cut",
      "machine-cut"
    ],
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Driveway edging, Path-and-lawn separation, Garden-bed boundaries, Public realm pathway edging",
    "surfacesAvailable": [
      "natural-riven",
      "sawn",
      "sandblast",
      "flamed"
    ],
    "edgesAvailable": [
      "hand-cut-straight",
      "machine-cut",
      "bullnose"
    ],
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Pool coping and surrounds, Garden wall capping, Parapet finishing on roof terraces, Architectural step-edge finishing",
    "surfacesAvailable": [
      "natural-riven",
      "honed",
      "sandblast",
      "sawn",
      "flamed"
    ],
    "edgesAvailable": [
      "bullnose",
      "machine-cut"
    ],
    "crateDimensions": "1200 × 1000 × 800 mm",
    "crateWeight": "~1100 kg",
    "coveragePerCrate": "~30 linear metres at standard size",
    "containerLoading": "",
    "placeholderClass": "placeholder-stone-warm"
  },
  {
    "code": "KHF-008",
    "rank": 8,
    "slug": "window-sills",
    "name": "Window Sills",
    "oneLine": "Exterior architectural lengths. Drip-edge profile, mitred or square ends.",
    "formatHeadline": "Exterior architectural lengths. Drip-edge profile, mitred or square ends.",
    "description": "Window sills are exterior architectural lengths sat below window openings. The underside drip groove channels water away from the building face; the top surface holds a fine sawn finish. Standard 1200 mm length; custom on request.",
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Exterior window architecture, Door-frame headers and reveals, Architectural string-course bands, Decorative wall course interruptions",
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
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Heritage building restoration, Architectural entrance surrounds, Temple and institutional doorways, Custom residential entrances",
    "surfacesAvailable": [
      "honed",
      "sandblast",
      "sawn"
    ],
    "edgesAvailable": [
      "machine-cut",
      "bullnose"
    ],
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Garden step risers, Terraced-garden treads, Public-realm staircase treads, Pool-deck step risers",
    "surfacesAvailable": [
      "natural-riven",
      "honed",
      "sandblast",
      "sawn",
      "flamed"
    ],
    "edgesAvailable": [
      "bullnose",
      "machine-cut"
    ],
    "crateDimensions": "1500 × 800 × 800 mm",
    "crateWeight": "~1000 kg",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Heritage building roofing, Rural architectural roofing, Garden buildings and outbuildings, Decorative roof feature courses",
    "surfacesAvailable": [
      "natural-riven"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Coping return pieces, Drainage channel edges, Threshold strips, Custom small architectural parts",
    "surfacesAvailable": [
      "honed",
      "sandblast",
      "sawn",
      "flamed"
    ],
    "edgesAvailable": [
      "hand-cut",
      "machine-cut",
      "bullnose"
    ],
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Garden bed retaining edges, Terraced-bed boundaries, Driveway shoulder edging, Low-rise garden walls",
    "surfacesAvailable": [
      "natural-riven",
      "sandblast",
      "tumbled",
      "flamed"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Garden focal points, Water feature anchors, Natural-look retaining elements, Sculpture-park installations",
    "surfacesAvailable": [
      "natural-riven"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Garden fire features, Outdoor entertaining areas, Pool-side fire pits, Public-realm gathering points",
    "surfacesAvailable": [
      "natural-riven",
      "sandblast",
      "tumbled"
    ],
    "edgesAvailable": [
      "hand-cut"
    ],
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Garden benches and seating, Outdoor dining tables, Stone planters and urns, Custom landscape features",
    "surfacesAvailable": [
      "natural-riven",
      "honed",
      "sandblast",
      "sawn",
      "flamed",
      "tumbled"
    ],
    "edgesAvailable": [
      "hand-cut",
      "machine-cut",
      "bullnose"
    ],
    "crateDimensions": "",
    "crateWeight": "",
    "coveragePerCrate": "",
    "containerLoading": "",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Exterior building facades, Feature interior walls, Garden retaining walls (decorative face), Architectural accent walls",
    "surfacesAvailable": [
      "natural-riven",
      "honed",
      "sandblast",
      "flamed",
      "rockfaced",
      "sawn",
      "brushed",
      "cotton-brush",
      "leather",
      "shotblast"
    ],
    "edgesAvailable": [
      "hand-cut",
      "machine-cut"
    ],
    "crateDimensions": "1200 × 1000 × 800 mm",
    "crateWeight": "~1100 kg",
    "coveragePerCrate": "~25 sqm at 25 mm thickness",
    "containerLoading": "",
    "placeholderClass": "placeholder-stone-warm"
  },
  {
    "code": "KHF-018",
    "rank": 18,
    "slug": "gangsaw-slabs",
    "name": "Gangsaw Slabs",
    "oneLine": "Large-format slabs cut from raw blocks. For custom cladding and bespoke work.",
    "formatHeadline": "Large-format slabs cut from raw blocks. For custom cladding and bespoke work.",
    "description": "Gangsaw slabs are large-format cuts taken directly from raw quarry blocks via the yard's gangsaw line. Buyers specify thickness, and the slab gets cut to size at the destination yard. Used for custom cladding installations, sculpture bases, and bespoke architectural work.",
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Large-format cladding installations, Sculpture and monument bases, Bespoke architectural work, Stockyard inventory for buyers cutting on-site",
    "surfacesAvailable": [
      "sawn",
      "honed",
      "sandblast",
      "flamed"
    ],
    "edgesAvailable": [
      "machine-cut"
    ],
    "crateDimensions": "2500 × 1300 × 600 mm",
    "crateWeight": "~2200 kg per crate",
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
    "varietyAvailability": 23,
    "exceptions": [],
    "primaryUse": "Sculptor and mason yard supply, Architectural restoration projects, In-house dressed-stone production, Custom monumental work",
    "surfacesAvailable": [
      "natural-riven"
    ],
    "edgesAvailable": [],
    "crateDimensions": "",
    "crateWeight": "~4.5–8.5 tonnes per block",
    "coveragePerCrate": "",
    "containerLoading": "2–3 blocks per 20-ft container",
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
