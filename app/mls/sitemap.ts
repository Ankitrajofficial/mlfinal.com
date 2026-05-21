import type { MetadataRoute } from 'next'
import { MLS_SITE } from '@/lib/site-mls'

/**
 * MLS sitemap.
 *
 * Note: URLs use clean paths (no /mls/ prefix), because the middleware
 * rewrite is internal — the user-facing URLs are at mohanlalsonsgroup.com/*.
 *
 * Routes ordered by institutional priority: homepage → legacy → CSR →
 * verticals → girls' depth → gallery → resources → contact → utility.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = MLS_SITE.url.replace(/\/$/, '')
  const lastModified = new Date()

  const routes: Array<{
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
  }> = [
    // Tier 0 — institutional landing
    { path: '/', changeFrequency: 'monthly', priority: 1.0 },

    // Tier 1 — about cluster
    { path: '/our-legacy', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/csr', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/careers', changeFrequency: 'weekly', priority: 0.8 },

    // Tier 1 — verticals
    { path: '/verticals/stone-export', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/verticals/automotive-fuel', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/verticals/hospitality', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/verticals/student-housing', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/verticals/student-housing/girls', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/verticals/food-services', changeFrequency: 'monthly', priority: 0.85 },

    // Tier 2 — gallery + resources
    { path: '/gallery', changeFrequency: 'weekly', priority: 0.75 },
    { path: '/resources', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/resources/blog', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/resources/catalogues', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/resources/press', changeFrequency: 'weekly', priority: 0.65 },
    { path: '/resources/brochures', changeFrequency: 'monthly', priority: 0.65 },

    // Tier 3 — utility
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ]

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
