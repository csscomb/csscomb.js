module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Number|Boolean} value Option value
     * @returns {Object}
     */
    setValue: function(value) {
        this._value = false;
        if (value === true) value = 4;
        if (typeof value === 'number' && value === Math.abs(Math.round(value))) value = new Array(value + 1).join(' ');
        if (typeof value === 'string' && value.match(/^[ \t]*$/)) this._value = value;
        if (!this._value) return;
        return this;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node, level) {
        // increasing indent level
        if (nodeType === 'block') {
            var value = '\n' + new Array(level + 2).join(this._value);
            if (node[0][0] !== 's') {
                node.unshift(['s', '']);
            }
            node.forEach(function(nodeItem, i) {
                if (nodeItem[0] === 'declaration') {
                    var space = node[i - 1];
                    var tail;

                    if (space[0] !== 's') {
                        space = ['s', ''];
                        tail = node.splice(i);
                        tail.unshift(space);
                        Array.prototype.push.apply(node, tail);
                    }

                    // replacing last line space by value:
                    // '' => '\n\t'
                    // '\n   ' => '\n\t'
                    // '\n \n ' => '\n \n\t'
                    space[1] = space[1].replace(/(\n)?([\t ]+)?$/, value);
                }
            });
        }
    }

};
