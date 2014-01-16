describe('options/space-after-opening-brace:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value => should not change anything', function() {
        this.comb.configure({ 'space-after-opening-brace': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'space-after-opening-brace': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'space-after-opening-brace': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space after {', function() {
        this.comb.configure({ 'space-after-opening-brace': 0 });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space after {', function() {
        this.comb.configure({ 'space-after-opening-brace': '  ' });
        this.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space after {', function() {
        this.comb.configure({ 'space-after-opening-brace': '\n    ' });
        this.shouldBeEqual('test.css', 'test-3.expected.css');
    });

    it('Should detect no whitespace', function() {
        this.shouldDetect(
            ['space-after-opening-brace'],
            'a{top:0}',
            { 'space-after-opening-brace': '' }
        );
    });

    it('Should detect whitespace', function() {
        this.shouldDetect(
            ['space-after-opening-brace'],
            'a{\n\ttop:0}',
            { 'space-after-opening-brace': '\n\t' }
        );
    });

    it('Should detect no whitespace (2 blocks)', function() {
        this.shouldDetect(
            ['space-after-opening-brace'],
            'a{top:0} b{\n left:0}',
            { 'space-after-opening-brace': '' }
        );
    });

    it('Should detect whitespace (2 blocks)', function() {
        this.shouldDetect(
            ['space-after-opening-brace'],
            'a{ top:0 } b{left:0}',
            { 'space-after-opening-brace': ' ' }
        );
    });

    it('Should detect no whitespace (3 blocks)', function() {
        this.shouldDetect(
            ['space-after-opening-brace'],
            'a{top:0} b { left: 0 } c{\n\tright:0}',
            { 'space-after-opening-brace': '' }
        );
    });

    it('Should detect whitespace (3 blocks)', function() {
        this.shouldDetect(
            ['space-after-opening-brace'],
            'a{\ntop:0} b{\nleft:0} c{\n  right:0}',
            { 'space-after-opening-brace': '\n' }
        );
    });
});

