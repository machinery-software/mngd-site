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

## 3. getmngd.app → mngd.app, 301 — ONCE REGISTERED

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

## 6. Before any of this is public

- [ ] Decide public vs private for the repository (see the PR description — the
      Cruip-derived `next/` tree is the open question, not Preline).
- [ ] `public/og.png` does not exist. Every page references it in its OG tags, so
      link previews are currently broken on every share. Either add the file or
      remove the tag.
