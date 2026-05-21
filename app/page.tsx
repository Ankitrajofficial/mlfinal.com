import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

/**
 * Root-route fallback.
 *
 * In production, middleware.ts has already rewritten requests to
 * /mls/* or /khadane/* based on host. If a request lands here
 * without rewrite, it means the host wasn't recognized — fall back to MLS.
 *
 * This page is rarely reached. Most production traffic is rewritten away.
 */
export default async function RootIndex() {
  const h = await headers()
  const site = h.get('x-site')

  if (site === 'khadane') {
    redirect('/khadane')
  }
  redirect('/mls')
}

export const dynamic = 'force-dynamic'
