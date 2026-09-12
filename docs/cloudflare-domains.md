# Cloudflare / domains checklist

**David runs these steps in the dashboard.** Nothing here is automated from the
repository, and nothing in this PR changes DNS: this file is the checklist, not a
script.

Order matters only where it says so.

## 1. mngd.app apex → the Pages project

- Cloudflare Pages project builds this repo.
  - Build command: `npm install && npm run build`
  - Build output directory: `dist`
  - Node version: 20 or newer
- Point the **apex** `mngd.app` at the Pages project (custom domain).
- Verify: `curl -sI https://mngd.app/ | head -1` returns 200, and the page is the
  Preline build (its `<title>` is "mngd — the fleet repository lives inside the
  product").

## 2. www → apex

- `www.mngd.app` **redirects** to the apex — it is not a second custom domain
  serving the same content, because two origins for one site is two sets of
  canonical URLs and one of them is always wrong.
- 301, preserving path and query.
- Verify: `curl -sI https://www.mngd.app/blog | head -3` shows `301` and a
  `location:` of `https://mngd.app/blog`.
- **Status 2026-09-11: `www.mngd.app` does not resolve at all** — curl returns
  000, a connection failure rather than an unredirected 200. So this is not "the
  redirect is missing", it is "the hostname is dead". Anyone who types the www
  form today gets a browser error.

## 3. getmngd.app → mngd.app, 301 — ONCE REGISTERED

- **Which TLD? Confirm before registering.** This checklist was written as
  `getmngd.app`; David's note of 2026-09-11 said `getmngd.com`. They are different
  registrations and only one of them is the one he wants. Not guessed here.
- Not registered yet. Nothing to do until it is; this line exists so the step is
  not rediscovered later.
- When it is: whole-domain 301 to `https://mngd.app`, path preserved. It is a
  redirect, never a second copy of the site.

## 4. mdm-staging.mngd.app — UNTOUCHED

- **Do not modify this record.** It points at the mini, which is the instance every
  hardware proof runs against (E-130's Chrome install among them). A DNS change
  here does not break a website; it breaks the evidence chain.
- If a step in this checklist appears to require touching it, that step is wrong.

## 5. Redirects already in the repository

`public/_redirects` ships with the site and needs no dashboard work:

| From | To | Code | Why |
|---|---|---|---|
| `/docs` | `https://docs.mngd.app` | 301 | Docs still live on their own project |
| `/pricing` | `/` | 301 | Page retired — priced a product that is not shipping |
| `/patch` | `/` | 301 | Page retired — claims it made are not receipted |

## 6. The waitlist form must be shown to DELIVER — before launch

A form that submits into a void is a dormant feature wearing an input field, and
it is worse than no form: it collects addresses from people who then hear nothing.

The endpoint `https://waitlist.mngd.app/submit` is kept in this build on the
strength of it being wired, which is not the same as it being *received*. So:

- [ ] **David submits a real test entry** through `/early-access` on the deployed
      site — not a curl against the Worker, the actual form.
- [ ] **David confirms the entry arrived** somewhere he actually reads (the Notion
      waitlist database the Worker writes to, per its `wrangler.toml`).
- [ ] Check that the honeypot still behaves: a submission with `website_url` set
      returns 204 and writes nothing.

**If the endpoint is dead or unowned, the fallback is a `mailto:hello@mngd.app`
link** in place of the form, until a working form earns its place back. That is a
one-component change to `/early-access`; do not ship the form on hope.

## 7. Before launch

- [x] Repository visibility: **private, and staying private** — the reason is in
      the README. Not a Preline question; the Cruip source in branch history is
      what settles it.
- [x] `public/og.png` exists and is generated from the brand tokens
      (`node scripts/build-og.mjs`). David approves the image itself before merge.
