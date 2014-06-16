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
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType !== 'selector') return;

        var value = this.getValue('space-before-selector-delimiter');

        for (var i = node.length; i--;) {
            if (node[i][0] !== 'delim') continue;

            var previousNode = node[i - 1];
            if (previousNode[previousNode.length - 1][0] === 's') {
                previousNode[previousNode.length - 1][1] = value;
            } else {
                previousNode.push(['s', value]);
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

            var previousNode = node[i - 1];
            if (previousNode[previousNode.length - 1][0] === 's') {
                variants.push(previousNode[previousNode.length - 1][1]);
            } else {
                variants.push('');
            }
        }

        return variants;
    }
};
