/**
 * ============================================================
 * FACTS-CANONICAL · MLS + KHADANE™ · v2.0 SEALED
 * ============================================================
 *
 * THIS IS THE SINGLE SOURCE OF TRUTH FOR BOTH SITES.
 *
 * Per build prompt §4.9: any fact hardcoded outside this file
 * is a bug. The audit script (scripts/audit-facts.ts) verifies
 * that no digit-strings or claim-strings appear elsewhere that
 * aren't sourced from FACTS.
 *
 * Mirrors FACTS-CANONICAL.md v2.0. To update a fact:
 *   1. Update FACTS-CANONICAL.md FIRST (signed off by Rahul)
 *   2. Update this file to match
 *   3. Run `npm run audit:facts` to verify cross-site consistency
 *
 * Last updated: May 2026
 * ============================================================
 */

// ─── SECTION 1: ENTITY ARCHITECTURE ─────────────────────────

export const ENTITIES = {
  family: 'Dhakar Family',
  group: {
    name: 'Mohan Lal & Sons',
    acronym: 'MLS',
  },
  dsg: {
    name: 'Dhakar Stones Group',
    acronym: 'DSG',
  },
  dsi: {
    name: 'Dhakar Stone Impex',
    acronym: 'DSI',
  },
  khadane: {
    name: 'KHADANE™',
    short: 'KHADANE',
  },
  vyanjanam: {
    brand: 'Vyanjanam',
    vehicle: 'Divine Food Services',
  },
  divineDining: 'Divine Dining',
  m3: {
    hotel: 'M3 Boutique Hotel',
    miniMall: 'M3 Mini Mall',
  },
  dhakarMotors: 'Dhakar Motors',
  dharnidharFuels: 'Dharnidhar Fuels',
  girlsResidences: [
    { name: 'The Princess', established: 2018, beds: 'over 200' },
    { name: 'Victoria Palace', established: 2023, beds: 'over 120' },
  ],
  boysPGs: ['PG Dhakar Residency', 'Dhakar Associates', 'Radhe Krishna Residency'],
  footerSignature: 'A Dhakar family enterprise.',
  retired: ['MONOLITH India'], // NEVER reference these
} as const

// Cross-site cross-link copy (locked v2.0)
export const CROSS_LINKS = {
  mlsToKhadane:
    'Stone and export is operated under KHADANE™, the trade-facing brand of the group.',
  khadaneToMls:
    'Part of Mohan Lal & Sons — the operating group behind KHADANE™. Five verticals. One family. Since 1972.',
} as const

// ─── SECTION 2: FOUNDING & GENERATIONS ──────────────────────

export const FOUNDING = {
  groupYear: 1972,
  stoneYear: 1972, // UNIFIED — family + stone same year (no 1980 split)
  currentYear: 2026,
  yearsEvergreen: 'Since 1972',
  yearsCount: 54, // 1972 → 2026 (ages annually; prefer "Since 1972")
  generations: 'Three generations',
  generationsNumeric: '03',
  bijoliaInscriptionsYears: 854, // ~1172 CE Bijolia rock inscriptions; KHADANE side only
  directExportFraming:
    'Indirect exports for over 25 years. Direct buyer-to-buyer export consolidated under KHADANE™ from 2026.',
  indirectExportYears: '25+ years of indirect exports',
} as const

// ─── SECTION 3: OPERATIONAL SCALE — KHADANE ─────────────────

export const KHADANE_SCALE = {
  // CLAIMED PUBLICLY (scale-of-reach figures):
  quarries: '100+',
  annualOutput: 'Over 2 million sq.m',
  workforce: '500+', // CORRECTED v2.0 from 1,200+. Distinct from MLS group's 1,000+.
  countries: '20+ countries',
  continents: '4 continents',

  // INTERNAL ONLY (catalogue counts — NEVER claimed publicly):
  internalProcessingUnits: 3,
  publicProcessingPhrase: 'Multiple in-house processing units',
  internalVarietyCount: 21,
  internalOwnedCount: 12,
  internalAlliedCount: 9,
  internalFormatCount: 14,

  port: 'Mundra', // KHADANE only; NEVER on MLS site
  portFallbackForMLS: 'major Indian sea ports', // canonical MLS phrasing
} as const

