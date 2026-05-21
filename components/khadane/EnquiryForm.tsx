'use client'

import { useState } from 'react'
import { VARIETIES } from '@/lib/khadane/varieties'
import { FORMATS } from '@/lib/khadane/formats'

function generateRef(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const n = String(Math.floor(Math.random() * 9999)).padStart(4, '0')
  return `KHD-ENQ-${y}${m}${d}-${n}`
}

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [ref, setRef] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const r = generateRef()
    setRef(r)
    setSubmitted(true)
    // In production this would POST to /api/enquiry
  }

  if (submitted) {
    return (
      <div className="bg-warm-white border border-quarry-gold/30 p-10 lg:p-12">
        <p className="eyebrow-gold mb-6 no-justify">ENQUIRY RECEIVED</p>
        <h3 className="font-display text-3xl text-obsidian no-justify mb-6">
          Thank you. We've received your enquiry.
        </h3>
        <p className="font-mono text-xs text-tobacco/60 mb-2 no-justify">Reference</p>
        <p className="font-mono text-lg text-quarry-gold no-justify mb-8">{ref}</p>
        <p className="editorial-body">
          We'll respond within one business day during {`Monday–Saturday, 10:00–18:00 IST`}. If urgent, WhatsApp us directly using the link in the sidebar.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 cta-text"
        >
          Submit another enquiry →
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Organization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Your name" name="name" required />
        <FormField label="Company / Organization" name="company" />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Email" name="email" type="email" required />
        <FormField label="Phone (with country code)" name="phone" type="tel" />
      </div>

      {/* Country */}
      <FormField label="Country / Destination port" name="country" required />

      {/* Variety + Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Variety (primary interest)"
          name="variety"
          options={[
            { value: '', label: 'Select a variety…' },
            ...VARIETIES.map((v) => ({ value: v.slug, label: `${v.code} · ${v.name}` })),
            { value: 'multiple', label: 'Multiple / not sure yet' },
          ]}
        />
        <FormSelect
          label="Format"
          name="format"
          options={[
            { value: '', label: 'Select a format…' },
            ...FORMATS.map((f) => ({ value: f.slug, label: `${f.code} · ${f.name}` })),
            { value: 'multiple', label: 'Multiple / not sure yet' },
          ]}
        />
      </div>

      {/* Volume + Lead time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Approx. volume (sq.m or containers)" name="volume" />
        <FormField label="Lead time / target arrival" name="leadtime" />
      </div>

      {/* Project notes */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-eyebrow text-tobacco mb-3 no-justify">
          Project notes — finish, size, surface, anything specific
        </label>
        <textarea
          name="notes"
          rows={5}
          className="w-full px-4 py-3 bg-warm-white border border-obsidian/15 text-obsidian font-sans text-sm leading-relaxed focus:outline-none focus:border-quarry-gold transition-colors"
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button type="submit" className="cta-primary no-justify w-full md:w-auto justify-center">
          Submit enquiry →
        </button>
        <p className="mt-4 font-mono text-xs text-tobacco/50 no-justify">
          We don't share your enquiry data outside KHADANE™ / Dhakar Stone Impex.
        </p>
      </div>
    </form>
  )
}

function FormField({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-eyebrow text-tobacco mb-3 no-justify">
        {label} {required && <span className="text-quarry-gold">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full px-4 py-3 bg-warm-white border border-obsidian/15 text-obsidian font-sans text-sm focus:outline-none focus:border-quarry-gold transition-colors"
      />
    </div>
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
    <div>
      <label className="block font-mono text-xs uppercase tracking-eyebrow text-tobacco mb-3 no-justify">
        {label} {required && <span className="text-quarry-gold">*</span>}
      </label>
      <select
        name={name}
        required={required}
        className="w-full px-4 py-3 bg-warm-white border border-obsidian/15 text-obsidian font-sans text-sm focus:outline-none focus:border-quarry-gold transition-colors"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
