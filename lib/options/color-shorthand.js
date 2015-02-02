module.exports = {
    name: 'color-shorthand',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true, false] },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        if (node.type === 'color') {
            if (this.getValue('color-shorthand')) {
                node.content = node.content.replace(/(\w)\1(\w)\2(\w)\3/i, '$1$2$3');
            } else {
                node.content = node.content.replace(/^(\w)(\w)(\w)$/, '$1$1$2$2$3$3');
            }
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} node
     */
    detect: function(node) {
        if (node.type === 'vhash') {
            if (node.content[0].match(/^\w{3}$/)) {
                return true;
            } else if (node.content[0].match(/^(\w)\1(\w)\2(\w)\3$/)) {
                return false;
            }
        }
    }
};
