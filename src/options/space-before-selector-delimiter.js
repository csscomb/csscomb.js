var gonzales = require('gonzales-pe');

module.exports = {
    name: 'space-before-selector-delimiter',

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
        if (!node.is('selector')) return;

        var value = this.getValue('space-before-selector-delimiter');

        node.forEach('delimiter', function(delim, i) {
            var previousNode = node.get(i - 1);
            if (previousNode.last().is('space')) {
                previousNode.last().content = value;
            } else {
                var space = gonzales.createNode({ type: 'space', content: value });
                previousNode.content.push(space);
            }
        });
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} node
     */
    detect: function(node) {
        if (!node.is('selector')) return;

        var variants = [];

        node.forEach('delimiter', function(delim, i) {
            var previousNode = node.get(i - 1);
            if (previousNode.last().is('space')) {
                variants.push(previousNode.last().content);
            } else {
                variants.push('');
            }
        });

        return variants;
    }
};
