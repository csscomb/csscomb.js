'use strict';

var gonzales = require('gonzales-pe');

module.exports = (function() {
  function getDeclarationEnd(node, i) {
    for (; i < node.length; i++) {
      if (!node.get(i + 1) || typeof node.get(i + 1) === 'string') {
        return 0;
      } else if (node.get(i + 1).is('space')) {
        if (node.get(i + 1).content.indexOf('\n') > -1) {
          if (node.get(i + 2) && node.get(i + 2).is('declaration')) {
            return i;
          } else {
            return 0;
          }
        } else if (node.get(i + 2) &&
            node.get(i + 2).is('multilineComment')) {
          if (node.get(i + 3) && node.get(i + 3).is('declaration')) {
            return i + 2;
          } else if (node.get(i + 3) && node.get(i + 3).is('space')) {
            if (node.get(i + 4) &&
                node.get(i + 4).is('declaration')) {
              return i + 2;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        } else if (node.get(i + 2) &&
             node.get(i + 2).is('declaration')) {
          return i;
        }
      } else if (node.get(i + 1).is('declaration')) {
        return i;
      } else if (node.get(i + 1).is('multilineComment')) {
        if (node.get(i + 2) && node.get(i + 2).is('declaration')) {
          return i + 1;
        } else if (node.get(i + 2) && node.get(i + 2).is('space')) {
          if (node.get(i + 3) && node.get(i + 3).is('declaration')) {
            return i + 1;
          }
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }
  }

  return {
    name: 'space-between-declarations',

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

      ast.traverseByType('declarationDelimiter', (delimiter, i, parent) => {
        // Grom user's point of view "declaration" includes semicolons
        // and comments placed on the same line.
        // So group those things together:
        var declarationEnd = getDeclarationEnd(parent, i);
        if (!declarationEnd) {
          return;
        } else {
          i = declarationEnd;
        }

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
    }
  };
})();
