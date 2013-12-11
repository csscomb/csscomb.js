module.exports = {

    /**
     * Sets handler value.
     *
     * @param {Array} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        delete this._value;

        if (value.constructor !== Array) return;

        if (typeof value[0] === 'number' &&
            value[0] === Math.abs(Math.round(value[0]))) {
            value[0] = new Array(value[0] + 1).join(' ');
        } else if (typeof value[0] !== 'string' ||
            !value[0].match(/^[ \t\n]*$/)) {
            return;
        }

        if (typeof value[1] === 'number' &&
            value[1] === Math.abs(Math.round(value[1]))) {
            value[1] = new Array(value[1] + 1).join(' ');
        } else if (typeof value[1] !== 'string' ||
            !value[1].match(/^[ \t\n]*$/)) {
            return;
        }

        this._value = value;
        return this;
 
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 'selector') {
            for (var i = node.length; i--;) {
                var subSelector = node[i];
                for (var j = subSelector.length; j--;) {
                    if (subSelector[j][0] === 'combinator') {
                        // Working with the whitespace after the combinator
                        if (subSelector[j + 1][0] === 's') {
                            subSelector[j + 1][1] = this._value[1];
                        } else {
                            subSelector.splice(j + 1, 0, ['s', this._value[1]]);
                        }
                        // Working with the whitespace before the combinator
                        if (subSelector[j - 1][0] === 's') {
                            subSelector[j - 1][1] = this._value[0];
                        } else {
                            subSelector.splice(j, 0, ['s', this._value[0]]);
                        }
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
        if (nodeType === 'selector') {
            var variants = {};
            var bestGuess = null;
            var maximum = 0;
            for (var i = node.length; i--;) {
                var subSelector = node[i];
                for (var j = subSelector.length; j--;) {
                    var result = [];
                    if (subSelector[j][0] === 'combinator') {
                        // Working with the whitespace after the combinator
                        if (subSelector[j + 1][0] === 's') {
                            result[1] = subSelector[j + 1][1];
                        } else {
                            result[1] = '';
                        }
                        // Working with the whitespace before the combinator
                        if (subSelector[j - 1][0] === 's') {
                            result[0] = subSelector[j - 1][1];
                        } else {
                            result[0] = '';
                        }
                    }

                    if (result.length) {
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
