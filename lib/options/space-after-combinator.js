var gonzales = require('gonzales-pe');

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
     * @param {node} node
     */
    process: function(node) {
        if (!node.is('selector')) return;

        var value = this.getValue('space-after-combinator');

        node.forEach('simpleSelector', function(simpleSelector) {
            simpleSelector.forEach('combinator', function(combinator, i) {
                if (simpleSelector.get(i + 1).is('space')) {
                    simpleSelector.get(i + 1).content = value;
                } else {
                    var space = gonzales.createNode({ type: 'space', content: value });
                    simpleSelector.insert(i + 1, space);
                }
            });
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

        node.forEach('simpleSelector', function(simpleSelector) {
            simpleSelector.forEach('combinator', function(combinator, i) {
                if (simpleSelector.get(i + 1).is('space')) {
                    variants.push(simpleSelector.get(i + 1).content);
                } else {
                    variants.push('');
                }
            });
        });

        return variants;
    }
};

