module.exports = {
    name: 'element-case',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { string: /^lower|upper$/ },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        if (node.type !== 'selector' &&
            node.type !== 'arguments') return;

        for (var x = node.content.length; x--;) {
            var selector = node.content[x];
            if (selector.type !== 'simpleselector') continue;

            for (var i = selector.content.length; i--;) {
                var simpleselector = selector.content[i];
                if (!simpleselector ||
                    simpleselector.type !== 'ident') continue;

                simpleselector.content = this.getValue('element-case') === 'lower' ?
                    simpleselector.content.toLowerCase() :
                    simpleselector.content.toUpperCase();
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
