describe('options/rule-delimiter:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value (incorrect value) => should not change anything', function() {
        this.comb.configure({ 'rule-delimiter': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Integer value (one newline) => should set proper space between rulesets', function() {
        this.comb.configure({ 'rule-delimiter': '\n' });
        this.shouldBeEqual('integer-value.css', 'integer-value.expected.css');
    });

    it('Valid string value (2 newlines) => should set proper space between rulesets', function() {
        this.comb.configure({ 'rule-delimiter': '\n\n' });
        this.shouldBeEqual('space-newline-value.css', 'space-newline-value.expected.css');
    });

    it('Should leave comments as is', function() {
        this.comb.configure({ 'rule-delimiter': '\n\n' });
        this.shouldBeEqual('comments.css', 'comments.expected.css');
    });
});

