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
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType !== 'simpleselector') return;

        var variants = [];
        for (var i = node.length; i--;) {
            var nodeItem = node[i];
            if (nodeItem[0] !== 'ident') continue;
            if (nodeItem[1].match(/^[a-z]+$/)) {
                variants.push('lower');
            } else if (nodeItem[1].match(/^[A-Z]+$/)) {
                variants.push('upper');
            }
        }
        return variants;
    }
};
