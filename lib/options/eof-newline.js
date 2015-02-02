module.exports = {
    name: 'eof-newline',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true, false] },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        if (node.type === 'stylesheet') {
            var lastChild = node.content[node.content.length - 1];
            if (lastChild.type !== 'space') {
                lastChild = { type: 'space', content: '' };
                node.content.push(lastChild);
            }
            lastChild.content = lastChild.content.replace(/\n$/, '');
            if (this.getValue('eof-newline')) lastChild.content += '\n';
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType === 'stylesheet') {
            if (node[node.length - 1][0] === 's' && node[node.length - 1][1].indexOf('\n') !== -1) {
                return true;
            } else {
                return false;
            }
        }
    }
};
