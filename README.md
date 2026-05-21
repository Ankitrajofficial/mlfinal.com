# MLS + KHADANE™ Integrated Codebase

**Two domains. One Next.js codebase. Operated by the Dhakar family from Bijolia, Rajasthan, since 1972.**

This repository serves two production websites from a single Vercel deployment:

- **[mohanlalsonsgroup.com](https://mohanlalsonsgroup.com)** — The institutional site for **Mohan Lal & Sons** (MLS), the family enterprise. Five verticals. The Group, the verticals, the legacy, the CSR, careers, and the contact desk.
- **[khadane.com](https://khadane.com)** — The trade brand site for **KHADANE™** (खदान — The Quarry), the stone & export vertical operated under the family name. Collection, formats, field notes, quarry, yard, and the buyer desk.

Both sites share the same Next.js 16 application, the same component library, the same fact source-of-truth (`lib/facts.ts`), and the same enquiry pipeline. Host-based middleware decides which set of routes any given request reaches.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (LTS, App Router) |
| UI | React 19.2 |
| Styling | Tailwind CSS 3.4 (custom palette tokens per site) |
| Type system | TypeScript 5.7, strict |
| Motion | Framer Motion (single MotionConfig, respects `prefers-reduced-motion`) |
| Forms | Zod validation, Resend HTTP API for mail |
| Hosting | Vercel (single project, two domain bindings) |
| Fonts | Cormorant Garamond · Inter Tight · JetBrains Mono · Montserrat (Google Fonts) |
| Spam defence | Honeypot · min-submit-time · IP rate limit · optional Turnstile |

---

## Quick start

```bash
npm install
npm run typecheck
npm run lint
npm run audit:facts
npm run build

# Dev (defaults to MLS):
npm run dev
# Open http://localhost:3000

# Preview KHADANE locally:
NEXT_PUBLIC_DEV_HOST_MODE=khadane npm run dev
```

---

## Repository structure

```
mls-khadane/
├── app/
│   ├── api/enquiry/route.ts        # Real Resend-backed enquiry endpoint
│   ├── khadane/                    # KHADANE™ site (khadane.com)
│   ├── mls/                        # MLS site (mohanlalsonsgroup.com)
│   ├── layout.tsx                  # Root <html>/<body> + shared fonts
│   ├── page.tsx                    # Fallback root router (rarely hit)
│   └── globals.css
├── components/
│   ├── khadane/                    # 13 preserved v1 components, v2.0 aligned
│   ├── mls/                        # 7 MLS components + MLSEnquiryForm
│   └── shared/                     # MotionConfig, RevealOnScroll, PlaceholderImage
├── lib/
│   ├── facts.ts                    # ⭐ CANONICAL SOURCE OF TRUTH (v2.0)
│   ├── site-mls.ts / site-khadane.ts / site.ts
│   ├── varieties.ts / formats.ts
│   ├── field-notes.ts / gallery.ts / terms.ts / theme.ts
│   ├── enquiry-schema.ts           # Zod schema + inbox router + ref number gen
│   ├── resend.ts                   # Resend HTTP wrapper + Turnstile verify
│   ├── rate-limit.ts               # In-memory IP rate limiter
│   └── seo.ts                      # buildMetadata, JSON-LD helpers
├── public/                         # ~115 brand assets, SVG marks, PWA icons
├── scripts/audit-facts.ts          # Grep-scans for v2.0 violations
├── middleware.ts                   # Host-based routing
├── next.config.mjs / tsconfig.json
├── tailwind.config.ts              # mls.* + khadane.* + vyanjanam.* tokens
├── package.json
├── DEPLOYMENT.md                   # Vercel deploy + env vars
├── MIGRATION-NOTES.md              # What changed from v1
├── PHOTOGRAPHY-SHOT-LIST-MLS.md
├── PHOTOGRAPHY-SHOT-LIST-KHADANE.md
└── FACTS-CANONICAL-v2.md           # The sealed reference (read-only)
```

---

## Architecture decisions

### Why two sites in one codebase?

The MLS group is one operation. The trade brand (KHADANE™) is the family's name for stone exports specifically. Keeping them in one repository means:

- One **`lib/facts.ts`** — institutional facts (founding year, family roster, workforce, signatures) are stated once and used everywhere. No drift.
- One **enquiry pipeline** — all letters land in inboxes the family already operates, with routing per the single-channel discipline.
- One **deployment** — Vercel runs both domains from a single project.
- Cross-linking is **first-class**.

### Why middleware rewrites instead of route groups?

Next.js doesn't allow two `app/(group)/page.tsx` files to both resolve to `/` — they conflict at build time. We use real subdirectories (`app/mls/`, `app/khadane/`) and the middleware does a **transparent internal rewrite**:

```
User sees:                          Next routes from:
mohanlalsonsgroup.com/              → app/mls/page.tsx
mohanlalsonsgroup.com/our-legacy/   → app/mls/our-legacy/page.tsx
khadane.com/                        → app/khadane/page.tsx
khadane.com/collection/             → app/khadane/collection/page.tsx
```

All internal `<Link href="/our-legacy">` calls use the clean path — the URL bar never shows `/mls/` or `/khadane/`. See `middleware.ts` for the host mapping logic.

### Why `lib/facts.ts` as a single source of truth?

The site has been built and rebuilt across many editorial sessions. Numbers and names drifted in v1 (workforce, founding year, country count, variety taxonomy). FACTS v2.0 reconciles them all and locks them.

Every page imports its institutional claims from `lib/facts.ts`. The audit script (`scripts/audit-facts.ts`, runnable via `npm run audit:facts`) scans the codebase for hardcoded violations of the locked facts.

---

## Environment variables

See `DEPLOYMENT.md` for the full list. Minimum for production:

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | **Yes (prod)** | Resend HTTP API key for outgoing mail |
| `RESEND_FROM_DOMAIN` | **Yes (prod)** | Verified sender at Resend |
| `INBOX_OFFICE_MLS` | No | Override default `office@mohanlalsonsgroup.com` |
| `INBOX_KHADANE_EXPORTS` | No | Override default `exports@khadane.com` |
| `NEXT_PUBLIC_MLS_URL` | No | Override default `https://mohanlalsonsgroup.com` |
| `NEXT_PUBLIC_KHADANE_URL` | No | Override default `https://khadane.com` |
| `NEXT_PUBLIC_DEV_HOST_MODE` | No (dev) | `mls` or `khadane` — pick a site in dev |
| `TURNSTILE_SECRET_KEY` | No | Cloudflare Turnstile server-side secret |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile client-side key |

---

## The audit script

`npm run audit:facts` scans the whole codebase for known v2.0 violations:

- Old workforce figure `1,200+` (corrected to `500+ KHADANE` / `1,000+ group`)
- Hardcoded `54 years` (use `FOUNDING.yearsEvergreen` instead)
- `BS EN 1341` / `BS EN 12058` / `BS EN 1343` (removed in v2.0)
- `MONOLITH` (retired brand)
- `Raj Green` outside trade-name preservation contexts (renamed to Sage Green)
- `Forty rooms` claim copy for M3 (use "Boutique scale")
- `ISO 9001` / `CE marking` (not claimed)

Run this before every commit that touches editorial copy. It catches drift before it ships.

---

## Brand discipline

| Brand | Where it lives | Notes |
|---|---|---|
| **KHADANE™** | Stone & export vertical only | Locked wordmark — never recreated from fonts; composite the v1.0 PNG |
| **Mohan Lal & Sons (MLS)** | The group institutional site | MLS lockup with the M-FORWARD Four Pillars mark |
| **Vyanjanam** | Food services only | Black gradient palette (Vyanjanam v1.0). White accent, no gold inside the treatment |
| **Divine Dining** | Girls' campus residence kitchen ONLY | Named-only at launch — no separate brand identity. Rendered inside `<DivineDarkSection>` |
| **M3** | Boutique Hotel + M3 Mini Mall | "Boutique scale" in claim copy; never "Forty rooms" |
| **Dhakar Motors** | Ashok Leyland dealership, Dabi, Bundi District | Since 2013 |
| **Dharnidhar Fuels** | Two stations on NH 27 | IOC + Nayara Energy partnerships |

---

## Editorial voice — the rules

These come from FACTS-CANONICAL v2.0 and are enforced everywhere on the site:

1. **No em-dashes** in conversational copy. Use commas, full stops, short sentences.
2. **Present-perfect tense** as default.
3. **No marketing flourish** — no "trusted by", no "industry-leading", no "best-in-class".
4. **Generational framing is rare** — never on KHADANE side, sparingly on MLS.
5. **Pricing discipline** — no FOB/CIF/MOQ/lead-time on either site; *"Quotes within one business day"* or *"On enquiry"*.
6. **Honest empty states** — when content is pending (testimonies, blog entries, photos), say so plainly.

### Locked signature lines

These appear once each, in specific places only:

| Signature | Lives at |
|---|---|
| *"The work, as it appears"* | `/gallery/` H1 |
| *"Read by the family"* | `/contact/` + homepage Section 12 |
| *"Read by the family before publication"* | `/privacy/` sub-line |
| *"Edited by no one"* | `/resources/blog/` H1 |
| *"Not curated highlights. Not edited for tone."* | `/resources/press/` H1 |
| *"A daughter under our roof is treated as one of the family's own"* | `/verticals/student-housing/girls/` Section 06 ONLY |
| *"— The Dhakar Family"* sign-off | `/verticals/student-housing/girls/` Section 06 ONLY |
| Food-and-human-dignity line | Vyanjanam Section 02 + homepage Section 08 |

---

## Photography

Documentary placeholders are in place on every page. Each placeholder names the photo slot, the spec (px dimensions, light direction, subject framing), and the variant. See `PHOTOGRAPHY-SHOT-LIST-MLS.md` and `PHOTOGRAPHY-SHOT-LIST-KHADANE.md` for the complete shot list.

The placeholder renders honestly until the real photograph lands. When `swapPath` resolves to a real file in `/public/img/`, the placeholder swaps automatically.

---

## Deploying

See **`DEPLOYMENT.md`** for the Vercel setup. Short version:

1. Push to GitHub.
2. Create a new Vercel project from the repo.
3. Add both domains: `mohanlalsonsgroup.com` and `khadane.com` (plus www subdomains).
4. Set the environment variables.
5. Verify the Resend sender domain.
6. Deploy.

The middleware handles the rest.

---

## Maintenance contacts

| Role | Who |
|---|---|
| CEO · Editorial final say | Rahul Dhakar |
| Codebase · Web execution | Ankit |
| Creative direction | Mahak |
| Operations · Food, residences | Rohan |

---

## Sealed facts

The institutional reading of the work — every fact, every name, every number on this site — is sealed in `FACTS-CANONICAL-v2.md`. That document is the authority. If the site disagrees with it, the site is wrong, not the document.

Updates to FACTS v2.0 require explicit instruction from Rahul. Updates to anything derived from it (numbers on the homepage, family roster on /our-legacy/, scale figures in the stat marquee) cascade automatically once `lib/facts.ts` is updated.

🔱

— Built for the Dhakar family by Rahul Dhakar, with Mahak, Ankit, and Rohan. Since 1972.
