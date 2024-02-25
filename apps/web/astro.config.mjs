import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

export default defineConfig({
  // ...
  integrations: [tailwind(), sentry(), spotlightjs()],
  output: 'server',
  adapter: netlify({
    cacheOnDemandPages: true,
  }),
});
