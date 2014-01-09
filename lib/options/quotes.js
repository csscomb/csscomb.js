module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Boolean} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        delete this._value;

        if (value === 'single' || value === 'double' ) {
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
        if (nodeType === 'string') {
            if (node[0][0] === '"' && this._value === 'single') {
                node[0] = node[0]
                    .replace(/\\"/g, '"') // unescape all escaped double quotes
                    .replace(/([^\\])'/g, '$1\\\'') // escape all the single quotes
                    .replace(/^"|"$/g, '\''); // replace the first and the last quote

            } else if (node[0][0] === '\'' && this._value === 'double') {
                node[0] = node[0]
                    .replace(/\\'/g, '\'') // unescape all escaped single quotes
                    .replace(/([^\\])"/g, '$1\\\"') // escape all the double quotes
                    .replace(/^'|'$/g, '"'); // replace the first and the last quote
            }
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType === 'string') {
            if (node[0][0] === '"') {
                return 'double';
            } else if (node[0][0] === '\'') {
                return 'single';
            }
        }
    }
};
