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
        if (node.length < 3) {
            return;
        }
        var value = this.getValue('rule-delimiter');
        var len   = node.length - 2;

        /**
         * Array of nodes we work with - rulesets and @media
         * @type {Array}
         */
        var NODES = ['ruleset', 'atruleb', 'atruler', 'atrules'];

        /**
         * Comments and spaces
         * @type {Array}
         */
        var CS = ['commentML', 'commentSL', 's'];

        for (var i = 0; i < len; ++i) {
            var curNode  = node[i];
            var nextNode = node[i + 1];

            if (!nextNode ||
                (NODES.indexOf(curNode[0]) === -1) ||
                (CS.indexOf(nextNode[0]) === -1)
            ) {
                continue;
            }

            nextNode[1] = value + nextNode[1].replace(/[\s\n\r\t]/, '');
        }
    }
};