// ─── SECTION 4: OPERATIONAL SCALE — MLS ─────────────────────

export const MLS_SCALE = {
  verticals: 5,
  verticalsDisplay: '05 verticals',
  familyMembers: '50+',
  groupWorkforce: '1,000+ across group',
  generations: '03 generations',
  indirectExportYears: '25+ years of indirect exports',
  vyanjanamDailyMeals: '1,000+ daily meals',
  vyanjanamStudentsServed: 'Over five hundred students',
  studentHousingTotal: 'Over 570 across portfolio',
  girlsCampusTotal: 'Over 320 beds',
  boysTotal: 'Over 250 male students',
  m3Rooms: 'Boutique scale', // PUBLIC claim language (replaces "Forty rooms")
  m3RoomsInternal: 40, // Internal data only
  m3Opened: 2016,
  dhakarMotorsOpened: 2013,
  dharnidharStations: 'Two stations',
  vyanjanamFounded: 2023,
  princessOpened: 2018,
  victoriaOpened: 2023,
  girlsCampusAge: '8 years as of 2026',
  girlsToAllenWalk: '5-10 minute walk',
  vyanjanamClosure: '15th of every month',
  vegSourcingPct: '50-60% from own farms, rest from trusted vendors',
  dairyChain:
    "Bijolia family dairy → Kota home → Rahul Ji's mother's buttermilk → Vyanjanam AND Divine Dining",
  milanJiTenureStart: 2015,
  milanJiPoeticPhrase: "since the family's first student-housing year",
  milanJiDirectPhrase: 'since 2015',
} as const

// ─── SECTION 5: VERTICALS ───────────────────────────────────

export const VERTICALS = [
  {
    slug: 'stone-export',
    title: 'Stone & Export',
    brand: 'KHADANE™',
    treatment: 'bridge', // links to khadane.com
    framing: 'The founding vertical. Still the largest.',
  },
  {
    slug: 'automotive-fuel',
    title: 'Automotive & Fuel',
    brand: 'Dhakar Motors + Dharnidhar Fuels',
    treatment: 'full',
    framing: 'A strategic expansion. From the family\'s own fleet outward.',
  },
  {
    slug: 'hospitality',
    title: 'Hospitality',
    brand: 'M3 Boutique Hotel + M3 Mini Mall',
    treatment: 'full',
    framing: 'A strategic expansion. Into Kota, for the families.',
  },
  {
    slug: 'student-housing',
    title: 'Student Housing',
    brand: 'The Princess + Victoria Palace + 3 PGs',
    treatment: 'full+depth',
    framing: 'A strategic expansion. Into where the students live.',
  },
  {
    slug: 'food-services',
    title: 'Food Services',
    brand: 'Vyanjanam + Divine Dining',
    treatment: 'full',
    framing:
      'A strategic expansion. For the lakhs who came for the exams, and the meal that comes before the exam.',
  },
] as const

// ─── SECTION 6: LOCATIONS ───────────────────────────────────

export const LOCATIONS = {
  bijolia: {
    lat: 25.176,
    lng: 75.342,
    coords: '25°09′N · 75°19′E',
    role: 'MLS/KHADANE family home + quarry base + dairy farm + Dharnidhar Fuels',
    district: 'Bhilwara District',
    state: 'Rajasthan',
  },
  kota: {
    lat: 25.182,
    lng: 75.838,
    coords: '25°11′N · 75°50′E',
    role: 'Kunhari campus location',
    state: 'Rajasthan',
  },
  kunhari: 'Kunhari (Kota neighbourhood) — ALL MLS Kota operations',
  mundra: {
    lat: 22.74,
    lng: 69.7,
    coords: '22°44′N · 69°42′E',
    role: 'KHADANE port of loading ONLY',
    state: 'Gujarat',
  },
  dhakarMotorsLocation: 'Dabi, Bundi District, Rajasthan',
  dharnidharFuelsLocation: 'NH 27, near Nala-ke-Mataji Deogarh',
  bijoliaOfficeAddress: {
    street: 'NH-27, Beejoliya Kalan',
    city: 'Beejoliya',
    state: 'Rajasthan',
    pin: '311602',
    country: 'India',
  },
  teakwoodOrigin: 'Khatu, Nagaur, Rajasthan',

  // Walking-distance discipline
  walkingDistanceClaim: 'Allen Career Institute', // ONLY this coaching brand
  walkingDistanceForbidden: ['Resonance', 'Bansal', 'Vibrant Academy'],

  stoneOriginDistricts: {
    rajasthan: ['Bhilwara', 'Bundi', 'Kota', 'Nagaur', 'Jodhpur', 'Dholpur', 'Jaisalmer'],
    madhyaPradesh: ['Sagar'],
    uttarPradesh: ['Lalitpur'],
  },
} as const

