'use strict';

var gonzales = require('gonzales-pe');

let option = {
  /**
   * Option's name as it's used in config.
   * @type {String}
   */
  get name() {
    return 'always-semicolon';
  },

  /**
   * List of syntaxes that are supported by this option.
   * @type {Array}
   */
  get syntax() {
    return ['css', 'less', 'sass', 'scss'];
  },

  /**
   * Types of values this option accepts in config.
   * @type {Object}
   */
  get accepts() {
    return {
      boolean: [true]
    };
  },

  /**
   * Checks ast for code style errors.
   *
   * @param {Node} ast
   * @return {Array?} List of found errors.
   */
  lint(ast) {
    var errors = [];

    ast.traverseByType('block', (block) => {
      block.eachFor((currentNode) => {
        var nodeWithoutSemicolon;
        // Skip nodes that already have `;` at the end:
        if (currentNode.is('declarationDelimiter')) return null;

        // Add semicolon only after declarations and includes.
        // If current node is include, insert semicolon right into it.
        // If it's declaration, look for value node:
        if (currentNode.is('include') ||
            currentNode.is('extend')) {
          nodeWithoutSemicolon = currentNode;
        } else if (currentNode.is('declaration')) {
          nodeWithoutSemicolon = currentNode.last('value');
        } else {
          return;
        }

        errors.push({
          message: 'Missing semicolon',
          line: nodeWithoutSemicolon.end.line,
          column: nodeWithoutSemicolon.end.column + 1
        });

        // Stop looping through block's children:
        return null;
      });
    });

    return errors;
  },

  /**
   * Processes ast and fixes found code style errors.
   * @param {Node} ast
   */
  process(ast) {
    var nodeWithoutSemicolon;

    ast.traverseByType('block', (block) => {
      block.eachFor((currentNode) => {
        // Skip nodes that already have `;` at the end:
        if (currentNode.is('declarationDelimiter')) return null;

        // Add semicolon only after declarations and includes.
        // If current node is include, insert semicolon right into it.
        // If it's declaration, look for value node:
        if (currentNode.is('include') ||
            currentNode.is('extend')) {
          nodeWithoutSemicolon = currentNode;
        } else if (currentNode.is('declaration')) {
          nodeWithoutSemicolon = currentNode.last('value');
        } else {
          return;
        }

        // Check if there are spaces and comments at the end of the node
        for (var j = nodeWithoutSemicolon.length; j--;) {
          var lastNode = nodeWithoutSemicolon.get(j);

          // If the node's last child is block, do not add semicolon:
          // TODO: Add syntax check and run the code only for scss
          if (lastNode.is('block')) {
            return null;
          } else if (!lastNode.is('space') &&
                     !lastNode.is('multilineComment') &&
                     !lastNode.is('singlelineComment')) {
            j++;
            break;
          }
        }

        var declDelim = gonzales.createNode({
          type: 'declarationDelimiter',
          content: ';'
        });
        nodeWithoutSemicolon.insert(j, declDelim);
        return null;
      });
    });
  },

  /**
   * Detects the value of this option in ast.
   * @param {Node} ast
   * @return {Array?} List of detected values
   */
  detect(ast) {
    var detected = [];

    ast.traverseByType('block', (block) => {
      block.eachFor((node) => {
        if (node.is('declarationDelimiter')) {
          detected.push(true);
          return null;
        } else if (node.is('declaration')) {
          detected.push(false);
          return null;
        }
      });
    });

    return detected;
  }
};

module.exports = option;
