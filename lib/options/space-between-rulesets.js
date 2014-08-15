module.exports = (function() {
    function getRulesetEnd(node, i) {
        for (;i < node.length; i++) {
            if (!node[i + 1]) {
                return null;
            } else if (node[i + 1][0] === 's') {
                if (node[i + 1][1].indexOf('\n') > -1) {
                    if (node[i + 2] && node[i + 2][0] === 'ruleset') {
                        return i;
                    } else {
                        return null;
                    }
                } else if (node[i + 2] && node[i + 2][0] === 'commentML') {
                    if (node[i + 3] && node[i + 3][0] === 'ruleset') {
                        return i + 2;
                    } else if (node[i + 3] && node[i + 3][0] === 's') {
                        if (node[i + 4] && node[i + 4][0] === 'ruleset') {
                            return i + 2;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } else if (node[i + 2] && node[i + 2][0] === 'ruleset') {
                    return i;
                }
            } else if (node[i + 1][0] === 'ruleset') {
                return i;
            } else if (node[i + 1][0] === 'commentML') {
                if (node[i + 2] && node[i + 2][0] === 'ruleset') {
                    return i + 1;
                } else if (node[i + 2] && node[i + 2][0] === 's') {
                    if (node[i + 3] && node[i + 3][0] === 'ruleset') {
                        return i + 1;
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }

    return {
        name: 'space-between-rulesets',

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
            var value = this.getValue('space-between-rulesets');

            // TODO: Limit nodes to blocks, stylesheet, etc.

            for (var i = 0, l = node.length; i < l; i++) {
                var currentNode = node[i];

                if (currentNode[0] !== 'ruleset') continue;

                // Grom user's point of view "declaration" includes semicolons
                // and comments placed on the same line.
                // So group those things together:
                var rulesetEnd = getRulesetEnd(node, i);
                if (rulesetEnd === null) {
                    continue;
                } else {
                    i = rulesetEnd;
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

