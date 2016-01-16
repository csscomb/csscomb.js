'use strict';

let option = {
  /**
   * Option's name as it's used in config.
   * @type {String}
   */
  get name() {
    return 'color-shorthand';
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
    var value = this.value;

    ast.traverseByType('color', function(color) {
      color.content = value ?
          color.content.replace(/(\w)\1(\w)\2(\w)\3/i, '$1$2$3') :
          color.content.replace(/^(\w)(\w)(\w)$/, '$1$1$2$2$3$3');
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
      if (color.content.match(/^\w{3}$/)) {
        detected.push(true);
      } else if (color.content.match(/^(\w)\1(\w)\2(\w)\3$/)) {
        detected.push(false);
      }
    });

    return detected;
  }
};

module.exports = option;
