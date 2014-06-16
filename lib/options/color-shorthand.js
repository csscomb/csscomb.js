module.exports = {
    name: 'color-shorthand',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true, false] },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 'vhash') {
            if (this.getValue('color-shorthand')) {
                node[0] = node[0].replace(/(\w)\1(\w)\2(\w)\3/i, '$1$2$3');
            } else {
                node[0] = node[0].replace(/^(\w)(\w)(\w)$/, '$1$1$2$2$3$3');
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
        if (nodeType === 'vhash') {
            if (node[0].match(/^\w{3}$/)) {
                return true;
            } else if (node[0].match(/^(\w)\1(\w)\2(\w)\3$/)) {
                return false;
            }
        }
    }
};
