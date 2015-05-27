describe('options/always-semicolon (sass)', function() {
    beforeEach(function() {
        this.comb.configure({ 'always-semicolon': true });
    });

    describe('process', function() {
        it('Should not add semicolon', function() {
            this.shouldBeEqual('test.sass');
        });
    });
});
