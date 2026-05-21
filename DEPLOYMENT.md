# DEPLOYMENT — Vercel + dual-domain binding

The codebase deploys as a **single Vercel project** serving two domains via host-based middleware rewrites. This document is the complete operational guide.

---

## Pre-deployment checklist

Run locally first to catch issues before pushing:

```bash
npm install
npm run typecheck    # TypeScript strict-mode check
npm run lint         # ESLint
npm run audit:facts  # v2.0 fact discipline check
npm run build        # Full production build
```

All four must pass.

---

## Step 1 — Resend mailbox setup

The enquiry pipeline depends on Resend.

1. Sign up at [resend.com](https://resend.com).
2. **Verify two sender domains** at Resend:
   - `mohanlalsonsgroup.com`
   - `khadane.com`
3. Add the DNS records Resend gives you (SPF, DKIM, return-path) to the domain registrar.
4. Wait for both domains to show as **Verified** in Resend.
5. Generate an API key at Resend → API Keys. Copy it.

The actual receiving inboxes (`office@mohanlalsonsgroup.com`, `exports@khadane.com`) are forwarding addresses set up at the domain registrar or via Google Workspace / Zoho. Resend only sends *from* — receiving is handled by your mail provider.

---

## Step 2 — Vercel project

1. Push the repository to GitHub.
2. Create a new Vercel project from the repo.
3. **Framework preset:** Next.js (auto-detected).
4. **Build command:** `npm run build` (default).
5. **Install command:** `npm install`.
6. **Node version:** 20.x or higher.

Don't deploy yet — set environment variables first.

---

## Step 3 — Environment variables

In Vercel → Project Settings → Environment Variables, add:

### Required for production

| Variable | Example value | Scope |
|---|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxxxx` | Production + Preview |
| `RESEND_FROM_DOMAIN` | `enquiries@mohanlalsonsgroup.com` | Production + Preview |

### Optional (have defaults)

| Variable | Default | Scope |
|---|---|---|
| `INBOX_OFFICE_MLS` | `office@mohanlalsonsgroup.com` | Production |
| `INBOX_KHADANE_EXPORTS` | `exports@khadane.com` | Production |
| `NEXT_PUBLIC_MLS_URL` | `https://mohanlalsonsgroup.com` | Production |
| `NEXT_PUBLIC_KHADANE_URL` | `https://khadane.com` | Production |

### Optional Turnstile (if you want CAPTCHA)

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Cloudflare Turnstile key |
| `TURNSTILE_SECRET_KEY` | Server-side verification secret |

If both absent, the Turnstile check is silently skipped — honeypot, min-submit-time, and IP rate limit still apply.

### Local development overrides

Create `.env.local` (not committed):

```bash
NEXT_PUBLIC_DEV_HOST_MODE=mls
# or =khadane to preview that side
RESEND_API_KEY=re_yourkey_for_dev
```

---

## Step 4 — Domain binding

In Vercel → Project Settings → Domains, add **both** domains:

1. **`mohanlalsonsgroup.com`** — primary
2. **`www.mohanlalsonsgroup.com`** — redirect to primary
3. **`khadane.com`** — second primary
4. **`www.khadane.com`** — redirect to primary

Vercel will give you DNS records to add at the domain registrar:

- For the apex (`mohanlalsonsgroup.com` / `khadane.com`): **A record** to `76.76.21.21`
- For each `www`: **CNAME** to `cname.vercel-dns.com`

DNS propagation takes 5–60 minutes. Vercel issues SSL certificates automatically once DNS resolves.

### How the middleware routes hosts

Once both domains point to the same Vercel project:

- A request to `mohanlalsonsgroup.com/about/` hits the same Vercel function as `khadane.com/about/`.
- `middleware.ts` reads the `host` header and rewrites the internal Next.js path:
  - MLS hosts → `/mls/about/` internally
  - KHADANE hosts → `/khadane/about/` internally
- The user URL bar shows the original path — the rewrite is invisible.

---

## Step 5 — First deployment

```bash
git push origin main
```

Vercel auto-deploys. Watch the build log.

---

## Step 6 — Smoke test

### MLS (`mohanlalsonsgroup.com`)

- [ ] Homepage renders all 13 sections
- [ ] `/our-legacy/`, `/csr/`, `/careers/` work
- [ ] All 6 vertical pages render
- [ ] `/gallery/`, `/resources/*`, `/contact/`, `/privacy/`, `/terms/` work
- [ ] OG image preview works (paste URL in Slack/Twitter)
- [ ] `mohanlalsonsgroup.com/sitemap.xml` accessible
- [ ] `mohanlalsonsgroup.com/robots.txt` accessible
- [ ] Favicon renders in browser tab

### KHADANE (`khadane.com`)

- [ ] Homepage renders
- [ ] `/collection/` + `/collection/{variety}/` work for at least one variety
- [ ] `/formats/` + `/formats/{format}/` work
- [ ] `/field-notes/`, `/about/`, `/quarry/`, `/yard/`, `/desk/`, `/group/`, `/gallery/` render
- [ ] OG image preview (dark obsidian + gold)
- [ ] `khadane.com/sitemap.xml` accessible

### Enquiry form

- [ ] Submit test enquiry from `mohanlalsonsgroup.com/contact/`
- [ ] Confirm arrival at `office@mohanlalsonsgroup.com`
- [ ] Submit a stone enquiry — category "Stone & Export"
- [ ] Confirm routing to `exports@khadane.com` (NOT to office@)
- [ ] Submit from `khadane.com/desk/`
- [ ] Confirm arrival at `exports@khadane.com`
- [ ] Reference number format: `MLS-ENQ-YYYYMMDD-XXXX` / `KHD-ENQ-YYYYMMDD-XXXX`

### Spam defences

- [ ] Two quick submissions from same IP — second rate-limited (429)
- [ ] Fill honeypot via DevTools — silently accepted+blocked
- [ ] Submit <2s after loading — silently accepted+blocked

---

## Monitoring + observability

- **Vercel function logs** — filter on `[ENQUIRY]` to see routing decisions
- **Resend dashboard** — bounces, complaints, delivery rates
- **Uptime checker** — external (UptimeRobot, BetterStack) on both domains
- **Google Search Console** — submit both sitemaps separately

---

## Rate-limit notes

The in-memory rate limiter in `lib/rate-limit.ts` works for a single Vercel function instance. For real production hardening at higher volumes, move to **Upstash Redis**:

```ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'),
})

export async function checkRateLimit(ip: string) {
  const { success, reset } = await ratelimit.limit(ip)
  return {
    ok: success,
    retryAfterSec: Math.ceil((reset - Date.now()) / 1000),
  }
}
```

For the expected volume (~20 enquiries/day), in-memory is fine.

---

## Updating content

### To update a fact

1. Edit `lib/facts.ts`.
2. Run `npm run audit:facts` — check no hardcoded old value remains.
3. Run `npm run build` locally to verify TypeScript still passes.
4. Commit and push. Vercel auto-deploys.

### To swap a placeholder photograph

1. Drop the photograph in `/public/img/`, matching the `swapPath` from `PlaceholderImage`.
2. Verify with `npm run dev` — placeholder should swap automatically.
3. Commit, push.

The placeholders fall back automatically when the swap path doesn't resolve, so swapping is non-destructive.

---

## Rollback

To roll back:

1. Go to Vercel → Deployments.
2. Find the last good deployment.
3. Click "Promote to Production".

Takes about 30 seconds.

---

## Final hardening checklist

- [ ] Resend sender domains verified
- [ ] Both domains DNS-resolving and SSL-issued
- [ ] All env vars set in production
- [ ] Test enquiry from each site received correctly
- [ ] Reference numbers correctly formatted
- [ ] OG previews working in Slack/Twitter/LinkedIn
- [ ] Sitemaps submitted to Google Search Console
- [ ] Robots.txt allows the right paths
- [ ] Spam defences confirmed working
- [ ] Favicon visible
- [ ] Mobile preview tested

🔱

Maintained by the family. Last reviewed: 2026.
