module.exports = {
    name: 'space-after-combinator',

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

        var value = this.getValue('space-after-combinator');

        for (var i = node.length; i--;) {
            var subSelector = node[i];
            for (var j = subSelector.length; j--;) {
                if (subSelector[j][0] !== 'combinator') continue;

                if (subSelector[j + 1][0] === 's') {
                    subSelector[j + 1][1] = value;
                } else {
                    subSelector.splice(j + 1, 0, ['s', value]);
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

        for (var i = node.length - 2; i >= 0; i--) {
            var subSelector = node[i];
            for (var j = subSelector.length - 2; j >= 0; j--) {
                if (subSelector[j][0] !== 'combinator') continue;
                var next = subSelector[j + 1];
                if (next[0] === 's') {
                    variants.push([next[1], next[next.length - 1]]);
                } else {
                    variants.push(['', next[next.length - 1]]);
                }
            }
        }

        return variants;
    }
};

