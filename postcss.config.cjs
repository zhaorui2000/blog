module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("./plugin/postcss-rem-to-vw.cjs")
  ],
};