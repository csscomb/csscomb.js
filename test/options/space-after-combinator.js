describe('options/space-after-combinator:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value => should not change anything', function() {
        this.comb.configure({ 'space-after-combinator': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'space-after-combinator': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'space-after-combinator': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space after combinator', function() {
        this.comb.configure({ 'space-after-combinator': 0 });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space after combinator', function() {
        this.comb.configure({ 'space-after-combinator': '  ' });
        this.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space after combinator', function() {
        this.comb.configure({ 'space-after-combinator': '\n    ' });
        this.shouldBeEqual('test.css', 'test-3.expected.css');
    });

    it('Should detect no whitespaces after combinator', function() {
        this.shouldDetect(
            ['space-after-combinator'],
            'a+b { color:red }',
            { 'space-after-combinator': '' }
        );
    });

    it('Should detect a space after combinator', function() {
        this.shouldDetect(
            ['space-after-combinator'],
            'a + \n b { color:red }',
            { 'space-after-combinator': ' \n ' }
        );
    });

    it('Should detect a space after combinator in long selector', function() {
        this.shouldDetect(
            ['space-after-combinator'],
            'a + b ~ c>d { color:red }',
            { 'space-after-combinator': ' ' }
        );
    });

    it('Should detect a space after combinator in long selector, test 2', function() {
        this.shouldDetect(
            ['space-after-combinator'],
            'a>b + c + d { color:red }',
            { 'space-after-combinator': ' ' }
        );
    });

    it('Should detect no whitespaces after combinator in long selector', function() {
        this.shouldDetect(
            ['space-after-combinator'],
            'a+b ~ c+d { color:red }',
            { 'space-after-combinator': '' }
        );
    });

    it('Shouldn’t detect whitespaces after combinator in selector without combinators', function() {
        this.shouldDetect(
            ['space-after-combinator'],
            'a { color:red }',
            {}
        );
    });
});

