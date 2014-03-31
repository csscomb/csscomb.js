describe('options/always-semicolon (scss)', function() {
    beforeEach(function() {
        this.filename = __filename;
        this.comb.configure({ 'always-semicolon': true });
    });

    it('Should not add semicolon', function() {
        this.shouldBeEqual('test.sass');
    });
});
