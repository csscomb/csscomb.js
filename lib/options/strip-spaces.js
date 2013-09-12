module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Boolean} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        this._value = value === true;
        if (!this._value) return;
        return this;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 's') {
            node[0] = this._trim(node[0]);
        }
        if (nodeType === 'stylesheet') {
            var lastChild = node[node.length - 1];
            if (lastChild[0] === 's') {
                lastChild[1] = this._trim(lastChild[1])
                    .replace(/[ \t]+$/, '')
                    .replace(/[\n]+/g, '\n');
            }
        }
    },

    /**
     * Trim trailing spaces on each line.
     * @private
     * @param {String} s Spaceful string
     * @returns {String}
     */
    _trim: function(s) {
        return s.replace(/[ \t]+\n/g, '\n');
    }

};
