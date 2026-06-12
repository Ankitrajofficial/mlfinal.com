import { MLS_SITE } from '@/lib/site-mls'

/**
 * MLS robots.txt — allow all, point to the sitemap.
 *
 * Served as a route handler because the robots.ts metadata convention
 * only works at the app root, and this project hosts two sites under
 * /mls and /khadane (the proxy rewrites mohanlalsonsgroup.com/robots.txt
 * to /mls/robots.txt).
 *
 * Per build prompt: the site is robots-permitted in production
 * (no robots-restricted gate that existed in earlier v1 work).
 */
export function GET() {
  const base = MLS_SITE.url.replace(/\/$/, '')
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /_next/',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    `Host: ${base}`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
