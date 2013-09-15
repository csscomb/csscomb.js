var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/remove-empty-rulesets', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    describe('configured with invalid value', function() {
        beforeEach(function() {
            comb.configure({ 'remove-empty-rulesets': 'foobar' });
        });

        it('should not remove empty ruleset', function() {
            assert.equal(comb.processString('a { width: 10px; } b {}'), 'a { width: 10px; } b {}');
        });
    });

    describe('configured with Boolean "true" value', function() {
        beforeEach(function() {
            comb.configure({ 'remove-empty-rulesets': true });
        });

        it('should remove empty ruleset', function() {
            assert.equal(comb.processString(' b {} '), '  ');
        });

        it('should leave ruleset with declarations', function() {
            assert.equal(comb.processString('a { width: 10px; }\nb {} '), 'a { width: 10px; }\n ');
        });

        it('should leave ruleset with comments', function() {
            assert.equal(comb.processString('a { /* comment */ }\nb {} '), 'a { /* comment */ }\n ');
        });
    });
});

describe('options/remove-empty-rulesets AST manipulation', function() {
    var rule;
    var nodeContent;

    beforeEach(function() {
        rule = require('../lib/options/remove-empty-rulesets.js');
    });

    describe('merge adjacent whitespace', function() {
        it('should do nothing with empty content', function() {
            nodeContent = [];
            rule._mergeAdjacentWhitespace(nodeContent);
            assert.deepEqual(nodeContent, []);
        });

        it('should do nothing with only one whitespace', function() {
            nodeContent = [['s', '  ']];
            rule._mergeAdjacentWhitespace(nodeContent);
            assert.deepEqual(nodeContent, [['s', '  ']]);
        });

        it('should merge two adjacent whitespaces', function() {
            nodeContent = [['s', '  '], ['s', ' \n']];
            rule._mergeAdjacentWhitespace(nodeContent);
            assert.deepEqual(nodeContent, [['s', '   \n']]);
        });

        it('should merge three adjacent whitespaces', function() {
            nodeContent = [['s', '  '], ['s', ' \n'], ['s', ' \n']];
            rule._mergeAdjacentWhitespace(nodeContent);
            assert.deepEqual(nodeContent, [['s', '   \n \n']]);
        });
    });

    describe('remove empty rulesets', function() {
        it('should do nothing with empty content', function() {
            nodeContent = [];
            rule._removeEmptyRulesets(nodeContent);
            assert.deepEqual(nodeContent, []);
        });

        it('should do nothing with no rulesets', function() {
            nodeContent = [['s', '  ']];
            rule._removeEmptyRulesets(nodeContent);
            assert.deepEqual(nodeContent, [['s', '  ']]);
        });

        it('should remove empty ruleset', function() {
            nodeContent = [['ruleset', []]];
            rule._removeEmptyRulesets(nodeContent);
            assert.deepEqual(nodeContent, []);
        });

        it('should remove two empty rulesets', function() {
            nodeContent = [['s', '  '], ['ruleset', []], ['s', ' \n'], ['ruleset', []]];
            rule._removeEmptyRulesets(nodeContent);
            assert.deepEqual(nodeContent, [['s', '  '], ['s', ' \n']]);
        });
    });
});
