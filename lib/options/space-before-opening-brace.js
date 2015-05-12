var gonzales = require('gonzales-pe');

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
        if (node.is('space')) return node;

        return getLastWhitespaceNode(node.last());
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
         * @param {node} node
         */
        process: function(node) {
            var value = this.getValue('space-before-opening-brace');

            node.forEach(function(block, i) {
                // XXX: Hack for braces
                if (typeof block === 'string') return;

                // If found block node stop at the next one for space check:
                if (!block.is('block') && !block.is('atrulers')) return;

                // For the pre-block node, find its last (the deepest) child:
                // TODO: Exclude nodes with braces (for example, arguments)
                var previousNode = node.get(i - 1);
                var whitespaceNode = getLastWhitespaceNode(previousNode);

                // If it's spaces, modify this node.
                // If it's something different from spaces, add a space node to
                // the end:
                if (whitespaceNode) {
                    whitespaceNode.content = value;
                } else if (value !== '') {
                    var space = gonzales.createNode({ type: 'space', content: value });
                    if (previousNode && previousNode.is('atrulerq')) {
                        previousNode.content.push(space);
                    } else {
                        node.insert(i, space);
                    }
                }
            });
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
