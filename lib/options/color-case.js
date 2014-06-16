module.exports = {
    name: 'color-case',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { string: /^lower|upper$/ },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        var value = this.getValue('color-case');
        if (nodeType === 'vhash') {
            if (value === 'lower') {
                node[0] = node[0].toLowerCase();
            } else if (value === 'upper') {
                node[0] = node[0].toUpperCase();
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
            if (node[0].match(/^[^A-F]*[a-f][^A-F]*$/)) {
                return 'lower';
            } else if (node[0].match(/^[^a-f]*[A-F][^a-f]*$/)) {
                return 'upper';
            }
        }
    }
};
