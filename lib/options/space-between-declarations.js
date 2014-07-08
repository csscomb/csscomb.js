module.exports = (function() {
    function getDeclarationEnd(node, i) {
        for (;i < node.length; i++) {
            if (!node[i + 1]) {
                return 0;
            } else if (node[i + 1][0] === 's') {
                if (node[i + 1][1].indexOf('\n') > -1) {
                    if (node[i + 2] && node[i + 2][0] === 'declaration') {
                        return i;
                    } else {
                        return 0;
                    }
                } else if (node[i + 2] && node[i + 2][0] === 'commentML') {
                    if (node[i + 3] && node[i + 3][0] === 'declaration') {
                        return i + 2;
                    } else if (node[i + 3] && node[i + 3][0] === 's') {
                        if (node[i + 4] && node[i + 4][0] === 'declaration') {
                            return i + 2;
                        } else {
                            return 0;
                        }
                    } else {
                        return 0;
                    }
                } else if (node[i + 2] && node[i + 2][0] === 'declaration') {
                    return i;
                }
            } else if (node[i + 1][0] === 'declaration') {
                return i;
            } else if (node[i + 1][0] === 'commentML') {
                if (node[i + 2] && node[i + 2][0] === 'declaration') {
                    return i + 1;
                } else if (node[i + 2] && node[i + 2][0] === 's') {
                    if (node[i + 3] && node[i + 3][0] === 'declaration') {
                        return i + 1;
                    }
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        }
    }

    return {
        name: 'space-between-declarations',

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
            var value = this.getValue('space-between-declarations');

            // TODO: Limit nodes to blocks, stylesheet, etc.

            for (var i = 0, l = node.length; i < l; i++) {
                var currentNode = node[i];

                if (currentNode[0] !== 'declDelim') continue;

                // Grom user's point of view "declaration" includes semicolons
                // and comments placed on the same line.
                // So group those things together:
                var declarationEnd = getDeclarationEnd(node, i);
                if (!declarationEnd) {
                    continue;
                } else {
                    i = declarationEnd;
                }

                var nextNode = node[i + 1];
                if (nextNode[0] === 's') {
                    nextNode[1] = value;
                } else {
                    i++;
                    l++;
                    node.splice(i, 0, ['s', value]);
                }
            }
        }
    };
})();
