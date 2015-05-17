module.exports = {
    name: 'leading-zero',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true, false] },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        if (!node.is('number')) return;

        if (this.getValue('leading-zero')) {
            if (node.content[0] === '.')
                node.content = '0' + node.content;
        } else {
            node.content = node.content.replace(/^0+(?=\.)/, '');
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} node
     */
    detect: function(node) {
        if (!node.is('number')) return;

        if (node.content.match(/^\.[0-9]+/)) {
            return false;
        } else if (node.content.match(/^0\.[0-9]+/)) {
            return true;
        }
    }
};
