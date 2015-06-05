var gonzales = require('gonzales-pe');

module.exports = {
    name: 'eof-newline',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: { boolean: [true, false] },

    /**
     * Processes tree node.
     * @param {node} ast
     */
    process: function(ast) {
        var lastChild = ast.last();

        if (!lastChild.is('space')) {
            lastChild = gonzales.createNode({ type: 'space', content: '' });
            ast.content.push(lastChild);
        }

        lastChild.content = lastChild.content.replace(/\n$/, '');
        if (this.value) lastChild.content += '\n';
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {node} ast
     */
    detect: function(ast) {
        var lastChild = ast.last();

        if (lastChild.is('space') && lastChild.content.indexOf('\n') !== -1) {
            return [true];
        } else {
            return [false];
        }
    }
};
