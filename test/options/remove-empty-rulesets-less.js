var assert = require('assert');

describe('options/remove-empty-rulesets (less):', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Issue 201. Test 1', function() {
        this.comb.configure({ 'remove-empty-rulesets': true });
        this.shouldBeEqual('1.less', '1.expected.less');
    });

    it('Issue 201. Test 2', function() {
        this.comb.configure({ 'remove-empty-rulesets': true });
        var string = '#a {#b {} #d {}}';
        assert.equal(this.comb.processString(string, { syntax: 'less' }), '');
    });

    it('Issue 201. Test 3', function() {
        this.comb.configure({
            'remove-empty-rulesets': false,
            'always-semicolon': true
        });
        var string = '#a {#b {} #d {}}';
        assert.equal(this.comb.processString(string, { syntax: 'less' }), string);
    });
});
