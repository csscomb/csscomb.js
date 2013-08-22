module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Number|Boolean} value Option value
     * @returns {Object}
     */
    setValue: function(value) {
        this._value = false;
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
        if (nodeType === 'selector' || nodeType === 'atruler') {
            for (var i = node.length; i--;) {
                var nodeItem = node[i];
                if (nodeItem[0] === 'simpleselector' || nodeItem[0] === 'atrulerq') {
                    if (nodeItem[nodeItem.length - 1][0] === 's') nodeItem.pop();
                    nodeItem.push(['s', this._value]);
                    break;
                }
            }
        }
    }

};
