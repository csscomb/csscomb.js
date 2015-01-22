describe('options/always-semicolon (sass)', function() {
    beforeEach(function() {
        this.comb.configure({ 'always-semicolon': true });
    });

    it('Should not add semicolon', function() {
        this.shouldBeEqual('test.sass');
    });
});
