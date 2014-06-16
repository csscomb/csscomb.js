module.exports = {
    name: 'quotes',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { string: /^single|double$/ },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        var value = this.getValue('quotes');
        if (nodeType === 'string') {
            if (node[0][0] === '"' && value === 'single') {
                node[0] = node[0]
                    .replace(/\\"/g, '"') // unescape all escaped double quotes
                    .replace(/([^\\])'/g, '$1\\\'') // escape all the single quotes
                    .replace(/^"|"$/g, '\''); // replace the first and the last quote

            } else if (node[0][0] === '\'' && value === 'double') {
                node[0] = node[0]
                    .replace(/\\'/g, '\'') // unescape all escaped single quotes
                    .replace(/([^\\])"/g, '$1\\\"') // escape all the double quotes
                    .replace(/^'|'$/g, '"'); // replace the first and the last quote
            }
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType === 'string') {
            if (node[0][0] === '"') {
                return 'double';
            } else if (node[0][0] === '\'') {
                return 'single';
            }
        }
    }
};
