module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        if (value === 'lower' || value === 'upper') {
            this._value = value;
            return this;
        }
    },

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
                    if (this._value === 'lower') {
                        nodeItem[1] = nodeItem[1].toLowerCase();
                    } else if (this._value === 'upper') {
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
