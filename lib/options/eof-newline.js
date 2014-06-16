module.exports = {
    name: 'eof-newline',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true, false] },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 'stylesheet') {
            var lastChild = node[node.length - 1];
            if (lastChild[0] !== 's') {
                lastChild = ['s', ''];
                node.push(lastChild);
            }
            lastChild[1] = lastChild[1].replace(/\n$/, '');
            if (this.getValue('eof-newline')) lastChild[1] += '\n';
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
