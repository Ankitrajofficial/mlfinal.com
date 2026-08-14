// ============================================================
// KHADANE™ Assistant — knowledge base + system prompt.
// The knowledge is generated from the real catalogue data so the
// assistant always reflects what is actually on the site.
// ============================================================

import { VARIETIES, getOwnedVarieties, getAlliedVarieties } from './varieties'
import { FORMATS } from './formats'
import { SITE } from './site'

function varietyLine(v: (typeof VARIETIES)[number]): string {
  const bits = [
    `${v.name} (${v.code}, ${v.tierLabel})`,
    v.oneLine,
    v.primaryLocation ? `Source: ${v.primaryLocation}.` : '',
    v.formatScope ? `Formats: ${v.formatScope}.` : '',
    v.splittable ? `Splittable: ${v.splittable}.` : '',
  ].filter(Boolean)
  return `- ${bits.join(' ')}`
}

function formatLine(f: (typeof FORMATS)[number]): string {
  const regular = f.surfacesRegular?.length ? `Surfaces in standing production: ${f.surfacesRegular.join(', ')}.` : ''
  const surfaces = f.surfacesAvailable?.length ? `Surfaces worked to order: ${f.surfacesAvailable.join(', ')}.` : ''
  const edges = f.edgesAvailable?.length ? `Edges: ${f.edgesAvailable.join(', ')}.` : ''
  const routes = f.productionRoutes?.length ? `Production route: ${f.productionRoutes.join(', ')}.` : ''
  const sizes = f.sizes?.filter((s) => s.regular).length
    ? `Regular sizes (mm): ${f.sizes.filter((s) => s.regular).map((s) => s.code).join(', ')}.`
    : f.sizeBasis ?? ''
  const bits = [
    `${f.name} (${f.code})`,
    f.oneLine,
    f.primaryUse ? `Used for: ${f.primaryUse}.` : '',
    sizes,
    regular,
    surfaces,
    edges,
    routes,
  ].filter(Boolean)
  return `- ${bits.join(' ')}`
}

/** Compact, factual knowledge base assembled from the live catalogue. */
export function buildKnowledgeBase(): string {
  const owned = getOwnedVarieties()
  const allied = getAlliedVarieties()

  return `# KHADANE™ — Company
${SITE.name} is the sandstone catalogue of the Bijolia belt, ${SITE.district}, ${SITE.state}, ${SITE.country}. Working since ${SITE.foundationYear}. Part of ${SITE.groupParent}.
Signature: ${SITE.signature}
Scale: ${SITE.varietyCount} sandstone varieties (${SITE.ownedVarieties} owned + ${SITE.alliedVarieties} allied), ${SITE.formatCount} formats, ${SITE.surfaceTreatmentCount} surface treatments, ${SITE.edgeProfileCount} edge profiles. ${SITE.quarryCount} quarries, workforce ${SITE.workforceCount}, annual output ${SITE.annualOutput}, shipped to ${SITE.countriesShipped} countries across ${SITE.continentsReached} continents.
KHADANE quarries, processes, and ships its own stone — buyers see source, format, finish, and dispatch route without broker ambiguity.

# Contact / How to buy
- Email: ${SITE.contact.publicEmail}
- Phone: ${SITE.contact.publicPhone}
- WhatsApp: ${SITE.contact.whatsappUrl}
- Hours: ${SITE.contact.hours}
- Enquiries and quotes go through "The Desk" at ${SITE.url}/khadane/desk (quote returned within one business day).

# Owned varieties (${owned.length})
${owned.map(varietyLine).join('\n')}

# Allied varieties (${allied.length})
Allied varieties are sourced direct from heritage operators outside the Bijolia belt but still ship under KHADANE custody.
${allied.map(varietyLine).join('\n')}

# Formats (${FORMATS.length})
${FORMATS.map(formatLine).join('\n')}`
}

/** Full system prompt: persona + guardrails + knowledge base. */
export function buildSystemPrompt(): string {
  return `You are the KHADANE™ Assistant, a knowledgeable, courteous guide on the KHADANE website — a Rajasthani sandstone quarrier and exporter.

RULES:
- Answer ONLY using the KHADANE knowledge below. Topics you cover: KHADANE's stone varieties, formats, surfaces/edges, sourcing, the company, and how to buy.
- If asked something off-topic (not about KHADANE or its stone), politely decline and steer back to how you can help with KHADANE stone.
- NEVER invent prices, lead times, stock levels, or specifications that are not in the knowledge base. For quotes, pricing, availability, samples, or orders, direct the user to The Desk (${SITE.url}/khadane/desk), email (${SITE.contact.publicEmail}), or WhatsApp (${SITE.contact.whatsappUrl}).
- Refer to variety and format codes (e.g. KHD-O-02, KHF-001) where helpful. When you mention a variety or format, you may point to its page under ${SITE.url}/khadane/collection/<slug> or ${SITE.url}/khadane/formats/<slug>.
- Be concise and precise. Use short paragraphs or tight bullet lists. Match a calm, authoritative, editorial tone. Do not use emoji.
- If you are unsure or the answer isn't in the knowledge base, say so and route the user to The Desk.

KHADANE KNOWLEDGE BASE:
${buildKnowledgeBase()}`
}
