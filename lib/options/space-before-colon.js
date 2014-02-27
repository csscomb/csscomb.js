module.exports = {
    name: 'space-before-colon',

    accepts: {
        number: true,
        string: /^[ \t\n]*$/
    },

    /**
     * Processes tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType !== 'property') return;

        var value = this.getValue('space-before-colon');

        if (node[node.length - 1][0] === 's') node.pop();
        if (value !== '') node.push(['s', value]);
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType !== 'property') return;

        var lastNode = node[node.length - 1];
        if (lastNode[0] === 's') {
            return lastNode[1];
        } else {
            return '';
        }
    }
};
