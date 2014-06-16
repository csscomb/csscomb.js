describe('options/space-after-declaration:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value => should not change anything', function() {
        this.comb.configure({ 'space-after-declaration': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'space-after-declaration': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'space-after-declaration': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space after declaration', function() {
        this.comb.configure({ 'space-after-declaration': 0 });
        this.shouldBeEqual('integer-value.css', 'integer-value.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space after declaration', function() {
        this.comb.configure({ 'space-after-declaration': ' ' });
        this.shouldBeEqual('space-value.css', 'space-value.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space after declaration', function() {
        this.comb.configure({ 'space-after-declaration': '\n    ' });
        this.shouldBeEqual('space-newline-value.css', 'space-newline-value.expected.css');
    });

    it('Should leave comments as is', function() {
        this.comb.configure({ 'space-after-declaration': 1 });
        this.shouldBeEqual('comments.css', 'comments.expected.css');
    });

    it('Issue 239', function() {
        this.comb.configure({ 'space-after-declaration': '\n    ' });
        this.shouldBeEqual('issue-239.css', 'issue-239.expected.css');
    });
});
