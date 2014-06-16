module.exports = (function() {
    /**
     * Gets the last (the deepest) whitespace node.
     *
     * @param {node} node
     * @returns {node|undefined} If no whitespace node is found, returns
     * `undefined`
     */
    function getLastWhitespaceNode(node) {
        if (typeof node !== 'object') return;
        if (node[0] === 's') return node;

        return getLastWhitespaceNode(node[node.length - 1]);
    }

    return {
        name: 'space-before-opening-brace',

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
            var value = this.getValue('space-before-opening-brace');

            // Loop through node from the end to the beginning:
            for (var i = node.length; i--;) {
                // If found block node stop at the next one for space check:
                if (node[i][0] !== 'block' && node[i][0] !== 'atrulers') continue;

                // For the pre-block node, find its last (the deepest) child:
                // TODO: Exclude nodes with braces (for example, arguments)
                var whitespaceNode = getLastWhitespaceNode(node[i - 1]);

                // If it's spaces, modify this node.
                // If it's something different from spaces, add a space node to
                // the end:
                if (whitespaceNode) {
                    whitespaceNode[1] = value;
                } else if (value !== '') {
                    if (node[i - 1][0] === 'atrulerq') {
                        node[i - 1].push(['s', value]);
                    } else {
                        node.splice(i, 0, ['s', value]);
                    }
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
            var variants = [];

            // Loop through node from the end to the beginning:
            for (var i = node.length; i--;) {
                // If found block node stop at the next one for space check:
                if (node[i][0] !== 'block' && node[i][0] !== 'atrulers') continue;

                // For the pre-block node, find its last (the deepest) child
                var whitespaceNode = getLastWhitespaceNode(node[i - 1]);

                if (whitespaceNode) {
                    variants.push(whitespaceNode[1]);
                } else {
                    variants.push('');
                }
            }

            return variants;
        }
    };
})();
