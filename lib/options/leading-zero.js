module.exports = {
    name: 'leading-zero',

    accepts: { boolean: true },

    /**
     * Processes tree node.
     * @param {Boolean} value
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(value, nodeType, node) {
        if (nodeType === 'number') {
            if (value) {
                if (node[0][0] === '.')
                    node[0] = '0' + node[0];
            } else {
                node[0] = node[0].replace(/^0+(?=\.)/, '');
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
