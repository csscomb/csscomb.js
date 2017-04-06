'use strict';

var gonzales = require('gonzales-pe');

module.exports = {
  name: 'space-after-combinator',

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

    ast.traverseByType('combinator', function(combinator, i, parent) {
      var nextNode = parent.get(i + 1);

      if (nextNode && nextNode.is('space')) {
        nextNode.content = value;
      } else {
        var space = gonzales.createNode({
          type: 'space',
          content: value
        });
        parent.insert(i + 1, space);
      }
    });
  },

  /**
   * Detects the value of an option at the tree node.
   *
   * @param {node} ast
   */
  detect: function(ast) {
    let detected = [];

    ast.traverseByType('combinator', function(combinator, i, parent) {
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
