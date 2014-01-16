module.exports = {
    name: 'block-indent',

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
        var spaces;

        if (nodeType === 'stylesheet') {
            for (var i = node.length; i--;) {
                var whitespaceNode = node[i];

                if (whitespaceNode[0] !== 's') continue;

                spaces = whitespaceNode[1].replace(/\n[ \t]+/gm, '\n');
                if (spaces === '') {
                    node.splice(i, 1);
                } else {
                    whitespaceNode[1] = spaces;
                }
            }
            return;
        }

        // Continue only with space nodes inside {...}:
        if (level === 0 || nodeType !== 's') return;

        // Remove all whitespaces and tabs, leave only new lines:
        spaces = node[0].replace(/[ \t]/gm, '');

        if (!spaces) return;

        spaces += new Array(level + 1).join(this.getValue('block-indent'));
        node[0] = spaces;
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
            result.push(new Array(spacesLength / (level + 1) + 1).join(' '));
        }

        return result;
    }
};
