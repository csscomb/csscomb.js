module.exports = (function() {
    var syntax;
    var value;

    function processNode(node, level) {
        level = level || 0;

        for (var i = 0; i < node.length; i++) {
            var n = node.get(i);
            if (!n) continue;

            if (syntax === 'sass' && n.is('block')) {
                processSassBlock(n, level, value);
            }

            // Continue only with space nodes inside {...}:
            if (syntax !== 'sass' && level !== 0 && n.is('space')) {
                processSpaceNode(n, level, value);
            }

            if (n.is('block') || n.is('atrulers')) level++;

            processNode(n, level);
        }
    }

    function processSassBlock(node, level, value) {
        var spaces;
        var whitespaceNode;
        var i;

        for (i = node.length; i--;) {
            whitespaceNode = node.get(i);

            if (!whitespaceNode.is('space')) continue;

            if (whitespaceNode.content === '\n') continue;

            spaces = whitespaceNode.content.replace(/[ \t]/gm, '');
            spaces += new Array(level + 2).join(value);
            whitespaceNode.content = spaces;
        }
    }

    function processSpaceNode(node, level, value) {
        var spaces;

        // Remove all whitespaces and tabs, leave only new lines:
        spaces = node.content.replace(/[ \t]/gm, '');

        if (!spaces) return;

        spaces += new Array(level + 1).join(value);
        node.content = spaces;
    }

    return {
        name: 'block-indent',

        runBefore: 'sort-order',

        syntax: ['css', 'less', 'sass', 'scss'],

        accepts: {
            number: true,
            string: /^[ \t]*$/
        },

        /**
         * Processes tree node.
         *
         * @param {node} node
         */
        process: function process(node) {
            var spaces;
            var whitespaceNode;
            var i;

            if (!node.is('stylesheet')) return;

            syntax = this.getSyntax();
            value = this.getValue('block-indent');


            for (i = node.length; i--;) {
                whitespaceNode = node.get(i);

                if (!whitespaceNode.is('space')) continue;

                spaces = whitespaceNode.content.replace(/\n[ \t]+/gm, '\n');

                if (spaces === '') {
                    node.remove(i);
                } else {
                    whitespaceNode.content = spaces;
                }
            }

            processNode(node);
        },

        /**
         * Detects the value of an option at the tree node.
         *
         * @param {String} nodeType
         * @param {node} node
         * @param {Number} level
         */
        detect: function(nodeType, node, level) {
            var result = [];

            // Continue only with non-empty {...} blocks:
            if (nodeType !== 'atrulers' && nodeType !== 'block' || !node.length) return;

            for (var i = node.length; i--;) {
                var whitespaceNode = node[i];
                if (whitespaceNode[0] !== 's') continue;

                var spaces = whitespaceNode[1];
                var lastIndex = spaces.lastIndexOf('\n');

                // Do not continue if there is no line break:
                if (lastIndex < 0) continue;

                // Number of spaces from beginning of line:
                var spacesLength = spaces.slice(lastIndex + 1).length;
                var arrayLength = Math.floor(spacesLength / (level + 1)) + 1;
                result.push(new Array(arrayLength).join(' '));
            }

            return result;
        }
    };
})();
