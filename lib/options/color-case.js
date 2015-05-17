module.exports = {
    name: 'color-case',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { string: /^lower|upper$/ },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        if (!node.is('color')) return;

        node.content = this.getValue('color-case') === 'lower' ?
            node.content.toLowerCase() :
            node.content.toUpperCase();
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} node
     */
    detect: function(node) {
        if (!node.is('color')) return;

        if (node.content.match(/^[^A-F]*[a-f][^A-F]*$/)) {
            return 'lower';
        } else if (node.content.match(/^[^a-f]*[A-F][^a-f]*$/)) {
            return 'upper';
        }
    }
};
