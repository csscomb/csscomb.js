describe('options/space-after-selector-delimiter (sass):', function() {
    it('Issue 238', function() {
        this.comb.configure({ 'space-after-selector-delimiter': '\n' });
        this.shouldBeEqual('issue-238.sass', 'issue-238.expected.sass');
    });
});
