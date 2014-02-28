describe('options/block-indent:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value => should not change anything', function() {
        this.comb.configure({ 'block-indent': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'block-indent': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'block-indent': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper number of spaces', function() {
        this.comb.configure({ 'block-indent': 0 });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value => should set proper number of spaces', function() {
        this.comb.configure({ 'block-indent': '    ' });
        this.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Should detect nothing with an empty block, test 1', function() {
        this.shouldDetect(
            ['block-indent'],
            'a{ }',
            {}
        );
    });

    it('Should detect nothing with an empty block, test 2', function() {
        this.shouldDetect(
            ['block-indent'],
            'a{}',
            {}
        );
    });

    it('Should detect correct number of spaces', function() {
        this.shouldDetect(
            ['block-indent'],
            'a{\n    top: 0;\n    color: tomato;\n}',
            { 'block-indent': '    ' }
        );
    });

    it('Should detect no indent for one-line code', function() {
        this.shouldDetect(
            ['block-indent'],
            'a{ top: 0; color: tomato; }',
            {}
        );
    });
    it('Valid string value => should set proper space after combnator', function() {
        this.comb.configure({ 'block-indent': '    ', 'space-before-closing-brace': '\n' });
        this.shouldBeEqual('test.css', 'test-3.expected.css');
    });
});
