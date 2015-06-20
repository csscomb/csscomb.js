var assert = require('assert');

describe('options/remove-empty-rulesets (less):', function() {
    describe('process', function() {
        it('Issue 201. Test 1', function() {
            this.comb.configure({ 'remove-empty-rulesets': true });
            return this.shouldBeEqual('1.less', '1.expected.less');
        });

        it('Issue 201. Test 2', function() {
            this.comb.configure({ 'remove-empty-rulesets': true });
            var string = '#a {#b {} #d {}}';
            return this.comb.processString(string, { syntax: 'less' })
                .then(function(actual) {
                    assert.equal(actual, '');
                });
        });

        it('Issue 201. Test 3', function() {
            this.comb.configure({
                'remove-empty-rulesets': false,
                'always-semicolon': true
            });
            var string = '#a {#b {} #d {}}';
            return this.comb.processString(string, { syntax: 'less' })
                .then(function(actual) {
                    assert.equal(actual, string);
                });
        });
    });
});
