var gonzales = require('gonzales-pe');

module.exports = {
    name: 'space-before-combinator',

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

        var value = this.getValue('space-before-combinator');

        node.forEach(function(simpleSelector) {
            simpleSelector.forEach('combinator', function(combinator, i) {
                if (simpleSelector.get(i - 1).is('space')) {
                    simpleSelector.get(i - 1).content = value;
                } else {
                    var space = gonzales.createNode({ type: 'space', content: value });
                    simpleSelector.insert(i, space);
                }
            });
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
            var subSelector = node[i];
            for (var j = subSelector.length; j--;) {
                if (subSelector[j][0] !== 'combinator') continue;

                if (subSelector[j - 1][0] === 's') {
                    variants.push(subSelector[j - 1][1]);
                } else {
                    variants.push('');
                }
            }
        }

        return variants;
    }
};

