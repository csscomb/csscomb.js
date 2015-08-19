var assert = require('assert');

describe.skip('options/remove-empty-rulesets', function() {
    describe('process', function() {
        it('Configured with invalid value, should not remove empty ruleset', function() {
            this.comb.configure({ 'remove-empty-rulesets': 'foobar' });
            return this.comb.processString('a { width: 10px; } b {}')
                .then(function(actual) {
                    assert.equal(actual, 'a { width: 10px; } b {}');
                });
        });

        describe('configured with Boolean "true" value', function() {
            beforeEach(function() {
                this.comb.configure({ 'remove-empty-rulesets': true });
            });

            it('should remove empty ruleset', function() {
                return this.comb.processString(' b {} ')
                    .then(function(actual) {
                        assert.equal(actual, '  ');
                    });
            });

            it('should remove ruleset with spaces', function() {
                return this.comb.processString(' b {   } ')
                    .then(function(actual) {
                        assert.equal(actual, '  ');
                    });
            });

            it('should leave ruleset with declarations', function() {
                return this.comb.processString('a { width: 10px; }\nb {} ')
                    .then(function(actual) {
                        assert.equal(actual, 'a { width: 10px; }\n ');
                    });
            });

            it('should leave ruleset with comments', function() {
                return this.comb.processString('a { /* comment */ }\nb {} ')
                    .then(function(actual) {
                        assert.equal(actual, 'a { /* comment */ }\n ');
                    });
            });
        });
    });

    describe('detect', function() {
        it('Should detect this option set to `true`', function() {
            this.shouldDetect(
                ['remove-empty-rulesets'],
                'a { color: red }',
                {
                    'remove-empty-rulesets': true
                }
            );
        });

        it('Should detect this option set to `false` with empty block', function() {
            this.shouldDetect(
                ['remove-empty-rulesets'],
                'a {}',
                {
                    'remove-empty-rulesets': false
                }
            );
        });

        it('Should detect this option set to `false` with block containing whitespace', function() {
            this.shouldDetect(
                ['remove-empty-rulesets'],
                'a {   }',
                {
                    'remove-empty-rulesets': false
                }
            );
        });

        it('Should detect this option set to `true` with block containing comment', function() {
            this.shouldDetect(
                ['remove-empty-rulesets'],
                'a { /* Hello */ }',
                {
                    'remove-empty-rulesets': true
                }
            );
        });

        it('Should detect this option set to `true` with media query containing block', function() {
            this.shouldDetect(
                ['remove-empty-rulesets'],
                '@media all and (min-width:0) { a { /* Hello */ } }',
                {
                    'remove-empty-rulesets': true
                }
            );
        });

        it('Should detect this option set to `true` with media query containing comment', function() {
            this.shouldDetect(
                ['remove-empty-rulesets'],
                '@media all and (min-width:0) {/* Hello */}',
                {
                    'remove-empty-rulesets': true
                }
            );
        });

        it('Should detect this option set to `false` with empty media query', function() {
            this.shouldDetect(
                ['remove-empty-rulesets'],
                '@media all and (min-width:0) {}',
                {
                    'remove-empty-rulesets': false
                }
            );
        });

        it('Should detect this option set to `false` with media query containing whitespace', function() {
            this.shouldDetect(
                ['remove-empty-rulesets'],
                '@media all and (min-width:0) { \n  }',
                {
                    'remove-empty-rulesets': false
                }
            );
        });
    });
});
