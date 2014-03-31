describe('options/space-after-colon (sass):', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should set proper space if colon is after property name', function() {
        this.comb.configure({ 'space-after-colon': 2 });
        this.shouldBeEqual('colon-after-property-name.sass', 'colon-after-property-name.expected.sass');
    });

    it('Should not change space after colon which is before property name', function() {
        this.comb.configure({ 'space-after-colon': 1 });
        this.shouldBeEqual('colon-before-property-name.sass', 'colon-before-property-name.expected.sass');
    });
});
