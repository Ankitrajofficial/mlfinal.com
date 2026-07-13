/**
 * One-shot: push local data/admin/store.json into Neon (DATABASE_URL).
 *
 * Usage:
 *   npx tsx scripts/migrate-admin-to-neon.ts
 */

import { promises as fs } from 'fs'
import path from 'path'
import { createSeedStore } from '../lib/admin/seed'
import {
  dbConfigured,
  dbForceSaveStore,
  dbLoadStore,
} from '../lib/admin/db'
import type { AdminStore } from '../lib/admin/types'

/** Minimal .env loader (no dotenv dependency). */
async function loadEnvFile(file: string) {
  try {
    const raw = await fs.readFile(file, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq < 1) continue
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1).trim()
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    /* optional */
  }
}

async function main() {
  await loadEnvFile('.env.local')
  await loadEnvFile('.env')

  if (!dbConfigured()) {
    console.error('DATABASE_URL is not set. Add it to .env.local first.')
    process.exit(1)
  }

  const storePath = path.join(process.cwd(), 'data', 'admin', 'store.json')
  let store: AdminStore

  try {
    const raw = await fs.readFile(storePath, 'utf8')
    store = JSON.parse(raw) as AdminStore
    if (!store.version || !Array.isArray(store.enquiries)) {
      throw new Error('Invalid local store shape')
    }
    if (!Array.isArray(store.mines)) {
      store.mines = createSeedStore().mines
    }
    console.log('Loaded local store:', storePath)
  } catch {
    store = createSeedStore()
    console.log('No local store found — using seed data')
  }

  console.log('Writing to Neon…')
  await dbForceSaveStore(store)

  const loaded = await dbLoadStore()
  if (!loaded) {
    console.error('Write reported ok but re-read returned null')
    process.exit(1)
  }

  console.log('Neon admin_store ready')
  console.log('  version:', loaded.version)
  console.log('  enquiries:', loaded.store.enquiries.length)
  console.log('  mines:', loaded.store.mines?.length ?? 0)
  console.log('  shipments:', loaded.store.shipments.length)
  console.log('  lastSynced:', loaded.store.lastSynced)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
