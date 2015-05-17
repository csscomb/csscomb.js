var gonzales = require('gonzales-pe');

module.exports = {
    name: 'always-semicolon',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true] },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        var nodeWithoutSemicolon;

        if (!node.is('block')) return;

        mainLoop:
        for (var i = node.length; i--;) {
            var currentNode = node.get(i);

            // Skip nodes that already have `;` at the end:
            if (currentNode.is('declarationDelimiter')) break;

            // Add semicolon only after declarations and includes.
            // If current node is include, insert semicolon right into it.
            // If it's declaration, look for value node:
            if (currentNode.is('include')) {
                nodeWithoutSemicolon = currentNode;
            } else if (currentNode.is('declaration')) {
                nodeWithoutSemicolon = currentNode.last('value');
            } else {
                continue;
            }

            // Check if there are spaces and comments at the end of the node:
            for (var j = nodeWithoutSemicolon.length; j--; ) {
                var lastNode = nodeWithoutSemicolon.get(j);

                // If the node's last child is block, do not add semicolon:
                // TODO: Add syntax check and run the code only for scss
                if (lastNode.is('block')) {
                    break mainLoop;
                } else if (!lastNode.is('space') &&
                           !lastNode.is('multilineComment') &&
                           !lastNode.is('singlelineComment')) {
                    j++;
                    break;
                }
            }

            var declDelim = gonzales.createNode({ type: 'declarationDelimiter', content: ';' });
            nodeWithoutSemicolon.insert(j, declDelim);
            break;
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} node
     */
    detect: function(node) {
        if (!node.is('block')) return;

        for (var i = node.length; i--;) {
            var nodeItem = node.get(i);
            if (nodeItem.is('declarationDelimiter')) return true;
            if (nodeItem.is('declaration')) return false;
        }
    }
};
