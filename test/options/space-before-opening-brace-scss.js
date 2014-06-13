describe('options/space-before-opening-brace (scss):', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Issue 231', function() {
        this.comb.configure({ 'space-before-opening-brace': 1 });
        this.shouldBeEqual('issue-231.scss', 'issue-231.expected.scss');
    });
});
