module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Boolean} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        this._value = false;
        if (value === true)
            value = 'after';
        if (value === false)
            value = '';
        if (value === 'both')
            this._value = [' ', ' '];
        if (value === 'before')
            this._value = [' ', ''];
        if (value === 'after')
            this._value = ['', ' '];
        if (value.constructor === Array && value[0].match(/^[ \t]*$/) && value[1].match(/^[ \t]*$/))
            this._value = value;
        if (typeof value === 'string') {
            if (value.match(/^[ \t]*$/)) {
                this._value = ['', value];
            } else {
                var detectSpaces = value.match(/^(([ \t]*):)?([ \t]*)$/);
                if (detectSpaces) {
                    if (detectSpaces[1]) {
                        this._value = [detectSpaces[2], detectSpaces[3]];
                    } else {
                        this._value = ['', detectSpaces[3]];
                    }
                }
            }
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
        if (nodeType === 'property') {
            if (node[node.length - 1][0] === 's') node.pop();
            if (this._value[0] !== '') node.push(['s', this._value[0]]);
        }
        if (nodeType === 'value') {
            if (node[0][0] === 's') node.shift();
            if (this._value[1] !== '') node.unshift(['s', this._value[1]]);
        }
    }

};
