module.exports = (function() {
    function processNode(node) {
        removeEmptyRulesets(node);
        mergeAdjacentWhitespace(node);
    }

    function removeEmptyRulesets(stylesheet) {
        stylesheet.forEach('ruleset', function(ruleset, i) {
            var block = ruleset.first('block');
            processNode(block);
            if (isEmptyBlock(block)) stylesheet.remove(i);
        });
    }

    /**
     * Removing ruleset nodes from tree may result in two adjacent whitespace
     * nodes which is not correct AST:
     * [space, ruleset, space] => [space, space]
     * To ensure correctness of further processing we should merge such nodes
     * into one:
     * [space, space] => [space]
     */
    function mergeAdjacentWhitespace(node) {
        var i = node.content.length - 1;
        while (i-- > 0) {
            if (node.get(i).is('space') && node.get(i + 1).is('space')) {
                node.get(i).content += node.get(i + 1).content;
                node.remove(i + 1);
            }
        }
    }

    /**
     * Block is considered empty when it has nothing but spaces.
     */
    function isEmptyBlock(node) {
        if (!node.length) return true;

        return !node.content.some(function(node) {
            return !node.is('space');
        });
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
            if (!node.is('stylesheet')) return;

            processNode(node);
        },

        detectDefault: true,

        /**
         * Detects the value of an option at the tree node.
         * This option is treated as `true` by default, but any trailing space would invalidate it.
         *
         * @param {node} node
         */
        detect: function(node) {
            if (!node.is('atrulers') && !node.is('block')) return;

            if (node.length === 0 ||
               (node.length === 1 && node.first().is('space'))) {
                return false;
            }
        }
    };
})();
