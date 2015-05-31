var gonzales = require('gonzales-pe');

module.exports = {
    name: 'space-after-selector-delimiter',

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

        var value = this.getValue('space-after-selector-delimiter');

        node.forEach('delimiter', function(delimiter, i) {
            var nextNode = node.get(i + 1);

            if (nextNode.is('space')) {
                nextNode.content = value;
            } else if (nextNode.first().is('space')) {
                nextNode.first().content = value;
            } else {
                var space = gonzales.createNode({ type: 'space', content: value });
                nextNode.insert(0, space);
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

        node.forEach('delimiter', function(delimiter, i) {
            var nextNode = node.get(i + 1);
            if (nextNode && nextNode.is('space')) {
                variants.push(nextNode.content);
            } else if (nextNode.first() && nextNode.first().is('space')) {
                variants.push(nextNode.first().content);
            } else {
                variants.push('');
            }
        });

        return variants;
    }
};
