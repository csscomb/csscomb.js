'use strict';

var gonzales = require('../gonzales');

module.exports = (function() {
    var valueFromSettings;
    var blockIndent;
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
                    prevNode.content = value;
                    return;
                } else {
                    node.insert(index, space);
                }
            }
        });
    }

    function processBlock(x, level) {
        value = valueFromSettings;
        level = level || 0;

        // Check all @rules
        findAtRules(x);

        // Check all rulesets
        findRuleSets(x);

        x.forEach(function(node) {
            if (!node.is('block')) return processBlock(node);

            value = valueFromSettings;

            level++;

            if (value.indexOf('\n') > -1) {
                // TODO: Check that it works for '' block indent value <tg>
                if (blockIndent) {
                    value += new Array(level).join(blockIndent);
                }
            }

            // Check all @rules
            findAtRules(node);

            // Check all rulesets
            findRuleSets(node);

            processBlock(node);
        });
    }

    return {
        name: 'rule-delimiter',

        syntax: ['scss', 'css', 'less'],

        runBefore: 'block-indent',

        setValue: function(value) {
            var regex = /^[\n]*$/;

            if (typeof value === 'number') {
                value = new Array(Math.round(value) + 2).join('\n');
            } else if (typeof value === 'string' && !value.match(regex)) {
                var err = 'The option only accepts the newline character';
                err += ' or numbers (\\n), you provided %s';

                throw new Error(err, value);
            }

            return value;
        },

        process: function(ast, config) {
            valueFromSettings = this.value;
            blockIndent = config['block-indent'];
            processBlock(ast);
        }
    };
})();