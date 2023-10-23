/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: 'rem-to-vw',

    Declaration(decl, postcss) {
      decl.value = decl.value.replace(/(\d+(\.\d+)?)(rem|px)/g, (match, p1, p2, p3) => {
        const value = parseFloat(p1);
        if (p3 === 'rem') {
          const pxValue = value * 16; // Assuming 1rem = 16px
          const vwValue = ((pxValue / 375) * 100).toFixed(5); // Assuming base font size is 16px
          return `${vwValue}vw`;
        } else if (p3 === 'px') {
          const vwValue = (value / 375 * 100).toFixed(5); // Assuming base font size is 16px
          return `${vwValue}vw`;
        }
      })
    }

  }
}

module.exports.postcss = true