describe('options/space-after-colon (scss):', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Space after colon should not affect pseudo elements', function() {
        this.comb.configure({ 'space-after-colon': 1 });
        this.shouldBeEqual('pseudo-elements.scss', 'pseudo-elements.expected.scss');
    });
});
