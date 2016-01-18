'use strict';

module.exports = {
  name: 'unitless-zero',

  syntax: ['css', 'less', 'sass', 'scss'],

  accepts: {
    boolean: [true]
  },

  /**
   * Processes tree node.
   *
   * @param {node} ast
   */
  process: function(ast) {
    var UNITS = ['cm', 'em', 'ex', 'pt', 'px'];

    ast.traverseByTypes(['value', 'parentheses'], function(node) {
      node.forEach(function(value) {
        if (typeof value === 'string') return;

        if (value.is('dimension')) {
          var unit = value.first('ident').content;
          if (value.first('number').content === '0' &&
              UNITS.indexOf(unit) !== -1) {
            value.removeChild(1);
          }
        } else if (value.is('percentage')) {
          var number = value.first('number').content;
          if (number === '0') {
            value.type = 'number';
            value.content = number;
          }
        }
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

    ast.traverse(function(node, index, parent) {
      // If we see a zero with unit and it is not degree,
      // then we don’t have an option
      if (node.is('percentage') &&
          node.first('number').content[1] === '0') {
        detected.push(false);
        return;
      }

      if (node.is('dimension') &&
          node.first('number').content === '0' &&
          node.first('ident').content !== 'deg') {
        detected.push(false);
        return;
      }

      // If we see a zero and previous node is not percentage
      // or dimension, then we have an option
      if (node.is('number') &&
          node.content === '0' &&
          !parent.is('percentage') &&
          !parent.is('dimension')) {
        detected.push(true);
      }
    });

    return detected;
  }
};
