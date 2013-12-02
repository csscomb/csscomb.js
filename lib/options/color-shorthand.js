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
        if (nodeType === 'vhash') {
            if (this._value) {
                node[0] = node[0].replace(/(\w)\1(\w)\2(\w)\3/i, '$1$2$3');
            } else {
                node[0] = node[0].replace(/^(\w)(\w)(\w)$/, '$1$1$2$2$3$3');
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
        if (nodeType === 'vhash') {
            if (node[0].match(/^\w{3}$/)) {
                return true;
            } else if (node[0].match(/^(\w)\1(\w)\2(\w)\3$/)) {
                return false;
            }
        }
    }
};
