describe('options/unitless-zero (less)', function() {
    it('Issue 389', function() {
        this.comb.configure({ 'unitless-zero': true });
        this.shouldBeEqual('issue-389.less');
    });
});
