// ============================================================
// KHADANE™ — Format Catalogue Data · v1.0 locked
// 14 formats: #KHF-001 to #KHF-014
// ============================================================

export interface Format {
  code: string                    // #KHF-001
  rank: number                    // 1
  slug: string                    // paving
  name: string                    // Paving
  oneLine: string                 // Hero descriptor
  formatHeadline: string          // Section A headline
  description: string             // Brief description
  varietyAvailability: number     // How many varieties produce in this format
  exceptions: string[]            // Variety codes excluded (e.g. teakwood for paving)
  primaryUse: string              // Primary application
  bsEN?: string                   // BS EN standard reference, if any
  placeholderClass: string
}

export const FORMATS: Format[] = [
  {
    code: '#KHF-001',
    rank: 1,
    slug: 'paving',
    name: 'Paving',
    oneLine: 'The export backbone of Indian sandstone. Produced in twenty varieties.',
    formatHeadline: 'Calibrated. Compliant. Catalogue-deep.',
    description:
      'External paving slabs for residential patios, commercial landscape, civic spaces, and architectural installations. The dominant format for European landscape contracts.',
    varietyAvailability: 20,
    exceptions: ['#KHD-009'],
    primaryUse: 'External paving · residential, commercial, civic',
    bsEN: 'BS EN 1341',
    placeholderClass: 'placeholder-stone-grey',
  },
  {
    code: '#KHF-002',
    rank: 2,
    slug: 'cobbles-and-setts',
    name: 'Cobbles & Setts',
    oneLine: 'Traditional. Trafficked. Catalogue-broad.',
    formatHeadline: 'Traditional. Trafficked. Catalogue-broad.',
    description:
      'Tumbled cobbles and machine-cut setts for driveways, traditional streetscapes, and heritage paving applications.',
    varietyAvailability: 20,
    exceptions: ['#KHD-009'],
    primaryUse: 'Driveways · streetscapes · heritage',
    placeholderClass: 'placeholder-stone',
  },
  {
    code: '#KHF-003',
    rank: 3,
    slug: 'quarry-blocks',
    name: 'Quarry Blocks',
    oneLine: 'Raw. Dimensioned. Containerised.',
    formatHeadline: 'Raw. Dimensioned. Containerised.',
    description:
      'Raw sandstone blocks for further processing at destination. Dimensional blocks shipped FCL to international processors.',
    varietyAvailability: 13,
    exceptions: [],
    primaryUse: 'Raw block export to processing yards',
    placeholderClass: 'placeholder-yard',
  },
  {
    code: '#KHF-004',
    rank: 4,
    slug: 'gangsaw-slabs',
    name: 'Gangsaw Slabs',
    oneLine: 'Large-format. Sawn. Architectural.',
    formatHeadline: 'Large-format. Sawn. Architectural.',
    description:
      'Large-format slabs cut on multi-blade gangsaw for architectural cladding, monumental paving, and high-tolerance applications.',
    varietyAvailability: 21,
    exceptions: [],
    primaryUse: 'Architectural cladding · monumental paving',
    placeholderClass: 'placeholder-stone',
  },
  {
    code: '#KHF-005',
    rank: 5,
    slug: 'floor-and-wall-tiles',
    name: 'Floor & Wall Tiles',
    oneLine: 'Interior. Calibrated. Catalogue-deep.',
    formatHeadline: 'Interior. Calibrated. Catalogue-deep.',
    description:
      'Internal floor and wall tiles for residential interiors, commercial spaces, hospitality, and architectural projects. Calibrated to interior tolerances.',
    varietyAvailability: 20,
    exceptions: ['#KHD-009'],
    primaryUse: 'Interior floors · walls · stairs',
    bsEN: 'BS EN 12058',
    placeholderClass: 'placeholder-stone-warm',
  },
  {
    code: '#KHF-006',
    rank: 6,
    slug: 'wall-cladding',
    name: 'Wall Cladding',
    oneLine: 'Architectural. Profiled. Catalogue-deep.',
    formatHeadline: 'Architectural. Profiled. Dimensional.',
    description:
      'External and internal wall cladding for architectural facades, feature walls, and heritage restoration. Multiple cutting and surface profiles.',
    varietyAvailability: 20,
    exceptions: ['#KHD-009'],
    primaryUse: 'Architectural facades · feature walls',
    placeholderClass: 'placeholder-stone',
  },
  {
    code: '#KHF-007',
    rank: 7,
    slug: 'copings',
    name: 'Copings',
    oneLine: 'Profiled. Calibrated. Weather-locked.',
    formatHeadline: 'Profiled. Calibrated. Weather-locked.',
    description:
      'Pool and wall copings in bullnose, pencil-round, and sawn profiles. Weather-tolerant calibration for outdoor installations.',
    varietyAvailability: 20,
    exceptions: ['#KHD-009'],
    primaryUse: 'Pool copings · wall copings',
    placeholderClass: 'placeholder-stone-warm',
  },
  {
    code: '#KHF-008',
    rank: 8,
    slug: 'kerbstones',
    name: 'Kerbstones',
    oneLine: 'Linear. Traffic-grade. BS EN 1343 compliant.',
    formatHeadline: 'Linear. Traffic-grade. Compliant.',
    description:
      'Traffic-grade kerbstones for streetscapes, civic paving, and heritage districts. Produced from the harder catalogue varieties.',
    varietyAvailability: 8,
    exceptions: [],
    primaryUse: 'Streetscapes · civic paving',
    bsEN: 'BS EN 1343',
    placeholderClass: 'placeholder-stone-grey',
  },
  {
    code: '#KHF-009',
    rank: 9,
    slug: 'steps-and-treads',
    name: 'Steps & Treads',
    oneLine: 'Dimensioned. Calibrated. Riven-faced.',
    formatHeadline: 'Dimensioned. Calibrated. Riven-faced.',
    description:
      'External and internal steps and stair treads. Calibrated thickness, riven or sawn faces, nosed or square profiles.',
    varietyAvailability: 20,
    exceptions: ['#KHD-009'],
    primaryUse: 'Garden steps · staircases',
    placeholderClass: 'placeholder-stone',
  },
  {
    code: '#KHF-010',
    rank: 10,
    slug: 'crazy-paving',
    name: 'Crazy Paving',
    oneLine: 'Irregular. Hand-fit. Heritage-grade.',
    formatHeadline: 'Irregular. Hand-fit. Heritage-grade.',
    description:
      'Random-shape paving for traditional patios, heritage districts, and vernacular landscape work. Hand-selected for fit.',
    varietyAvailability: 20,
    exceptions: ['#KHD-009'],
    primaryUse: 'Traditional patios · heritage districts',
    placeholderClass: 'placeholder-stone',
  },
  {
    code: '#KHF-011',
    rank: 11,
    slug: 'palisades-and-edging',
    name: 'Palisades & Edging',
    oneLine: 'Vertical. Linear. Landscape-defining.',
    formatHeadline: 'Vertical. Linear. Landscape-defining.',
    description:
      'Stone palisades and edging units for garden boundaries, retaining walls, and landscape definition.',
    varietyAvailability: 20,
    exceptions: ['#KHD-009'],
    primaryUse: 'Garden boundaries · landscape edging',
    placeholderClass: 'placeholder-stone-warm',
  },
  {
    code: '#KHF-012',
    rank: 12,
    slug: 'circles',
    name: 'Circles',
    oneLine: 'Radial. Patterned. Patio-focal.',
    formatHeadline: 'Radial. Patterned. Patio-focal.',
    description:
      'Pre-cut circular paving patterns for patio centrepieces. Available in standard and custom diameters.',
    varietyAvailability: 20,
    exceptions: ['#KHD-009'],
    primaryUse: 'Patio centrepieces · garden focal',
    placeholderClass: 'placeholder-stone',
  },
  {
    code: '#KHF-013',
    rank: 13,
    slug: 'boulders',
    name: 'Boulders',
    oneLine: 'Natural. Graded. Landscape-scaled.',
    formatHeadline: 'Natural. Graded. Landscape-scaled.',
    description:
      'Natural and split boulders for landscape design, garden rockwork, and ornamental placement. Graded by size and shape.',
    varietyAvailability: 21,
    exceptions: [],
    primaryUse: 'Landscape design · garden rockwork',
    placeholderClass: 'placeholder-yard',
  },
  {
    code: '#KHF-014',
    rank: 14,
    slug: 'garden-accessories',
    name: 'Garden Accessories',
    oneLine: 'Custom. Crafted. Garden-specific.',
    formatHeadline: 'Custom. Crafted. Garden-specific.',
    description:
      'Stone planters, water features, bird baths, troughs, and custom garden elements. All hand-finished.',
    varietyAvailability: 21,
    exceptions: [],
    primaryUse: 'Planters · water features · custom garden',
    placeholderClass: 'placeholder-stone-warm',
  },
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
