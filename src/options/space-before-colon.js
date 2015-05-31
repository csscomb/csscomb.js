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
     * @param {node} node
     */
    detect: function(node) {
        if (!node.is('declaration')) return;

        var result;

        node.forEach('propertyDelimiter', function(delimiter, i) {
            if (node.get(i - 1).is('space')) {
                result = node.get(i - 1).content;
            } else {
                result = '';
            }
        });

        return result;
    }
};
