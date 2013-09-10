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
        if (nodeType === 'vhash') {
            if (this._value === 'lower') {
                node[0] = node[0].toLowerCase();
            } else if (this._value === 'upper') {
                node[0] = node[0].toUpperCase();
            }
        }
    }

};
