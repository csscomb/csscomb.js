module.exports = {
    name: 'unitless-zero',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true] },

    /**
     * Processes tree node.
     *
     * @param {node} node
     */
    process: function(node) {
        var UNITS = ['cm', 'em', 'ex', 'pt', 'px'];

        if (!node.is('value') && !node.is('braces')) return;

        node.forEach(function(value) {
            if (typeof value === 'string') return;

            if (value.is('dimension')) {
                var unit = value.first('ident').content;
                if (value.first('number').content[0] === '0' &&
                    UNITS.indexOf(unit) !== -1) {
                    value.remove(1);
                }
            } else if (value.is('percentage')) {
                var number = value.first('number').content;
                if (number[0] === '0') {
                    value.type = 'number';
                    value.content = number;
                }
            }
        });
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} node
     */
    detect: function(node) {
        var result;

        // If we see a zero with unit and it is not degree, then we don’t have an option

        if (node.is('percentage') && node.first('number').content[1] === '0') {
            result = false;
        } else if (node.is('dimension') &&
                   node.first('number').content[0] === '0' &&
                   node.first('ident').content !== 'deg') {
            result = false;
        }

        // If we see a zero and previous node is not percentage or dimension, then we have an option
        if (node.is('number') &&
            node.content[0] === '0' &&
            this._prev !== 'percentage' &&
            this._prev !== 'dimension') {
            result = true;
        }

        // Store the previous nodeType
        this._prev = node.type;

        return result;
    }
};
