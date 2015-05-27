describe('options/vendor-prefix-align', function() {
    beforeEach(function() {
        this.comb.configure({ 'vendor-prefix-align': true });
    });

    describe('process', function() {
        it('Should align prexied values', function() {
            this.shouldBeEqual('value.sass', 'value.expected.sass');
        });

        it('Should not align prefixed property names', function() {
            this.shouldBeEqual('property.sass');
        });
    });
});
