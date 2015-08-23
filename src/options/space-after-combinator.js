'use strict';

var gonzales = require('../gonzales');

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

    // TODO(tonyganch): Can this be replaced with one `traverse`?
    ast.traverseByType('selector', function(selector) {
      selector.forEach('simpleSelector', function(simpleSelector) {
        simpleSelector.forEach('combinator', function(combinator, i) {
          if (simpleSelector.get(i + 1).is('space')) {
            simpleSelector.get(i + 1).content = value;
          } else {
            var space = gonzales.createNode({
              type: 'space',
              content: value
            });
            simpleSelector.insert(i + 1, space);
          }
        });
      });
    });
  },

  /**
   * Detects the value of an option at the tree node.
   *
   * @param {node} ast
   */
  detect: function(ast) {
    let detected = [];

    ast.traverseByType('selector', function(selector) {
      selector.forEach('simpleSelector', function(simpleSelector) {
        simpleSelector.forEach('combinator', function(combinator, i) {
          if (simpleSelector.get(i + 1).is('space')) {
            detected.push(simpleSelector.get(i + 1).content);
          } else {
            detected.push('');
          }
        });
      });
    });

    return detected;
  }
};
