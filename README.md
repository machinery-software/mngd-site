# mngd-site

Marketing site for [mngd.app](https://mngd.app) — built with Astro, deployed on Cloudflare Pages.

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

The site deploys automatically on push to `main`.

## Adding a blog post

Posts live in `src/pages/blog/`. Add a new `.astro` file:

```
src/pages/blog/your-post-slug.astro
```

Then add it to the `posts` array in `src/pages/blog/index.astro`.

When there are enough posts to justify it, migrate to
[Astro content collections](https://docs.astro.build/en/guides/content-collections/).
