#!/usr/bin/env node
/**
 * Sitemap health check.
 *
 *   npm run check:sitemap -- https://khadane.com
 *   npm run check:sitemap -- http://localhost:3000 --host khadane.com
 *
 * Fetches <base>/sitemap.xml and requests every <loc> WITHOUT following
 * redirects. Fails (exit 1) if any URL does not answer 200, if a page's
 * <link rel="canonical"> is not exactly its own sitemap URL, or if a page
 * is marked noindex.
 *
 * Each <loc> is requested at the same path on <base>, so a local build can
 * be checked against the production URLs it lists. --host sends that Host
 * header, which is how the local server knows which site to serve.
 */
import http from 'node:http'
import https from 'node:https'

const args = process.argv.slice(2)
const hostFlag = args.indexOf('--host')
const hostHeader = hostFlag >= 0 ? args[hostFlag + 1] : undefined
const base = args.find((a, i) => !a.startsWith('--') && i !== hostFlag + 1)

if (!base) {
  console.error('Usage: npm run check:sitemap -- <base-url> [--host <hostname>]')
  process.exit(2)
}

const baseUrl = new URL(base)
const CONCURRENCY = 6

function get(path) {
  const url = new URL(path, baseUrl)
  const lib = url.protocol === 'https:' ? https : http
  return new Promise((resolve, reject) => {
    const req = lib.request(
      url,
      {
        method: 'GET',
        headers: {
          'user-agent': 'khadane-sitemap-check/1.0',
          ...(hostHeader ? { host: hostHeader } : {}),
        },
      },
      (res) => {
        let body = ''
        res.setEncoding('utf8')
        res.on('data', (c) => (body += c))
        res.on('end', () =>
          resolve({ status: res.statusCode, location: res.headers.location, body })
        )
      }
    )
    req.on('error', reject)
    req.setTimeout(30000, () => req.destroy(new Error('timeout')))
    req.end()
  })
}

function attr(tag, name) {
  return tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'))?.[1]
}

function canonicalOf(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? []
  const hits = tags.filter((t) => /rel\s*=\s*"canonical"/i.test(t)).map((t) => attr(t, 'href'))
  return hits
}

function isNoindex(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? []
  return tags.some(
    (t) => /name\s*=\s*"robots"/i.test(t) && /noindex/i.test(attr(t, 'content') ?? '')
  )
}

const sitemap = await get('/sitemap.xml')
if (sitemap.status !== 200) {
  console.error(
    `FAIL sitemap.xml answered ${sitemap.status}${sitemap.location ? ` -> ${sitemap.location}` : ''}`
  )
  process.exit(1)
}

const locs = [...sitemap.body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1])
if (locs.length === 0) {
  console.error('FAIL sitemap.xml lists no URLs')
  process.exit(1)
}

const hosts = new Set(locs.map((l) => new URL(l).host))
const results = []
let next = 0

async function worker() {
  while (next < locs.length) {
    const loc = locs[next++]
    const { pathname, search } = new URL(loc)
    const problems = []
    try {
      const res = await get(pathname + search)
      if (res.status !== 200) {
        problems.push(`status ${res.status}${res.location ? ` -> ${res.location}` : ''}`)
      } else {
        const canon = canonicalOf(res.body)
        if (canon.length !== 1) problems.push(`${canon.length} canonical tags`)
        else if (canon[0] !== loc) problems.push(`canonical is ${canon[0]}`)
        if (isNoindex(res.body)) problems.push('page is noindex')
      }
      results.push({ loc, status: res.status, problems })
    } catch (err) {
      results.push({ loc, status: 'ERR', problems: [String(err.message ?? err)] })
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker))
results.sort((a, b) => locs.indexOf(a.loc) - locs.indexOf(b.loc))

for (const r of results) {
  const mark = r.problems.length ? 'FAIL' : 'ok  '
  console.log(`${mark} ${r.status}  ${r.loc}${r.problems.length ? `  (${r.problems.join('; ')})` : ''}`)
}

const failed = results.filter((r) => r.problems.length)
const ok = results.length - failed.length
console.log(
  `\n${results.length} URLs in sitemap · ${ok} answered 200 with a matching canonical · ${failed.length} failed`
)
if (hosts.size > 1) {
  console.log(`FAIL sitemap mixes hosts: ${[...hosts].join(', ')}`)
  process.exit(1)
}
process.exit(failed.length ? 1 : 0)
