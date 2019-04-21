'use strict';

module.exports = (function() {
  /**
   * Trim trailing spaces on each line.
   * @private
   * @param {String} string Spaceful string
   * @returns {String}
   */
  function trim(string) {
    return string.replace(/[ \t]+(\r?\n)/g, '$1');
  }

  return {
    name: 'strip-spaces',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: {
      boolean: [true]
    },

    /**
     * Processes tree node.
     * @param {node} ast
     */
    process: function(ast) {
      var lastChild = ast.last();
      if (lastChild.is('space')) {
        lastChild.content = trim(lastChild.content)
            .replace(/[ \t]+$/, '')
            .replace(/(\r?\n)+/g, '$1');
      }

      ast.traverseByType('space', function(space) {
        space.content = trim(space.content);
      });
    },

    detectDefault: true,

    /**
     * Detects the value of an option at the tree node.
     * This option is treated as `true` by default, but any trailing
     * space would invalidate it.
     *
     * @param {node} ast
     */
    detect: function(ast) {
      let detected = [];

      var lastChild = ast.last();
      if (lastChild.is('space') &&
          lastChild.content !== '\n' &&
          lastChild.content.match(/^(?:[ \t]|\r?\n)+$/)) {
        detected.push(false);
      }

      ast.traverseByType('space', function(space) {
        if (space.content.match(/[ \t]\r?\n/)) detected.push(false);
      });

      return detected;
    }
  };
})();
