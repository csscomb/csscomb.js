'use strict';

var gonzales = require('gonzales-pe');

module.exports = (function() {
    var valueFromSettings;
    var value;

    function findAtRules(node) {
        var space = gonzales.createNode({ type: 'space', content: value });
        
        node.forEach('atruleb', function(atRuleNode, index) {
            // for every atruleb - check for preceding space
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
        var space = gonzales.createNode({ type: 'space', content: value });
        
        node.forEach('ruleset', function(ruleSetNode, index) {
            // for every ruleset - check for preceding space
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

    function processBlock(x) {
        // XXX: Hack for braces
        if (x.is('braces') || x.is('id')) return;
        
        value = valueFromSettings;

        // check all @rules
        findAtRules(x);

        // check all rulesets
        findRuleSets(x);

        x.forEach(function(node) {
            if (!node.is('block')) return processBlock(node);

            // check all @rules
            findAtRules(node);

            // check all rulesets
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
                var err = 'The option only accepts the newline character or numbers (\\n), you provided %s';
                throw new Error(err, value);
            }

            return value;
        },

        process: function(node) {
            valueFromSettings = this.getValue('rule-delimiter');

            if (!node.is('stylesheet')) return;
            processBlock(node);
        }
    };
})();
