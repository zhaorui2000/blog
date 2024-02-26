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
      const regex = /(\d*\.?\d+)(px|rem)/g;
      const vwString = decl.value.replace(regex, (match, p1, p2) => {
        const value = parseFloat(p1);
        if (p2 === 'px') {
          const vwValue = ((value / viewportWidth) * 100).toFixed(unitPrecision);
          return `${vwValue}vw`;
        } else if (p2 === 'rem') {
          // 这里假设 1rem 等于设计稿宽度的 10%
          const vwValue = ((value / viewportWidth) * rootValue * 100).toFixed(unitPrecision);
          return `${vwValue}vw`;
        }
        return match;
      });
      decl.value = vwString;
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
