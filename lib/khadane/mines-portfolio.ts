/**
 * Mines portfolio — public catalogue + admin store bridge.
 * Public pages only expose mines with publicVisible !== false.
 */

import { normalizeMine, normalizeMines } from '@/lib/admin/mine-normalize'
import type { AdminMine } from '@/lib/admin/types'
import { LOCATIONS, FOUNDING } from '@/lib/facts'

function now() {
  return new Date().toISOString()
}

/** Fallback catalogue when store is empty / unavailable */
export const MINES_PORTFOLIO_FALLBACK: AdminMine[] = [
  normalizeMine({
    id: 'mine_bijolia_main',
    slug: 'bijolia-quarry-base',
    code: 'MN-BIJ-001',
    name: 'Bijolia quarry base',
    tagline: 'Founding face of the family stone vertical.',
    description:
      'The working heart of KHADANE™ operations in Bijolia — extraction, family HQ, and the yard corridor that feeds Mundra export.',
    material: 'Sandstone',
    stoneTypes: ['Kandla Grey', 'Autumn Brown', 'Sage Green', 'Raj Blend'],
    samples: [
      {
        id: 's1',
        name: 'Kandla Grey — calibrated paving',
        stoneType: 'Kandla Grey',
        finish: 'Natural cleft / calibrated',
        size: '600×900 · 22mm',
        description: 'Flagship export paving tone for UK & EU trade.',
        imageUrl: '/img/varieties/kandla-grey/slab-face.jpg',
      },
      {
        id: 's2',
        name: 'Autumn Brown — slab',
        stoneType: 'Autumn Brown',
        finish: 'Natural / sandblasted',
        size: 'Gangsaw sample',
        description: 'Warm brown face for cladding and monumental work.',
        imageUrl: '/img/varieties/autumn-brown/slab-face.jpg',
      },
      {
        id: 's3',
        name: 'Sage Green — tile',
        stoneType: 'Sage Green',
        finish: 'Honed',
        size: '300×300',
        description: 'Green belt tone (formerly traded as Raj Green in some markets).',
        imageUrl: '/img/varieties/sage-green/slab-face.jpg',
      },
    ],
    district: 'Bhilwara',
    state: 'Rajasthan',
    address: `${LOCATIONS.bijoliaOfficeAddress.street}, Beejoliya`,
    lat: LOCATIONS.bijolia.lat,
    lng: LOCATIONS.bijolia.lng,
    status: 'active',
    ownership: 'owned',
    capacity: 'Multi-variety · primary base',
    annualOutput: 'Largest share of group stone output',
    headcount: '180+',
    workforce: '180+ on face, yard & logistics',
    revenue: '₹148 Cr',
    revenuePeriod: 'FY 2025–26 (illustrative portfolio)',
    areaHa: 'Core belt holding',
    yearOpened: String(FOUNDING.groupYear),
    equipment: 'Excavators · compressors · block handlers · yard calibration feed',
    certifications: 'Trade export documentation via Mundra corridor',
    safetyNotes: 'Monsoon cover protocol; covered stock rotation',
    accessNotes: 'NH-27 corridor · yard + HQ colocated',
    roadCondition: 'All-weather',
    nearestTown: 'Beejoliya Kalan',
    contactName: 'Yard operations',
    varieties: 'Kandla Grey, Autumn Brown, Sage Green, Raj Blend',
    notes: 'Family home + quarry base',
    primaryImage: '/img/gallery/quarry/working-face-dawn.jpg',
    publicVisible: true,
    showRevenuePublic: true,
    createdAt: now(),
    updatedAt: now(),
    createdBy: 'System',
  }),
  normalizeMine({
    id: 'mine_bundi_belt',
    slug: 'bundi-belt-sandstone',
    code: 'MN-BUN-002',
    name: 'Bundi belt — sandstone face',
    tagline: 'High-volume paving block corridor near Dabi logistics.',
    description:
      'Active sandstone face on the Bundi belt, linked to the Dhakar Motors / fleet logistics corridor for stone transport.',
    material: 'Sandstone',
    stoneTypes: ['Autumn Brown', 'Raj Blend', 'Kandla Grey'],
    samples: [
      {
        id: 's1',
        name: 'Raj Blend — sett sample',
        stoneType: 'Raj Blend',
        finish: 'Hand-cut',
        size: 'Cobble / sett lot',
        description: 'Blend tone popular for driveways and civic setts.',
        imageUrl: '/img/varieties/raj-blend/slab-face.jpg',
      },
      {
        id: 's2',
        name: 'Autumn Brown — block face',
        stoneType: 'Autumn Brown',
        finish: 'Natural',
        size: 'Quarry block face',
        description: 'Primary brown extraction for paving lines.',
        imageUrl: '/img/varieties/autumn-brown/slab-face.jpg',
      },
    ],
    district: 'Bundi',
    state: 'Rajasthan',
    address: 'Bundi district quarry belt',
    lat: 25.43,
    lng: 75.64,
    status: 'active',
    ownership: 'owned',
    capacity: 'High-volume paving blocks',
    annualOutput: 'Strong paving throughput',
    headcount: '90+',
    workforce: '90+ quarry & transport crew',
    revenue: '₹52 Cr',
    revenuePeriod: 'FY 2025–26 (illustrative portfolio)',
    areaHa: 'Belt holding',
    yearOpened: '1990s expansion',
    equipment: 'Drills · loaders · tippers',
    certifications: '—',
    safetyNotes: 'Dust & summer heat protocols',
    accessNotes: 'Link road from Dabi corridor',
    roadCondition: 'Fair · dust in summer',
    nearestTown: 'Dabi',
    varieties: 'Autumn Brown, Raj Blend, Kandla Grey',
    primaryImage: '/img/gallery/quarry/block-lift.jpg',
    publicVisible: true,
    showRevenuePublic: true,
    createdAt: now(),
    updatedAt: now(),
    createdBy: 'System',
  }),
  normalizeMine({
    id: 'mine_kota_edge',
    slug: 'kota-inspection-yard',
    code: 'MN-KOT-003',
    name: 'Kota edge — inspection yard',
    tagline: 'Calibration, hand-picking and export staging.',
    description:
      'Not a primary extraction face — the Kota-edge yard stages calibrated lots, hand-picking, and inspection before Mundra.',
    material: 'Sandstone / calibration',
    stoneTypes: ['Calibrated paving lots', 'Hand-picked premium sorts'],
    samples: [
      {
        id: 's1',
        name: 'Calibrated paving crate sample',
        stoneType: 'Mixed calibrated',
        finish: 'Calibrated',
        size: 'Export crate sample',
        description: 'Quality gate sample from inspection line.',
        imageUrl: '/img/yard-calibration.jpg',
      },
    ],
    district: 'Kota',
    state: 'Rajasthan',
    address: 'Kunhari logistics spillover',
    lat: LOCATIONS.kota.lat,
    lng: LOCATIONS.kota.lng,
    status: 'seasonal',
    ownership: 'owned',
    capacity: 'Staging + inspection',
    annualOutput: 'Throughput yards, not raw extraction',
    headcount: '40+',
    workforce: '40+ inspection & packing',
    revenue: '₹18 Cr',
    revenuePeriod: 'FY 2025–26 (illustrative · staging value-add)',
    yearOpened: '2010s',
    equipment: 'Calibration lines · sorting tables · packing',
    accessNotes: 'Near Kunhari campus operations',
    roadCondition: 'Good',
    nearestTown: 'Kunhari',
    primaryImage: '/img/yard-calibration.jpg',
    publicVisible: true,
    showRevenuePublic: true,
    createdAt: now(),
    updatedAt: now(),
    createdBy: 'System',
  }),
  normalizeMine({
    id: 'mine_khatu_teak',
    slug: 'khatu-teakwood-partner',
    code: 'MN-NAG-004',
    name: 'Khatu partner face (Teakwood)',
    tagline: 'Allied Teakwood supply from Nagaur.',
    description:
      'Partner-operated face at Khatu, Nagaur — Teakwood sandstone under allied arrangement, hauled to Bijolia yard.',
    material: 'Sandstone · Teakwood',
    stoneTypes: ['Teakwood'],
    samples: [
      {
        id: 's1',
        name: 'Teakwood — grain sample',
        stoneType: 'Teakwood',
        finish: 'Natural cleft',
        size: 'Paving sample',
        description: 'Linear grain characteristic of Teakwood sandstone.',
        imageUrl: '/img/varieties/teakwood/slab-face.jpg',
      },
    ],
    district: 'Nagaur',
    state: 'Rajasthan',
    address: LOCATIONS.teakwoodOrigin,
    lat: 27.14,
    lng: 74.32,
    status: 'allied',
    ownership: 'allied',
    capacity: 'Allied partner supply',
    annualOutput: 'Partner-scheduled lots',
    headcount: 'Partner crew',
    workforce: 'Partner crew (allied)',
    revenue: '₹12 Cr',
    revenuePeriod: 'FY 2025–26 (illustrative · allied offtake)',
    yearOpened: 'Allied programme',
    equipment: 'Partner-operated',
    accessNotes: 'Long haul to Bijolia yard',
    roadCondition: 'Highway + district road',
    nearestTown: 'Khatu',
    varieties: 'Teakwood',
    primaryImage: '/img/varieties/teakwood/slab-face.jpg',
    publicVisible: true,
    showRevenuePublic: true,
    createdAt: now(),
    updatedAt: now(),
    createdBy: 'System',
  }),
  normalizeMine({
    id: 'mine_jaisalmer_edge',
    slug: 'jaisalmer-yellow-prospect',
    code: 'MN-JAI-005',
    name: 'Jaisalmer belt — prospect',
    tagline: 'Yellow sandstone under evaluation.',
    description:
      'Long-range prospect on the Jaisalmer yellow belt — survey and sample phase for future offtake planning.',
    material: 'Yellow sandstone',
    stoneTypes: ['Yellow / buff sandstone'],
    samples: [
      {
        id: 's1',
        name: 'Yellow buff — survey chip',
        stoneType: 'Yellow sandstone',
        finish: 'Natural',
        size: 'Survey sample',
        description: 'Colour reference from prospect walk.',
        imageUrl: '/img/gallery/quarry/dust-haze.jpg',
      },
    ],
    district: 'Jaisalmer',
    state: 'Rajasthan',
    address: 'Jaisalmer stone belt (survey)',
    lat: 26.91,
    lng: 70.91,
    status: 'development',
    ownership: 'prospect',
    capacity: 'Under evaluation',
    annualOutput: 'Pre-commercial',
    headcount: 'Survey team',
    workforce: 'Survey / field team',
    revenue: '—',
    revenuePeriod: 'Pre-revenue prospect',
    yearOpened: 'Survey active',
    equipment: 'Survey kit',
    accessNotes: 'Long desert corridor · plan fuel stops',
    roadCondition: 'Variable',
    nearestTown: 'Jaisalmer',
    primaryImage: '/img/gallery/quarry/dust-haze.jpg',
    publicVisible: true,
    showRevenuePublic: false,
    createdAt: now(),
    updatedAt: now(),
    createdBy: 'System',
  }),
]

