module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Number} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        delete this._value;

        if (typeof value === 'number' && value === Math.abs(Math.round(value))) {
            this._value = new Array(value + 1).join(' ');
        } else if (typeof value === 'string' && value.match(/^[ \t\n]*$/)) {
            this._value = value;
        }

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
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node, level) {
        if (nodeType === 'selector' || nodeType === 'atruler') {
            for (var i = node.length; i--;) {
                var nodeItem = node[i];
                if (nodeItem[0] === 'simpleselector' || nodeItem[0] === 'atrulerq') {
                    var result = '';
                    if (nodeItem[nodeItem.length - 1][0] === 's') {
                        result = nodeItem[nodeItem.length - 1][1];
                    }
                    if (this._prev !== undefined && this._prev[0] < level) {
                        result = result.replace(result.replace(this._prev[1], ''), '');
                    }
                    if (this._prev === undefined || this._prev[0] !== level) {
                        this._prev = [level, result];
                    }
                    return result;
                }
            }
        }
    }

};
