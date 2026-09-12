import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Tailwind v4 is CSS-first: the theme lives in src/styles/global.css, not in a
// tailwind.config file, which is why there is no longer one in this repo.
// Preline v4 requires v4 (it ships `variants.css` rather than a v3 plugin).
//
// MDX is here for one reason: a Field Note has to be able to place a receipt
// block and a pending-screenshot frame inside its prose, and a receipt that
// cannot be a component ends up copy-pasted — which is how two receipts on two
// pages come to disagree.
export default defineConfig({
  site: 'https://mngd.app',
  output: 'static',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
