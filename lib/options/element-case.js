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
    }

};
