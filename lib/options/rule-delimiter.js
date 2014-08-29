module.exports = {
    name: 'rule-delimiter',

    syntax: ['scss'],

    runBefore: 'strip-spaces',

    accepts: {
        string: /^[\n]*$/
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        var value  = this.getValue('rule-delimiter');
        var maxLen = node.length - 2;

        var updateNode = function(n) {
            n[1] = value + n[1].replace(/\n+/, '');
        };

        /**
         * Array of nodes we work with - rulesets and @media
         * @type {Array}
         */
        var NODES = ['ruleset', 'atruleb', 'atruler', 'loop'];

        /**
         * Comments and spaces
         * @type {Array}
         */
        var CS = ['commentML', 'commentSL', 's'];

        for (var i = 0; i < node.length; ++i) {
            var curNode   = node[i];
            var nextNode  = node[i + 1];
            var prevNode  = node[i - 1];
            var pPrevNode = node[i - 2];

            var isAccepted = (NODES.indexOf(curNode[0]) !== -1);

            if (!isAccepted) {
                continue;
            }

            // rules for preceeding nodes (do nothing if [s][comment][this])
            if ((i > 1) &&
                prevNode &&
                (CS.indexOf(prevNode[0]) !== -1) &&
                (!pPrevNode || (CS.indexOf(pPrevNode[0]) === -1))
            ) {
                updateNode(prevNode);
            }

            // rules for nodes coming after current
            if ((i >= maxLen) ||
                !nextNode ||
                (CS.indexOf(nextNode[0]) === -1)
            ) {
                continue;
            }

            updateNode(nextNode);
        }
    }
};
