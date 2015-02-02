module.exports = (function() {
    function processStylesheetContent(node) {
        removeEmptyRulesets(node);
        mergeAdjacentWhitespace(node);
    }

    function removeEmptyRulesets(stylesheet) {
        var i = stylesheet.content.length;
        // Loop through node and try to find a ruleset:
        while (i--) {
            var node = stylesheet.content[i];
            if (!isRuleset(node)) continue;
            // If a ruleset is found, try to find its nested rulesets and remove
            // all empty ones:
            var j = node.content.length;
            while (j--) {
                // Nested rulesets are located inside blocks, that's why look
                // for blocks only:
                var blockNode = node.content[j];
                if (blockNode.type !== 'block') continue;
                processStylesheetContent(blockNode);
                node.content[j] = blockNode;
            }
            // If after removing all empty nested rulesets the parent has also
            // become empty, remove it too:
            if (isEmptyRuleset(node)) {
                stylesheet.content.splice(i, 1);
            }
        }
    }

    /**
     * Removing ruleset nodes from tree may result in two adjacent whitespace nodes which is not correct AST:
     * [space, ruleset, space] => [space, space]
     * To ensure correctness of further processing we should merge such nodes into one.
     * [space, space] => [space]
     */
    function mergeAdjacentWhitespace(node) {
        var i = node.content.length - 1;
        while (i-- > 0) {
            if (isWhitespace(node.content[i]) && isWhitespace(node.content[i + 1])) {
                node.content[i].content += node.content[i + 1].content;
                node.content.splice(i + 1, 1);
            }
        }
    }

    function isEmptyRuleset(ruleset) {
        return isEmptyBlock(ruleset.first('block'));
    }

    /**
     * Block is considered empty when it has nothing but spaces.
     */
    function isEmptyBlock(node) {
        if (!node.content.length) return true;

        var isEmpty = true;
        node.forEach(function(childNode) {
            if (childNode.type !== 'space') isEmpty = false;
        });
        return isEmpty;
    }

    function isRuleset(node) {
        return node.type === 'ruleset';
    }

    function isWhitespace(node) {
        return node.type === 'space';
    }


    return {
        name: 'remove-empty-rulesets',

        runBefore: 'block-indent',

        syntax: ['css', 'less', 'sass', 'scss'],

        accepts: { boolean: [true] },

        /**
         * Remove rulesets with no declarations.
         *
         * @param {String} node
         */
        process: function(node) {
            if (node.type === 'stylesheet') {
                processStylesheetContent(node);
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
