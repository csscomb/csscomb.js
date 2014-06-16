module.exports = {
    name: 'always-semicolon',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true] },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 'block') {
            for (var i = node.length; i--;) {
                var currentNode = node[i];
                var currentNodeType = currentNode[0];
                var nodeWithoutSemicolon;

                // Skip nodes that already have `;` at the end:
                if (currentNodeType === 'declDelim') break;

                // Add semicolon only after declarations and includes.
                // If current node is include, insert semicolon right into it.
                // If it's declaration, look for value node:
                if (currentNodeType === 'include') {
                    nodeWithoutSemicolon = currentNode;
                } else if (currentNodeType === 'declaration') {
                    for (var k = currentNode.length; k--;) {
                        if (currentNode[k][0] === 'value') {
                            nodeWithoutSemicolon = currentNode[k];
                            break;
                        }
                    }
                } else {
                    continue;
                }

                var space = [];
                var isBlock = false;

                // Check if there are spaces and comments at the end of the node:
                for (var j = nodeWithoutSemicolon.length; j--;) {
                    var lastNode = nodeWithoutSemicolon[j][0];
                    // If the node's last child is block, do not add semicolon:
                    // TODO: Add syntax check and run the code only for scss
                    if (lastNode === 'block') {
                        isBlock = true;
                        break;
                    } else if (['s', 'commentML', 'commentSL'].indexOf(lastNode) === -1) break;

                    space.unshift(nodeWithoutSemicolon[j]);
                }

                if (isBlock) break;

                // Temporarily remove last spaces and comments and insert `;`
                // before them:
                nodeWithoutSemicolon.splice(nodeWithoutSemicolon.length - space.length);
                node.splice.apply(node, [i + 1, 0, ['declDelim']].concat(space));
                break;
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
        if (nodeType === 'block') {
            for (var i = node.length; i--;) {
                var nodeItem = node[i];
                var type = nodeItem[0];
                if (type === 'declDelim') return true;

                if (type === 'declaration') return false;
            }
        }
    }
};
