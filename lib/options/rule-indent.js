module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String|Number} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        delete this._value;

        if (typeof value === 'number' && value === Math.abs(Math.round(value))) {
            this._value = new Array(value + 1).join(' ');
        } else if (typeof value === 'string' && value.match(/^[ \t]+$/)) {
            this._value = value;
        }

        if (typeof this._value === 'string') return this;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node, level) {
        if (nodeType === 'block') {
            if (node[0] && node[0][0] !== 's') {
                node.unshift(['s', '']);
            }
            for (var i = 0; i < node.length; i++) {
                var nodeItem = node[i];
                if (nodeItem[0] === 'declaration') {
                    var value = '\n' + new Array(level + 2).join(this._value);
                    var space = node[i - 1];
                    var tail;

                    if (space[0] !== 's') {
                        space = ['s', ''];
                        tail = node.splice(i);
                        tail.unshift(space);
                        Array.prototype.push.apply(node, tail);
                        i++;
                    }
                    space[1] = space[1].replace(/(\n)?([\t ]+)?$/, value);
                }
            }
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node, level) {
        var result = null;

        if (nodeType === 'declaration') {
            if (this._prev !== undefined) {
                result = this._prev.replace(/\s*\n/g, '');
                if (level > 0) {
                    result = result.substr(0, parseInt(result.length / (level + 1), 10));
                }
            } else {
                result = '';
            }
        }

        // Store the previous nodeType
        if (nodeType === 's') {
            this._prev = node[0];
        } else {
            this._prev = undefined;
        }

        if (result !== null) {
            return result;
        }
    }

};
