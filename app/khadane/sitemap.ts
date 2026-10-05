import type { MetadataRoute } from 'next'
import { VARIETIES } from '@/lib/khadane/varieties'
import { FORMATS } from '@/lib/khadane/formats'
import { FIELD_NOTES } from '@/lib/field-notes'
import { getMinesPortfolio } from '@/lib/khadane/mines-portfolio'
import { khadaneUrl } from '@/lib/seo'

/**
 * Every URL here must be final: canonical host, no trailing slash (home is
 * https://khadane.com), answering 200 with no redirect. The same khadaneUrl()
 * builds each page's canonical tag and og:url, so the three always agree.
 * Run `npm run check:sitemap -- <base-url>` to verify.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticUrls = [
    '/',
    '/collection',
    '/formats',
    '/surfaces',
    '/gallery',
    '/quarry',
    '/mines',
    '/yard',
    '/desk',
    '/about',
    '/group',
    '/field-notes',
    '/privacy',
    '/terms',
  ].map((p) => ({
    url: khadaneUrl(p),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '/' ? 1.0 : 0.8,
  }))

  // Same source as /mines/[slug], so only publicly visible mines are listed.
  const mines = await getMinesPortfolio({ publicOnly: true })
  const mineUrls = mines.map((m) => ({
    url: khadaneUrl(`/mines/${m.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const varietyUrls = VARIETIES.map((v) => ({
    url: khadaneUrl(`/collection/${v.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const formatUrls = FORMATS.map((f) => ({
    url: khadaneUrl(`/formats/${f.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const fieldNoteUrls = FIELD_NOTES.map((n) => ({
    url: khadaneUrl(`/field-notes/${n.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticUrls, ...mineUrls, ...varietyUrls, ...formatUrls, ...fieldNoteUrls]
}
