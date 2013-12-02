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
        if (nodeType === 's') {
            node[0] = this._trim(node[0]);
        }
        if (nodeType === 'stylesheet') {
            var lastChild = node[node.length - 1];
            if (lastChild[0] === 's') {
                lastChild[1] = this._trim(lastChild[1])
                    .replace(/[ \t]+$/, '')
                    .replace(/[\n]+/g, '\n');
            }
        }
    },

    /**
     * Trim trailing spaces on each line.
     * @private
     * @param {String} s Spaceful string
     * @returns {String}
     */
    _trim: function(s) {
        return s.replace(/[ \t]+\n/g, '\n');
    },

    /**
     * Detects the value of an option at the tree node.
     * This option is treated as `true` by default, but any trailing space would invalidate it.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    _detectDefault: true,

    detect: function(nodeType, node) {
        if (nodeType === 's') {
            if (node[0].match(/[ \t]\n/)) {
                return false;
            }
        }
        if (nodeType === 'stylesheet') {
            var lastChild = node[node.length - 1];
            if (lastChild[0] === 's' && lastChild[1] !== '\n' && lastChild[1].match(/^[ \n\t]+$/)) {
                return false;
            }
        }
    }
};
