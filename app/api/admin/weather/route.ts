import { type NextRequest } from 'next/server'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { readStore } from '@/lib/admin/store'
import { normalizeMine } from '@/lib/admin/mine-normalize'
import {
  fetchOpenMeteo,
  type MineWeather,
  windyRadarUrl,
  windySatelliteUrl,
} from '@/lib/admin/weather'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Weather for mine sites (Open-Meteo) + satellite/radar deep links (Windy).
 * GET ?mineId=optional — all public mines if omitted.
 */
export async function GET(request: NextRequest) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session

  const store = await readStore()
  const mineId = new URL(request.url).searchParams.get('mineId')
  let mines = (store.mines || []).map((m) => normalizeMine(m))
  if (mineId) mines = mines.filter((m) => m.id === mineId)
  // Cap concurrent fetches
  mines = mines.slice(0, 12)

  const results: MineWeather[] = await Promise.all(
    mines.map(async (m) => {
      try {
        const { current, daily } = await fetchOpenMeteo(m.lat, m.lng)
        return {
          mineId: m.id,
          mineName: m.name,
          lat: m.lat,
          lng: m.lng,
          current,
          daily,
          fetchedAt: new Date().toISOString(),
        }
      } catch (err) {
        return {
          mineId: m.id,
          mineName: m.name,
          lat: m.lat,
          lng: m.lng,
          current: null,
          daily: [],
          fetchedAt: new Date().toISOString(),
          error: err instanceof Error ? err.message : 'Weather fetch failed',
        }
      }
    })
  )

  return jsonOk({
    weather: results,
    links: results.map((r) => ({
      mineId: r.mineId,
      satellite: windySatelliteUrl(r.lat, r.lng),
      radar: windyRadarUrl(r.lat, r.lng),
    })),
  })
}