// ─── SECTION 7: STONE VARIETIES (21 names, sealed v2.0) ─────

export type VarietyTier = 'owned' | 'allied'

export interface VarietyMeta {
  rank: number
  code: string // #KHD-NNN-MNEMONIC
  slug: string
  name: string
  tier: VarietyTier
  note?: string
}

export const VARIETIES: readonly VarietyMeta[] = [
  // 12 OWNED & OPERATED — greens distributed at #3, #5, #7
  { rank: 1, code: '#KHD-001-KDG', slug: 'kandla-grey', name: 'Kandla Grey', tier: 'owned' },
  { rank: 2, code: '#KHD-002-AUB', slug: 'autumn-brown', name: 'Autumn Brown', tier: 'owned' },
  {
    rank: 3,
    code: '#KHD-003-SGN',
    slug: 'sage-green',
    name: 'Sage Green',
    tier: 'owned',
    note: 'Renamed from Raj Green',
  },
  { rank: 4, code: '#KHD-004-RAW', slug: 'raveena-white', name: 'Raveena White', tier: 'owned' },
  {
    rank: 5,
    code: '#KHD-005-RJB',
    slug: 'raj-blend',
    name: 'Raj Blend',
    tier: 'owned',
    note: 'Moved up — commercial prominence',
  },
  { rank: 6, code: '#KHD-006-CMD', slug: 'camel-dust', name: 'Camel Dust', tier: 'owned' },
  { rank: 7, code: '#KHD-007-GRG', slug: 'garda-green', name: 'Garda Green', tier: 'owned' },
  { rank: 8, code: '#KHD-008-FSM', slug: 'fossil-mint', name: 'Fossil Mint', tier: 'owned' },
  { rank: 9, code: '#KHD-009-RNB', slug: 'rainbow', name: 'Rainbow', tier: 'owned' },
  { rank: 10, code: '#KHD-010-DTN', slug: 'dual-tone', name: 'Dual Tone', tier: 'owned' },
  { rank: 11, code: '#KHD-011-KSR', slug: 'kaansiya-red', name: 'Kaansiya Red', tier: 'owned' },
  {
    rank: 12,
    code: '#KHD-012-SLG',
    slug: 'slate-grey',
    name: 'Slate Grey',
    tier: 'owned',
    note: 'Moved from Allied → Owned v2.0',
  },

  // 9 ALLIED
  { rank: 13, code: '#KHD-013-AGR', slug: 'agra-red', name: 'Agra Red', tier: 'allied' },
  {
    rank: 14,
    code: '#KHD-014-JDC',
    slug: 'jodhpur-chittar',
    name: 'Jodhpur Chittar',
    tier: 'allied',
  },
  {
    rank: 15,
    code: '#KHD-015-JSY',
    slug: 'jaisalmer-yellow',
    name: 'Jaisalmer Yellow',
    tier: 'allied',
  },
  { rank: 16, code: '#KHD-016-DHP', slug: 'dholpur-pink', name: 'Dholpur Pink', tier: 'allied' },
  { rank: 17, code: '#KHD-017-DHB', slug: 'dholpur-beige', name: 'Dholpur Beige', tier: 'allied' },
  { rank: 18, code: '#KHD-018-SGB', slug: 'sagar-black', name: 'Sagar Black', tier: 'allied' },
  {
    rank: 19,
    code: '#KHD-019-LPY',
    slug: 'lalitpur-yellow',
    name: 'Lalitpur Yellow',
    tier: 'allied',
  },
  { rank: 20, code: '#KHD-020-MNR', slug: 'mandana-red', name: 'Mandana Red', tier: 'allied' },
  {
    rank: 21,
    code: '#KHD-021-TKW',
    slug: 'teakwood',
    name: 'Teakwood',
    tier: 'allied',
    note: 'Moved from Owned → Allied v2.0 (partner quarry at Khatu, Nagaur)',
  },
]

