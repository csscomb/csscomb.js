module.exports = {
    name: 'color-shorthand',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true, false] },

    /**
     * Processes tree node.
     * @param {node} ast
     */
    process: function(ast) {
        var value = this.value;

        ast.traverse('color', function(color) {
            color.content = value ?
                color.content.replace(/(\w)\1(\w)\2(\w)\3/i, '$1$2$3') :
                color.content.replace(/^(\w)(\w)(\w)$/, '$1$1$2$2$3$3');
        });
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} ast
     */
    detect: function(ast) {
        var detected = [];

        ast.traverse('color', function(color) {
            if (color.content.match(/^\w{3}$/)) {
                detected.push(true);
            } else if (color.content.match(/^(\w)\1(\w)\2(\w)\3$/)) {
                detected.push(false);
            }
        });

        return detected;
    }
};
