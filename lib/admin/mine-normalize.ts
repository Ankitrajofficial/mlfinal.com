import type { AdminMine, MineSample } from './types'

/** Ensure older mine records have portfolio fields. */
export function normalizeMine(raw: Partial<AdminMine> & { id: string; name: string }): AdminMine {
  const varieties = raw.varieties || ''
  const stoneTypes =
    Array.isArray(raw.stoneTypes) && raw.stoneTypes.length > 0
      ? raw.stoneTypes
      : varieties
          .split(/[,·|]/)
          .map((s) => s.trim())
          .filter(Boolean)

  const samples: MineSample[] = Array.isArray(raw.samples)
    ? raw.samples.map((s, i) => ({
        id: s.id || `smp_${raw.id}_${i}`,
        name: s.name || s.stoneType || 'Sample',
        stoneType: s.stoneType || stoneTypes[0] || raw.material || 'Sandstone',
        finish: s.finish || '',
        size: s.size || '',
        description: s.description || '',
        imageUrl: s.imageUrl || '',
      }))
    : []

  const slug =
    raw.slug ||
    raw.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80)

  const headcount = raw.headcount || raw.workforce || ''
  const workforce = raw.workforce || raw.headcount || ''

  return {
    id: raw.id,
    slug,
    code: raw.code || '',
    name: raw.name,
    tagline: raw.tagline || '',
    description: raw.description || raw.notes || '',
    material: raw.material || 'Sandstone',
    stoneTypes,
    samples,
    district: raw.district || '',
    state: raw.state || 'Rajasthan',
    address: raw.address || '',
    lat: typeof raw.lat === 'number' ? raw.lat : 0,
    lng: typeof raw.lng === 'number' ? raw.lng : 0,
    gpsAccuracyM: raw.gpsAccuracyM ?? 0,
    status: raw.status || 'active',
    ownership: raw.ownership || 'owned',
    capacity: raw.capacity || '',
    annualOutput: raw.annualOutput || '',
    headcount,
    workforce,
    revenue: raw.revenue || '',
    revenuePeriod: raw.revenuePeriod || '',
    areaHa: raw.areaHa || '',
    yearOpened: raw.yearOpened || '',
    equipment: raw.equipment || '',
    certifications: raw.certifications || '',
    safetyNotes: raw.safetyNotes || '',
    accessNotes: raw.accessNotes || '',
    roadCondition: raw.roadCondition || '',
    nearestTown: raw.nearestTown || '',
    contactName: raw.contactName || '',
    contactPhone: raw.contactPhone || '',
    varieties: varieties || stoneTypes.join(', '),
    notes: raw.notes || '',
    primaryImage: raw.primaryImage || '',
    publicVisible: raw.publicVisible !== false,
    showRevenuePublic: Boolean(raw.showRevenuePublic),
    lastVisitedAt: raw.lastVisitedAt || '',
    visits: Array.isArray(raw.visits) ? raw.visits : [],
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
    createdBy: raw.createdBy || 'System',
  }
}

export function normalizeMines(list: AdminMine[] | undefined | null): AdminMine[] {
  if (!Array.isArray(list)) return []
  return list.map((m) => normalizeMine(m))
}
