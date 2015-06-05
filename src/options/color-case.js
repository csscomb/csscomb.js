module.exports = {
    name: 'color-case',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: {
        string: /^lower|upper$/
    },

    /**
     * Processes tree node.
     * @param {node} ast
     */
    process: function(ast) {
        var value = this.value;

        ast.traverse('color', function(color) {
            color.content = value === 'lower' ?
                color.content.toLowerCase() :
                color.content.toUpperCase();
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
            if (color.content.match(/^[^A-F]*[a-f][^A-F]*$/)) {
                detected.push('lower');
            } else if (color.content.match(/^[^a-f]*[A-F][^a-f]*$/)) {
                detected.push('upper');
            }
        });

        return detected;
    }
};
