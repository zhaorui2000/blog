const { addDynamicIconSelectors } = require('@iconify/tailwind');
const baseConfig = require('@blog/tailwind-config');
/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [addDynamicIconSelectors()],
};
