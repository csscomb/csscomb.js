module.exports = {
    name: 'space-after-colon',

    runBefore: 'block-indent',

    syntax: ['css', 'less', 'sass', 'scss'],

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
        if (nodeType !== 'declaration') return;

        var value = this.getValue('space-after-colon');

        for (var i = node.length; i--;) {
            if (node[i][0] !== 'propertyDelim') continue;

            if (this.getSyntax() === 'sass' && !node[i - 1]) break;

            // Remove any spaces after colon:
            if (node[i + 1][0] === 's') node.splice(i + 1, 1);
            // If the value set in config is not empty, add spaces:
            if (value !== '') node.splice(i + 1, 0, ['s', value]);

            break;
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType !== 'declaration') return;

        for (var i = node.length; i--;) {
            if (node[i][0] !== 'propertyDelim') continue;

            if (node[i + 1][0] === 's') {
                return node[i + 1][1];
            } else {
                return '';
            }
        }
    }
};