// ─── SECTION 8: STONE FORMATS (14, sealed v2.0) ─────────────

export interface FormatMeta {
  rank: number
  code: string // #KHF-NNN-MNEMONIC
  slug: string
  name: string
  primaryUse: string
  // NOTE: BS EN standards REMOVED v2.0 — no documentation on file
}

export const FORMATS: readonly FormatMeta[] = [
  {
    rank: 1,
    code: '#KHF-001-PAV',
    slug: 'paving',
    name: 'Paving',
    primaryUse: 'External paving — residential, commercial, civic',
  },
  {
    rank: 2,
    code: '#KHF-002-CBS',
    slug: 'cobbles-and-setts',
    name: 'Cobbles & Setts',
    primaryUse: 'Driveways · streetscapes · heritage',
  },
  {
    rank: 3,
    code: '#KHF-003-QBL',
    slug: 'quarry-blocks',
    name: 'Quarry Blocks',
    primaryUse: 'Raw block export to processing yards',
  },
  {
    rank: 4,
    code: '#KHF-004-GSL',
    slug: 'gangsaw-slabs',
    name: 'Gangsaw Slabs',
    primaryUse: 'Architectural cladding · monumental paving',
  },
  {
    rank: 5,
    code: '#KHF-005-FWT',
    slug: 'floor-and-wall-tiles',
    name: 'Floor & Wall Tiles',
    primaryUse: 'Interior floors · walls · stairs',
  },
  {
    rank: 6,
    code: '#KHF-006-WCL',
    slug: 'wall-cladding',
    name: 'Wall Cladding',
    primaryUse: 'Architectural facades · feature walls',
  },
  {
    rank: 7,
    code: '#KHF-007-COP',
    slug: 'copings',
    name: 'Copings',
    primaryUse: 'Pool copings · wall copings',
  },
  {
    rank: 8,
    code: '#KHF-008-KRB',
    slug: 'kerbstones',
    name: 'Kerbstones',
    primaryUse: 'Streetscapes · civic paving',
  },
  {
    rank: 9,
    code: '#KHF-009-STT',
    slug: 'steps-and-treads',
    name: 'Steps & Treads',
    primaryUse: 'Garden steps · staircases',
  },
  {
    rank: 10,
    code: '#KHF-010-CRP',
    slug: 'crazy-paving',
    name: 'Crazy Paving',
    primaryUse: 'Traditional patios · heritage districts',
  },
  {
    rank: 11,
    code: '#KHF-011-PAE',
    slug: 'palisades-and-edging',
    name: 'Palisades & Edging',
    primaryUse: 'Garden boundaries · landscape edging',
  },
  {
    rank: 12,
    code: '#KHF-012-CIR',
    slug: 'circles',
    name: 'Circles',
    primaryUse: 'Patio centrepieces · garden focal',
  },
  {
    rank: 13,
    code: '#KHF-013-BLD',
    slug: 'boulders',
    name: 'Boulders',
    primaryUse: 'Landscape design · garden rockwork',
  },
  {
    rank: 14,
    code: '#KHF-014-GDA',
    slug: 'garden-accessories',
    name: 'Garden Accessories',
    primaryUse: 'Planters · water features · custom garden',
  },
]

// ─── SECTION 9: PEOPLE NAMED PUBLICLY ───────────────────────

export interface FamilyMember {
  name: string
  honorific: 'Shri' | 'Mr.' | 'Mrs.'
  generation: 'G1' | 'G2' | 'G3'
  mlsRole: string
  khadaneRole?: string // Only set if named on KHADANE side
}

