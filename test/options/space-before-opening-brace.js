describe('options/space-before-opening-brace:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value => should not change anything', function() {
        this.comb.configure({ 'space-before-opening-brace': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'space-before-opening-brace': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'space-before-opening-brace': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space before {', function() {
        this.comb.configure({ 'space-before-opening-brace': 0 });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space before {', function() {
        this.comb.configure({ 'space-before-opening-brace': '  ' });
        this.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space before {', function() {
        this.comb.configure({ 'space-before-opening-brace': '\n    ' });
        this.shouldBeEqual('test.css', 'test-3.expected.css');
    });

    it('Issue 232', function() {
        this.comb.configure({ 'space-before-opening-brace': 1 });
        this.shouldBeEqual('issue-232.css', 'issue-232.expected.css');
    });

    it('Should detect no whitespace', function() {
        this.shouldDetect(
            ['space-before-opening-brace'],
            'a{top:0}',
            { 'space-before-opening-brace': '' }
        );
    });

    it('Should detect whitespace', function() {
        this.shouldDetect(
            ['space-before-opening-brace'],
            'a \n {top:0}',
            { 'space-before-opening-brace': ' \n ' }
        );
    });

    it('Should detect no whitespace (2 blocks)', function() {
        this.shouldDetect(
            ['space-before-opening-brace'],
            'a{top:0} b {left:0}',
            { 'space-before-opening-brace': '' }
        );
    });

    it('Should detect whitespace (2 blocks)', function() {
        this.shouldDetect(
            ['space-before-opening-brace'],
            'a {top:0} b{left:0}',
            { 'space-before-opening-brace': ' ' }
        );
    });

    it('Should detect no whitespace (3 blocks)', function() {
        this.shouldDetect(
            ['space-before-opening-brace'],
            'a {top:0} b{left:0} c{right:0}',
            { 'space-before-opening-brace': '' }
        );
    });

    it('Should detect whitespace (3 blocks)', function() {
        this.shouldDetect(
            ['space-before-opening-brace'],
            'a{top:0} b {left:0} c {right:0}',
            { 'space-before-opening-brace': ' ' }
        );
    });
});

