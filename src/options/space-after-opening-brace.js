'use strict';

var gonzales = require('gonzales-pe');

module.exports = {
  name: 'space-after-opening-brace',

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

    ast.traverse(function(node) {
      // If found block node stop at the next one for space check
      if (!node.is('block') && !node.is('atrulers')) return;

      if (node.first() &&
          node.first().is('space')) {
        node.first().content = value;
      } else if (value !== '') {
        var space = gonzales.createNode({
          type: 'space',
          content: value
        });
        node.insert(0, space);
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

    ast.traverse(function(node) {
      if (!node.is('block') && !node.is('atrulers')) return;

      if (node.first().is('space')) {
        detected.push(node.first().content);
      } else {
        detected.push('');
      }
    });

    return detected;
  }
};
