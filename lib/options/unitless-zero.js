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
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        var result = null;

        // If we see a zero with unit and it is not degree, then we don’t have an option
        if (
            nodeType === 'percentage' && node[0][1] === '0' ||
            nodeType === 'dimension' && node[0][1] === '0' && node[1][1] !== 'deg'
        ) {
            result = false;
        }

        // If we see a zero and previous node is not percentage or dimension, then we have an option
        if (
            nodeType === 'number' &&
            node[0] === '0' &&
            this._prev !== 'percentage' &&
            this._prev !== 'dimension'
        ) {
            result = true;
        }

        // Store the previous nodeType
        this._prev = nodeType;

        if (result !== null) {
            return result;
        }
    }
};
