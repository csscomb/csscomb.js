module.exports = {
    name: 'space-after-colon',

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
        if (nodeType !== 'value') return;

        var value = this.getValue('space-after-colon');

        // Remove any spaces after colon:
        if (node[0][0] === 's') node.shift();
        // If the value set in config is not empty, add spaces:
        if (value !== '') node.unshift(['s', value]);
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType !== 'value') return;

        if (node[0][0] === 's') {
            return node[0][1];
        } else {
            return '';
        }
    }
};
