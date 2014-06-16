module.exports = (function() {
    function processStylesheetContent(nodeContent) {
        removeEmptyRulesets(nodeContent);
        mergeAdjacentWhitespace(nodeContent);
    }

    function removeEmptyRulesets(nodeContent) {
        var i = nodeContent.length;
        // Loop through node and try to find a ruleset:
        while (i--) {
            var node = nodeContent[i];
            if (!isRuleset(node)) continue;
            // If a ruleset is found, try to find its nested rulesets and remove
            // all empty ones:
            var j = node.length;
            while (j--) {
                // Nested rulesets are located inside blocks, that's why look
                // for blocks only:
                var blockNode = node[j];
                if (blockNode[0] !== 'block') continue;
                blockNode.shift();
                processStylesheetContent(blockNode);
                blockNode.unshift('block');
                node[j] = blockNode;
            }
            // If after removing all empty nested rulesets the parent has also
            // become empty, remove it too:
            if (isEmptyRuleset(node)) {
                nodeContent.splice(i, 1);
            }
        }
    }

    /**
     * Removing ruleset nodes from tree may result in two adjacent whitespace nodes which is not correct AST:
     * [space, ruleset, space] => [space, space]
     * To ensure correctness of further processing we should merge such nodes into one.
     * [space, space] => [space]
     */
    function mergeAdjacentWhitespace(nodeContent) {
        var i = nodeContent.length - 1;
        while (i-- > 0) {
            if (isWhitespace(nodeContent[i]) && isWhitespace(nodeContent[i + 1])) {
                nodeContent[i][1] += nodeContent[i + 1][1];
                nodeContent.splice(i + 1, 1);
            }
        }
    }

    function isEmptyRuleset(ruleset) {
        return ruleset.filter(isBlock).every(isEmptyBlock, this);
    }

    /**
     * Block is considered empty when it has nothing but spaces.
     */
    function isEmptyBlock(node) {
        return node.length === 1 || !node.some(isNotWhitespace);
    }

    function isRuleset(node) {
        return node[0] === 'ruleset';
    }

    function isBlock(node) {
        return node[0] === 'block';
    }

    function isWhitespace(node) {
        return node[0] === 's';
    }

    function isNotWhitespace(node) {
        return typeof node === 'object' && node[0] !== 's';
    }

    return {
        name: 'remove-empty-rulesets',

        runBefore: 'block-indent',

        syntax: ['css', 'less', 'sass', 'scss'],

        accepts: { boolean: [true] },

        /**
         * Remove rulesets with no declarations.
         *
         * @param {String} nodeType
         * @param {Array} nodeContent
         */
        process: function(nodeType, nodeContent) {
            if (nodeType === 'stylesheet') {
                processStylesheetContent(nodeContent);
            }
        },

        /**
         * Detects the value of an option at the tree node.
         * This option is treated as `true` by default, but any trailing space would invalidate it.
         *
         * @param {String} nodeType
         * @param {node} node
         */
        detectDefault: true,

        detect: function(nodeType, node) {
            if (nodeType === 'atrulers' || nodeType === 'block') {
                if (node.length === 0 || (node.length === 1 && node[0][0] === 's')) {
                    return false;
                }
            }
        }
    };
})();
