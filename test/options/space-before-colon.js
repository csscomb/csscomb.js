describe('options/space-before-colon:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value => should not change anything', function() {
        this.comb.configure({ 'space-before-colon': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'space-before-colon': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'space-before-colon': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space before colon', function() {
        this.comb.configure({ 'space-before-colon': 0 });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space before colon', function() {
        this.comb.configure({ 'space-before-colon': '  ' });
        this.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space before colon', function() {
        this.comb.configure({ 'space-before-colon': '\n    ' });
        this.shouldBeEqual('test.css', 'test-3.expected.css');
    });

    it('Should detect no whitespaces', function() {
        this.shouldDetect(
            ['space-before-colon'],
            'a { color:red }',
            { 'space-before-colon': '' }
        );
    });

    it('Should detect no space from two variants', function() {
        this.shouldDetect(
            ['space-before-colon'],
            'a { color: red; color :red }',
            { 'space-before-colon': '' }
        );
    });

    it('Should detect no whitespaces along three variants', function() {
        this.shouldDetect(
            ['space-before-colon'],
            'a { color: red; background :red } b { width:10px }',
            { 'space-before-colon': '' }
        );
    });

    it('Should detect space', function() {
        this.shouldDetect(
            ['space-before-colon'],
            'a { color : red; background :red } b { width:10px }',
            { 'space-before-colon': ' ' }
        );
    });
});

