module.exports = {
    name: 'quotes',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { string: /^single|double$/ },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        if (!node.is('string')) return;

        var value = this.getValue('quotes');

        if (node.content[0] === '"' && value === 'single') {
            node.content = node.content
                .replace(/\\"/g, '"') // unescape all escaped double quotes
                .replace(/([^\\])'/g, '$1\\\'') // escape all the single quotes
                .replace(/^"|"$/g, '\''); // replace the first and the last quote

        } else if (node.content[0] === '\'' && value === 'double') {
            node.content = node.content
                .replace(/\\'/g, '\'') // unescape all escaped single quotes
                .replace(/([^\\])"/g, '$1\\\"') // escape all the double quotes
                .replace(/^'|'$/g, '"'); // replace the first and the last quote
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} node
     */
    detect: function(node) {
        if (!node.is('string')) return;

        if (node.content[0] === '"') {
            return 'double';
        } else if (node.content[0] === '\'') {
            return 'single';
        }
    }
};
