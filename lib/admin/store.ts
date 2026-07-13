/**
 * Admin operational store.
 *
 * Backend selection:
 *   DATABASE_URL set   → Neon Postgres source of truth, optional MongoDB
 *                        backup mirror (see lib/admin/db.ts). This is the
 *                        production path — required on Vercel, where the
 *                        filesystem is ephemeral.
 *   DATABASE_URL unset → local JSON file at data/admin/store.json
 *                        (dev-only fallback).
 *
 * The exported API is identical for both backends, so route handlers
 * never know which one is active.
 */

import { promises as fs } from 'fs'
import path from 'path'
import {
  dbConfigured,
  dbForceSaveStore,
  dbInitStore,
  dbLoadStore,
  dbSaveStore,
  mirrorToMongo,
  type VersionedStore,
} from './db'
import { createSeedStore } from './seed'
import { normalizeMine } from './mine-normalize'
import type {
  AdminActivity,
  AdminAlert,
  AdminEnquiry,
  AdminShipment,
  AdminSite,
  AdminStore,
  AdminTask,
  AdminVertical,
} from './types'

const STORE_DIR = path.join(process.cwd(), 'data', 'admin')
const STORE_PATH = path.join(STORE_DIR, 'store.json')

const CAS_RETRIES = 5

/** Simple in-process write queue so concurrent mutations don't clobber each other. */
let writeChain: Promise<unknown> = Promise.resolve()

function queueWrite<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeChain.then(fn, fn)
  writeChain = run.then(
    () => undefined,
    () => undefined
  )
  return run
}

function nowIso() {
  return new Date().toISOString()
}

export function newId(prefix: string) {
  const rand = Math.random().toString(36).slice(2, 10)
  return `${prefix}_${Date.now().toString(36)}_${rand}`
}

function isValidStore(value: unknown): value is AdminStore {
  const store = value as AdminStore | null
  return Boolean(store && store.version && Array.isArray(store.enquiries))
}

/** In-place schema migrations for stores written by older code. Returns true if changed. */
function migrateStore(store: AdminStore): boolean {
  let changed = false
  // Older stores predate the mines GIS layer.
  if (!Array.isArray(store.mines)) {
    store.mines = createSeedStore().mines
    changed = true
  } else {
    // Normalize portfolio fields IN MEMORY only. Never flag this as a
    // change to persist: Postgres JSONB reorders object keys, so a
    // stringify comparison differs on every read and caused a write to
    // Neon on every dashboard poll. Writes via updateStore still persist
    // the normalized form naturally.
    store.mines = store.mines.map((m) => normalizeMine(m))
  }
  if (!Array.isArray(store.ceoPlans)) {
    store.ceoPlans = createSeedStore().ceoPlans
    changed = true
  }
  return changed
}

// ─── Postgres backend ──────────────────────────────────────────

/** Load the versioned store from Postgres, seeding the row on first run. */
async function dbLoadOrSeed(): Promise<VersionedStore> {
  const loaded = await dbLoadStore()

  if (loaded && isValidStore(loaded.store)) {
    if (migrateStore(loaded.store)) {
      // Persist the migration; a CAS miss means another instance already did.
      if (await dbSaveStore(loaded.store, loaded.version)) {
        return { store: loaded.store, version: loaded.version + 1 }
      }
      const reread = await dbLoadStore()
      if (reread && isValidStore(reread.store)) {
        migrateStore(reread.store)
        return reread
      }
    }
    return loaded
  }

  const seed = createSeedStore()
  if (loaded) {
    // Row exists but the data is corrupt — recover to seed.
    await dbForceSaveStore(seed)
  } else {
    await dbInitStore(seed)
  }
  // Re-read so we return whatever won a concurrent first-boot race.
  const after = await dbLoadStore()
  if (after && isValidStore(after.store)) return after
  return { store: seed, version: 1 }
}

async function dbUpdate(
  mutator: (store: AdminStore) => void | AdminStore
): Promise<AdminStore> {
  // The queue serialises writes within this instance; the version CAS
  // protects against writes from other serverless instances.
  return queueWrite(async () => {
    for (let attempt = 0; attempt < CAS_RETRIES; attempt++) {
      const { store, version } = await dbLoadOrSeed()
      const result = mutator(store)
      const next = result ?? store
      next.lastSynced = nowIso()
      if (await dbSaveStore(next, version)) {
        await mirrorToMongo(next)
        return next
      }
    }
    throw new Error('Admin store update failed: too many concurrent writes')
  })
}

// ─── File backend (dev fallback) ───────────────────────────────

async function fileEnsureStore(): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true })
  try {
    await fs.access(STORE_PATH)
  } catch {
    const seed = createSeedStore()
    await fs.writeFile(STORE_PATH, JSON.stringify(seed, null, 2), 'utf8')
  }
}

async function fileReadStore(): Promise<AdminStore> {
  await fileEnsureStore()
  const raw = await fs.readFile(STORE_PATH, 'utf8')
  try {
    const parsed = JSON.parse(raw) as AdminStore
    if (!isValidStore(parsed)) throw new Error('Invalid store shape')
    if (migrateStore(parsed)) {
      await fs.writeFile(STORE_PATH, JSON.stringify(parsed, null, 2), 'utf8')
    }
    return parsed
  } catch {
    const seed = createSeedStore()
    await fs.writeFile(STORE_PATH, JSON.stringify(seed, null, 2), 'utf8')
    return seed
  }
}

