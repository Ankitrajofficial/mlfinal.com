'use client'

import { useCallback, useEffect, useState } from 'react'
import { CloudSun, ExternalLink, RefreshCw, Satellite } from 'lucide-react'
import {
  weatherEmoji,
  weatherLabel,
  type MineWeather,
} from '@/lib/admin/weather'

type LinkRow = { mineId: string; satellite: string; radar: string }

export default function WeatherSatellite({ onToast }: { onToast?: (m: string) => void }) {
  const [rows, setRows] = useState<MineWeather[]>([])
  const [links, setLinks] = useState<LinkRow[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/weather')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Weather failed')
      setRows(data.weather || [])
      setLinks(data.links || [])
      setSelected((prev) => prev || data.weather?.[0]?.mineId || null)
    } catch (e) {
      onToast?.(e instanceof Error ? e.message : 'Weather load failed')
    } finally {
      setLoading(false)
    }
  }, [onToast])

  useEffect(() => {
    void load()
    const id = window.setInterval(() => {
      void load()
    }, 10 * 60 * 1000)
    return () => window.clearInterval(id)
  }, [load])

  const active = rows.find((r) => r.mineId === selected) || rows[0]
  const activeLinks = links.find((l) => l.mineId === active?.mineId)

  return (
    <div className="admin-card admin-card-pad weather-panel">
      <div className="admin-section-head">
        <div>
          <p className="admin-eyebrow">Field conditions</p>
          <h3>
            <CloudSun size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: -3 }} />
            Weather & satellite
          </h3>
        </div>
        <button type="button" className="admin-btn-ghost" onClick={load} disabled={loading}>
          <RefreshCw size={14} style={{ marginRight: 6 }} />
          {loading ? 'Updating…' : 'Refresh'}
        </button>
      </div>

      {loading && rows.length === 0 ? (
        <p className="mines-help">Fetching Open-Meteo for mine sites…</p>
      ) : rows.length === 0 ? (
        <p className="mines-help">No mines with coordinates. Add mines in Mines GIS.</p>
      ) : (
        <>
          <div className="weather-mine-tabs">
            {rows.map((r) => (
              <button
                key={r.mineId}
                type="button"
                className={`weather-chip${active?.mineId === r.mineId ? ' is-active' : ''}`}
                onClick={() => setSelected(r.mineId)}
              >
                {r.current ? weatherEmoji(r.current.weatherCode) : '·'} {r.mineName.split('—')[0]}
              </button>
            ))}
          </div>

          {active ? (
            <div className="weather-body">
              {active.error ? (
                <p className="admin-error">{active.error}</p>
              ) : active.current ? (
                <>
                  <div className="weather-now">
                    <div className="weather-temp">
                      <span className="emoji">{weatherEmoji(active.current.weatherCode)}</span>
                      <strong>{Math.round(active.current.temperature)}°C</strong>
                      <span>{weatherLabel(active.current.weatherCode)}</span>
                    </div>
                    <div className="weather-meta">
                      <div>
                        <span>Humidity</span>
                        <strong>{active.current.humidity}%</strong>
                      </div>
                      <div>
                        <span>Wind</span>
                        <strong>{Math.round(active.current.windSpeed)} km/h</strong>
                      </div>
                      <div>
                        <span>Precip</span>
                        <strong>{active.current.precipitation} mm</strong>
                      </div>
                    </div>
                  </div>

                  <div className="weather-forecast">
                    {active.daily.map((d) => (
                      <div key={d.date} className="weather-day">
                        <span className="d">
                          {new Date(d.date).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="e">{weatherEmoji(d.weatherCode)}</span>
                        <span className="t">
                          {Math.round(d.tempMax)}° / {Math.round(d.tempMin)}°
                        </span>
                        <span className="p">{d.precipitation}mm</span>
                      </div>
                    ))}
                  </div>

                  <div className="weather-sat-actions">
                    {activeLinks ? (
                      <>
                        <a
                          href={activeLinks.satellite}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-btn-primary"
                        >
                          <Satellite size={14} style={{ marginRight: 6 }} />
                          Satellite (Windy)
                          <ExternalLink size={12} style={{ marginLeft: 6 }} />
                        </a>
                        <a
                          href={activeLinks.radar}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-btn-ghost"
                        >
                          Weather radar
                          <ExternalLink size={12} style={{ marginLeft: 6 }} />
                        </a>
                      </>
                    ) : null}
                  </div>
                  <p className="mines-help" style={{ marginTop: 10 }}>
                    Live forecast via Open-Meteo · satellite/radar opens Windy at mine coordinates (
                    {active.lat.toFixed(3)}, {active.lng.toFixed(3)}). Auto-refresh every 10 min.
                  </p>
                </>
              ) : (
                <p className="mines-help">No current observation.</p>
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