export async function getMinesPortfolio(options?: {
  publicOnly?: boolean
}): Promise<AdminMine[]> {
  const publicOnly = options?.publicOnly !== false
  try {
    const { readStore } = await import('@/lib/admin/store')
    const store = await readStore()
    let mines = normalizeMines(store.mines)
    if (mines.length === 0) mines = MINES_PORTFOLIO_FALLBACK
    if (publicOnly) mines = mines.filter((m) => m.publicVisible !== false)
    return mines
  } catch {
    return publicOnly
      ? MINES_PORTFOLIO_FALLBACK.filter((m) => m.publicVisible)
      : MINES_PORTFOLIO_FALLBACK
  }
}

export async function getMineBySlug(slug: string): Promise<AdminMine | null> {
  const mines = await getMinesPortfolio({ publicOnly: true })
  return mines.find((m) => m.slug === slug || m.id === slug) ?? null
}

export function minePortfolioStats(mines: AdminMine[]) {
  const active = mines.filter((m) => m.status === 'active').length
  const stoneSet = new Set<string>()
  mines.forEach((m) => m.stoneTypes.forEach((s) => stoneSet.add(s)))
  const samples = mines.reduce((n, m) => n + (m.samples?.length || 0), 0)
  return {
    total: mines.length,
    active,
    stoneTypes: stoneSet.size,
    samples,
  }
}
