import type { MetadataRoute } from 'next'
import { MLS_SITE } from '@/lib/site-mls'

/**
 * MLS robots.txt — allow all, point to the sitemap.
 *
 * Per build prompt: the site is robots-permitted in production
 * (no robots-restricted gate that existed in earlier v1 work).
 */
export default function robots(): MetadataRoute.Robots {
  const base = MLS_SITE.url.replace(/\/$/, '')
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
