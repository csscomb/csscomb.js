module.exports = {
    name: 'leading-zero',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true, false] },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        if (node.type === 'number') {
            if (this.getValue('leading-zero')) {
                if (node.content[0] === '.')
                    node.content = '0' + node.content;
            } else {
                node.content = node.content.replace(/^0+(?=\.)/, '');
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
        if (nodeType === 'number') {
            if (node.toString().match(/^\.[0-9]+/)) {
                return false;
            } else if (node.toString().match(/^0\.[0-9]+/)) {
                return true;
            }
        }
    }
};
