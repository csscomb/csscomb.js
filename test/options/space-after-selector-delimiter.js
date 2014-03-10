describe('options/space-after-selector-delimiter:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value => should not change anything', function() {
        this.comb.configure({ 'space-after-selector-delimiter': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'space-after-selector-delimiter': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'space-after-selector-delimiter': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space after selector delimiter', function() {
        this.comb.configure({ 'space-after-selector-delimiter': 0 });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space after selector delimiter', function() {
        this.comb.configure({ 'space-after-selector-delimiter': '  ' });
        this.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space after selector delimiter', function() {
        this.comb.configure({ 'space-after-selector-delimiter': '\n    ' });
        this.shouldBeEqual('test.css', 'test-3.expected.css');
    });

    it('Should detect no whitespace', function() {
        this.shouldDetect(
            ['space-after-selector-delimiter'],
            'a,b{top:0}',
            { 'space-after-selector-delimiter': '' }
        );
    });

    it('Should detect whitespace', function() {
        this.shouldDetect(
            ['space-after-selector-delimiter'],
            'a, \n b {top:0}',
            { 'space-after-selector-delimiter': ' \n ' }
        );
    });

    it('Should detect no whitespace (2 blocks)', function() {
        this.shouldDetect(
            ['space-after-selector-delimiter'],
            'a,b{top:0} a, b{left:0}',
            { 'space-after-selector-delimiter': '' }
        );
    });

    it('Should detect whitespace (2 blocks)', function() {
        this.shouldDetect(
            ['space-after-selector-delimiter'],
            'a, b {top:0} b,a{left:0}',
            { 'space-after-selector-delimiter': ' ' }
        );
    });

    it('Should detect no whitespace (3 blocks)', function() {
        this.shouldDetect(
            ['space-after-selector-delimiter'],
            'a, b{top:0} b,c{left:0} c,d{right:0}',
            { 'space-after-selector-delimiter': '' }
        );
    });

    it('Should detect whitespace (3 blocks)', function() {
        this.shouldDetect(
            ['space-after-selector-delimiter'],
            'a,b{top:0} b, c{left:0} c, sd{right:0}',
            { 'space-after-selector-delimiter': ' ' }
        );
    });
});
