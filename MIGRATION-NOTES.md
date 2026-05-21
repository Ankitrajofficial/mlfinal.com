# Migration Notes — v1 → v2 (Integrated MLS + KHADANE)

This document explains what changed in the codebase between the original v1 KHADANE-only deployment and this integrated v2 build. **Read before deploying.**

## Top-line summary

**v1** was a single-site KHADANE deployment at `khadane.com`. **v2** is an integrated two-site deployment serving both `mohanlalsonsgroup.com` (institutional/parent) and `khadane.com` (trade brand) from one Next.js codebase, using host-based middleware rewrites.

The KHADANE side was **preserved structurally** — all 14 v1 pages, 13 v1 components, and 108 brand assets carried over. The only KHADANE changes are FACTS-CANONICAL v2.0 alignment (workforce numbers, variety names, BS EN reference removal, etc.).

The MLS side is entirely new (Batches 3-5).

## Breaking changes

### 1. Directory restructure: route groups → real subdirectories

**Before (v1):** All app routes under `app/`:
```
app/
├── page.tsx
├── about/page.tsx
└── collection/page.tsx
```

**After (v2):** Each site under a named subdirectory:
```
app/
├── mls/
│   ├── page.tsx
│   └── about/page.tsx
└── khadane/
    ├── page.tsx
    └── collection/page.tsx
```

**Why:** Next.js doesn't allow two route group `page.tsx` files to both resolve to `/`. Real subdirectories let the middleware rewrite handle the dispatch.

**Implication:** User-facing URLs are unchanged. `khadane.com/about` still works — middleware rewrites to `/khadane/about` internally.

### 2. `lib/site.ts` is now a compatibility shim

**Before (v1):** `lib/site.ts` was the single config file, exporting `SITE`, `NAV_ITEMS`, `ASSETS`.

**After (v2):** `lib/site.ts` is a re-export shim. The actual configs live in `lib/site-mls.ts` and `lib/site-khadane.ts`. The shim re-exports from the KHADANE config so v1 KHADANE components continue to work unchanged.

**Implication:** v1 component imports like `import { SITE } from '@/lib/site'` still work. No code changes needed in KHADANE components.

### 3. Fact discipline enforced via `lib/facts.ts`

**Before (v1):** Numbers and claims were spread across components.

**After (v2):** All institutional facts (workforce, founding year, contact info, scale figures, signature lines, family roster) live in `lib/facts.ts`. Components import from there.

**Verification:** `npm run audit:facts` greps for known-stale patterns and fails if any appear outside `lib/facts.ts` itself.

### 4. v2.0 fact corrections (applied throughout)

| Before | After | Rationale |
|---|---|---|
| `1,200+ workforce` | `500+ KHADANE` / `1,000+ MLS group` | v1 conflated two distinct numbers |
| `54 years (hardcoded)` | `since 1972` everywhere | Evergreen — never go stale |
| `BS EN 1341 / 12058 / 1343` | (removed entirely) | Not currently certified |
| `MONOLITH India` | (retired entirely) | Brand identity wound up |
| `Raj Green` | `Sage Green` (variety renamed) | "(formerly Raj Green)" preserved in `tradeNames` for buyer discoverability |
| `Forty rooms` (M3 claim) | `Boutique scale` | "40 rooms" is internal operational fact only |
| `Third generation` (KHADANE) | (removed from KHADANE side) | Hyperbole; preserved sparingly on MLS only |
| `Twenty-one varieties` (claim) | (removed) | No-counts discipline |
| `Vyanjanam dine-in pricing` | "For pricing in effect, write to The Office" | Pricing not published |

### 5. Enquiry API moved to production

**Before (v1):** A simpler endpoint that did not have the v2.0 routing discipline.

