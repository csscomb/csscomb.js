describe('options/space-after-colon (less):', function() {
    it('Space after colon should not affect pseudo elements', function() {
        this.comb.configure({ 'space-after-colon': 1 });
        this.shouldBeEqual('pseudo-elements.less', 'pseudo-elements.expected.less');
    });
});
