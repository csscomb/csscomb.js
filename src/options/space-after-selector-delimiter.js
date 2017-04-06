'use strict';

var gonzales = require('gonzales-pe');

module.exports = {
  name: 'space-after-selector-delimiter',

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

    ast.traverseByType('delimiter', function(delimiter, i, parent) {
      if (parent.is('arguments')) return;

      var nextNode = parent.get(i + 1);
      if (!nextNode) return;

      if (nextNode.is('space')) {
        nextNode.content = value;
      } else if (nextNode.first().is('space')) {
        nextNode.first().content = value;
      } else {
        var space = gonzales.createNode({
          type: 'space',
          content: value
        });
        nextNode.insert(0, space);
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

    ast.traverseByType('delimiter', function(delimiter, i, parent) {
      if (parent.is('arguments')) return;

      var nextNode = parent.get(i + 1);

      if (nextNode && nextNode.is('space')) {
        detected.push(nextNode.content);
      } else if (nextNode.first() && nextNode.first().is('space')) {
        detected.push(nextNode.first().content);
      } else {
        detected.push('');
      }
    });

    return detected;
  }
};
