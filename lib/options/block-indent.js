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
        // Add right space before closing brace
        if (nodeType === 'atrulers' || nodeType === 'block') {
            var value = '\n' + new Array(level + 1).join(this._value);
            if (node[node.length - 1][0] === 's') node.pop();
            node.push(['s', value]);
        }

        // Add right space before rule declaration
        if (nodeType === 'stylesheet' || nodeType === 'atrulers') {
            // Level up hack
            if (nodeType === 'atrulers') level++;

            // Prevent line break at file start
            var isFirst;
            if (nodeType === 'stylesheet') {
                var first = node[0];
                if (first[0] !== 's' || first[1].match('\n') === null) isFirst = true;
            }

            for (var i = 0; i < node.length; i++) {
                var nodeItem = node[i];
                if (nodeItem[0] === 'atruler' || nodeItem[0] === 'ruleset') {
                    var value = (i < 2 && isFirst ? '' : '\n') + new Array(level + 1).join(this._value);
                    isFirst = false;

                    var space = node[i - 1];
                    if (!space || space[0] !== 's') {
                        space = ['s', ''];
                        if (i) {
                            var tail = node.splice(i);
                            tail.unshift(space);
                            Array.prototype.push.apply(node, tail);
                            i++;
                        }
                    }
                    space[1] = space[1].replace(/(\n)?([\t ]+)?$/, value);
                }
            }
        }

        // Add space before block opening brace
        if (nodeType === 'simpleselector') {
            var space = node[node.length - 1];
            if (space[0] === 's' && space[1].match('\n')) {
                space[1] += new Array(level + 1).join(this._value);
            }
        }
    }

};