export const FAMILY: readonly FamilyMember[] = [
  // G1
  {
    name: 'Bhura Lal Dhakar',
    honorific: 'Shri',
    generation: 'G1',
    mlsRole: 'Founding Force (elder brother)',
  },
  {
    name: 'Mohan Lal Dhakar',
    honorific: 'Shri',
    generation: 'G1',
    mlsRole: 'Founder of MLS (younger brother, namesake)',
  },

  // G2 (all at quarry every working day)
  {
    name: 'Jagdish Chandra Dhakar',
    honorific: 'Mr.',
    generation: 'G2',
    mlsRole: 'THE CENTRE — daily cross-vertical anchor',
    khadaneRole: 'Cross-vertical anchor · senior escalations',
  },
  {
    name: 'Rajesh Dhakar',
    honorific: 'Mr.',
    generation: 'G2',
    mlsRole: 'Automotive · Fuel · Fleet · Stone Transport',
    khadaneRole: 'Stone transport logistics',
  },
  {
    name: 'Manoj Kumar Dhakar',
    honorific: 'Mr.',
    generation: 'G2',
    mlsRole: 'Quarry floor (primary KHADANE-side)',
    khadaneRole: 'Quarry floor (primary) · site operations · quality verification',
  },
  {
    name: 'Sanjay Dhakar',
    honorific: 'Mr.',
    generation: 'G2',
    mlsRole: 'Land · Property · Dispatch · Cross-vertical',
    khadaneRole: 'Dispatch · property · loading logistics',
  },

  // G3
  {
    name: 'Rahul Dhakar',
    honorific: 'Mr.',
    generation: 'G3',
    mlsRole:
      'CEO · Exports · Strategy · operational lead Hospitality + Food Services + KHADANE Exports',
    khadaneRole: 'Founder · Exports (primary commercial interface)',
  },
  {
    name: 'Mahak Dhakar',
    honorific: 'Mrs.',
    generation: 'G3',
    mlsRole: 'Cross-vertical Creative Director · M3 · Vyanjanam creative & experience',
    khadaneRole: 'Brand · creative · catalogues',
  },
  {
    name: 'Rohan Dhakar',
    honorific: 'Mr.',
    generation: 'G3',
    mlsRole:
      'Food Services Co-Founder (Vyanjanam) + Student Housing ops · "Founder Behind the Flavour" · trained chef · BBA Entrepreneurship',
    khadaneRole: 'Allied variety sourcing · partner-quarry network',
  },
  {
    name: 'Rohit Dhakar',
    honorific: 'Mr.',
    generation: 'G3',
    mlsRole: 'Cross-vertical ops — Vyanjanam + stone processing + Student Housing',
    khadaneRole:
      'General cross-vertical KHADANE ops · supports Rahul + Manoj across multiple functions',
  },
  {
    name: 'Rishabh Dhakar',
    honorific: 'Mr.',
    generation: 'G3',
    mlsRole: 'Future CFO (post-CA)',
    // No KHADANE role — Rishabh remains MLS-only
  },
]

// Next Wave (children's tier, named on legacy page only)
export const NEXT_WAVE = ['Parth', 'Simran', 'Samriddhi', 'Tanvi'] as const

// Institutional partner with family standing (non-blood, named publicly)
export const INSTITUTIONAL_PARTNER = {
  name: 'Milan Ji Sharma',
  honorific: 'Mr.',
  tenureStart: 2015,
  tenureYears: 11,
  poeticPhrase: "since the family's first student-housing year",
  directPhrase: 'since 2015',
  role: 'Execution backbone · anchors Vyanjanam + Divine Dining · family standing, 11 years',
} as const

// ─── SECTION 10: PHONES & EMAILS ────────────────────────────

