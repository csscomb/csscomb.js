'use strict';

var gonzales = require('../gonzales');

module.exports = (function() {
    var valueFromSettings;
    var value;

    function findAtRules(node) {
        var space = gonzales.createNode({type: 'space', content: value});

        node.forEach('atruleb', function(atRuleNode, index) {
            // For every atruleb - check for preceding space
            var prevNode = node.get(index - 1);
            if (prevNode) {
                if (prevNode.is('space')) {
                    prevNode.content = value;
                    return;
                } else {
                    node.insert(index, space);
                }
            }
        });
    }

    function findRuleSets(node) {
        var space = gonzales.createNode({type: 'space', content: value});

        node.forEach('ruleset', function(ruleSetNode, index) {
            // For every ruleset - check for preceding space
            var prevNode = node.get(index - 1);
            if (prevNode) {
                if (prevNode.is('space')) {
                    var content = prevNode.content;
                    var lastNewline = content.lastIndexOf('\n');

                    if (lastNewline > -1) {
                        content = content.substring(lastNewline + 2);
                    }

                    var valueStr = valueFromSettings + content;
                    prevNode.content = valueStr;
                    return;
                } else {
                    node.insert(index, space);
                }
            }
        });
    }

    function processBlock(x) {
        value = valueFromSettings;

        // Check all @rules
        findAtRules(x);

        // Check all rulesets
        findRuleSets(x);

        x.forEach(function(node) {
            if (!node.is('block')) return processBlock(node);

            // Check all @rules
            findAtRules(node);

            // Check all rulesets
            findRuleSets(node);

            processBlock(node);
        });
    }

    return {
        name: 'lines-between-rulesets',

        syntax: ['scss', 'css', 'less'],

        runBefore: 'block-indent',

        setValue: function(value) {
            if (typeof value === 'number') {
                value = new Array(Math.round(value) + 2).join('\n');
            } else {
                var err = 'The option only accepts numbers';
                err += ' , you provided %s';

                throw new Error(err, value);
            }

            return value;
        },

        process: function(ast) {
            valueFromSettings = this.value;
            processBlock(ast);
        }
    };
})();