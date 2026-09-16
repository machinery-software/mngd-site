# mngd-site

Marketing site for [mngd.app](https://mngd.app) — Astro, Tailwind v4, Preline UI,
deployed on Cloudflare Pages.

## This repository is PRIVATE, and stays private

**Decision, 2026-09-11 (MAC-588).** Not because of anything in the working tree —
Preline is MIT and its licence and attribution ship here — but because of what is
in the **branch history**.

`archive/worktree-2026-08-26` carries 75 files derived from the **Cruip Simple**
template (commit `4165638`), a paid template whose licence does not permit
redistributing its source publicly. Making this repository public would expose
that source, and merge discipline does not help:

- a public repository exposes **all branches**, not just `main`;
- commits stay reachable through **pull-request refs** even after a branch is
  deleted.

So the honest options are private-forever or history surgery, not "never merge
that commit". Private it is.

**If a public site repository is ever wanted**, the clean path is a *fresh*
repository initialised from a squashed `main` — cheap, doable later, and it never
inherits this history. Do not try to open this one up.

## Development

```bash
npm install
npm run dev
```

## Deployment

Cloudflare Pages settings:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js version:** 20

The site deploys automatically on push to `main`. The domain steps David runs by
hand are in [`docs/cloudflare-domains.md`](docs/cloudflare-domains.md).

## What the site is allowed to say

[`CLAIMS.md`](CLAIMS.md) governs every page and every Field Note, and `/claims`
renders that same file so the page and the rule cannot drift apart. Every
technical claim must trace to an entry in the mngd repository's `EVIDENCE.md`,
cited where the claim appears. When in doubt, say less.

## Adding a Field Note

Posts are a typed content collection in `src/content/blog/`, one `.md` or `.mdx`
file each:

```
src/content/blog/002-your-slug.mdx
```

Frontmatter: `title`, `description`, `date`, optional `number`, `draft`, and
`evidence` — the EVIDENCE.md IDs the post rests on, which the layout prints. The
post layout adds the dateline and the built-on credits automatically, so no post
has to remember them.

Components available inside a note: `Receipt` (anything quoted from a device or
from EVIDENCE.md) and `Screenshot` (a capture, or an honest pending frame for one
that does not exist yet).

## The OG image

`public/og.png` is generated from the brand tokens, not drawn by hand:

```bash
node scripts/build-og.mjs
```

It reads the colours out of `src/styles/tokens.css` and the type out of the pinned
`@fontsource` packages, then writes `public/og.svg` (readable in a diff) and
`public/og.png`. Both are committed. CLAIMS.md governs pictures too: the card
carries the mark, the wordmark and the tagline, and no feature claims — an image
is the one surface where a claim travels without its receipt.
