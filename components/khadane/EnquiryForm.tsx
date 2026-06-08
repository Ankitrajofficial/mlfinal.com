'use client'

import { AlertCircle, CheckCircle2, Send } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { FORMATS } from '@/lib/khadane/formats'
import { VARIETIES } from '@/lib/khadane/varieties'

interface SubmitState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
  reference?: string
}

const CATEGORY_OPTIONS = [
  { value: '', label: 'Select enquiry type' },
  { value: 'buyer-paving', label: 'Paving / patio / landscape order' },
  { value: 'buyer-blocks', label: 'Blocks or raw stone' },
  { value: 'buyer-tiles', label: 'Tiles, roofing, or flooring' },
  { value: 'buyer-cladding', label: 'Walling or cladding' },
  { value: 'sample-request', label: 'Sample request' },
  { value: 'catalogue-request', label: 'Catalogue request' },
  { value: 'partnership', label: 'Partnership or trade account' },
  { value: 'other', label: 'Other enquiry' },
]

export default function EnquiryForm() {
  const [state, setState] = useState<SubmitState>({ status: 'idle' })
  const submittedAtClientRef = useRef<number>(Date.now())

  useEffect(() => {
    submittedAtClientRef.current = Date.now()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.reportValidity()) return

    const formData = new FormData(form)
    const category = String(formData.get('category') || '')
    const variety = String(formData.get('variety') || '')
    const format = String(formData.get('format') || '')
    const message = String(formData.get('message') || '')
    const honeypot = String(formData.get('honeypot') || '')

    const payload = {
      site: 'khadane',
      category,
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: '',
      company: '',
      country: String(formData.get('country') || ''),
      variety: labelForValue(
        variety,
        VARIETIES.map((v) => ({ value: v.slug, label: `${v.code} · ${v.name}` })),
      ),
      format: labelForValue(
        format,
        FORMATS.map((f) => ({ value: f.slug, label: `${f.code} · ${f.name}` })),
      ),
      finish: '',
      volume: '',
      targetArrival: '',
      message,
      honeypot,
      submittedAtClient: submittedAtClientRef.current,
    }

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
            'Something went wrong. Please try again or write to the desk directly.',
        })
      }
    } catch {
      setState({
        status: 'error',
        message: 'Network error. Please try again or write to the desk directly.',
      })
    }
  }

  if (state.status === 'success') {
    return (
      <div className="border border-quarry-gold/30 bg-warm-white p-8 lg:p-10">
        <CheckCircle2 className="mb-6 text-quarry-gold" size={28} strokeWidth={1.6} />
        <p className="eyebrow-gold mb-5 no-justify">ENQUIRY RECEIVED</p>
        <h3 className="mb-6 font-display text-3xl leading-tight text-obsidian no-justify">
          Thank you. Your enquiry has been received.
        </h3>
        {state.reference && (
          <>
            <p className="mb-2 font-mono text-xs uppercase tracking-eyebrow text-tobacco/55 no-justify">
              Reference
            </p>
            <p className="mb-7 font-mono text-lg text-quarry-gold no-justify">
              {state.reference}
            </p>
          </>
        )}
        <p className="editorial-body">
          {state.message ||
            'We will respond within one business day during Monday-Saturday, 10:00-18:00 IST.'}
        </p>
        <button
          type="button"
          onClick={() => {
            submittedAtClientRef.current = Date.now()
            setState({ status: 'idle' })
          }}
          className="cta-text mt-8"
        >
          Submit another enquiry →
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      <FormSection eyebrow="01 · REQUEST">
        <FormSelect label="Enquiry type" name="category" options={CATEGORY_OPTIONS} required />
      </FormSection>

      <FormSection eyebrow="02 · BUYER">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField label="Your name" name="name" autoComplete="name" required />
          <FormField label="Email" name="email" type="email" autoComplete="email" required />
        </div>
        <FormField
          label="Country / destination"
          name="country"
          autoComplete="country-name"
        />
      </FormSection>

      <FormSection eyebrow="03 · MATERIAL">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormSelect
            label="Variety"
            name="variety"
            options={[
              { value: '', label: 'Select a variety' },
              ...VARIETIES.map((v) => ({ value: v.slug, label: `${v.code} · ${v.name}` })),
              { value: 'multiple', label: 'Multiple / not sure yet' },
            ]}
          />
          <FormSelect
            label="Format"
            name="format"
            options={[
              { value: '', label: 'Select a format' },
              ...FORMATS.map((f) => ({ value: f.slug, label: `${f.code} · ${f.name}` })),
              { value: 'multiple', label: 'Multiple / not sure yet' },
            ]}
          />
        </div>
      </FormSection>

      <FormSection eyebrow="04 · NOTES">
        <FormTextarea
          label="Project notes"
          name="message"
          placeholder="Share sizes, finish, volume, timing, destination, drawings, sample needs, or anything specific."
          minLength={10}
          required
        />
      </FormSection>

      {state.status === 'error' && (
        <p
          role="alert"
          className="flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm leading-relaxed text-red-700 no-justify"
        >
          <AlertCircle className="mt-0.5 shrink-0" size={16} strokeWidth={1.8} />
          <span>{state.message}</span>
        </p>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state.status === 'submitting'}
          className="cta-primary no-justify w-full justify-center disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <Send size={16} strokeWidth={1.7} />
          {state.status === 'submitting' ? 'Sending...' : 'Submit enquiry'}
        </button>
        <p className="font-mono text-xs leading-relaxed text-tobacco/50 no-justify">
          We do not share enquiry data outside KHADANE™ / Dhakar Stone Impex.
        </p>
      </div>
    </form>
  )
}

function labelForValue(
  value: string,
  options: { value: string; label: string }[],
): string {
  return options.find((option) => option.value === value)?.label || value
}

function FormSection({
  eyebrow,
  children,
}: {
  eyebrow: string
  children: ReactNode
}) {
  return (
    <fieldset className="space-y-5 border-t border-obsidian/10 pt-6">
      <legend className="mb-5 font-mono text-xs uppercase tracking-eyebrow text-quarry-gold no-justify">
        {eyebrow}
      </legend>
      {children}
    </fieldset>
  )
}

function FormField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="mb-3 block font-mono text-xs uppercase tracking-eyebrow text-tobacco no-justify">
        {label} {required && <span className="text-quarry-gold">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={160}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full border border-obsidian/15 bg-warm-white px-4 py-3 font-sans text-sm text-obsidian transition-colors placeholder:text-tobacco/35 focus:border-quarry-gold focus:outline-none"
      />
    </label>
  )
}

