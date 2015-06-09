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
                if (value.first('number').content === '0' &&
                    UNITS.indexOf(unit) !== -1) {
                    value.remove(1);
                }
            } else if (value.is('percentage')) {
                // XXX(tonyganch): There is a bug in Gonzales when in Less,
                // percentage's content is not wrapped as an array but actually
                // type of node's content is object. This bug has already been
                // fixed in newer versions of Gonzales so the issue should be
                // gone after update of dependencies and csscomb@4.0 release.
                // This hack is here as a hotfix for csscomb@3.1 and must be
                // removed once csscom@4.0 is released. See #389.
                var number;
                if (!Array.isArray(value.content) &&
                    value.content.is('number')) {
                    number = value.content;
                } else {
                    number = value.first('number').content;
                }

                if (number === '0') {
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
                   node.first('number').content === '0' &&
                   node.first('ident').content !== 'deg') {
            result = false;
        }

        // If we see a zero and previous node is not percentage or dimension, then we have an option
        if (node.is('number') &&
            node.content === '0' &&
            this._prev !== 'percentage' &&
            this._prev !== 'dimension') {
            result = true;
        }

        // Store the previous nodeType
        this._prev = node.type;

        return result;
    }
};
