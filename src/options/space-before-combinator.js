'use strict';

var gonzales = require('gonzales-pe');

module.exports = {
  name: 'space-before-combinator',

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
      if (parent.get(i - 1).is('space')) {
        parent.get(i - 1).content = value;
      } else {
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
    let detected = [];

    ast.traverseByType('combinator', function(combinator, i, parent) {
      if (parent.get(i - 1).is('space')) {
        detected.push(parent.get(i - 1).content);
      } else {
        detected.push('');
      }
    });

    return detected;
  }
};
