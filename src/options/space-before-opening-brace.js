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
         * @param {node} ast
         */
        process: function(ast) {
            let value = this.value;

            ast.traverse(function(block, i, parent) {
                // If found block node stop at the next one for space check:
                if (!block.is('block') && !block.is('atrulers')) return;

                // For the pre-block node, find its last (the deepest) child:
                // TODO: Exclude nodes with braces (for example, arguments)
                var previousNode = parent.get(i - 1);
                var whitespaceNode = getLastWhitespaceNode(previousNode);

                // If it's spaces, modify this node.
                // If it's something different from spaces, add a space node to
                // the end:
                if (whitespaceNode) {
                    whitespaceNode.content = value;
                } else if (value !== '') {
                    var space = gonzales.createNode({
                        type: 'space',
                        content: value
                    });
                    if (previousNode && previousNode.is('atrulerq')) {
                        previousNode.content.push(space);
                    } else {
                        parent.insert(i, space);
                    }
                }
            });
        },

        /**
         * Detects the value of an option at the tree node.
         *
         * @param {node} ast
         */
        detect: function(ast) {
            var detected = [];

            ast.traverse(function(block, i, parent) {
                // If found block node stop at the next one for space check:
                if (!block.is('block') && !block.is('atrulers')) return;

                // For the pre-block node, find its last (the deepest) child:
                // TODO: Exclude nodes with braces (for example, arguments)
                var previousNode = parent.get(i - 1);
                var whitespaceNode = getLastWhitespaceNode(previousNode);

                // If it's spaces, modify this node.
                // If it's something different from spaces, add a space node to
                // the end:
                if (whitespaceNode) {
                    detected.push(whitespaceNode.content);
                } else {
                    detected.push('');
                }
            });

            return detected;
        }
    };
})();
