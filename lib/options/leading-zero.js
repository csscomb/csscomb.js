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
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType === 'number') {
            if (node.toString().match(/^\.[0-9]+/)) {
                return false;
            } else if (node.toString().match(/^0\.[0-9]+/)) {
                return true;
            }
        }
    }
};
