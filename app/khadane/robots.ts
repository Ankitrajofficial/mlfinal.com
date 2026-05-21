import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/khadane/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/brand/transparency-test.html'],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  }
}
