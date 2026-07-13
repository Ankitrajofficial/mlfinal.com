# SEO Plan — MLS + KHADANE™

**Status:** Execution-ready (optimized plan)  
**Date:** 2026-07-13  
**Repos:** MLS + KHADANE dual-site Next.js codebase  
**Claude Code session:** `.context/claude-session-id` (resume for follow-up consults)  
**Principle:** Maximize crawl impact per PR; batch by dependency; never open market pages before foundations.

This document captures an independent codebase read by Claude Code (read-only: Read / Grep / Glob) plus host-agent synthesis. It is the working SEO plan for:

| Domain | Brand | Role |
|---|---|---|
| [mohanlalsonsgroup.com](https://mohanlalsonsgroup.com) | Mohan Lal & Sons (MLS) | Institutional group site · five verticals · local Kota/Bijolia intent |
| [khadane.com](https://khadane.com) | KHADANE™ | Stone & export trade brand · commercial export intent |

---

## 1. Codebase brief (architecture)

### How the site works

1. **One Next.js 16 (App Router) codebase** serves two production domains from a single Vercel project: MLS under `app/mls/`, KHADANE under `app/khadane/`.
2. **`proxy.ts`** performs host-based transparent rewrites (`khadane.com/collection` → internal `/khadane/collection`; URL bar stays clean) and 308-redirects leaked `/khadane/*` or `/mls/*` paths on public domains back to clean URLs.
3. **Bypass paths** (no per-site rewrite): `/admin`, `/api`, `/brand`, `/img`, `/images`, `/videos` — reachable on both hosts.
4. **`lib/facts.ts`** is the sealed v2.0 source of truth for institutional claims (founding year, workforce, scale phrasing), enforced by `scripts/audit-facts.ts`.
5. **Catalogue content is data-driven**: varieties, formats, field notes generate static pages via `generateStaticParams` — SEO-friendly pattern already in place.
6. **SEO helpers** live in `lib/seo.ts`: `buildMetadata()` (canonical + OG + robots), `buildOrganizationLD()`, `buildBreadcrumbLD()`.
7. **Per-site sitemaps and robots** (`app/mls/sitemap.ts`, `app/khadane/sitemap.ts`, robots route handlers) are host-routed correctly via the proxy.
8. **Enquiry pipeline**: `app/api/enquiry/route.ts` → Zod (`lib/enquiry-schema.ts`) → Resend and/or Google Apps Script (`lib/google-enquiry.ts`, `scripts/google-enquiry-webhook.gs`), with honeypot, min-submit-time, IP rate limit, optional Turnstile.
9. **Admin command centre**: `app/admin/` + `app/api/admin/*` (auth, enquiries, shipments, mines GIS, tasks) backed by Neon (`lib/admin/db.ts`, `store.ts`). Layout sets `robots: noindex` — see risks below.
10. **Cross-domain strategy**: MLS funnels stone commercial intent to KHADANE; facts and enquiry routing stay single-channel per FACTS Section 10.

### Module drift risks (non-SEO but relevant)

- Duplicate config modules risk URL drift: `lib/site-khadane.ts` (env-overridable) vs `lib/khadane/site.ts` (hardcoded); `lib/varieties.ts` vs `lib/khadane/varieties.ts`.
- Sitemaps / SEO helpers must always read the same site URL source as production env (`NEXT_PUBLIC_MLS_URL` / `NEXT_PUBLIC_KHADANE_URL`).

---

## 2. SEO: solid vs missing

| Already solid | Missing / at risk |
|---|---|
| Per-host sitemaps + robots.txt, correctly rewritten | **KHADANE: little/no use of `buildMetadata()`** → weak canonicals on commercial URLs |
| MLS pages using `buildMetadata` for canonicals + OG | **`buildBreadcrumbLD()` unused** sitewide |
| Static generation of catalogue pages | No `Product` / `ItemList` schema on variety / collection pages |
| Sealed facts = consistent E-E-A-T signals | Internal links with `/khadane/` prefix → **308 hop** on every in-site click |
| 308 canonicalization of prefixed public URLs | `/admin` reachable on both domains; not in robots.txt Disallow |
| Rename redirects pattern in `next.config` (e.g. variety aliases) | Sitemap `lastModified: new Date()` every build (false freshness) |
| Org JSON-LD on MLS layout | Org JSON-LD **not injected** on KHADANE layout (helper exists, unused) |
| | Metadata contradictions risk (public claims vs `internalVarietyCount` discipline) |
| | No market-specific pages despite export focus; locale mix (`en_GB` vs `en_IN`) |
| | Legacy `/food-services.html` alongside `/verticals/food-services` (duplicate risk) |
| | Non-primary host `mohanlalandsonsgroup.com` rewrites as full duplicate (should 308) |

---

## 3. Strategic split (do not blur)

### KHADANE.com — commercial export

- **Job:** Rank for buyer/trade queries (variety + sandstone + paving/slabs/export/supplier).
- **Do not:** Compete with MLS for “family group / Kota hostel / hotel” queries.
- **Primary markets (English trade):** UK, UAE, EU, Australia, US — **no hreflang yet** (single English site; authority too valuable to split).

### MLS (mohanlalsonsgroup.com) — institutional + local

- **Job:** Group authority, legacy, CSR, careers, local verticals (Kota/Bijolia), bridge to KHADANE for stone.
- **Do not:** Rank hard against KHADANE for commercial stone-export keywords; one strong cross-link is enough.

---

## 4. 90-day SEO plan

### A. Technical SEO

1. **KHADANE canonicals (P0)**  
   Adopt `buildMetadata({ site: 'khadane', path: '…' })` on every public `app/khadane/**/page.tsx`, especially:
   - `collection/[variety]`
   - `formats/[format]`
   - `field-notes/[slug]`  
   Pass **clean paths** only (`/collection/kandla-grey`), never `/khadane/...`.

2. **Structured data**  
   - KHADANE layout: inject `buildOrganizationLD('khadane')` (mirror `app/mls/layout.tsx`).  
   - Variety pages: `Product` (no public pricing; brand, material, `countryOfOrigin: IN`).  
   - `/collection`: `ItemList`.  
   - Field notes: `Article`.  
   - All: `BreadcrumbList` via `buildBreadcrumbLD()`.  
   - MLS verticals: `LocalBusiness` subtypes — `Hotel` (M3), automotive/fuel, food service; student housing FAQ schema.

3. **Sitemaps**  
   Replace `lastModified: new Date()` in `app/mls/sitemap.ts` and `app/khadane/sitemap.ts` with real dates (field-note `date`; optional `lastUpdated` on varieties).

4. **Robots / admin indexation**  
   - Add `Disallow: /admin` to both robots route handlers.  
   - Keep meta noindex on `app/admin/layout.tsx`.  
   - Prefer single-host admin (e.g. MLS only) via `proxy.ts` policy later.

5. **Internal link hygiene**  
   Strip `/khadane/` prefix from ~44 internal hrefs on the KHADANE tree (worst: home, variety pages). Removes crawl budget waste and 308 chains.

6. **Duplicate hosts**  
   308 `mohanlalandsonsgroup.com` (+ www variants if not already) → `mohanlalsonsgroup.com`. Rewrite-only aliases create duplicate indexes.

7. **Legacy static duplicates**  
   301 `/food-services.html` → `/verticals/food-services` (or canonical in static HTML).

8. **Core Web Vitals**  
   Prefer `next/image` on variety/gallery assets; `priority` on heroes; verify font strategy; keep Framer Motion out of critical path on content pages where possible.

9. **Metadata / facts discipline**  
   Public titles must not claim internal-only catalogue counts. Align layout/OG copy with `lib/facts.ts` and `npm run audit:facts`. Confirm OG image assets resolve (SVG vs JPG vs generated `opengraph-image.tsx`).

---

### B. On-page SEO by vertical

#### KHADANE (export intent)

| Surface | Target intent examples |
|---|---|
| Variety pages | `{name} sandstone paving supplier`, `{name} sandstone exporter India`, trade aliases (e.g. Raj Green / Sage Green) |
| Format pages | sandstone cobbles setts export, gangsaw slabs India, wall cladding supplier |
| Quarry / about | Bijolia sandstone belt, quarry-direct provenance |

**Title pattern (example):**  
`{Name} Sandstone — Exporter & Quarry Direct · KHADANE™`  
(via `buildMetadata`, not ad-hoc strings)

#### MLS (local + brand + funnel)

| Vertical | Intent focus |
|---|---|
| Stone export | Brand + “Mohan Lal Sons stone” → funnel to khadane.com |
| Hospitality | boutique hotel Kota, M3 hotel Kota + `Hotel` schema + GBP |
| Student housing | girls hostel Kota, PG Kunhari — **best organic local asset**; FAQ schema on girls page |
| Automotive / fuel | Ashok Leyland / Dabi / fuels — GBP-heavy |
| Food services | mess / meals Kota; milestones as PR (e.g. 1M meals) |

---

### C. Content pillars & calendar

| Pillar | Location / system | Cadence | Notes |
|---|---|---|---|
| Field notes | `lib/field-notes.ts`, KHADANE routes | 2 / month | Buyer trust: calibration, containers, UK winters, Bijolia splits |
| Catalogues / brochures | MLS resources + HTML versions | Ongoing | HTML indexable; PDF for trade |
| Legacy | `/our-legacy`, Bijolia inscriptions framing | 1 long piece / quarter | Link-bait for heritage/architecture |
| CSR / milestones | `/csr`, Vyanjanam milestones | Quarterly | Local press → DA for both brands via cross-links |
| MLS blog | `/resources/blog` | 1 ops post / month when real | **`noIndex` while empty** (`buildMetadata` flag) |

**Months 1–2:** four field notes on top traded varieties with real photography already in `public/img/varieties/` (e.g. Kandla Grey, Autumn Brown, Raj Blend, Rainbow / multi-colour lineage per locked naming).  
**Month 2:** formats explainer series.  
**Month 3:** legacy long-form + first market landing page (see D).

---

### D. International SEO (KHADANE)

**Decision: no hreflang, no locale subfolders in the first 90 days.**

Reasons:

- Target markets search primarily in English.
- One English domain concentrates authority.
- hreflang with a single locale is a no-op; premature multi-locale splits authority.

**Instead:**

1. Market landings: `app/khadane/markets/[market]/page.tsx`  
   Routes: `/markets/uk`, `/markets/uae`, `/markets/australia`, `/markets/europe`, `/markets/us`.  
   Content: climate fit, local trade names, Mundra shipping (`KHADANE_SCALE.port`), enquiry CTA.
2. Coherent `openGraph.locale` (pick one deliberate value; UK-primary → `en_GB` is defensible).
3. Schema: `countryOfOrigin`, served markets language on Organization/Product.
4. Revisit hreflang only when true translation exists (e.g. German trade pages), with `x-default` → khadane.com.

---

### E. Measurement

| System | Actions |
|---|---|
| **GA4** | Two streams or one property + `site` dimension. Events: `enquiry_submitted` (vertical/variety), `enquiry_started`, `catalogue_download`, `cross_domain_click` (MLS→KHADANE), `variety_view`, `format_view`, optional `assistant_opened` |
| **Search Console** | Verify both apex + www × two brands; submit both sitemaps; watch for `/khadane/*` prefix leakage and “and” domain indexing |
| **Enquiry attribution** | Add page path + UTM fields to enquiry payload (`lib/enquiry-schema.ts` → Sheet/admin) — conversion KPI |
| **KPIs (day 90)** | KHADANE: top-10 on 5 variety+supplier terms; GB/AE/AU impression lift. MLS: local pack for girls hostel / boutique hotel Kota; brand coverage |

---

### F. Prioritized backlog

#### P0 — this week

| # | Task | Touch points |
|---|---|---|
| 1 | Canonicals on all KHADANE pages via `buildMetadata` | Every `app/khadane/**/page.tsx` with metadata |
| 2 | `Disallow: /admin` | `app/mls/robots.txt/route.ts`, `app/khadane/robots.txt/route.ts` |
| 3 | Strip `/khadane/`-prefixed internal hrefs | Start `app/khadane/page.tsx`, variety pages |
| 4 | Fix KHADANE layout metadata (claims, OG, locale) | `app/khadane/layout.tsx` |
| 5 | Redirect non-primary MLS hosts (not rewrite-only) | `proxy.ts` |

#### P1 — this month

| # | Task | Touch points |
|---|---|---|
| 6 | Org + Product/ItemList/Article/Breadcrumb schema | `app/khadane/layout.tsx`, collection/format/notes pages |
| 7 | Real `lastModified` in sitemaps | both `sitemap.ts` files, content modules |
| 8 | Buyer-intent titles + per-variety SEO descriptions | `lib/khadane/varieties.ts` (+ optional `seoDescription`) |
| 9 | LocalBusiness + FAQ on MLS verticals | hospitality, student-housing, automotive-fuel, food-services |
| 10 | GA4 + GSC + enquiry attribution | forms, `lib/enquiry-schema.ts`, analytics |
| 11 | noIndex empty resource pages | blog/press until content |
| 12 | Consolidate site URL modules | `lib/site-khadane.ts` vs `lib/khadane/site.ts` |

#### P2 — this quarter

| # | Task | Touch points |
|---|---|---|
| 13 | Market pages UK / UAE / AU / EU / US | `app/khadane/markets/[market]/` |
| 14 | Field-notes cadence (~8 notes), formats series, legacy long-form | content + `lib/field-notes.ts` |
| 15 | CWV pass | images, fonts, motion |
| 16 | Digital PR (meals milestone, Bijolia heritage) | off-site + on-site landing |
| 17 | Resolve `/food-services.html` duplicate | `proxy.ts` + static assets |

---

## 5. Optimized execution plan

This section is the **operating system** for the backlog above. It optimizes for:

1. **Impact density** — one PR fixes the most crawl/index damage possible.  
2. **Dependency order** — never build market pages or content velocity on a broken foundation.  
3. **Parallel tracks** — eng and content move at the same time without blocking each other.  
4. **Small verify loops** — each batch has a gate; failed gates stop the train.  
5. **Facts safety** — every metadata/copy change runs `npm run audit:facts`.

### 5.1 North star (one sentence)

**Make Google crawl one clean URL per page, understand what it sells, and send export buyers to KHADANE (and Kota locals to MLS) — without indexing admin or inventing facts.**

### 5.2 Priority scoring (how we rank work)

Score each task: **Impact (1–5) × Confidence (1–5) ÷ Effort (1–5)**.

| Score band | Action |
|---|---|
| ≥ 8 | Do now (this week) |
| 4–7 | Schedule this month |
| &lt; 4 | Quarter / opportunistic |

**Pre-scored critical path (do in this order):**

| Rank | Task | I | C | E | Score | Why first |
|---|---|---|---|---|---|---|
| 1 | KHADANE `buildMetadata` on commercial pages | 5 | 5 | 2 | 12.5 | Canonicals on money URLs |
| 2 | Strip `/khadane/` internal prefixes | 5 | 5 | 2 | 12.5 | Removes sitewide 308 tax |
| 3 | Host 308 for “and” / duplicate MLS hosts | 5 | 4 | 2 | 10 | Stops duplicate domain index |
| 4 | Robots `Disallow: /admin` | 4 | 5 | 1 | 20* | Tiny effort, index safety |
| 5 | KHADANE layout org JSON-LD + claim fix | 4 | 5 | 2 | 10 | Trust + rich results base |
| 6 | Real sitemap lastmod | 3 | 5 | 2 | 7.5 | Stops false freshness signal |
| 7 | Product/ItemList schema on catalogue | 4 | 4 | 3 | 5.3 | Commercial SERP features |
| 8 | Enquiry pagePath + UTM | 4 | 5 | 2 | 10 | Measurement of SEO ROI |
| 9 | Buyer titles + seoDescription | 4 | 4 | 3 | 5.3 | Ranking copy |
| 10 | Market pages | 4 | 3 | 4 | 3 | Only after 1–5 |

\*Robots scores high because effort is 1; batch with Rank 5 in same PR.

### 5.3 Dependency graph (do not reorder casually)

```
[PR-A Foundations] ──► [PR-B Schema + sitemap] ──► [PR-C Titles + noIndex thin]
        │                        │
        │                        └──► [PR-D Measurement] ──► content ROI known
        │
        └──► [Content track: field notes] (parallel after PR-A)
                        │
                        └──► [PR-E Markets] (only after PR-A + 4 field notes draft-ready)
```

**Hard rules:**

- No `/markets/*` until PR-A is live and GSC shows clean URL indexing (no flood of `/khadane/*` prefixes).  
- No big CWV rewrite until commercial templates use correct metadata (otherwise you optimize the wrong HTML).  
- No public claim experiments outside `lib/facts.ts`.

### 5.4 PR batches (optimized shipping units)

Ship **four engineering PRs** instead of 17 one-off tickets. Each PR is reviewable in one sitting.

#### PR-A — Crawl foundations (Day 1–2) · P0

| Include | Files (typical) |
|---|---|
| `buildMetadata` on KHADANE pages | `app/khadane/**/page.tsx`, especially collection/format/field-notes |
| Org JSON-LD + layout metadata fix | `app/khadane/layout.tsx`, `lib/seo.ts` if needed |
| Internal link prefix cleanup | `app/khadane/**` hrefs |
| Robots Disallow `/admin` | both `robots.txt/route.ts` |
| Host 308 for non-primary MLS | `proxy.ts` |
| Optional: 301 food-services.html | `proxy.ts` (cheap if already touching proxy) |

**Gate A (must pass before merge/deploy):**

```bash
npm run typecheck
npm run audit:facts
# Manual / post-deploy:
# - khadane.com page has <link rel="canonical" href="https://khadane.com/..."> clean path
# - robots.txt contains Disallow: /admin on both hosts
# - in-site link on khadane.com does not 308 strip /khadane
# - mohanlalandsonsgroup.com → 308 primary MLS
```

**Definition of done:** Google can resolve one canonical URL per public page; admin not invited to crawl; no dual-host MLS clone.

---

#### PR-B — Understand the page (Day 3–5) · P1 early

| Include | Files |
|---|---|
| Breadcrumb + Product/ItemList/Article JSON-LD | variety, collection, formats, field-notes |
| Real sitemap `lastModified` | both `sitemap.ts`, content modules |
| noIndex empty blog/press | MLS resources pages |

**Gate B:**

- Rich Results Test: Organization (KHADANE) + sample variety page no critical errors.  
- Sitemap lastmod not “all equal to now” on every URL.  
- Empty resource pages `noindex`.

---

#### PR-C — Rank the money pages (Week 2) · P1

| Include | Files |
|---|---|
| Buyer-intent titles + `seoDescription` per variety | `lib/khadane/varieties.ts` + variety page metadata |
| Format page title/description pass | formats data + pages |
| MLS local FAQ schema on girls housing + hotel (only 2 pages first) | student-housing/girls, hospitality |

**Gate C:**

- 5 sample variety titles match pattern in plan (name + sandstone + exporter/supplier framing).  
- `audit:facts` green.  
- No invented sq.m or workforce claims in meta.

**Optimization:** Only **two** MLS local pages first (highest Kota search value). Defer automotive/fuel FAQ to later.

---

#### PR-D — Measurement (parallel with PR-C) · P1

| Include | Files |
|---|---|
| Enquiry `pagePath` + optional UTM fields | `lib/enquiry-schema.ts`, forms, Google sheet/admin ingest |
| GA4 base events (submit + variety_view if easy) | form components, layout snippet |
| GSC setup (ops, not code) | both domains, both sitemaps |

**Gate D:**

- Submit test enquiry from a variety page → Sheet/admin shows that path.  
- GSC: both properties verified; sitemaps submitted.  
- GA4 realtime sees `enquiry_submitted` (or equivalent).

**Why parallel:** Measurement does not depend on schema completeness; starting it early means P2 content has baseline.

---

#### PR-E — Growth (Month 2–3) · P2

| Include | Only after |
|---|---|
| `/markets/uk` first (not all five) | PR-A live + Gate D |
| Then UAE, AU, EU, US one per sprint | UK page template proven |
| Field notes 2/month | Content owner; eng only if template broken |
| CWV pass | After PR-C (templates stable) |
| Digital PR | After at least one landmark page (legacy or CSR) is strong |

**Optimization:** **One market template → five markets**, not five custom designs. UK first (highest sandstone trade intent).

### 5.5 Parallel tracks (calendar)

```
Week 1
  Eng:     ████ PR-A ████ PR-B ████
  Ops:     ░░ GSC verify both domains ░░
  Content: ░ outline 4 field notes + UK market brief ░

Week 2
  Eng:     ████ PR-C ████ PR-D ████
  Ops:     ░ GA4 + sitemap submit ░
  Content: ░ write field note #1–2 ░

Weeks 3–4
  Eng:     ░ polish schema / titles from GSC noise ░
  Content: ░ field notes #3–4 + UK market draft ░

Month 2
  Eng:     ████ PR-E UK market page ████
  Content: ░ notes cadence + catalogue HTML if ready ░

Month 3
  Eng:     ░ more markets + CWV ░
  Content: ░ legacy long-form + PR outreach ░
```

### 5.6 What we deliberately cut or defer

| Idea | Decision | Reason |
|---|---|---|
| hreflang / multi-locale | **Defer** | One English site; no translation budget |
| All 5 markets day one | **Cut to UK first** | Template risk; authority focus |
| Full MLS vertical FAQ suite | **Defer** after girls + hotel | 80/20 local intent |
| Mongo SEO dashboards | **Out of scope** | Admin is noindex; use GSC/GA4 |
| Rewriting all photography | **Defer** | Use existing variety assets first |
| Competing MLS vs KHADANE on stone keywords | **Forbidden** | Dilutes both |

### 5.7 Roles & RACI (lightweight)

| Work | Engineer | Content / family | Ops |
|---|---|---|---|
| PR-A / PR-B / PR-C code | **A** | C (claims wording) | I |
| Field notes / market copy | C (template) | **A** | I |
| GSC / GA4 / GBP | C | I | **A** |
| Facts approval | C | **A** (family) | I |
| Deploy / Vercel env | **A** | I | C |

A = accountable · C = consulted · I = informed

### 5.8 Weekly operating rhythm (30 minutes)

**Monday — plan**  
- Pick next open gate only (never “do all SEO”).  
- Confirm facts constraints for any new copy.

**Wednesday — ship**  
- Merge at most one SEO PR.  
- Run audit + typecheck.

**Friday — measure**  
- GSC: Coverage, “why pages aren’t indexed”, query spikes.  
- Admin/Sheet: enquiries by landing page (after PR-D).  
- Log 3 bullets in this file under §5.11 Progress log.

### 5.9 Verification cheatsheet

| Check | Command / tool |
|---|---|
| Facts | `npm run audit:facts` |
| Types | `npm run typecheck` |
| Canonical | View-source or Rich Results / URL Inspection |
| Robots | `curl -s https://khadane.com/robots.txt` |
| Host redirect | `curl -sI https://mohanlalandsonsgroup.com \| head` |
| Schema | Google Rich Results Test |
| Index | Search Console → URL Inspection |
| Conversion | Enquiry with known UTM from variety page |

### 5.10 Five quick wins (mapped to PR-A)

Same as Claude consult; **all ship inside PR-A**:

1. Variety/format/field-note → `buildMetadata`  
2. KHADANE layout → org JSON-LD + claim/OG fix  
3. Robots → `Disallow: /admin`  
4. Internal hrefs → drop `/khadane` prefix on KHADANE site  
5. `proxy.ts` → 308 non-primary MLS hosts  

### 5.11 Progress log

| Date | Batch | Status | Notes |
|---|---|---|---|
| 2026-07-13 | Plan optimized | Done | Execution OS written; implementation not started |
| | PR-A | Not started | Next action: implement PR-A |
| | PR-B | Blocked on PR-A | |
| | PR-C | Blocked on PR-A | |
| | PR-D | Can start in parallel after PR-A starts | |
| | PR-E | Blocked on PR-A + Gate D | |

### 5.12 Immediate next action (single sentence)

**Implement PR-A as one branch: metadata + robots + link prefixes + layout JSON-LD + host redirects → audit:facts → deploy → GSC sitemap refresh.**

---

## 6. Guardrails (non-negotiable)

- **Facts:** Any public number or claim must come from `lib/facts.ts` / FACTS-CANONICAL. Prefer evergreen “Since 1972” over fragile counts. Never publish internal-only catalogue inventory as marketing claims.
- **Admin:** Never index ops UI or enquiry/shipment data. Noindex + robots Disallow + prefer single host.
- **Stone commercial SEO lives on KHADANE**, not MLS.
- **Single enquiry channel discipline** per FACTS Section 10 (inbox routing unchanged by SEO experiments).
- **Audit:** After metadata/copy changes, run `npm run audit:facts` and fix violations.
- **Execution:** One open SEO PR at a time for foundation batches (PR-A, PR-B). Parallel only for measurement (PR-D) and content writing.

---

## 7. Success criteria (90 days)

| Area | Success looks like |
|---|---|
| Technical | KHADANE pages have canonicals; no `/admin` in index; no “and” domain duplicate; sitemaps show real lastmod |
| KHADANE | Measurable GSC impressions in GB/AE/AU; at least 5 variety terms in top 20; enquiry volume up with attributable landing pages |
| MLS | Local visibility for Kota hostel/hotel brand queries; clean bridge traffic to KHADANE |
| Ops | Every enquiry stores source path/UTM; GA4 events fire on submit |
| Process | PR-A–D shipped; progress log updated weekly; no SEO work that skips gates |

---

## 8. Implementation notes for engineers

- Use **clean paths** in `buildMetadata` (`/collection/slug`), matching public URLs after rewrite.
- Prefer editing existing `lib/seo.ts` helpers over one-off metadata objects.
- After P0 link fixes, spot-check with crawler or `curl -I` that in-site links no longer 308-loop on khadane.com.
- Do not open public routes under `/admin` for “SEO dashboards”; keep analytics in GA4/GSC.
- Prefer **batched PRs** in §5.4 over drive-by one-file commits.

---

## 9. Document history

| Date | Change |
|---|---|
| 2026-07-13 | Initial plan from Grok + Claude Code consult on this repository |
| 2026-07-13 | Optimized execution plan: scoring, dependency graph, PR batches A–E, parallel tracks, RACI, weekly rhythm, progress log |

**Resume Claude on this topic:**  
`claude -p --resume $(cat .context/claude-session-id)` with a follow-up prompt, or ask the host agent to re-consult Claude Code.

---

*End of SEO_PLAN.md*
