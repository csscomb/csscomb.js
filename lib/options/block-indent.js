module.exports = (function() {
    function processStylesheet(node) {
        var spaces;
        var whitespaceNode;
        var i;

        for (i = node.length; i--;) {
            whitespaceNode = node[i];

            if (whitespaceNode[0] !== 's') continue;

            spaces = whitespaceNode[1].replace(/\n[ \t]+/gm, '\n');

            if (spaces === '') {
                node.splice(i, 1);
            } else {
                whitespaceNode[1] = spaces;
            }
        }
    }

    function processSassBlock(node, level, value) {
        var spaces;
        var whitespaceNode;
        var i;

        for (i = node.length; i--;) {
            whitespaceNode = node[i];

            if (whitespaceNode[0] !== 's') continue;

            if (whitespaceNode[1] === '\n') continue;

            spaces = whitespaceNode[1].replace(/[ \t]/gm, '');
            spaces += new Array(level + 2).join(value);
            whitespaceNode[1] = spaces;
        }
    }

    function processSpaceNode(node, level, value) {
        var spaces;

        // Remove all whitespaces and tabs, leave only new lines:
        spaces = node[0].replace(/[ \t]/gm, '');

        if (!spaces) return;

        spaces += new Array(level + 1).join(value);
        node[0] = spaces;
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
         * @param {String} nodeType
         * @param {node} node
         * @param {Number} level
         */
        process: function process(nodeType, node, level) {
            var syntax = this.getSyntax();
            var value = this.getValue('block-indent');

            if (nodeType === 'stylesheet') {
                return processStylesheet(node);
            }

            if (syntax === 'sass' && nodeType === 'block') {
                return processSassBlock(node, level, value);
            }

            // Continue only with space nodes inside {...}:
            if (syntax !== 'sass' && level !== 0 && nodeType === 's') {
                processSpaceNode(node, level, value);
            }
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
