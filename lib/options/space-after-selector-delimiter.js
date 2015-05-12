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
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType !== 'selector') return;

        var variants = [];

        for (var i = node.length; i--;) {
            if (node[i][0] !== 'delim') continue;

            if (node[i + 1][1][0] === 's') {
                variants.push(node[i + 1][1][1]);
            } else {
                variants.push('');
            }
        }

        return variants;
    }
};
