var gonzales = require('gonzales-pe');

module.exports = {
    name: 'space-before-colon',

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
     * @param {String} syntax
     */
    process: function(ast, syntax) {
        let value = this.value;

        ast.traverse('declaration', function(declaration) {
            declaration.forEach('propertyDelimiter', function(delimiter, i) {
                if (syntax === 'sass' && !declaration.get(i - 1)) return;

                // Remove any spaces before colon:
                if (declaration.get(i - 1).is('space')) {
                    declaration.remove(--i);
                }

                // If the value set in config is not empty, add spaces:
                if (value !== '') {
                    var space = gonzales.createNode({ type: 'space', content: value });
                    declaration.insert(i, space);
                }
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

        ast.traverse('declaration', function(declaration) {
            declaration.forEach('propertyDelimiter', function(delimiter, i) {
                if (declaration.get(i - 1).is('space')) {
                    detected.push(declaration.get(i - 1).content);
                } else {
                    detected.push('');
                }
            });
        });

        return detected;
    }
};
