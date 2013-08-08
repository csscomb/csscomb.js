module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Boolean} value Option value
     * @returns {Object}
     */
    setValue: function(value) {
        this._value = false;
        if (value === true) this._value = 'after';
        if (typeof value === 'string' && value.match(/after|before|both/)) this._value = value;
        if (!this._value) return;
        return this;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 'property') {
            if (node[node.length - 1][0] === 's') node.pop();
            if (this._value === 'both' || this._value === 'before')
                node.push(['s', ' ']);
        }
        if (nodeType === 'value') {
            if (node[0][0] === 's') node.shift();
            if (this._value === 'both' || this._value === 'after')
                node.unshift(['s', ' ']);
        }
    }

};