**After (v2):**
- Validates input via Zod (`lib/enquiry-schema.ts`)
- Routes to correct inbox per site + category (FACTS Section 10 single-channel discipline)
- Generates reference numbers: `MLS-ENQ-YYYYMMDD-XXXX` / `KHD-ENQ-YYYYMMDD-XXXX`
- Honeypot check + min-submit-time check (2s)
- IP rate limit (5 requests / 15 min, in-memory)
- Optional Cloudflare Turnstile verification (skipped if no secret)
- Sends via Resend with HTML+plain-text bodies
- Sends a confirmation email to the enquirer
- Returns 503 in production if `RESEND_API_KEY` is missing (fail-loud)
- Logs to console in dev without Resend (no real email sent)

## Verification checklist for Ankit

Before deploying:

- [ ] `npm install` completes without warnings
- [ ] `npm run lint` returns zero issues
- [ ] `npm run typecheck` returns zero errors
- [ ] `npm run audit:facts` prints `✅ AUDIT PASSED`
- [ ] `npm run build` completes successfully
- [ ] Boot dev server (`npm run dev`) and visit `http://localhost:3000` — MLS homepage loads
- [ ] Boot dev server with `NEXT_PUBLIC_DEV_HOST_MODE=khadane npm run dev` — KHADANE homepage loads
- [ ] Test enquiry form (dev mode): submit a test enquiry, check console — should print full email body, return success with reference number
- [ ] Verify reference number format: `MLS-ENQ-20260521-XXXX` or `KHD-ENQ-20260521-XXXX`
- [ ] Visit `/sitemap.xml` and `/robots.txt` — should serve per-site content based on host
- [ ] Visit `/icon` (Next.js dynamic icon) and `/apple-icon` — should render

After deploying to Vercel staging:

- [ ] mohanlalsonsgroup.com (or staging URL) homepage loads
- [ ] All 18 internal MLS routes resolve (no 404s)
- [ ] khadane.com (or KHADANE staging URL) homepage loads
- [ ] All KHADANE v1 routes still work (collection, formats, field-notes, etc.)
- [ ] Submit a real enquiry via MLS contact form — family receives email at `office@mohanlalsonsgroup.com`, enquirer receives confirmation
- [ ] Submit a stone-export enquiry via MLS — routes to `exports@khadane.com`
- [ ] Submit a real enquiry via KHADANE — routes to `exports@khadane.com`
- [ ] Verify rate limit: send 6 enquiries rapidly from same IP — 6th returns 429
- [ ] Inspect OG images: share `mohanlalsonsgroup.com` on WhatsApp/Slack — preview renders
- [ ] View page source: confirm `<link rel="canonical">` points to the correct domain per site
- [ ] Check sitemap: `mohanlalsonsgroup.com/sitemap.xml` lists MLS routes; `khadane.com/sitemap.xml` lists KHADANE routes

## Known limitations

1. **Rate limiter is in-memory** — each Vercel serverless instance has its own counter. Acceptable at current volume; swap in Upstash Redis if abuse becomes real. See `DEPLOYMENT.md`.
2. **Photography is placeholder** — all `<PlaceholderImage swapPath="…">` references are aspirational. Real photos drop in when Ankit + the photographer deliver. See `PHOTOGRAPHY-SHOT-LIST-MLS.md` and `PHOTOGRAPHY-SHOT-LIST-KHADANE.md`.
3. **Divine Dining is named-only at launch** — no separate brand identity yet. Treatment uses `<DivineDarkSection>` wrapper on `/verticals/student-housing/girls/` only. Brand identity work is v1.1.
4. **Blog and Press archives** have honest empty states — content is added as it's written/published.

## Migration rollback

If a problem appears post-deployment that requires reverting:

1. The v1 KHADANE codebase is preserved at the Git tag `v1-final-pre-mls` (Ankit, please tag this before merging the v2 PR).
2. Reverting means swapping the Vercel project's GitHub repo back to the v1 commit. The KHADANE side functions identically; the MLS side simply ceases to exist.
3. Domain bindings: remove `mohanlalsonsgroup.com` from the project, leave `khadane.com` connected.

🔱
