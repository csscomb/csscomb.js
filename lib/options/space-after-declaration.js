module.exports = (function() {
    function getLastNodeType(node) {
        for (var i = node.length; i--;) {
            var nodeType = node[i][0];

            if (nodeType === 's' ||
                nodeType === 'commentML' ||
                nodeType === 'commentSL') continue;

            return nodeType;
        }
    }

    return {
        name: 'space-after-declaration',

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
            var value = this.getValue('space-after-declaration');

            // TODO: Limit nodes to blocks, stylesheet, etc.

            for (var i = 0, l = node.length; i < l; i++) {
                var currentNode = node[i];
                var nextNode = node[i + 1];

                if (i === l - 1 && getLastNodeType(node) === 'declaration') {
                    nextNode = currentNode;
                } else if (currentNode[0] !== 'declDelim') {
                    continue;
                }

                if (nextNode && nextNode[0] === 's') {
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