export const CONTACT = {
  // Phones
  groupMain: '+91 98285 71143', // MLS Group + Dharnidhar Fuels + KHADANE v1 public phone
  rajeshDhakarMotors: '+91 97833 04510',
  vyanjanamReception: '+91 84468 81643', // SHARED with M3 Hotel Reception (both in Kunhari)
  m3HotelReception: '+91 84468 81643', // SHARED with Vyanjanam Reception (operational truth)
  vyanjanamTiffinDelivery: '+91 70732 81643',
  girlsCampus: '+91 83064 81143', // The Princess + Victoria Palace
  boysCampusAlternates: ['+91 63500 53128', '+91 82094 98513'],
  boysCampusPresentation:
    'Reach the boys\' campus at +91 63500 53128 or +91 82094 98513',

  // WhatsApp (same for both sites)
  whatsapp: '919828571143',
  whatsappUrl: 'https://wa.me/919828571143',

  // Emails (single-channel discipline)
  officeMLS: 'office@mohanlalsonsgroup.com',
  exportsKhadane: 'exports@khadane.com',
  exportsMLSFallback: 'exports@mohanlalsonsgroup.com',

  // Operating hours
  hours: 'Monday–Saturday · 9 AM – 7 PM IST',
  hoursKhadane: 'Monday–Saturday · 10:00–18:00 IST',
  girlsCampusVisitingHours: '10 AM – 9 PM IST',
  slaStandard: 'within one business day',
  slaHospitality: 'within a few hours during business days',

  // Reference number prefixes (build prompt §4.4)
  refPrefixMLS: 'MLS-ENQ',
  refPrefixKhadane: 'KHD-ENQ',
} as const

// ─── SECTION 11: CLAIM RESTRICTIONS ─────────────────────────

export const CLAIMS = {
  // ❌ NEVER claim without documentation
  forbidden: {
    iso: 'ISO 9001:2015',
    ce: 'CE marking',
    eti: 'ETI (Ethical Trading Initiative)',
    bsEnRemoved: ['BS EN 1341', 'BS EN 12058', 'BS EN 1343'], // Removed v2.0
    registered: 'Registered company status',
  },

  // ✅ Claims approved with documentation
  approved: {
    fssaiVyanjanam: 'FSSAI certified',
  },

  // Editorial restrictions (always apply)
  editorial: {
    noPricing: true, // Applies to ALL public site copy, including Vyanjanam
    noMOQ: true,
    noFreightTerms: true,
    noContainerDetails: true,
    noLeadTimes: true,
    noEmDashesInConversational: true,
    noVillageStoneOrigins: true,
    noGenerationalOnKhadane: true,
    noStaleYears: true,
    onlyAllenWalkingDistance: true,
  },
} as const

// ─── SECTION 12: EDITORIAL SIGNATURE LINES ──────────────────

export const SIGNATURE_LINES = {
  readByFamily: 'Read by the family',
  readByFamilyBeforePublication: 'Read by the family before publication',
  editedByNoOne: 'Edited by no one',
  notCuratedHighlights: 'Not curated highlights, not edited for tone',
  workAsItAppears: 'The work, as it appears',
  daughtersUnderOurRoof:
    "A daughter under our roof is treated as one of the family's own.",
  foodAndHumanDignity:
    "The food industry, in this family's reading, is where human dignity is honoured or not.",
  familySignatureOnly: '— The Dhakar Family', // ONLY used at /student-housing/girls/ Section 06
} as const

// ─── HELPERS ────────────────────────────────────────────────

export function getVariety(slug: string): VarietyMeta | undefined {
  return VARIETIES.find((v) => v.slug === slug)
}

export function getFormat(slug: string): FormatMeta | undefined {
  return FORMATS.find((f) => f.slug === slug)
}

export function getOwnedVarieties(): readonly VarietyMeta[] {
  return VARIETIES.filter((v) => v.tier === 'owned')
}

export function getAlliedVarieties(): readonly VarietyMeta[] {
  return VARIETIES.filter((v) => v.tier === 'allied')
}

export function getKhadaneFamilyRoster(): readonly FamilyMember[] {
  return FAMILY.filter((m) => m.khadaneRole !== undefined)
}

export function getMlsFamilyRoster(): readonly FamilyMember[] {
  return FAMILY // All family members appear on MLS
}

export function formatFamilyName(m: FamilyMember): string {
  return `${m.honorific} ${m.name}`
}
