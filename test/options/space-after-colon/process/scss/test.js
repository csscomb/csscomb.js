describe.skip('options/space-after-colon (scss):', function() {
    describe('process', function() {
        it('Space after colon should not affect pseudo elements', function() {
            this.comb.configure({ 'space-after-colon': 1 });
            return this.shouldBeEqual('pseudo-elements.scss', 'pseudo-elements.expected.scss');
        });
    });
});
