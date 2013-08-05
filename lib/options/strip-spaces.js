module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Boolean} value Option value
     * @returns {Object}
     */
    setValue: function(value) {
        this._value = value === true;
        if (!this._value) return;
        return this;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 's') {
            node[0] = node[0].replace(/[ \t]+\n/g, '\n');
        }

        if (nodeType === 'stylesheet') {
            if (node[node.length - 1][0] === 's') node.pop();
            node.push(['s', '\n']);
        }
    }

};
