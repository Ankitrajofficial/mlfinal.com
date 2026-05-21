'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { CONTACT } from '@/lib/facts'

interface SubmitState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
  reference?: string
}

const CATEGORIES = [
  { value: 'stone-export', label: 'Stone & Export (routes to KHADANE™)' },
  { value: 'domestic-stone', label: 'Domestic Stone (routes to KHADANE™)' },
  { value: 'automotive', label: 'Automotive · Dhakar Motors' },
  { value: 'fuel', label: 'Fuel · Dharnidhar' },
  { value: 'hospitality', label: 'Hospitality · M3 Hotel' },
  { value: 'student-housing', label: 'Student Housing · The Princess / Victoria / Boys&rsquo; PG' },
  { value: 'food-services', label: 'Food Services · Vyanjanam' },
  { value: 'careers', label: 'Careers · Letter of interest' },
  { value: 'media', label: 'Media · Press enquiry' },
  { value: 'partnership', label: 'Partnership · Other' },
  { value: 'other', label: 'Other' },
]

/**
 * MLS-styled enquiry form.
 *
 * Submits to /api/enquiry with site=mls. The API handles routing per
 * the single-channel discipline locked in FACTS Section 10.
 *
 * Defences (Batch 6 will add more):
 *   - Honeypot field (hidden from humans)
 *   - Min-submit-time check (~2s, anti-bot)
 *   - Client-side validation
 */
export default function MLSEnquiryForm() {
  const [state, setState] = useState<SubmitState>({ status: 'idle' })
  const submittedAtClientRef = useRef<number>(Date.now())

  useEffect(() => {
    submittedAtClientRef.current = Date.now()
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      site: 'mls',
      category: String(formData.get('category') || ''),
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      company: String(formData.get('company') || ''),
      country: String(formData.get('country') || ''),
      message: String(formData.get('message') || ''),
      honeypot: String(formData.get('honeypot') || ''),
      submittedAtClient: submittedAtClientRef.current,
    }

    // Min-submit-time check (don't tell the bot why)
    if (Date.now() - submittedAtClientRef.current < 2000) {
      setState({
        status: 'success',
        message: 'Received.',
        reference: 'BLOCKED-FAST',
      })
      return
    }

    setState({ status: 'submitting' })

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setState({
          status: 'success',
          message: data.message || 'Received.',
          reference: data.reference,
        })
        form.reset()
      } else {
        setState({
          status: 'error',
          message:
            data.error ||
            'Something went wrong. Please try again or write to The Office directly.',
        })
      }
    } catch {
      setState({
        status: 'error',
        message:
          'Network error. Please try again or write to The Office directly.',
      })
    }
  }

  if (state.status === 'success') {
    return (
      <div className="bg-mls-buff/30 border border-mls-gold/30 p-8 lg:p-10">
        <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-4">
          Received
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-mls-ink leading-tight mb-4">
          Your enquiry has been received.
        </h3>
        <p className="text-base leading-relaxed text-mls-ink/85 mb-3">
          {state.message}
        </p>
        {state.reference && (
          <p className="font-mono text-xs text-mls-slate">
            Reference: <span className="text-mls-ink">{state.reference}</span>
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px opacity-0"
      />

      {/* Category */}
      <Field
        label="What is this about?"
        required
        eyebrow="01 · Category"
      >
        <select
          name="category"
          required
          defaultValue=""
          className="w-full bg-transparent border-b border-mls-ink/30 py-3 pr-8 text-base text-mls-ink focus:outline-none focus:border-mls-gold transition-colors"
        >
          <option value="" disabled>
            Choose a category
          </option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Your name" required eyebrow="02 · Name">
          <input
            type="text"
            name="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Full name"
            className="w-full bg-transparent border-b border-mls-ink/30 py-3 text-base text-mls-ink placeholder-mls-slate focus:outline-none focus:border-mls-gold transition-colors"
          />
        </Field>
        <Field label="Email" required eyebrow="03 · Email">
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            placeholder="you@example.com"
            className="w-full bg-transparent border-b border-mls-ink/30 py-3 text-base text-mls-ink placeholder-mls-slate focus:outline-none focus:border-mls-gold transition-colors"
          />
        </Field>
      </div>

      {/* Phone + Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Phone (optional)" eyebrow="04 · Phone">
          <input
            type="tel"
            name="phone"
            maxLength={40}
            placeholder="+91 ..."
            className="w-full bg-transparent border-b border-mls-ink/30 py-3 text-base text-mls-ink placeholder-mls-slate focus:outline-none focus:border-mls-gold transition-colors"
          />
        </Field>
        <Field label="Company or institution (optional)" eyebrow="05 · Company">
          <input
            type="text"
            name="company"
            maxLength={200}
            placeholder="If applicable"
            className="w-full bg-transparent border-b border-mls-ink/30 py-3 text-base text-mls-ink placeholder-mls-slate focus:outline-none focus:border-mls-gold transition-colors"
          />
        </Field>
      </div>

      {/* Country */}
      <Field label="Country (optional)" eyebrow="06 · Country">
        <input
          type="text"
          name="country"
          maxLength={100}
          placeholder="India, United Kingdom, ..."
          className="w-full bg-transparent border-b border-mls-ink/30 py-3 text-base text-mls-ink placeholder-mls-slate focus:outline-none focus:border-mls-gold transition-colors"
        />
      </Field>

      {/* Message */}
      <Field label="Your message" required eyebrow="07 · Message">
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Tell us what you would like to discuss."
          className="w-full bg-transparent border border-mls-ink/30 p-4 text-base text-mls-ink placeholder-mls-slate focus:outline-none focus:border-mls-gold transition-colors resize-y"
        />
      </Field>

      {/* Error */}
      {state.status === 'error' && (
        <p
          className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3"
          role="alert"
        >
          {state.message}
        </p>
      )}

      {/* Submit */}
      <div className="pt-4 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={state.status === 'submitting'}
          className="inline-flex items-center gap-3 px-8 py-4 bg-mls-ink text-mls-cream text-sm font-body tracking-wider uppercase hover:bg-mls-tobacco hover:gap-4 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.status === 'submitting' ? 'Sending...' : 'Send to The Office'}
        </button>
        <p className="text-sm text-mls-slate">
          Or write to{' '}
          <a
            href={`mailto:${CONTACT.officeMLS}`}
            className="text-mls-gold hover:underline underline-offset-4"
          >
            {CONTACT.officeMLS}
          </a>{' '}
          directly.
        </p>
      </div>
    </form>
  )
}

interface FieldProps {
  label: string
  eyebrow?: string
  required?: boolean
  children: React.ReactNode
}

function Field({ label, eyebrow, required, children }: FieldProps) {
  return (
    <label className="block">
      {eyebrow && (
        <p className="font-mono text-[10px] uppercase tracking-marker text-mls-gold mb-2">
          {eyebrow}
        </p>
      )}
      <span className="block font-display italic text-base text-mls-ink/80 mb-2">
        {label}{' '}
        {required && (
          <span className="text-mls-gold not-italic" aria-hidden>
            *
          </span>
        )}
      </span>
      {children}
    </label>
  )
}
