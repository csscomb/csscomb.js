describe('options/element-case (scss):', function() {
    describe('process', function() {
        it('Should not touch mixin names', function() {
            this.comb.configure({ 'element-case': 'lower' });
            return this.shouldBeEqual('mixin.scss', 'mixin.expected.scss');
        });
    });
});
