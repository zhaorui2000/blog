/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here
  const { viewportWidth = 375, unitPrecision = 5, rootValue = 16 } = opts;

  return {
    postcssPlugin: 'postcss-any-to-viewport',
    /*
    Root (root, postcss) {
      // Transform CSS AST here
    }
    */

    Declaration(decl) {
      // The faster way to find Declaration node

      // px to vw
      if (decl.value.indexOf('px') !== -1) {
        const newValue = decl.value.replace('px', '');
        const convertedValue = `${(parseFloat(newValue) / viewportWidth).toFixed(unitPrecision)}vw`;
        decl.value = convertedValue;
      }

      // rem to vw
      if (decl.value.indexOf('rem') !== -1) {
        const newValue = decl.value.replace('rem', '');
        const convertedValue = `${((parseFloat(newValue) / viewportWidth) * rootValue).toFixed(unitPrecision)}vw`;
        decl.value = convertedValue;
      }
    },

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
};

module.exports.postcss = true;
