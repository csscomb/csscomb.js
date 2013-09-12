module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Number|Boolean} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        delete this._value;
        if (value === true) this._value = ' ';
        if (typeof value === 'number' && value === Math.abs(Math.round(value)))
            this._value = new Array(value + 1).join(' ');
        if (typeof value === 'string' && value.match(/^[ \t\n]+$/)) this._value = value;
        if (typeof this._value === 'string') return this;
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
