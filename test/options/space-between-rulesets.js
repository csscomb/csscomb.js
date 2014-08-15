describe('options/space-between-rulesets:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value => should not change anything', function() {
        this.comb.configure({ 'space-between-rulesets': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'space-between-rulesets': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'space-between-rulesets': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space between rulesets', function() {
        this.comb.configure({ 'space-between-rulesets': 0 });
        this.shouldBeEqual('integer-value.css', 'integer-value.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space between rulesets', function() {
        this.comb.configure({ 'space-between-rulesets': '  ' });
        this.shouldBeEqual('space-value.css', 'space-value.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space between rulesets', function() {
        this.comb.configure({ 'space-between-rulesets': '\n\n    ' });
        this.shouldBeEqual('space-newline-value.css', 'space-newline-value.expected.css');
    });

    it('Should leave comments as is', function() {
        this.comb.configure({ 'space-between-rulesets': '\n' });
        this.shouldBeEqual('comments.css', 'comments.expected.css');
    });
});

