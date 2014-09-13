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
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType !== 'selector') return;

        var value = this.getValue('space-after-selector-delimiter');

        for (var i = node.length; i--;) {
            if (node[i][0] !== 'delim') continue;

            if (node[i + 1][0] === 's') {
                node[i + 1][1] = value;
            } else if (node[i + 1][1][0] === 's') {
                node[i + 1][1][1] = value;
            } else {
                node[i + 1].splice(1, 0, ['s', value]);
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

        for (var i = node.length - 2; i >= 0; i--) {
            if (node[i][0] !== 'delim') continue;
            var next = node[i + 1][1];
            if (next[0] === 's') {
                variants.push([next[1], next[next.length - 1]]);
            } else {
                variants.push(['', next[next.length - 1]]);
            }
        }

        return variants;
    }
};
