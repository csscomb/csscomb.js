module.exports = {

    /**
     * Sets handler value.
     *
     * @param {Boolean} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        if (value === true || value === false) {
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
        if (nodeType === 'stylesheet') {
            var lastChild = node[node.length - 1];
            if (lastChild[0] !== 's') {
                lastChild = ['s', ''];
                node.push(lastChild);
            }
            lastChild[1] = lastChild[1].replace(/\n$/, '');
            if (this._value) lastChild[1] += '\n';
        }
    }

};
