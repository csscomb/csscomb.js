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
                var value = nodeItem[2];

                if (type === 'decldelim') break;

                if (type === 'declaration') {
                    var space = [];
                    for (var j = value.length; j--;) {
                        if (value[j][0] !== 's' && value[j][0] !== 'comment') break;
                        space.unshift(value.splice(j)[0]);
                    }
                    node.splice.apply(node, [i + 1, 0, ['decldelim']].concat(space));
                    break;
                }
            }
        }
    }

};
