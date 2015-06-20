describe('options/block-indent (scss):', function() {
    describe('process', function() {
        it('Issue 213', function() {
            this.comb.configure({ 'block-indent': 2 });
            return this.shouldBeEqual('nested-include.scss', 'nested-include.expected.scss');
        });
    });
});
