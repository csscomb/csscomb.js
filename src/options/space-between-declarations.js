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
    },

    /**
    * Detects the value of this option in ast.
    * @param {Node} ast
    * @return {Array?} List of detected values
    */
    detect(ast) {
      var detected = [];

      ast.traverseByType('block', block => {
        var prevDeclaration = false;
        var nextDeclaration = false;

        block.forEach(blockContent => {
          if (blockContent.is('declaration')) {
            if (prevDeclaration) {
              prevDeclaration = false;
              nextDeclaration = true;
            } else {
              prevDeclaration = true;
              nextDeclaration = false;
            }
          } else if (prevDeclaration) {
            if (blockContent.is('multilineComment')) {
              // If there is comments between two declarations, then we need
              // to clean up whitespace and new line characters before each
              // comment keeping up the same characters after the comment.
              detected.splice(-1);
            } else if (blockContent.is('space')) {
              detected.push(blockContent.content);
            }
          }
        });

        if (!nextDeclaration) {
          // Remove the last detected space content after the property
          // declaration which does not have a pair for it in a block.
          detected.splice(-1);
        }
      });

      return detected;
    }
  };
})();
