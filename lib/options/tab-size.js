module.exports = {
    name: 'tab-size',

    runBefore: 'vendor-prefix-align',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { number: true },

    /**
     * Processes tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType !== 's') return;
        node[0] = node[0].replace(/\t/, this.getValue('tab-size'));
    }
};
