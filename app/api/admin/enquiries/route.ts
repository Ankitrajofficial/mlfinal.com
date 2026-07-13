import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { isSession, jsonError, jsonOk, requireAdmin } from '@/lib/admin/api-helpers'
import { logActivity, newId, readStore, updateStore } from '@/lib/admin/store'
import {
  ENQUIRY_PRIORITIES,
  ENQUIRY_STATUSES,
  type AdminEnquiry,
  type EnquiryPriority,
  type EnquiryStatus,
} from '@/lib/admin/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CreateSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().default(''),
  company: z.string().max(200).optional().default(''),
  country: z.string().max(100).optional().default(''),
  market: z.string().max(100).optional().default(''),
  vertical: z.string().min(1).max(80),
  category: z.string().max(80).optional().default('other'),
  site: z.enum(['mls', 'khadane']).optional().default('mls'),
  subject: z.string().min(2).max(200),
  message: z.string().min(2).max(5000),
  status: z.enum(ENQUIRY_STATUSES as [EnquiryStatus, ...EnquiryStatus[]]).optional(),
  priority: z.enum(ENQUIRY_PRIORITIES as [EnquiryPriority, ...EnquiryPriority[]]).optional(),
  owner: z.string().max(80).optional().default('Unassigned'),
  notes: z.string().max(5000).optional().default(''),
  variety: z.string().max(160).optional().default(''),
  format: z.string().max(160).optional().default(''),
  volume: z.string().max(160).optional().default(''),
})

export async function GET(request: NextRequest) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session

  const store = await readStore()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const q = (searchParams.get('q') || '').toLowerCase().trim()

  let rows = store.enquiries
  if (status) rows = rows.filter((e) => e.status === status)
  if (q) {
    rows = rows.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        e.reference.toLowerCase().includes(q) ||
        e.vertical.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q)
    )
  }

  return jsonOk({ enquiries: rows })
}

export async function POST(request: NextRequest) {
  const session = requireAdmin(request)
  if (!isSession(session)) return session

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid JSON body')
  }

  const parsed = CreateSchema.safeParse(body)
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message || 'Validation failed')
  }

  const data = parsed.data
  const now = new Date().toISOString()
  const date = now.slice(0, 10).replace(/-/g, '')
  const enquiry: AdminEnquiry = {
    id: newId('enq'),
    reference: `MLS-ENQ-${date}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    country: data.country,
    market: data.market || data.country || 'India',
    vertical: data.vertical,
    category: data.category,
    site: data.site,
    subject: data.subject,
    message: data.message,
    status: data.status ?? 'new',
    priority: data.priority ?? 'medium',
    owner: data.owner,
    notes: data.notes,
    variety: data.variety,
    format: data.format,
    volume: data.volume,
    source: 'manual',
    createdAt: now,
    updatedAt: now,
  }

  await updateStore((store) => {
    store.enquiries = [enquiry, ...store.enquiries]
    logActivity(store, {
      actor: session.name,
      action: `Created enquiry ${enquiry.reference} — ${enquiry.name}`,
      entityType: 'enquiry',
      entityId: enquiry.id,
    })
  })

  return jsonOk({ enquiry }, { status: 201 })
}
