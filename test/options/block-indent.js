var assert = require('assert');

describe('options/block-indent', function() {
    it('Invalid Number value should not change space after brace', function() {
        var input = 'a { color: red }';
        this.comb.configure({ 'block-indent': 3.5 });
        assert.equal(this.comb.processString(input), input);
    });

    it('Invalid String value should not change space after brace', function() {
        var input = 'a { color: red }';
        this.comb.configure({ 'block-indent': 'foobar' });
        assert.equal(this.comb.processString(input), input);
    });

    it('Boolean value should not change space after brace', function() {
        var input = ' \n a { color: red }  @media all {.input__control { color: #000;\n}\n}';
        this.comb.configure({ 'block-indent': true });
        assert.equal(this.comb.processString(input), input);
    });

    it('Valid Number value should set equal space after brace', function() {
        this.comb.configure({ 'block-indent': 3 });
        assert.equal(
            this.comb.processString(' a\n{ color: red }  @media all { .input__control\n{ color: #000;\n}\n}'),
            'a\n{ color: red \n}\n@media all {\n   .input__control\n   { color: #000;\n   }\n}'
        );
    });
    it('Valid String value should set equal space after brace', function() {
        this.comb.configure({ 'block-indent': '\t' });
        assert.equal(
            this.comb.processString(' a { color: red }  @media all { .input__control\n{ color: #000;\n}\n}'),
            'a { color: red \n}\n@media all {\n\t.input__control\n\t{ color: #000;\n\t}\n}'
        );
    });

    it('Should detect the block-indent option set to four spaces', function() {
        this.shouldDetect(
            ['block-indent'],
            ' \na { color: red \n}\n@media all {\n    .input__control { color: #000;\n    }\n}',
            {
                'block-indent': '    '
            }
        );
    });

    it('Should detect the block-indent option set to three spaces', function() {
        this.shouldDetect(
            ['block-indent'],
            'a\n{ color: red \n}\n@media all {\n   .input__control\n   { color: #000;\n   }\n}',
            {
                'block-indent': '   '
            }
        );
    });

    it('Should detect the block-indent option set to a tab', function() {
        this.shouldDetect(
            ['block-indent'],
            'a { color: red \n}\n@media all {\n\t.input__control\n\t{ color: #000;\n\t}\n}',
            {
                'block-indent': '\t'
            }
        );
    });
    it('Should detect the block-indent option set to an empty string', function() {
        this.shouldDetect(
            ['block-indent'],
            'a { color: red \n}\n@media all {\n.input__control\n{ color: #000;\n}\n}',
            {
                'block-indent': ''
            }
        );
    });
    it('Should detect the block-indent option in a complex case', function() {
        this.shouldDetect(
            ['block-indent'],
            'a { color: red \n}\n@media all {\n\t.input__control\n\t{ color: #000;\n\t\n\t\n\t\n\t}\n}',
            {
                'block-indent': '\t'
            }
        );
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
});
