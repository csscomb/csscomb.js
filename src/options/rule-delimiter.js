var gonzales = require('../gonzales');

module.exports = {
    name: 'rule-delimiter',

    syntax: ['css', 'less', 'sass', 'scss'],

    runBefore: 'strip-spaces',

    accepts: {
        string: /^[\n]*$/
    },

    process: function(ast) {
        var value = this.getValue('rule-delimiter');
        var currentNode;
        var nextNode;

        for (var i = 0, l = ast.length; i < l; i++) {
            if (!ast.get(i)) {
                continue;
            }

            currentNode = ast.get(i);
            nextNode = ast.get(i + 1);

            if (currentNode.is('ruleset') && nextNode) {
                var delimiter = gonzales.createNode({
                    type: 'space',
                    content: value
                });

                nextNode.insert(i, delimiter);
            }
        }
    }
};
