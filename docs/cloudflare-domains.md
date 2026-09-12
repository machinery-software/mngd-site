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
- **Status 2026-09-12: pending David, not a defect.** `www.mngd.app` has no DNS
  record at all — no `A`, no `NS`, and curl returns 000 rather than an
  unredirected 200. That is the expected state: the `www` CNAME is a step on
  David's own Cloudflare checklist that he has not run yet, so the hostname is
  unborn rather than broken. Until he runs it, anyone typing the www form gets a
  browser error, which is the cost of the step being outstanding — worth knowing,
  not worth filing.

## 3. getmngd.com → mngd.app, 301 — REGISTERED, AND CURRENTLY A SECOND ORIGIN

**The TLD is settled: `getmngd.com`.** David corrected it explicitly — not
`.app`. Earlier revisions of this file said `.app` and carried the two spellings
as an open question; that question is closed, and `getmngd.app` does not resolve
at all (no `A`, no `NS`), so there is nothing on that name to point anywhere.

**What is actually live, measured 2026-09-12.** `getmngd.com` is not "not
registered yet" — it is registered, it is on Cloudflare's nameservers
(`bella`/`sam.ns.cloudflare.com`), and it is **already attached to the Pages
project as a custom domain**:

```
curl -sI https://getmngd.com/        →  200, text/html
curl -s  https://getmngd.com/ | …    →  byte-identical to https://mngd.app/
curl -sI https://getmngd.com/blog    →  308 to /blog/ (Pages' own trailing slash),
                                        then 200 — it never leaves the hostname
curl -sI https://getmngd.com/nope    →  200 (the same index.html fallback as the
                                        apex; §7's 404.html fixes both at once)
```

So the thing §2 forbids for `www` is live for `getmngd.com`: two origins for one
site. The damage is bounded rather than absent — every page there carries
`<link rel="canonical" href="https://mngd.app/…">`, so a crawler that honours
canonical attributes the content correctly — but it is a second copy of the site
on a second name, and it should be a redirect.

**The steps, in this order:**

1. **Remove `getmngd.com` from the Pages project's custom domains.** While it is a
   custom domain, Pages answers on it and a redirect rule has nothing to bite on.
2. Keep the zone. Point the apex at something the rule can catch — a proxied
   placeholder record (`AAAA 100::`, orange-clouded, the conventional
   redirect-only target) is enough; the rule runs at the edge, no origin needed.
3. **Add the redirect rule** in the `getmngd.com` zone: hostname `getmngd.com`
   **or** `www.getmngd.com` → `https://mngd.app` + the original path and query,
   **301**, preserve query string on.
4. **`www.getmngd.com` has no DNS record today** (no `A`, no `NS`). Add the
   proxied placeholder for `www` too, or the rule never fires on the www form
   because nothing resolves to reach it.

**Verify:**

```
curl -sI https://getmngd.com/blog | head -3
#  expect: 301   and   location: https://mngd.app/blog

curl -sI https://www.getmngd.com/blog | head -3
#  expect the same 301 — if curl returns 000, step 4 is the one that is missing
```

It is a redirect, never a second copy of the site.

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
- [x] **A missing path can actually 404.** `src/pages/404.astro` builds to
      `dist/404.html` — verified from a clean `rm -rf dist && npm run build` on
      2026-09-12, 14,648 bytes, distinct from `index.html`, carrying
      `noindex, nofollow`. Pages serves that file with a real 404 status, which
      ends the fallback that made `/og.png`, `/robots.txt` and every mistyped path
      answer **200 `text/html`** with the home page in the body. That is the whole
      reason og.png looked deployed for twenty minutes while it had never been
      deployed: a 200 that cannot go red is not a green.
- [ ] **After the first deploy from `main`, re-measure the thing that lied.** The
      fix is in the build; it is not proven until Pages serves it:

      ```
      for u in /og.png /robots.txt /sitemap-index.xml /nope; do
        curl -s -o /dev/null -w "%{http_code} %{content_type}  $u\n" "https://mngd.app$u"
      done
      #  expect: 200 image/png · 200 text/plain · 200 application/xml · 404 text/html
      ```

      Note `/sitemap.xml` is **not** the filename — the integration writes
      `sitemap-index.xml`, and `robots.txt` points there. `/sitemap.xml` will 404,
      honestly, which is the correct answer for a file that does not exist.
