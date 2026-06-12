import { NextResponse, type NextRequest } from 'next/server'

/**
 * Host-based routing middleware.
 *
 * Production:
 *   mohanlalsonsgroup.com/*  → /mls/*  (transparent rewrite, URL stays clean)
 *   khadane.com/*            → /khadane/*  (transparent rewrite, URL stays clean)
 *
 * 
 * Local development:
 *   Set NEXT_PUBLIC_DEV_HOST_MODE=mls or =khadane to lock dev to one site,
 *   OR use mls.localhost / khadane.localhost (requires /etc/hosts entries).
 *
 * Both sites deploy from a single Vercel project with two domain bindings.
 *
 * The rewrite is INTERNAL — the user sees mohanlalsonsgroup.com/about,
 * but Next.js routes from app/mls/about/page.tsx. SEO files like
 * sitemap.xml, robots.txt, OG images, and favicons are all routed
 * through the same rewrite so each site gets its own.
 */

const MLS_HOSTS = new Set([
  'mohanlalsonsgroup.com',
  'www.mohanlalsonsgroup.com',
  'mohanlalandsonsgroup.com',
  'www.mohanlalandsonsgroup.com',
  'mls.localhost',
])

const KHADANE_HOSTS = new Set([
  'khadane.com',
  'www.khadane.com',
  'khadane.localhost',
])

function hostnameFromUrl(value: string | undefined, fallback: string) {
  if (!value) return fallback
  try {
    return new URL(value).hostname.toLowerCase()
  } catch {
    return fallback
  }
}

const MLS_ENV_HOST = hostnameFromUrl(
  process.env.NEXT_PUBLIC_MLS_URL,
  'mohanlalsonsgroup.com'
)

const KHADANE_ENV_HOST = hostnameFromUrl(
  process.env.NEXT_PUBLIC_KHADANE_URL,
  'khadane.com'
)

function siteBaseUrl(site: 'mls' | 'khadane') {
  const configured =
    site === 'mls'
      ? process.env.NEXT_PUBLIC_MLS_URL
      : process.env.NEXT_PUBLIC_KHADANE_URL

  if (configured?.startsWith('http://') || configured?.startsWith('https://')) {
    return configured
  }

  return site === 'mls'
    ? `https://${MLS_ENV_HOST}`
    : `https://${KHADANE_ENV_HOST}`
}

function normalizeHost(host: string) {
  const trimmed = host.toLowerCase().trim()
  if (trimmed.startsWith('[')) return trimmed
  return trimmed.split(':')[0] ?? trimmed
}

function isLocalHost(host: string) {
  const hostname = normalizeHost(host)
  return hostname === 'localhost' || hostname === '127.0.0.1'
}

function resolveLocalSiteByPath(path: string): 'mls' | 'khadane' | null {
  if (
    path === '/our-legacy' ||
    path === '/csr' ||
    path === '/careers' ||
    path === '/contact' ||
    path.startsWith('/verticals') ||
    path.startsWith('/resources')
  ) {
    return 'mls'
  }

  if (
    path === '/collection' ||
    path === '/formats' ||
    path === '/quarry' ||
    path === '/yard' ||
    path === '/desk' ||
    path === '/about' ||
    path === '/group' ||
    path.startsWith('/collection/') ||
    path.startsWith('/formats/') ||
    path.startsWith('/field-notes')
  ) {
    return 'khadane'
  }

  return null
}

function markLocalSite(
  response: NextResponse,
  host: string,
  site: 'mls' | 'khadane'
) {
  if (!isLocalHost(host)) return response
  response.cookies.set('local-site', site, {
    path: '/',
    sameSite: 'lax',
  })
  return response
}

function resolveSite(host: string): 'mls' | 'khadane' | null {
  const hostname = normalizeHost(host)

  if (
    MLS_HOSTS.has(hostname) ||
    hostname === MLS_ENV_HOST ||
    hostname === `www.${MLS_ENV_HOST}`
  ) {
    return 'mls'
  }

  if (
    KHADANE_HOSTS.has(hostname) ||
    hostname === KHADANE_ENV_HOST ||
    hostname === `www.${KHADANE_ENV_HOST}`
  ) {
    return 'khadane'
  }

  const devMode = process.env.NEXT_PUBLIC_DEV_HOST_MODE
  if (devMode === 'mls') return 'mls'
  if (devMode === 'khadane') return 'khadane'
  if (hostname === 'localhost' || hostname === '127.0.0.1') return 'mls'

  return null
}

