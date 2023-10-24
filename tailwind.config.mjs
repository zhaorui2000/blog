/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind');
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      MR: "#1989FA",
      N1: "#F7F8FA",
      N2: "#F2F3F5",
      N3: "#EBEDF0",
      N4: "#DCDEE0",
      N5: "#CBC9CC",
      N6: "#969799",
      N7: "#646566",
      N8: "#323233",
      B: "#000000",
      W: "#FFFFFF",
      MV: "#576B95",
      MG: "#07C160",
      O4: "#ED6A0C",
      Y1: "#FFFBEB",
      CY4: "#FAAB0C"
    },
    extend: {},
  },
  plugins: [addDynamicIconSelectors()],
};
