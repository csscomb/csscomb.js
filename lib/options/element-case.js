module.exports = {
    name: 'element-case',

    accepts: { string: /^lower|upper$/ },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 'simpleselector') {
            for (var i = node.length; i--;) {
                var nodeItem = node[i];
                if (nodeItem[0] === 'ident') {
                    if (this.getValue('element-case') === 'lower') {
                        nodeItem[1] = nodeItem[1].toLowerCase();
                    } else {
                        nodeItem[1] = nodeItem[1].toUpperCase();
                    }
                }
            }
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType === 'simpleselector') {
            var variants = {};
            var bestGuess = null;
            var maximum = 0;
            for (var i = node.length; i--;) {
                var nodeItem = node[i];
                if (nodeItem[0] === 'ident') {
                    var result;
                    if (nodeItem[1].match(/^[a-z]+$/)) {
                        result = 'lower';
                    } else if (nodeItem[1].match(/^[A-Z]+$/)) {
                        result = 'upper';
                    }

                    if (result) {
                        if (variants[result]) {
                            variants[result]++;
                        } else {
                            variants[result] = 1;
                        }
                        if (variants[result] > maximum) {
                            maximum = variants[result];
                            bestGuess = result;
                        }
                    }
                }
            }
            if (bestGuess) {
                return bestGuess;
            }
        }
    }
};
