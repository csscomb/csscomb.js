'use strict';

let gonzales = require('gonzales-pe');

let option = {
  /**
   * Option's name as it's used in config.
   * @type {String}
   */
  get name() {
    return 'eof-newline';
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
      boolean: [true, false]
    };
  },

  /**
   * Processes ast and fixes found code style errors.
   * @param {Node} ast
   */
  process(ast) {
    var lastChild = ast.last();

    if (!lastChild.is('space')) {
      lastChild = gonzales.createNode({type: 'space', content: ''});
      ast.content.push(lastChild);
    }

    lastChild.content = lastChild.content.replace(/\n$/, '');
    if (this.value) lastChild.content += '\n';
  },

  /**
   * Detects the value of this option in ast.
   * @param {Node} ast
   * @return {Array} List of detected values
   */
  detect(ast) {
    var lastChild = ast.last();

    if (lastChild.is('space') && lastChild.content.indexOf('\n') !== -1) {
      return [true];
    } else {
      return [false];
    }
  }
};

module.exports = option;
