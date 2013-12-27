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
        var value;
        var space;

        // Add right space before closing brace
        if (nodeType === 'atrulers' || nodeType === 'block') {
            value = '\n' + new Array(level + 1).join(this._value);
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
                    value = (i < 2 && isFirst ? '' : '\n') + new Array(level + 1).join(this._value);
                    isFirst = false;

                    space = node[i - 1];
                    if (!space || space[0] !== 's') {
                        var tail = node.splice(i);
                        space = ['s', ''];
                        tail.unshift(space);
                        Array.prototype.push.apply(node, tail);
                        i++;
                    }
                    space[1] = space[1].replace(/(\n)?([\t ]+)?$/, value);
                }
            }
        }

        // Add space before block opening brace
        if (nodeType === 'simpleselector') {
            space = node[node.length - 1];
            if (space[0] === 's' && space[1].match('\n')) {
                space[1] += new Array(level + 1).join(this._value);
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
        if (nodeType === 'atrulers' || nodeType === 'block') {
            if (node.length && node[node.length - 1][0] === 's' && level > 0) {
                result = node[node.length - 1][1].replace(/\s*\n/g, '');

                if (this._prev !== undefined && this._prev[0] < level) {
                    result = result.replace(result.replace(this._prev[1], ''), '');
                }
                if (this._prev === undefined || this._prev[0] !== level) {
                    this._prev = [level, result];
                }
            }
        }

        if (result !== null) {
            return result;
        }
    }

};
