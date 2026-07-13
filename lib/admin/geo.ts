/** Geographic helpers for Mines GIS (haversine + route planning) */

const EARTH_KM = 6371
const AVG_ROAD_KMPH = 42 // mixed Rajasthan quarry / highway mix

export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_KM * Math.asin(Math.min(1, Math.sqrt(h)))
}

export function estimateDriveMinutes(distanceKm: number): number {
  return Math.round((distanceKm / AVG_ROAD_KMPH) * 60)
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h}h ${m}m` : `${h}h`
}

export interface RouteLeg {
  fromId: string
  toId: string
  fromName: string
  toName: string
  distanceKm: number
  driveMinutes: number
}

export interface TravelPlan {
  orderedIds: string[]
  legs: RouteLeg[]
  totalDistanceKm: number
  totalDriveMinutes: number
  mode: 'sequence' | 'nearest'
}

type Point = { id: string; name: string; lat: number; lng: number }

/** Build legs along a fixed order of points */
export function planSequence(points: Point[]): TravelPlan {
  const legs: RouteLeg[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i]!
    const to = points[i + 1]!
    const distanceKm = haversineKm(from, to)
    legs.push({
      fromId: from.id,
      toId: to.id,
      fromName: from.name,
      toName: to.name,
      distanceKm: round1(distanceKm),
      driveMinutes: estimateDriveMinutes(distanceKm),
    })
  }
  const totalDistanceKm = round1(legs.reduce((s, l) => s + l.distanceKm, 0))
  const totalDriveMinutes = legs.reduce((s, l) => s + l.driveMinutes, 0)
  return {
    orderedIds: points.map((p) => p.id),
    legs,
    totalDistanceKm,
    totalDriveMinutes,
    mode: 'sequence',
  }
}

/**
 * Nearest-neighbour tour starting from the first point.
 * Good enough CEO field planner (not full TSP solver).
 */
export function planNearestNeighbour(points: Point[]): TravelPlan {
  if (points.length <= 1) {
    return {
      orderedIds: points.map((p) => p.id),
      legs: [],
      totalDistanceKm: 0,
      totalDriveMinutes: 0,
      mode: 'nearest',
    }
  }
  const remaining = points.slice(1)
  const ordered: Point[] = [points[0]!]
  while (remaining.length) {
    const cur = ordered[ordered.length - 1]!
    let bestIdx = 0
    let bestD = Infinity
    for (let i = 0; i < remaining.length; i++) {
      const d = haversineKm(cur, remaining[i]!)
      if (d < bestD) {
        bestD = d
        bestIdx = i
      }
    }
    ordered.push(remaining.splice(bestIdx, 1)[0]!)
  }
  const plan = planSequence(ordered)
  return { ...plan, mode: 'nearest' }
}

function round1(n: number) {
  return Math.round(n * 10) / 10
}

export function bearingDegrees(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const toRad = (d: number) => (d * Math.PI) / 180
  const toDeg = (r: number) => (r * 180) / Math.PI
  const φ1 = toRad(a.lat)
  const φ2 = toRad(b.lat)
  const Δλ = toRad(b.lng - a.lng)
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  return (toDeg(Math.atan2(y, x)) + 360) % 360
}

export function compassLabel(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]!
}
