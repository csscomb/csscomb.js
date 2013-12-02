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
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType === 'vhash') {
            if (node[0].match(/^[^A-F]*[a-f][^A-F]*$/)) {
                return 'lower';
            } else if (node[0].match(/^[^a-f]*[A-F][^a-f]*$/)) {
                return 'upper';
            }
        }
    }
};
