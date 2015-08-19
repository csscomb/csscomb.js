describe.skip('options/vendor-prefix-align', function() {
    beforeEach(function() {
        this.comb.configure({ 'vendor-prefix-align': true });
    });

    describe('process', function() {
        it('Should align prexied values', function() {
            return this.shouldBeEqual('value.sass', 'value.expected.sass');
        });

        it('Should not align prefixed property names', function() {
            return this.shouldBeEqual('property.sass');
        });
    });
});
