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
     * @param {node} ast
     */
    process: function(ast) {
        let value = this.value;

        ast.traverse('selector', function(selector) {
            selector.forEach(function(simpleSelector) {
                var notFirst = false;

                simpleSelector.forEach(function(n, i) {
                    if (!n.is('space') && !n.is('combinator')) notFirst = true;

                    // If combinator is the first thing in selector,
                    // do not add extra spaces:
                    if (!n.is('combinator') || !notFirst) return;

                    if (simpleSelector.get(i - 1).is('space')) {
                        simpleSelector.get(i - 1).content = value;
                    } else {
                        var space = gonzales.createNode({ type: 'space', content: value });
                        simpleSelector.insert(i, space);
                    }
                });
            });
        });
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} ast
     */
    detect: function(ast) {
        let detected = [];

        ast.traverse('selector', function(selector) {
            selector.forEach(function(simpleSelector) {
                simpleSelector.forEach('combinator', function(combinator, i) {
                    if (simpleSelector.get(i - 1).is('space')) {
                        detected.push(simpleSelector.get(i - 1).content);
                    } else {
                        detected.push('');
                    }
                });
            });
        });

        return detected;
    }
};

