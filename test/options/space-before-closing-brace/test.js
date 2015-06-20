describe('options/space-before-closing-brace:', function() {
    describe('process', function() {
        it('Array value => should not change anything', function() {
            this.comb.configure({ 'space-before-closing-brace': ['', ' '] });
            return this.shouldBeEqual('test.css');
        });

        it('Invalid string value => should not change anything', function() {
            this.comb.configure({ 'space-before-closing-brace': '  nani  ' });
            return this.shouldBeEqual('test.css');
        });

        it('Float number value => should not change anything', function() {
            this.comb.configure({ 'space-before-closing-brace': 3.5 });
            return this.shouldBeEqual('test.css');
        });

        it('Integer value => should set proper space before }', function() {
            this.comb.configure({ 'space-before-closing-brace': 0 });
            return this.shouldBeEqual('test.css', 'test.expected.css');
        });

        it('Valid string value (spaces only) => should set proper space before }', function() {
            this.comb.configure({ 'space-before-closing-brace': '  ' });
            return this.shouldBeEqual('test.css', 'test-2.expected.css');
        });

        it('Valid string value (spaces and newlines) => should set proper space before }', function() {
            this.comb.configure({ 'space-before-closing-brace': '\n    ' });
            return this.shouldBeEqual('test.css', 'test-3.expected.css');
        });
    });

    describe('detect', function() {
        it('Should detect no whitespace', function() {
            this.shouldDetect(
                ['space-before-closing-brace'],
                'a{top:0}',
                { 'space-before-closing-brace': '' }
            );
        });

        it('Should detect no whitespace (2 blocks)', function() {
            this.shouldDetect(
                ['space-before-closing-brace'],
                'a{top:0} b { color: tomato; }',
                { 'space-before-closing-brace': '' }
            );
        });

        it('Should detect whitespace', function() {
            this.shouldDetect(
                ['space-before-closing-brace'],
                'a { top:0 }',
                { 'space-before-closing-brace': ' ' }
            );
        });

        it('Should detect whitespace (2 blocks)', function() {
            this.shouldDetect(
                ['space-before-closing-brace'],
                'a { top:0 } b{color:tomato;}',
                { 'space-before-closing-brace': ' ' }
            );
        });

        it('Should detect whitespace (mix with block indent)', function() {
            this.shouldDetect(
                ['space-before-closing-brace', 'block-indent'],
                'a {\n  top:0\n  }\nb{\n  color:tomato;\n  }',
                { 'block-indent': '  ', 'space-before-closing-brace': '\n  ' }
            );
        });
    });
});

