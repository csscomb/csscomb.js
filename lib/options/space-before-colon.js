var gonzales = require('gonzales-pe');

module.exports = {
    name: 'space-before-colon',

    runBefore: 'block-indent',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: {
        number: true,
        string: /^[ \t\n]*$/
    },

    /**
     * Processes tree node.
     *
     * @param {node} node
     */
    process: function(node) {
        if (!node.is('declaration')) return;

        var value = this.getValue('space-before-colon');
        var syntax = this.getSyntax();

        node.forEach('propertyDelimiter', function(delimiter, i) {
            if (syntax === 'sass' && !node.get(i - 1)) return;

            // Remove any spaces before colon:
            if (node.get(i - 1).is('space')) {
                node.remove(--i);
            }

            // If the value set in config is not empty, add spaces:
            var space = gonzales.createNode({ type: 'space', content: value });
            if (value !== '') node.insert(i, space);
        });
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType !== 'declaration') return;

        for (var i = node.length; i--;) {
            if (node[i][0] !== 'propertyDelim') continue;

            if (node[i - 1][0] === 's') {
                return node[i - 1][1];
            } else {
                return '';
            }
        }
    }
};
