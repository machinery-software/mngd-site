import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://mngd.app',
  integrations: [tailwind()],
  output: 'static',
});
