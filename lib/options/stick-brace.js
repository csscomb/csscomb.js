module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Number|Boolean} value Option value
     * @returns {Object}
     */
    setValue: function(value) {
        if (value === true) value = ' ';
        if (typeof value === 'string' && value.match(/^[ \t\n]*$/)) this._value = value;
        if (!this._value) return;
        return this;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 'simpleselector') {
            if (node[node.length - 1][0] === 's') node.pop();
            node.push(['s', this._value]);
        }
    }

};
