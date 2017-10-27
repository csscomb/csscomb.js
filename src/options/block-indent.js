'use strict';

let option = {
  /**
   * Option's name as it's used in config.
   * @type {String}
   */
  get name() {
    return 'block-indent';
  },

  /**
   * Name of option that must run after this option.
   * @type {String}
   */
  get runBefore() {
    return 'sort-order';
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
      number: true,
      string: /^[ \t]*$/
    };
  },

  /**
   * Processes ast and fixes found code style errors.
   * @param {Node} ast
   */
  process(ast) {
    ast.eachFor('space', function(whitespaceNode, i) {
      var spaces = whitespaceNode.content.replace(/\n[ \t]+/gm, '\n');

      if (spaces === '') {
        ast.removeChild(i);
      } else {
        whitespaceNode.content = spaces;
      }
    });

    this._processNode(ast, 0);
  },

  /**
   * Detects the value of this option in ast.
   * @param {Node} ast
   * @return {Array} List of detected values
   */
  detect(ast) {
    var detected = [];

    ast.traverse(function(node) {
      // Continue only with non-empty {...} blocks:
      if (!node.is('atrulers') && !node.is('block') || !node.length)
        return;

      node.eachFor('space', function(whitespaceNode) {
        var spaces = whitespaceNode.content;
        var lastIndex = spaces.lastIndexOf('\n');

        // Do not continue if there is no line break:
        if (lastIndex < 0) return;

        // Number of spaces from beginning of line:
        var spacesLength = spaces.slice(lastIndex + 1).length + 1;
        detected.push(new Array(spacesLength).join(' '));
      });
    });

    return detected;
  },

  /**
   * @param {Node} node
   * @param {Number} level
   */
  _processNode(node, level) {
    var that = this;

    node.forEach(function(n) {
      if (node.syntax === 'sass' && n.is('block')) {
        that._processSassBlock(n, level);
      }

      // Continue only with space nodes inside {...}:
      if (node.syntax !== 'sass' && level !== 0 && n.is('space')) {
        that._processSpaceNode(n, level);
      }

      if (n.is('block') || n.is('atrulers')) level++;

      that._processNode(n, level);
    });
  },

  /**
   * @param {Node} node
   * @param {Number} level
   */
  _processSassBlock(node, level) {
    var value = this.value;

    node.eachFor('space', function(whitespaceNode) {
      if (whitespaceNode.content === '\n') return;

      var spaces = whitespaceNode.content.replace(/[ \t]/gm, '');
      spaces += new Array(level + 2).join(value);
      whitespaceNode.content = spaces;
    });
  },

  /**
   * @param {Node} node
   * @param {Number} level
   */
  _processSpaceNode(node, level) {
    var value = this.value;

    // Remove all whitespaces and tabs, leave only new lines:
    var spaces = node.content.replace(/[ \t]/gm, '');

    if (!spaces) return;

    spaces += new Array(level + 1).join(value);
    node.content = spaces;
  }
};

module.exports = option;
