export default {
  '**/*.{js,astro,json,md,yaml,mjs,css}': (filenames) => filenames.map((filename) => `prettier --write '${filename}'`),
};