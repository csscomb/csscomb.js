'use strict';

let option = {
  /**
   * Option's name as it's used in config.
   * @type {String}
   */
  get name() {
    return 'color-case';
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
      string: /^lower|upper$/
    };
  },

  /**
   * Processes ast and fixes found code style errors.
   * @param {Node} ast
   */
  process(ast) {
    var value = this.value;

    ast.traverseByType('color', function(color) {
      color.content = value === 'lower' ?
          color.content.toLowerCase() :
          color.content.toUpperCase();
    });
  },

  /**
   * Detects the value of this option in ast.
   * @param {Node} ast
   * @return {Array} List of detected values
   */
  detect(ast) {
    var detected = [];

    ast.traverseByType('color', function(color) {
      if (color.content.match(/^[^A-F]*[a-f][^A-F]*$/)) {
        detected.push('lower');
      } else if (color.content.match(/^[^a-f]*[A-F][^a-f]*$/)) {
        detected.push('upper');
      }
    });

    return detected;
  }
};

module.exports = option;
