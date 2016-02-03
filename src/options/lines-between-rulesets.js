'use strict';

var gonzales = require('../gonzales');

module.exports = (function() {
    var newLines;
    var space;

    function insertLines(node, index) {
        var prevNode = node.get(index - 1);
        var shouldInsert = false;

        // Check for previous nodes that are not a space
        // Do not insert if the ruleset is the first item
        for (var i = 0; i < index; i++) {
            if (!node.get(i).is('space')) {
                shouldInsert = true;
                break;
            }
        }

        if (prevNode && shouldInsert) {
            if (prevNode.is('space')) {
                var content = prevNode.content;
                var lastNewline = content.lastIndexOf('\n');

                if (lastNewline > -1) {
                    content = content.substring(lastNewline + 1);
                }

                var valueStr = newLines + content;
                prevNode.content = valueStr;
            } else {
                node.insert(index, space);
            }
        }
    }

    function findAtRules(node) {
        node.forEach('atruleb', function(atRuleNode, index) {
            // For every atruleb - check for preceding space
            insertLines(node, index);
        });
    }

    function findRuleSets(node) {
        node.forEach('ruleset', function(ruleSetNode, index) {
            // For every ruleset - check for preceding space
            insertLines(node, index);
        });
    }

    function processBlock(x) {
        if (x.is('stylesheet')) {
            // Check all @rules
            findAtRules(x);

            // Check all rulesets
            findRuleSets(x);
        }

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
            newLines = this.value;
            space = gonzales.createNode({type: 'space', content: newLines});
            processBlock(ast);
        }
    };
})();