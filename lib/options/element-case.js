module.exports = {
    name: 'element-case',

    accepts: { string: /^lower|upper$/ },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 'simpleselector') {
            for (var i = node.length; i--;) {
                var nodeItem = node[i];
                if (nodeItem[0] === 'ident') {
                    if (this.getValue('element-case') === 'lower') {
                        nodeItem[1] = nodeItem[1].toLowerCase();
                    } else {
                        nodeItem[1] = nodeItem[1].toUpperCase();
                    }
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
