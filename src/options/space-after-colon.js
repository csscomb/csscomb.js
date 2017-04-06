'use strict';

var gonzales = require('gonzales-pe');

module.exports = {
  name: 'space-after-colon',

  runBefore: 'block-indent',

  syntax: ['css', 'less', 'sass', 'scss'],

  accepts: {
    number: true,
    string: /^[ \t\n]*$/
  },

  /**
   * Processes tree node.
   *
   * @param {node} ast
   */
  process: function(ast) {
    let value = this.value;

    ast.traverseByType('propertyDelimiter', function(delimiter, i, parent) {
      if (delimiter.syntax === 'sass' && !parent.get(i - 1))
        return null;

      // Remove any spaces after colon:
      if (parent.get(i + 1) && parent.get(i + 1).is('space'))
          parent.removeChild(i + 1);
      // If the value set in config is not empty, add spaces:
      if (value !== '') {
        var space = gonzales.createNode({
          type: 'space',
          content: value
        });
        parent.insert(i + 1, space);
      }

      return null;
    });
  },

  /**
   * Detects the value of an option at the tree node.
   *
   * @param {node} ast
   */
  detect: function(ast) {
    let detected = [];

    ast.traverseByType('propertyDelimiter', function(delimiter, i, parent) {
      var nextNode = parent.get(i + 1);

      if (nextNode.is('space')) {
        detected.push(nextNode.content);
      } else {
        detected.push('');
      }
    });

    return detected;
  }
};
