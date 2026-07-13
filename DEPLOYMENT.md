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

The actual receiving inboxes (`office@mohanlalsonsgroup.com`, `office@khadane.com`) are forwarding addresses set up at the domain registrar or via Google Workspace / Zoho. Resend only sends *from* — receiving is handled by your mail provider.

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

### Mail backend

| Variable | Example value | Scope |
|---|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxxxx` | Production + Preview |
| `RESEND_FROM_DOMAIN` | `enquiries@mohanlalsonsgroup.com` | Production + Preview |

Production needs either Resend or the Google Apps Script webhook. If both are set, `/api/enquiry` uses the Google webhook first so the enquiry is saved to Sheets and the customer receives a confirmation email.

### Optional (have defaults)

| Variable | Default | Scope |
|---|---|---|
| `INBOX_OFFICE_MLS` | `office@mohanlalsonsgroup.com` | Production |
| `INBOX_KHADANE_EXPORTS` | `office@khadane.com` | Production |
| `NEXT_PUBLIC_MLS_URL` | `https://mohanlalsonsgroup.com` | Production |
| `NEXT_PUBLIC_KHADANE_URL` | `https://khadane.com` | Production |
| `GOOGLE_ENQUIRY_WEBHOOK_URL` | Google Apps Script `/exec` web app URL | Production + Preview |
| `GOOGLE_ENQUIRY_WEBHOOK_SECRET` | Same value as Apps Script `WEBHOOK_SECRET` | Production + Preview |

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
GOOGLE_ENQUIRY_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
GOOGLE_ENQUIRY_WEBHOOK_SECRET=change-this-long-random-secret
```

### Secrets backup & recovery (so nothing is lost)

`.env.local` is gitignored, so it is **not** in GitHub — a lost laptop or a
fresh clone loses those secrets. Two backups keep them recoverable:

1. **Vercel** — the production source of truth (Project Settings → Environment
   Variables). Restore locally with `vercel env pull .env.local`.
2. **Encrypted-in-git** — `scripts/secrets.sh` encrypts `.env.local` into
   `.env.local.enc`, which *is* committed. `git clone` + your passphrase
   restores everything, independent of Vercel.

```bash
./scripts/secrets.sh encrypt   # after changing secrets — then commit .env.local.enc
./scripts/secrets.sh decrypt   # after a fresh clone — recreates .env.local
```

openssl prompts for the passphrase (never stored in shell history). Keep that
passphrase in a password manager — **without it, the encrypted backup cannot be
recovered.**

---

## Optional Google Sheets enquiry backend

Use `scripts/google-enquiry-webhook.gs` in Google Apps Script when you want every enquiry saved to a Google Sheet and want Apps Script to send both emails:

1. Create or open the Google Sheet that should receive enquiries.
2. Extensions → Apps Script → **delete any old code**, paste the full `scripts/google-enquiry-webhook.gs`.
3. Replace the `CONFIG` constants at the top of the script:

| Constant | Purpose |
|---|---|
| `SHEET_ID` | Google Sheet ID from the Sheet URL |
| `SHEET_NAME` | Sheet tab name, defaults to `Enquiries` |
| `OWNER_EMAIL` | Fallback notification inbox |
| `NOTIFY_EMAIL` | Optional extra fallback notification inbox |
| `MLS_OWNER_EMAIL` | MLS notification inbox |
| `KHADANE_OWNER_EMAIL` | KHADANE notification inbox |
| `WEBHOOK_SECRET` | Must match `GOOGLE_ENQUIRY_WEBHOOK_SECRET` |
| `BUSINESS_NAME` | Name shown in confirmation email |

4. Save the project, then **Deploy → New deployment → Web app**.
5. Execute as: **Me**.
6. Who has access: **Anyone** (required — server-to-server has no Google login).
7. Copy the `/exec` URL into `GOOGLE_ENQUIRY_WEBHOOK_URL`.
8. Put the same secret into `GOOGLE_ENQUIRY_WEBHOOK_SECRET` and restart the app.

Keep `WEBHOOK_SECRET` long and private. The public web app URL is protected by that shared secret.

### After every script edit

Deploy → **Manage deployments** → pencil icon → **Version: New version** → Deploy.  
Editing code without a new deployment version leaves the live `/exec` URL on the old (often broken) build.

### Notification / self tests

In the Apps Script editor, run these once (approve permissions when prompted):

| Function | Purpose |
|---|---|
| `testSheetSetup` | Opens/creates the Enquiries sheet |
| `testNotificationEmail` | Sends a test owner email |
| `testDoPostLocally` | Full path: sheet row + emails without the website |

If owner mail does not arrive:

- Check `OWNER_EMAIL` / `MLS_OWNER_EMAIL` / `KHADANE_OWNER_EMAIL`
- Check Spam / Promotions
- Confirm deployment is **Execute as: Me**, **Anyone**
- Confirm the deploying account still has `MailApp` daily quota

### Common failures (fixed in v2.1)

| Symptom | Cause | Fix |
|---|---|---|
| HTML “unable to open the file” / 302 errors | Stale deployment, or POST turned into GET on redirect | Paste latest `.gs`, redeploy **New version**; website client now re-POSTs across redirects |
| `Missing required field` / random ReferenceError | Incomplete script (missing HTML helpers) | Use full `scripts/google-enquiry-webhook.gs` v2.1+ |
| `Invalid webhook secret` | Secret mismatch | Same value in CONFIG `WEBHOOK_SECRET` and `GOOGLE_ENQUIRY_WEBHOOK_SECRET` |
| Sheet not updating | Wrong `SHEET_ID` or sheet not shared with script owner | Fix ID; script owner must own/edit the sheet |

Local website submissions only call Apps Script when `.env.local` contains `GOOGLE_ENQUIRY_WEBHOOK_URL` (and secret if configured), and the dev server has been restarted.

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
- [ ] Confirm routing to `office@khadane.com` (NOT to office@)
- [ ] Submit from `khadane.com/desk/`
- [ ] Confirm arrival at `office@khadane.com`
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
