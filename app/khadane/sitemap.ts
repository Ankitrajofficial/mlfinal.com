import type { MetadataRoute } from 'next'
import { VARIETIES } from '@/lib/khadane/varieties'
import { FORMATS } from '@/lib/khadane/formats'
import { FIELD_NOTES } from '@/lib/field-notes'
import { SITE } from '@/lib/khadane/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()

  const staticUrls = [
    '',
    '/collection',
    '/formats',
    '/surfaces',
    '/gallery',
    '/quarry',
    '/yard',
    '/desk',
    '/about',
    '/group',
    '/field-notes',
    '/privacy',
    '/terms',
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1.0 : 0.8,
  }))

  const varietyUrls = VARIETIES.map((v) => ({
    url: `${base}/collection/${v.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const formatUrls = FORMATS.map((f) => ({
    url: `${base}/formats/${f.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const fieldNoteUrls = FIELD_NOTES.map((n) => ({
    url: `${base}/field-notes/${n.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticUrls, ...varietyUrls, ...formatUrls, ...fieldNoteUrls]
}
