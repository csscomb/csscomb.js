module.exports = {
    name: 'color-case',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { string: /^lower|upper$/ },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        var value = this.getValue('color-case');
        if (node.type === 'color') {
            if (value === 'lower') {
                node.content = node.content.toLowerCase();
            } else if (value === 'upper') {
                node.content = node.content.toUpperCase();
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
            if (node.content[0].match(/^[^A-F]*[a-f][^A-F]*$/)) {
                return 'lower';
            } else if (node.content[0].match(/^[^a-f]*[A-F][^a-f]*$/)) {
                return 'upper';
            }
        }
    }
};
