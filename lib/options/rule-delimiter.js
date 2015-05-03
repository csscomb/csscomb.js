'use strict';

var gonzales = require('gonzales-pe');

module.exports = {
    name: 'rule-delimiter',

    syntax: ['scss', 'css', 'less'],

    runBefore: 'strip-spaces',

    setValue: function(value) {
        var regex = /^[\n]*$/;

        if (typeof value === 'number') {
            value = new Array(Math.round(value) + 2).join('\n');
        } else if (typeof value === 'string' && !value.match(regex)) {
            throw new Error('The option only accepts the newline character or numbers (\\n), you provided %s', value);
        }

        return value;
    },

    process: function(node) {
        var value = this.getValue('rule-delimiter');
        var currentNode;
        var nextNode;

        for (var i = 0, l = node.length; i < l; i++) {
            if (!node.get(i)) {
                continue;
            }

            currentNode = node.get(i);
            nextNode = node.get(i + 1);

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
