module.exports = (function() {
    function getLastWhitespaceNode(node, popInfo) {
        var index = (popInfo) ? node.length - 2 : node.length - 1;
        var lastNode = node[index];

        if (typeof lastNode !== 'object' || lastNode[0] === 'block') return null;
        if (lastNode[0] === 's') return lastNode;

        return getLastWhitespaceNode(lastNode, popInfo);
    }

    return {
        name: 'space-before-closing-brace',

        runBefore: 'tab-size',

        syntax: ['css', 'less', 'scss'],

        accepts: {
            number: true,
            string: /^[ \t\n]*$/
        },

        /**
         * Processes tree node.
         * @param {String} nodeType
         * @param {node} node
         * @param {Number} level
         */
        process: function(nodeType, node, level) {
            if (nodeType !== 'block' && nodeType !== 'atrulers') return;

            var value = this.getValue('space-before-closing-brace');

            // If found block node stop at the next one for space check
            // For the pre-block node, find its last (the deepest) child
            var whitespaceNode = getLastWhitespaceNode(node);

            if (value.indexOf('\n') > -1) {
                var blockIndent = this.getValue('block-indent');
                // TODO: Check that it works for '' block indent value <tg>
                if (blockIndent) value += new Array(level + 1).join(blockIndent);
            }

            // If it's spaces, modify this node
            // If it's something different from spaces, add a space node to the end

            if (whitespaceNode) {
                whitespaceNode[1] = value;
            } else if (value !== '') {
                node.push(['s', value]);
            }
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
            for (var i = node.length - 2; i >= 0; i--) {
                // If found block node stop for space check:
                if (node[i][0] !== 'block' && node[i][0] !== 'atrulers') continue;
                // For the block node, find its last (the deepest) child
                var whitespaceNode = getLastWhitespaceNode(node[i], true);

                if (whitespaceNode) {
                    variants.push([whitespaceNode[1], whitespaceNode[whitespaceNode.length - 1]]);
                } else {
                    // TODO: not actual place of closing brace
                    variants.push(['', node[i][node[i].length - 1]]);
                }
            }

            return variants;
        }
    };
})();

