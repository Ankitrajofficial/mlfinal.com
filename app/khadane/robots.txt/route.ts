import { khadaneUrl } from '@/lib/seo'

/**
 * KHADANE robots.txt — allow all, point to the sitemap.
 *
 * Served as a route handler because the robots.ts metadata convention
 * only works at the app root, and this project hosts two sites under
 * /mls and /khadane (the proxy rewrites khadane.com/robots.txt to
 * /khadane/robots.txt).
 */
export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /brand/transparency-test.html',
    '',
    `Sitemap: ${khadaneUrl('/sitemap.xml')}`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
