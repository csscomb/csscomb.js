module.exports = {
    name: 'tab-size',

    runBefore: 'vendor-prefix-align',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { number: true },

    /**
     * Processes tree node.
     *
     * @param {node} node
     */
    process: function(node) {
        if (!node.is('space')) return;
        node.content = node.content.replace(/\t/, this.getValue('tab-size'));
    }
};
