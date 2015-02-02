var gonzales = require('gonzales-pe');

module.exports = (function() {
    var value;
    var blockIndent;

    function getLastWhitespaceNode(node) {
        var lastNode = node.last();

        if (!lastNode || !lastNode.content) return null;

        if (lastNode.is('block')) return null;
        if (lastNode.is('space')) return lastNode;

        return getLastWhitespaceNode(lastNode);
    }

    function processBlock(x, level) {
        level = level || 0;

        x.forEach(function(node) {
            if (!node.is('block') &&
                !node.is('atrulers')) return processBlock(node, level);

            level++;

            if (value.indexOf('\n') > -1) {
                // TODO: Check that it works for '' block indent value <tg>
                if (blockIndent) value += new Array(level).join(blockIndent);
            }

            // If found block node stop at the next one for space check
            // For the pre-block node, find its last (the deepest) child
            var whitespaceNode = getLastWhitespaceNode(node);

            // If it's spaces, modify this node
            // If it's something different from spaces, add a space node to the end
            if (whitespaceNode) {
                whitespaceNode.content = value;
            } else if (value !== '') {
                var space = gonzales.createNode({ type: 'space', content: value });
                node.content.push(space);
            }

            processBlock(node, level);
        });
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
         * @param {node} node
         */
        process: function(node) {
            value = this.getValue('space-before-closing-brace');
            blockIndent = this.getValue('block-indent');

            if (!node.is('stylesheet')) return;

            processBlock(node);
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
            for (var i = node.length; i--;) {
                // If found block node stop for space check:
                if (node[i][0] !== 'block' && node[i][0] !== 'atrulers') continue;

                // For the block node, find its last (the deepest) child
                var whitespaceNode = getLastWhitespaceNode(node[i]);

                if (whitespaceNode) {
                    variants.push(whitespaceNode[1]);
                } else {
                    variants.push('');
                }
            }

            return variants;
        }
    };
})();

