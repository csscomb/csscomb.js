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

    ast.forEach(node => {
      if (node.is('ruleset') || node.is('atrule')) {
        var spaces = 0;
        var tabs = 0;
        var tabsize;

        node.forEach(block => {
          if (block && block.is('block')) {
            block.forEach(blockContent => {
              // The indent before the very first property declaration in the
              // block usually has a length of one tab or the number of
              // whitespaces set for a tab. Because there might be nested
              // blocks having incremented indent, we continue to the next root
              // block in the each ruleset where tabsize is not detected yet.
              if (tabsize !== 'detected') {
                if (blockContent.is('space')) {
                  spaces = blockContent.content.replace(/\n/g, '');
                  tabs = spaces.match(/\t/g);
                  spaces = spaces.match(/( )/g);
                  if (tabs) {
                    // It is a very rare case when tabs are used in a file
                    // instead of whitespaces and it requires a lot of efforts
                    // to find the tab size in a particular environment. So we
                    // imply that tab size = 2.
                    tabsize = 2;
                  } else if (spaces) {
                    tabsize = spaces.length;
                  }
                } else if (tabsize && blockContent.is('declaration')) {
                  detected.push(tabsize);
                  tabsize = 'detected';
                }
              }
            });
          }
        });
      }
    });

    return detected;
  }
};
