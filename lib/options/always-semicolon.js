module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Boolean} value Option value
     * @returns {Object|undefined}
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
        if (nodeType === 'block') {
            for (var i = node.length; i--;) {
                var nodeItem = node[i];
                var type = nodeItem[0];

                if (type === 'declDelim') break;

                if (type === 'declaration') {
                    // Look for value node:
                    var value;
                    for (var k = nodeItem.length; k--;) {
                        if (nodeItem[k][0] === 'value') {
                            value = nodeItem[k];
                            break;
                        }
                    }

                    var space = [];
                    for (var j = value.length; j--;) {
                        if (['s', 'commentML', 'commentSL'].indexOf(value[j][0]) === -1) break;
                        space.unshift(value.splice(j)[0]);
                    }
                    node.splice.apply(node, [i + 1, 0, ['declDelim']].concat(space));
                    break;
                }
            }
        }
    }

};
