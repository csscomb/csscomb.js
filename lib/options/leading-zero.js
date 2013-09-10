module.exports = {

    /**
     * Sets handler value.
     *
     * @param {Boolean} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        if (value === true || value === false) {
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
        if (nodeType === 'number') {
            if (this._value) {
                if (node[0][0] === '.')
                    node[0] = '0' + node[0];
            } else {
                node[0] = node[0].replace(/^0+(?=\.)/, '');
            }
        }
    }

};
