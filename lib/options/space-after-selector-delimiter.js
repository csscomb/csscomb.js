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

        for (var i = node.content.length; i--;) {
            if (!node.content[i].is('delimiter')) continue;

            if (node.content[i + 1].is('space')) {
                node.content[i + 1].content = value;
            } else if (node.content[i + 1].content[0].is('space')) {
                node.content[i + 1].content[0].content = value;
            } else {
                var space = gonzales.createNode({ type: 'space', content: value });
                node.content[i + 1].content.unshift(space);
            }
        }
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
