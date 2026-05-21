import { z } from 'zod'

/**
 * Shared enquiry form schema for both MLS and KHADANE sites.
 * Per build prompt §4.4: routes by category to the right inbox,
 * with site-specific reference number prefix.
 */

export const SiteSchema = z.enum(['mls', 'khadane'])
export type Site = z.infer<typeof SiteSchema>

// Categories per site
export const MLSCategorySchema = z.enum([
  'stone-export',
  'domestic-stone',
  'automotive',
  'fuel',
  'hospitality',
  'student-housing',
  'food-services',
  'careers',
  'media',
  'partnership',
  'other',
])

export const KhadaneCategorySchema = z.enum([
  'buyer-paving',
  'buyer-blocks',
  'buyer-tiles',
  'buyer-cladding',
  'sample-request',
  'catalogue-request',
  'partnership',
  'other',
])

export const EnquirySchema = z.object({
  site: SiteSchema,
  category: z.string().min(1, 'Category is required'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z.string().email('Please provide a valid email address').max(200),
  phone: z
    .string()
    .max(40, 'Phone number too long')
    .optional()
    .or(z.literal('')),
  company: z.string().max(200).optional().or(z.literal('')),
  country: z.string().max(100).optional().or(z.literal('')),
  message: z
    .string()
    .min(10, 'Please write at least 10 characters')
    .max(5000, 'Please keep your message under 5000 characters'),

  // Anti-spam fields
  honeypot: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
  submittedAtClient: z.number().optional(), // For min-submit-time check (~2s)

  // Optional Turnstile token (CAPTCHA)
  turnstileToken: z.string().optional(),
})

export type EnquiryInput = z.infer<typeof EnquirySchema>

/**
 * Generate a unique reference number for an enquiry submission.
 * Format: {PREFIX}-YYYYMMDD-XXXX (XXXX = random 4-char alphanumeric)
 */
export function generateReferenceNumber(site: Site): string {
  const prefix = site === 'khadane' ? 'KHD-ENQ' : 'MLS-ENQ'
  const date = new Date()
  const yyyymmdd = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, '0')}${String(date.getUTCDate()).padStart(2, '0')}`
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no ambiguous chars
  let random = ''
  for (let i = 0; i < 4; i++) {
    random += chars[Math.floor(Math.random() * chars.length)]
  }
  return `${prefix}-${yyyymmdd}-${random}`
}

/**
 * Route an enquiry to the right inbox based on site + category.
 * Single-channel discipline per FACTS-CANONICAL v2.0 Section 10.
 */
export function routeEnquiryInbox(site: Site, category: string): string {
  // KHADANE side → always exports@khadane.com
  if (site === 'khadane') {
    return process.env.INBOX_KHADANE_EXPORTS ?? 'exports@khadane.com'
  }

  // MLS side → stone-related routes to KHADANE; everything else to office@
  if (category === 'stone-export' || category === 'domestic-stone') {
    return process.env.INBOX_KHADANE_EXPORTS ?? 'exports@khadane.com'
  }

  return process.env.INBOX_OFFICE_MLS ?? 'office@mohanlalsonsgroup.com'
}
