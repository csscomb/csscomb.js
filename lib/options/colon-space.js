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
        if (typeof value === 'string'&& value.match(/after|before|both|(?=.*(?:[ \t\n]|:))[ \t\n]*:?[ \t\n]*/)) {
            this._value = value;
        }
        if (!this._value) return;
        return this;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        var detectSpaces = this._value.match(/(([ \t\n]*):)?([ \t\n]*)/);
        if (nodeType === 'property') {
            if (node[node.length - 1][0] === 's') node.pop();
            if (this._value === 'both' || this._value === 'before')
                node.push(['s', ' ']);
            if (detectSpaces && detectSpaces[1])
                node.push(['s', detectSpaces[2]]);
        }
        if (nodeType === 'value') {
            if (node[0][0] === 's') node.shift();
            if (this._value === 'both' || this._value === 'after')
                node.unshift(['s', ' ']);
            if (detectSpaces)
                node.unshift(['s', detectSpaces[3]]);
        }
    }

};