function stripSitePrefix(path: string, site: 'mls' | 'khadane') {
  const prefix = `/${site}`
  if (path === prefix) return '/'
  if (path.startsWith(`${prefix}/`)) return path.slice(prefix.length) || '/'
  return null
}

function prefixedSiteForPath(path: string): 'mls' | 'khadane' | null {
  if (stripSitePrefix(path, 'mls')) return 'mls'
  if (stripSitePrefix(path, 'khadane')) return 'khadane'
  return null
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const host = request.headers.get('host')?.toLowerCase() ?? ''
  const path = url.pathname

  // ─── True bypasses (paths that are NEVER per-site) ─────────────
  // These resolve to top-level files or Next internals only.
  if (
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.startsWith('/brand') ||
    path.startsWith('/img') ||
    path.startsWith('/videos')
  ) {
    return NextResponse.next()
  }

  // Static legacy assets from KHADANE v1 (kept for backward compatibility
  // of any external links into those exact paths).
  if (
    path === '/favicon.ico' ||
    path === '/apple-touch-icon.svg' ||
    path === '/apple-touch-icon.png' ||
    path === '/favicon-32.png' ||
    path === '/favicon.svg' ||
    path === '/icon-192.png' ||
    path === '/icon-512.png' ||
    path === '/og-image.svg' ||
    path === '/site.webmanifest' ||
    path === '/twitter-card.svg'
  ) {
    return NextResponse.next()
  }

  // Canonicalize internal route prefixes on public domains. The browser URL
  // should stay clean: khadane.com/collection, not khadane.com/khadane/collection.
  const hostTarget = resolveSite(host)
  const prefixedSite = prefixedSiteForPath(path)
  if (hostTarget && prefixedSite && !isLocalHost(host)) {
    const cleanPath = stripSitePrefix(path, prefixedSite) ?? '/'

    if (prefixedSite === hostTarget) {
      const cleanUrl = url.clone()
      cleanUrl.pathname = cleanPath
      return NextResponse.redirect(cleanUrl, 308)
    }

    const cleanUrl = new URL(cleanPath, siteBaseUrl(prefixedSite))
    cleanUrl.search = url.search
    return NextResponse.redirect(cleanUrl, 308)
  }

  // Avoid infinite-loop on internal paths in local/dev or direct internal access.
  if (path.startsWith('/mls')) {
    return markLocalSite(NextResponse.next(), host, 'mls')
  }

  if (path.startsWith('/khadane')) {
    return markLocalSite(NextResponse.next(), host, 'khadane')
  }

  // ─── Host resolution ────────────────────────────────────────────
  let target = hostTarget

  if (isLocalHost(host) && path !== '/') {
    const pathSite = resolveLocalSiteByPath(path)
    if (pathSite) {
      target = pathSite
    }

    const localSite = request.cookies.get('local-site')?.value
    if (!pathSite && (localSite === 'mls' || localSite === 'khadane')) {
      target = localSite
    }
  }

  if (!target) return NextResponse.next()

  // ─── Internal rewrite ───────────────────────────────────────────
  // User URL stays as-is. Next routes from the subdir.
  // Examples:
  //   mohanlalsonsgroup.com/             → /mls
  //   mohanlalsonsgroup.com/about        → /mls/about
  //   mohanlalsonsgroup.com/sitemap.xml  → /mls/sitemap.xml
  //   mohanlalsonsgroup.com/robots.txt   → /mls/robots.txt
  //   mohanlalsonsgroup.com/icon         → /mls/icon
  //   khadane.com/collection             → /khadane/collection
  const rewrittenUrl = url.clone()
  rewrittenUrl.pathname = `/${target}${path === '/' ? '' : path}`

  const response = NextResponse.rewrite(rewrittenUrl)
  response.headers.set('x-site', target)
  return markLocalSite(response, host, target)
}

export const config = {
  matcher: [
    /*
     * Match every path except:
     * - _next internals (handled inside the function for additional bypasses)
     * - api routes (handled inside the function so they CAN read headers)
     */
    '/((?!_next/static|_next/image).*)',
  ],
}
