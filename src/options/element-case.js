'use strict';

let option = {
  /**
   * Option's name as it's used in config.
   * @type {String}
   */
  get name() {
    return 'element-case';
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
    let value = this.value;

    ast.traverse((node) => {
      if (!node.is('selector') && !node.is('arguments')) return;

      node.forEach('typeSelector', (selector) => {
        selector.forEach('ident', (ident) => {
          ident.content = value === 'lower' ?
              ident.content.toLowerCase() :
              ident.content.toUpperCase();
        });
      });
    });
  },

  /**
   * Detects the value of this option in ast.
   * @param {Node} ast
   * @return {Array} List of detected values
   */
  detect(ast) {
    let detected = [];

    ast.traverse((node) => {
      if (!node.is('selector') && !node.is('arguments')) return;

      node.forEach('typeSelector', (selector) => {
        selector.forEach('ident', (ident) => {
          if (ident.content.match(/^[a-z]+$/)) {
            detected.push('lower');
          } else if (ident.content.match(/^[A-Z]+$/)) {
            detected.push('upper');
          }
        });
      });
    });

    return detected;
  }
};

module.exports = option;
