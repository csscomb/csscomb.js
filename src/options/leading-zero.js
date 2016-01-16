'use strict';

module.exports = {
  name: 'leading-zero',

  syntax: ['css', 'less', 'sass', 'scss'],

  accepts: {
    boolean: [true, false]
  },

  /**
   * Processes tree node.
   * @param {node} ast
   */
  process: function(ast) {
    let value = this.value;

    ast.traverseByType('number', function(number) {
      if (!value) {
        number.content = number.content.replace(/^0+(?=\.)/, '');
      } else if (number.content[0] === '.') {
        number.content = '0' + number.content;
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

    ast.traverseByType('number', function(number) {
      if (number.content.match(/^\.[0-9]+/)) {
        detected.push(false);
      } else if (number.content.match(/^0\.[0-9]+/)) {
        detected.push(true);
      }
    });

    return detected;
  }
};
