var gonzales = require('gonzales-pe');

module.exports = {
    name: 'space-after-colon',

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

        var value = this.getValue('space-after-colon');

        for (var i = node.length; i--;) {
            if (!node.get(i).is('propertyDelimiter')) continue;

            if (this.getSyntax() === 'sass' && !node.get(i - 1)) break;

            // Remove any spaces after colon:
            if (node.get(i + 1).is('space')) node.remove(i + 1);
            // If the value set in config is not empty, add spaces:
            var space = gonzales.createNode({ type: 'space', content: value });
            if (value !== '') node.insert(i + 1, space);

            break;
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} node
     */
    detect: function(node) {
        if (!node.is('declaration')) return;

        for (var i = node.length; i--;) {
            if (!node.get(i).is('propertyDelimiter')) continue;

            if (node.get(i + 1).is('space')) {
                return node.get(i + 1).content;
            } else {
                return '';
            }
        }
    }
};
