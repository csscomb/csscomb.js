describe.skip('options/block-indent (sass):', function() {
    describe('process', function() {
        it('First level ruleset\'s block', function() {
            this.comb.configure({ 'block-indent': 2 });
            return this.shouldBeEqual('block.sass', 'block.expected.sass');
        });

        it('Nested ruleset', function() {
            this.comb.configure({ 'block-indent': 2 });
            return this.shouldBeEqual('nested-ruleset.sass', 'nested-ruleset.expected.sass');
        });

        it('Mixin', function() {
            this.comb.configure({ 'block-indent': 4 });
            return this.shouldBeEqual('mixin.sass', 'mixin.expected.sass');
        });
    });
});

