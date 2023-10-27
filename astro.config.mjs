import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import { VitePWA } from 'vite-plugin-pwa'

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  vite:{
    plugins:[VitePWA()]
  }
});