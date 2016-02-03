'use strict';

var gonzales = require('gonzales-pe');

module.exports = (function() {
  return {
    name: 'space-before-opening-brace',

    runBefore: 'block-indent',

    syntax: ['css', 'less', 'scss'],

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

      // If found block node stop at the next one for space check.
      ast.traverseByTypes(['block', 'value'], function(block, i, parent) {
        if (block.is('value') && !block.first().is('block')) return;

        var previousNode = parent.get(i - 1);
        if (!previousNode) return;

        // If it's spaces, modify this node.
        // If it's something different from spaces, add a space node to
        // the end:
        if (previousNode.is('space')) {
          previousNode.content = value;
        } else if (value !== '') {
          var space = gonzales.createNode({
            type: 'space',
            content: value
          });
          parent.insert(i, space);
        }
      });
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} ast
     */
    detect: function(ast) {
      var detected = [];

      ast.traverseByTypes(['block', 'value'], function(block, i, parent) {
        if (block.is('value') && !block.first().is('block')) return;

        var previousNode = parent.get(i - 1);
        if (!previousNode) return;

        // If it's spaces, modify this node.
        // If it's something different from spaces, add a space node to
        // the end:
        if (previousNode.is('space')) {
          detected.push(previousNode.content);
        } else {
          detected.push('');
        }
      });

      return detected;
    }
  };
})();
