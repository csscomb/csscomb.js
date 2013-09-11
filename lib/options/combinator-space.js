module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Boolean|Array} value Option value
     * @returns {Object}
     */
    setValue: function(value) {
        this._value = false;
        if (value === true) value = ' ';
        if (value === false) value = '';
        if (typeof value === 'string' && value.match(/^[ \t\n]*$/)) {
            this._value = [value, value];
        }
        if (value.constructor === Array) this._value = value;
        if (!this._value) return;
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
    }

};
