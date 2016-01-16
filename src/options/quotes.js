'use strict';

module.exports = {
  name: 'quotes',

  syntax: ['css', 'less', 'sass', 'scss'],

  accepts: {
    string: /^single|double$/
  },

  /**
   * Processes tree node.
   * @param {node} ast
   */
  process: function(ast) {
    let value = this.value;

    ast.traverseByType('string', function(string) {
      if (string.content[0] === '"' && value === 'single') {
        string.content = string.content
            // Unescape all escaped double quotes
            .replace(/\\"/g, '"')
            // Escape all the single quotes
            .replace(/([^\\])'/g, '$1\\\'')
            // Replace the first and the last quote
            .replace(/^"|"$/g, '\'');
      } else if (string.content[0] === '\'' && value === 'double') {
        string.content = string.content
            // Unescape all escaped single quotes
            .replace(/\\'/g, '\'')
            // Escape all the double quotes
            .replace(/([^\\])"/g, '$1\\\"')
            // Replace the first and the last quote
            .replace(/^'|'$/g, '"');
      }
    });
  },

  /**
   * Detects the value of an option at the tree node.
   *
   * @param {node} ast
   */
  detect: function(ast) {
    let detected = [];

    ast.traverseByType('string', function(string) {
      if (string.content[0] === '"') {
        detected.push('double');
      } else if (string.content[0] === '\'') {
        detected.push('single');
      }
    });

    return detected;
  }
};
