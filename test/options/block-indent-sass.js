describe('options/block-indent (sass):', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('First level ruleset\'s block', function() {
        this.comb.configure({ 'block-indent': 2 });
        this.shouldBeEqual('block.sass', 'block.expected.sass');
    });

    it('Nested ruleset', function() {
        this.comb.configure({ 'block-indent': 2 });
        this.shouldBeEqual('nested-ruleset.sass', 'nested-ruleset.expected.sass');
    });

    it('Mixin', function() {
        this.comb.configure({ 'block-indent': 4 });
        this.shouldBeEqual('mixin.sass', 'mixin.expected.sass');
    });
});

