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

        it('should remove ruleset with spaces', function() {
            assert.equal(comb.processString(' b {   } '), '  ');
        });

        it('should leave ruleset with declarations', function() {
            assert.equal(comb.processString('a { width: 10px; }\nb {} '), 'a { width: 10px; }\n ');
        });

        it('should leave ruleset with comments', function() {
            assert.equal(comb.processString('a { /* comment */ }\nb {} '), 'a { /* comment */ }\n ');
        });
    });

    describe('detecting the value', function() {
        // Helper to check the detection
        function should_detect(options, a, b) {
            assert.equal(
                JSON.stringify(comb.detectInString(a, options)),
                JSON.stringify(b)
            );
        }

        it('Should detect this option set to `true`', function() {
            should_detect(
                ['remove-empty-rulesets'],
                'a { color: red }',
                {
                    'remove-empty-rulesets': true
                }
            );
        });

        it('Should detect this option set to `false` with empty block', function() {
            should_detect(
                ['remove-empty-rulesets'],
                'a {}',
                {
                    'remove-empty-rulesets': false
                }
            );
        });

        it('Should detect this option set to `false` with block containing whitespace', function() {
            should_detect(
                ['remove-empty-rulesets'],
                'a {   }',
                {
                    'remove-empty-rulesets': false
                }
            );
        });

        it('Should detect this option set to `true` with block containing comment', function() {
            should_detect(
                ['remove-empty-rulesets'],
                'a { /* Hello */ }',
                {
                    'remove-empty-rulesets': true
                }
            );
        });

        it('Should detect this option set to `true` with media query containing block', function() {
            should_detect(
                ['remove-empty-rulesets'],
                '@media all and (min-width:0) { a { /* Hello */ } }',
                {
                    'remove-empty-rulesets': true
                }
            );
        });

        it('Should detect this option set to `true` with media query containing comment', function() {
            should_detect(
                ['remove-empty-rulesets'],
                '@media all and (min-width:0) {/* Hello */}',
                {
                    'remove-empty-rulesets': true
                }
            );
        });

        it('Should detect this option set to `false` with empty media query', function() {
            should_detect(
                ['remove-empty-rulesets'],
                '@media all and (min-width:0) {}',
                {
                    'remove-empty-rulesets': false
                }
            );
        });

        it('Should detect this option set to `false` with media query containing whitespace', function() {
            should_detect(
                ['remove-empty-rulesets'],
                '@media all and (min-width:0) { \n  }',
                {
                    'remove-empty-rulesets': false
                }
            );
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
