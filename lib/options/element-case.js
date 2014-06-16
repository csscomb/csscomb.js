module.exports = {
    name: 'element-case',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { string: /^lower|upper$/ },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType !== 'selector' &&
            nodeType !== 'arguments') return;

        for (var x = node.length; x--;) {
            var selector = node[x];
            if (selector[0] !== 'simpleselector') continue;

            for (var i = selector.length; i--;) {
                var simpleselector = selector[i];
                if (!Array.isArray(simpleselector) ||
                    simpleselector[0] !== 'ident') continue;

                simpleselector[1] = this.getValue('element-case') === 'lower' ?
                    simpleselector[1].toLowerCase() :
                    simpleselector[1].toUpperCase();
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
