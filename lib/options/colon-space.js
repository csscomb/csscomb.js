module.exports = {

    /**
     * Sets handler value.
     *
     * @param {Array} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        delete this._value;

        if (value.constructor !== Array) return;

        if (typeof value[0] === 'number' &&
            value[0] === Math.abs(Math.round(value[0]))) {
            value[0] = new Array(value[0] + 1).join(' ');
        } else if (typeof value[0] !== 'string' ||
            !value[0].match(/^[ \t\n]*$/)) {
            return;
        }

        if (typeof value[1] === 'number' &&
            value[1] === Math.abs(Math.round(value[1]))) {
            value[1] = new Array(value[1] + 1).join(' ');
        } else if (typeof value[1] !== 'string' ||
            !value[1].match(/^[ \t\n]*$/)) {
            return;
        }

        this._value = value;
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
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        var result = [];

        if (nodeType === 'declaration') {
            var property = node[0];
            var value = node[2];

            if (property[property.length - 1][0] === 's') {
                result[0] = property[property.length - 1][1];
            } else {
                result[0] = '';
            }

            if (value[1][0] === 's') {
                result[1] = value[1][1];
            } else {
                result[1] = '';
            }

        }
        if (result.length) {
            return result;
        }
    }
};
