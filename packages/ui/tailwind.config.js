/** @type {import('tailwindcss').Config} */
const baseConfig = require('@blog/tailwind-config');
export default {
  ...baseConfig,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
