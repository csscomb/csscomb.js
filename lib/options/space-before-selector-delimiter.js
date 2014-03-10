module.exports = {
    name: 'space-before-selector-delimiter',

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
            if (node[i][0] === 'delim') {
                if (node[i - 1][node[i - 1].length - 1][0] === 's') {
                    node[i - 1][node[i - 1].length - 1][1] = value;
                } else {
                    node[i - 1].push(['s', value]);
                }
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

            if (node[i - 1][node[i - 1].length - 1][0] === 's') {
                variants.push(node[i - 1][node[i - 1].length - 1][1]);
            } else {
                variants.push('');
            }
        }

        return variants;
    }
};
