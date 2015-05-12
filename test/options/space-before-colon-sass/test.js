describe('options/space-before-colon-sass:', function() {
    it('Should correct space', function() {
        this.comb.configure({ 'space-before-colon': 1 });
        this.shouldBeEqual('test.sass', 'test.expected.sass');
    });

    it('Should not correct space', function() {
        this.comb.configure({ 'space-before-colon': 1 });
        this.shouldBeEqual('test2.sass');
    });
});

