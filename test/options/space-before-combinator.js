describe('options/space-before-combinator:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value => should not change anything', function() {
        this.comb.configure({ 'space-before-combinator': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'space-before-combinator': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'space-before-combinator': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space before combinator', function() {
        this.comb.configure({ 'space-before-combinator': 0 });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space before combinator', function() {
        this.comb.configure({ 'space-before-combinator': '  ' });
        this.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space before combinator', function() {
        this.comb.configure({ 'space-before-combinator': '\n    ' });
        this.shouldBeEqual('test.css', 'test-3.expected.css');
    });

    it('Should detect no whitespaces before combinator', function() {
        this.shouldDetect(
            ['space-before-combinator'],
            'a+b { color:red }',
            { 'space-before-combinator': '' }
        );
    });

    it('Should detect a space before combinator', function() {
        this.shouldDetect(
            ['space-before-combinator'],
            'a + b { color:red }',
            { 'space-before-combinator': ' ' }
        );
    });

    it('Should detect a space before combinator in long selector', function() {
        this.shouldDetect(
            ['space-before-combinator'],
            'a + b ~ c>d { color:red }',
            { 'space-before-combinator': ' ' }
        );
    });

    it('Should detect a space before combinator in long selector, test 2', function() {
        this.shouldDetect(
            ['space-before-combinator'],
            'a>b + c + d { color:red }',
            { 'space-before-combinator': ' ' }
        );
    });

    it('Should detect no whitespaces before combinator in long selector', function() {
        this.shouldDetect(
            ['space-before-combinator'],
            'a+b ~ c+d { color:red }',
            { 'space-before-combinator': '' }
        );
    });

    it('Shouldn’t detect whitespaces before combinator in selector without combinators', function() {
        this.shouldDetect(
            ['space-before-combinator'],
            'a { color:red }',
            {}
        );
    });
});

