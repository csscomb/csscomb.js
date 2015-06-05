module.exports = {
    name: 'element-case',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: {
        string: /^lower|upper$/
    },

    /**
     * Processes tree node.
     * @param {node} ast
     */
    process: function(ast) {
        let value = this.value;

        ast.traverse(function(node) {
            if (!node.is('selector') && !node.is('arguments')) return;

            node.forEach('simpleSelector', function(selector) {
                selector.forEach('ident', function(ident) {
                    ident.content = value === 'lower' ?
                        ident.content.toLowerCase() :
                        ident.content.toUpperCase();
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

        ast.traverse(function(node) {
            if (!node.is('selector') && !node.is('arguments')) return;

            node.forEach('simpleSelector', function(selector) {
                selector.forEach('ident', function(ident) {
                    if (ident.content.match(/^[a-z]+$/)) {
                        detected.push('lower');
                    } else if (ident.content.match(/^[A-Z]+$/)) {
                        detected.push('upper');
                    }
                });
            });
        });

        return detected;
    }
};
