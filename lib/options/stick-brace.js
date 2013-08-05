module.exports = {

    _value: false,

    /**
     * Sets handler value.
     *
     * @param {String|Number|Boolean} value Option value
     * @returns {Object}
     */
    setValue: function(value) {
        if (!value) return this;
        if (value === true) value = ' '; // 1 space by default
        if (typeof value === 'number') this._value = new Array(Math.round(value) + 1).join(' ');
        if (typeof value === 'string' && value.match(/^[ \t\n]*$/)) this._value = value;
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
