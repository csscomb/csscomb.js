module.exports = {

    /**
     * Sets handler value.
     *
     * @param {Boolean} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        if (value === true) {
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
        if (nodeType === 'value' || nodeType === 'braces') {
            node.forEach(function(child, index) {
                if (
                    (child[0] === 'percentage' ||
                    child[0] === 'dimension' && ['cm', 'em', 'ex', 'pt', 'px'].indexOf(child[2][1]) !== -1) &&
                        child[1][1] === '0') {
                    node[index] = child[1];
                }
            });
        }
    }

};