function FormTextarea({
  label,
  name,
  required = false,
  placeholder,
  minLength,
}: {
  label: string
  name: string
  required?: boolean
  placeholder?: string
  minLength?: number
}) {
  return (
    <label className="block">
      <span className="mb-3 block font-mono text-xs uppercase tracking-eyebrow text-tobacco no-justify">
        {label} {required && <span className="text-quarry-gold">*</span>}
      </span>
      <textarea
        name={name}
        required={required}
        minLength={minLength}
        maxLength={5000}
        rows={6}
        placeholder={placeholder}
        className="w-full resize-y border border-obsidian/15 bg-warm-white px-4 py-3 font-sans text-sm leading-relaxed text-obsidian transition-colors placeholder:text-tobacco/35 focus:border-quarry-gold focus:outline-none"
      />
    </label>
  )
}

function FormSelect({
  label,
  name,
  options,
  required = false,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-3 block font-mono text-xs uppercase tracking-eyebrow text-tobacco no-justify">
        {label} {required && <span className="text-quarry-gold">*</span>}
      </span>
      <select
        name={name}
        required={required}
        className="w-full border border-obsidian/15 bg-warm-white px-4 py-3 font-sans text-sm text-obsidian transition-colors focus:border-quarry-gold focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={required && opt.value === ''}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
