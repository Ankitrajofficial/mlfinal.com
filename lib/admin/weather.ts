/**
 * Weather helpers — Open-Meteo (no API key).
 * Used by admin weather / satellite panel.
 */

export interface WeatherCurrent {
  temperature: number
  humidity: number
  windSpeed: number
  precipitation: number
  weatherCode: number
  time: string
}

export interface WeatherDay {
  date: string
  weatherCode: number
  tempMax: number
  tempMin: number
  precipitation: number
}

export interface MineWeather {
  mineId: string
  mineName: string
  lat: number
  lng: number
  current: WeatherCurrent | null
  daily: WeatherDay[]
  fetchedAt: string
  error?: string
}

/** WMO weather interpretation codes (Open-Meteo) */
export function weatherLabel(code: number): string {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Partly cloudy'
  if (code <= 48) return 'Fog'
  if (code <= 57) return 'Drizzle'
  if (code <= 67) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Showers'
  if (code <= 86) return 'Snow showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Unknown'
}

export function weatherEmoji(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  if (code <= 99) return '⛈️'
  return '🌡️'
}

export function windySatelliteUrl(lat: number, lng: number): string {
  return `https://www.windy.com/-Satellite-satellite?satellite,${lat.toFixed(3)},${lng.toFixed(3)},7`
}

export function windyRadarUrl(lat: number, lng: number): string {
  return `https://www.windy.com/-Weather-radar-radar?radar,${lat.toFixed(3)},${lng.toFixed(3)},7`
}

export async function fetchOpenMeteo(
  lat: number,
  lng: number
): Promise<{ current: WeatherCurrent; daily: WeatherDay[] }> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current:
      'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
    timezone: 'Asia/Kolkata',
    forecast_days: '5',
  })
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
    next: { revalidate: 600 },
  })
  if (!res.ok) throw new Error(`Weather API ${res.status}`)
  const data = await res.json()
  const c = data.current
  const current: WeatherCurrent = {
    temperature: c.temperature_2m,
    humidity: c.relative_humidity_2m,
    windSpeed: c.wind_speed_10m,
    precipitation: c.precipitation,
    weatherCode: c.weather_code,
    time: c.time,
  }
  const daily: WeatherDay[] = (data.daily?.time || []).map((date: string, i: number) => ({
    date,
    weatherCode: data.daily.weather_code[i],
    tempMax: data.daily.temperature_2m_max[i],
    tempMin: data.daily.temperature_2m_min[i],
    precipitation: data.daily.precipitation_sum[i],
  }))
  return { current, daily }
}
