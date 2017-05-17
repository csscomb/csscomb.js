'use strict';

module.exports = {
  name: 'tab-size',

  runBefore: 'vendor-prefix-align',

  syntax: ['css', 'less', 'sass', 'scss'],

  accepts: {
    number: true
  },

  /**
   * Processes tree node.
   *
   * @param {node} ast
   */
  process: function(ast) {
    let value = this.value;

    ast.traverseByType('space', function(space) {
      space.content = space.content.replace(/\t/, value);
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
      var spaces = 0;
      var tabs = 0;

      block.forEach(blockContent => {
        if (blockContent.is('space')) {
          spaces = blockContent.content.replace(/\n/g, '');
          tabs = spaces.match(/\t/g);
          // It is very rare case when tabs are used in a file instead of
          // whitespaces and it requires a lot of efforts to find the tab size
          // in a particular environment, ... so we imply that tab size = 2.
          tabs = tabs ? tabs.length * 2 : 0;
          spaces = spaces.match(/( )/g);
          spaces = spaces ? spaces.length + tabs : tabs;

        } else if (spaces && blockContent.is('declaration')) {
          detected.push(spaces);
          spaces = 0;
        }
      });
    });

    return detected;
  }
};
