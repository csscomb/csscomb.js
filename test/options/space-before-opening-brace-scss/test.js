describe.skip('options/space-before-opening-brace (scss):', function() {
    it('Issue 231', function() {
        this.comb.configure({ 'space-before-opening-brace': 1 });
        this.shouldBeEqual('issue-231.scss', 'issue-231.expected.scss');
    });
});
