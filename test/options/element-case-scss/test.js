describe('options/element-case (scss):', function() {
    it('Should not touch mixin names', function() {
        this.comb.configure({ 'element-case': 'lower' });
        this.shouldBeEqual('mixin.scss', 'mixin.expected.scss');
    });
});
