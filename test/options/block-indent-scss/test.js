describe('options/block-indent (scss):', function() {
    it('Issue 213', function() {
        this.comb.configure({ 'block-indent': 2 });
        this.shouldBeEqual('nested-include.scss', 'nested-include.expected.scss');
    });
});
