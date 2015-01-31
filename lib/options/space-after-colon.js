var gonzales = require('gonzales-pe');

module.exports = {
    name: 'space-after-colon',

    runBefore: 'block-indent',

    syntax: ['css', 'less', 'sass', 'scss'],

    accepts: {
        number: true,
        string: /^[ \t\n]*$/
    },

    /**
     * Processes tree node.
     *
     * @param {node} node
     */
    process: function(node) {
        if (!node.is('declaration')) return;

        var value = this.getValue('space-after-colon');

        for (var i = node.content.length; i--;) {
            if (!node.content[i].is('propertyDelim')) continue;

            if (this.getSyntax() === 'sass' && !node.content[i - 1]) break;

            // Remove any spaces after colon:
            if (node.content[i + 1].is('s')) node.content.splice(i + 1, 1);
            // If the value set in config is not empty, add spaces:
            var space = gonzales.createNode({ type: 's', content: value });
            if (value !== '') node.content.splice(i + 1, 0, space);

            break;
        }
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType !== 'declaration') return;

        for (var i = node.length; i--;) {
            if (node[i][0] !== 'propertyDelim') continue;

            if (node[i + 1][0] === 's') {
                return node[i + 1][1];
            } else {
                return '';
            }
        }
    }
};
