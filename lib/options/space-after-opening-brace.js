module.exports = {
    name: 'space-after-opening-brace',

    runBefore: 'block-indent',

    syntax: ['css', 'less', 'scss'],

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
        // If found block node stop at the next one for space check
        if (nodeType !== 'block' && nodeType !== 'atrulers') return;

        var value = this.getValue('space-after-opening-brace');

        if (node[0][0] === 's') {
            node[0][1] = value;
        } else if (value !== '') {
            node.unshift(['s', value]);
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType !== 'block' && nodeType !== 'atrulers') return;

        if (node[0][0] === 's') {
            return node[0][1];
        } else {
            return '';
        }
    }
};
