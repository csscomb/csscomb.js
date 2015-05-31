module.exports = {
    name: 'element-case',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { string: /^lower|upper$/ },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        if (!node.is('selector') &&
            !node.is('arguments')) return;

        var value = this.getValue('element-case');

        node.forEach('simpleSelector', function(selector) {
            selector.forEach('ident', function(ident) {
                ident.content = value === 'lower' ?
                    ident.content.toLowerCase() :
                    ident.content.toUpperCase();
            });
        });
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} node
     */
    detect: function(node) {
        if (!node.is('selector') &&
            !node.is('arguments')) return;

        var variants = [];

        node.forEach('simpleSelector', function(selector) {
            selector.forEach('ident', function(ident) {
                if (ident.content.match(/^[a-z]+$/)) {
                    variants.push('lower');
                } else if (ident.content.match(/^[A-Z]+$/)) {
                    variants.push('upper');
                }
            });
        });
        return variants;
    }
};
