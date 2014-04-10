describe('options/element-case (scss):', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should not touch mixin names', function() {
        this.comb.configure({ 'element-case': 'lower' });
        this.shouldBeEqual('mixin.scss', 'mixin.expected.scss');
    });
});