async function fileWriteStore(store: AdminStore): Promise<AdminStore> {
  store.lastSynced = nowIso()
  await fs.mkdir(STORE_DIR, { recursive: true })
  const tmp = `${STORE_PATH}.${process.pid}.tmp`
  await fs.writeFile(tmp, JSON.stringify(store, null, 2), 'utf8')
  await fs.rename(tmp, STORE_PATH)
  return store
}

// ─── Public API (backend-agnostic) ─────────────────────────────

export async function readStore(): Promise<AdminStore> {
  if (dbConfigured()) {
    const { store } = await dbLoadOrSeed()
    return store
  }
  return fileReadStore()
}

export async function writeStore(store: AdminStore): Promise<AdminStore> {
  if (dbConfigured()) {
    return queueWrite(async () => {
      store.lastSynced = nowIso()
      await dbForceSaveStore(store)
      await mirrorToMongo(store)
      return store
    })
  }
  return queueWrite(() => fileWriteStore(store))
}

export async function updateStore(
  mutator: (store: AdminStore) => void | AdminStore
): Promise<AdminStore> {
  if (dbConfigured()) {
    return dbUpdate(mutator)
  }
  return queueWrite(async () => {
    const store = await fileReadStore()
    const result = mutator(store)
    const next = result ?? store
    return fileWriteStore(next)
  })
}

export function logActivity(
  store: AdminStore,
  input: {
    actor: string
    action: string
    entityType: string
    entityId?: string
  }
): AdminActivity {
  const entry: AdminActivity = {
    id: newId('act'),
    actor: input.actor,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId ?? '',
    createdAt: nowIso(),
  }
  store.activity = [entry, ...store.activity].slice(0, 200)
  return entry
}

export async function resetStore(): Promise<AdminStore> {
  const seed = createSeedStore()
  return writeStore(seed)
}

// ─── Domain helpers ────────────────────────────────────────────

export async function ingestWebsiteEnquiry(input: {
  reference: string
  site: 'mls' | 'khadane'
  category: string
  name: string
  email: string
  phone?: string
  company?: string
  country?: string
  variety?: string
  format?: string
  volume?: string
  message: string
}): Promise<AdminEnquiry> {
  const vertical = categoryToVertical(input.category, input.site)
  const enquiry: AdminEnquiry = {
    id: newId('enq'),
    reference: input.reference,
    name: input.name,
    email: input.email,
    phone: input.phone ?? '',
    company: input.company ?? '',
    country: input.country ?? '',
    market: input.country || (input.site === 'khadane' ? 'Export' : 'India'),
    vertical,
    category: input.category,
    site: input.site,
    subject: summariseSubject(input),
    message: input.message,
    status: 'new',
    priority: input.site === 'khadane' ? 'high' : 'medium',
    owner: defaultOwner(vertical),
    notes: '',
    variety: input.variety ?? '',
    format: input.format ?? '',
    volume: input.volume ?? '',
    source: 'website',
    createdAt: nowIso(),
    updatedAt: nowIso(),
  }

  await updateStore((store) => {
    store.enquiries = [enquiry, ...store.enquiries]
    logActivity(store, {
      actor: 'Website',
      action: `New enquiry ${enquiry.reference} — ${enquiry.name} (${enquiry.vertical})`,
      entityType: 'enquiry',
      entityId: enquiry.id,
    })
    store.alerts = [
      {
        id: newId('alt'),
        level: enquiry.priority === 'high' ? 'warn' : 'info',
        title: `New enquiry — ${enquiry.name}`,
        body: `${enquiry.subject} · assigned to ${enquiry.owner}`,
        status: 'open',
        owner: enquiry.owner,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      },
      ...store.alerts,
    ]
  })

  return enquiry
}

function categoryToVertical(category: string, site: 'mls' | 'khadane'): string {
  if (site === 'khadane') return 'Stone & Export'
  const map: Record<string, string> = {
    'stone-export': 'Stone & Export',
    'domestic-stone': 'Stone & Export',
    automotive: 'Automotive & Fuel',
    fuel: 'Automotive & Fuel',
    hospitality: 'Hospitality',
    'student-housing': 'Student Housing',
    'food-services': 'Food Services',
    careers: 'Careers',
    media: 'Media',
    partnership: 'Partnership',
  }
  return map[category] ?? 'Other'
}

function defaultOwner(vertical: string): string {
  const map: Record<string, string> = {
    'Stone & Export': 'Export desk',
    'Student Housing': 'Housing desk',
    Hospitality: 'M3 front office',
    'Automotive & Fuel': 'Dhakar Motors',
    'Food Services': 'Divine Food Services',
  }
  return map[vertical] ?? 'Unassigned'
}

function summariseSubject(input: {
  variety?: string
  format?: string
  message: string
  category: string
}): string {
  if (input.variety || input.format) {
    return [input.variety, input.format].filter(Boolean).join(' · ')
  }
  const first = input.message.trim().split(/\n/)[0] ?? input.category
  return first.slice(0, 120)
}

export type { AdminEnquiry, AdminShipment, AdminAlert, AdminTask, AdminVertical, AdminSite }
