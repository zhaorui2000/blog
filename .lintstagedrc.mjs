export default {
  '**/*.{js,json,md,yaml,mjs,css,astro}': (filenames) => filenames.map((filename) => `prettier --write '${filename}'`),
};
