import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  // ...
  integrations: [tailwind(), sentry(), spotlightjs(), vue()],
  output: 'server',
  adapter: netlify({
    cacheOnDemandPages: true,
  }),
});
