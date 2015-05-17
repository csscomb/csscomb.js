var gonzales = require('gonzales-pe');

module.exports = {
    name: 'eof-newline',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true, false] },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        if (!node.is('stylesheet')) return;

        var lastChild = node.last();
        if (!lastChild.is('space')) {
            lastChild = gonzales.createNode({ type: 'space', content: '' });
            node.content.push(lastChild);
        }
        lastChild.content = lastChild.content.replace(/\n$/, '');
        if (this.getValue('eof-newline')) lastChild.content += '\n';
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} node
     */
    detect: function(node) {
        if (!node.is('stylesheet')) return;

        var lastChild = node.last();
        if (lastChild.is('space') && lastChild.content.indexOf('\n') !== -1) {
            return true;
        } else {
            return false;
        }
    }
};
