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

        if (node.is('value') || node.is('braces')) {
            node.forEach(function(child) {
                if (typeof child === 'string') return;

                if (child.is('dimension')) {
                    var unit = child.get(1).content;
                    if (child.get(0).content[0] === '0' && UNITS.indexOf(unit) !== -1) {
                        child.content.splice(1, 1);
                    }
                } else if (child.is('percentage')) {
                    var number = child.get(0).content;
                    if (number[0] === '0') {
                        child.type = 'number';
                        child.content = number;
                    }
                }
            });
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        var result = null;

        // If we see a zero with unit and it is not degree, then we don’t have an option
        if (
            nodeType === 'percentage' && node[0][1] === '0' ||
            nodeType === 'dimension' && node[0][1] === '0' && node[1][1] !== 'deg'
        ) {
            result = false;
        }

        // If we see a zero and previous node is not percentage or dimension, then we have an option
        if (
            nodeType === 'number' &&
            node[0] === '0' &&
            this._prev !== 'percentage' &&
            this._prev !== 'dimension'
        ) {
            result = true;
        }

        // Store the previous nodeType
        this._prev = nodeType;

        if (result !== null) {
            return result;
        }
    }
};
