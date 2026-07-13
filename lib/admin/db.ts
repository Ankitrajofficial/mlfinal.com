/**
 * Admin store database layer.
 *
 * Primary: Neon Postgres (DATABASE_URL) — source of truth.
 *          Whole AdminStore lives in one JSONB row with integer version
 *          for optimistic compare-and-swap across serverless instances.
 *
 * Backup:  MongoDB (MONGODB_URI) — optional best-effort mirror.
 *
 * When DATABASE_URL is unset, lib/admin/store.ts uses local JSON file.
 */

import { neon } from '@neondatabase/serverless'
import type { AdminStore } from './types'

// ─── Neon Postgres (primary) ───────────────────────────────────

export function dbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim())
}

function sql() {
  const url = process.env.DATABASE_URL?.trim()
  if (!url) throw new Error('DATABASE_URL is not set')
  return neon(url)
}

let schemaReady: Promise<void> | null = null

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      try {
        await sql()`
          CREATE TABLE IF NOT EXISTS admin_store (
            id         INT PRIMARY KEY,
            version    BIGINT NOT NULL DEFAULT 1,
            data       JSONB NOT NULL,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
          )
        `
      } catch (err) {
        schemaReady = null
        throw err
      }
    })()
  }
  return schemaReady
}

export interface VersionedStore {
  store: AdminStore
  version: number
}

export async function dbLoadStore(): Promise<VersionedStore | null> {
  await ensureSchema()
  const rows = await sql()`SELECT data, version FROM admin_store WHERE id = 1`
  if (!rows.length) return null
  return {
    store: rows[0]!.data as AdminStore,
    version: Number(rows[0]!.version),
  }
}

/** Insert the seed row if none exists yet. Safe under concurrent boots. */
export async function dbInitStore(seed: AdminStore): Promise<void> {
  await ensureSchema()
  await sql()`
    INSERT INTO admin_store (id, version, data)
    VALUES (1, 1, ${JSON.stringify(seed)}::jsonb)
    ON CONFLICT (id) DO NOTHING
  `
}

/**
 * Compare-and-swap write: succeeds only if nobody wrote since we read
 * `expectedVersion`. Returns false on conflict so the caller can retry.
 */
export async function dbSaveStore(
  store: AdminStore,
  expectedVersion: number
): Promise<boolean> {
  await ensureSchema()
  const rows = await sql()`
    UPDATE admin_store
    SET data = ${JSON.stringify(store)}::jsonb,
        version = version + 1,
        updated_at = now()
    WHERE id = 1 AND version = ${expectedVersion}
    RETURNING version
  `
  return rows.length === 1
}

/** Unconditional write (seed reset, corrupt-data recovery, migration). */
export async function dbForceSaveStore(store: AdminStore): Promise<void> {
  await ensureSchema()
  await sql()`
    INSERT INTO admin_store (id, version, data)
    VALUES (1, 1, ${JSON.stringify(store)}::jsonb)
    ON CONFLICT (id) DO UPDATE
    SET data = EXCLUDED.data,
        version = admin_store.version + 1,
        updated_at = now()
  `
}

// ─── MongoDB (optional backup — lazy require so missing driver is fine) ─

export function mongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim())
}

/**
 * Mirror the store into MongoDB if MONGODB_URI is set.
 * Best-effort: never throws to the admin request path.
 */
export async function mirrorToMongo(store: AdminStore): Promise<void> {
  if (!mongoConfigured()) return
  try {
    // Dynamic import so projects without mongodb still typecheck/build.
    const { MongoClient } = await import('mongodb')
    const uri = process.env.MONGODB_URI!.trim()
    const dbName = process.env.MONGODB_DB?.trim() || 'mls_admin'
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    })
    await client.connect()
    try {
      const db = client.db(dbName)
      const now = new Date()
      await db.collection('admin_store').updateOne(
        { _id: 'current' as unknown as object },
        { $set: { data: store, updatedAt: now } },
        { upsert: true }
      )
      await db.collection('admin_store_history').insertOne({
        data: store,
        savedAt: now,
      })
    } finally {
      await client.close()
    }
  } catch (err) {
    console.error('[ADMIN STORE · MONGO MIRROR]', err)
  }
}
