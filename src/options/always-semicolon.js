var gonzales = require('gonzales-pe');

module.exports = {
    name: 'always-semicolon',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: {
        boolean: [true]
    },

    /**
     * Processes tree node.
     * @param {node} ast
     * @return {Array} List of errors
     */
    lint: function(ast) {
        var errors = [];

        ast.traverse('block', function(block) {
            block.eachFor(function(currentNode) {
                var nodeWithoutSemicolon;
                // Skip nodes that already have `;` at the end:
                if (currentNode.is('declarationDelimiter')) return null;

                // Add semicolon only after declarations and includes.
                // If current node is include, insert semicolon right into it.
                // If it's declaration, look for value node:
                if (currentNode.is('include') ||
                    currentNode.is('extend')) {
                    nodeWithoutSemicolon = currentNode;
                } else if (currentNode.is('declaration')) {
                    nodeWithoutSemicolon = currentNode.last('value');
                } else {
                    return;
                }

                errors.push({
                    message: 'Missing semicolon',
                    line: nodeWithoutSemicolon.end.line,
                    column: nodeWithoutSemicolon.end.column
                });

                // Stop looping through block's children:
                return null;
            });
        });

        return errors;
    },


    /**
     * Processes tree node.
     * @param {node} ast
     */
    process: function(ast) {
        var nodeWithoutSemicolon;

        ast.traverse('block', function(block) {
            block.eachFor(function(currentNode) {
                // Skip nodes that already have `;` at the end:
                if (currentNode.is('declarationDelimiter')) return null;

                // Add semicolon only after declarations and includes.
                // If current node is include, insert semicolon right into it.
                // If it's declaration, look for value node:
                if (currentNode.is('include') ||
                    currentNode.is('extend')) {
                    nodeWithoutSemicolon = currentNode;
                } else if (currentNode.is('declaration')) {
                    nodeWithoutSemicolon = currentNode.last('value');
                } else {
                    return;
                }

                // Check if there are spaces and comments at the end of the node
                for (var j = nodeWithoutSemicolon.length; j--;) {
                    var lastNode = nodeWithoutSemicolon.get(j);

                    // If the node's last child is block, do not add semicolon:
                    // TODO: Add syntax check and run the code only for scss
                    if (lastNode.is('block')) {
                        return null;
                    } else if (!lastNode.is('space') &&
                               !lastNode.is('multilineComment') &&
                               !lastNode.is('singlelineComment')) {
                        j++;
                        break;
                    }
                }

                var declDelim = gonzales.createNode({
                    type: 'declarationDelimiter',
                    content: ';'
                });
                nodeWithoutSemicolon.insert(j, declDelim);
                return null;
            });
        });
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} ast
     * @return {Array} List of detected values
     */
    detect: function(ast) {
        var detected = [];

        ast.traverse('block', function(block) {
            block.eachFor(function(node) {
                if (node.is('declarationDelimiter')) {
                    detected.push(true);
                    return null;
                } else if (node.is('declaration')) {
                    detected.push(false);
                    return null;
                }
            });
        });

        return detected;
    }
};
