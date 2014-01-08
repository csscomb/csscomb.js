describe('options/remove-empty-rulesets (scss)', function() {
    beforeEach(function() {
        this.filename = __filename;
        this.comb.configure({ 'remove-empty-rulesets': true });
    });

    it('Should not remove rulesets which contain only includes', function() {
        this.shouldBeEqual('include.scss');
    });

    it('Should remove rulesets with contain only empty nested rules', function() {
        this.shouldBeEqual('empty-nested-rule.scss', 'empty-nested-rule.expected.scss');
    });

    it('Should not remove rulesets with non-empty nested rules. Test 1', function() {
        this.shouldBeEqual('nested-rule-1.scss');
    });

    it('Should not remove rulesets with non-empty nested rules. Test 2', function() {
        this.shouldBeEqual('nested-rule-2.scss', 'nested-rule-2.expected.scss');
    });
});
