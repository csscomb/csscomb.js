var gonzales = require('../gonzales');

module.exports = {
  name: 'space-before-selector-delimiter',

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

    ast.traverseByType('selector', function(selector) {
      selector.forEach('delimiter', function(delim, i) {
        var previousNode = selector.get(i - 1);
        if (previousNode.last().is('space')) {
          previousNode.last().content = value;
        } else {
          var space = gonzales.createNode({
            type: 'space',
            content: value
          });
          previousNode.content.push(space);
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

    ast.traverseByType('selector', function(selector) {
      selector.forEach('delimiter', function(delim, i) {
        var previousNode = selector.get(i - 1);
        if (previousNode.last().is('space')) {
          detected.push(previousNode.last().content);
        } else {
          detected.push('');
        }
      });
    });

    return detected;
  }
};
