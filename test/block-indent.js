var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/block-indent', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Invalid Number value should not change space after brace', function() {
        var input = 'a { color: red }';
        comb.configure({ 'block-indent': 3.5 });
        assert.equal(comb.processString(input), input);
    });

    it('Invalid String value should not change space after brace', function() {
        var input = 'a { color: red }';
        comb.configure({ 'block-indent': 'foobar' });
        assert.equal(comb.processString(input), input);
    });

    it('Boolean value should not change space after brace', function() {
        var input = ' \n a { color: red }  @media all {.input__control { color: #000;\n}\n}';
        comb.configure({ 'block-indent': true });
        assert.equal(comb.processString(input), input);
    });

    it('Valid Number value should set equal space after brace', function() {
        comb.configure({ 'block-indent': 3 });
        assert.equal(
            comb.processString(' a\n{ color: red }  @media all { .input__control\n{ color: #000;\n}\n}'),
            'a\n{ color: red \n}\n@media all {\n   .input__control\n   { color: #000;\n   }\n}'
        );
    });
    it('Valid String value should set equal space after brace', function() {
        comb.configure({ 'block-indent': '\t' });
        assert.equal(
            comb.processString(' a { color: red }  @media all { .input__control\n{ color: #000;\n}\n}'),
            'a { color: red \n}\n@media all {\n\t.input__control\n\t{ color: #000;\n\t}\n}'
        );
    });

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect the block-indent option set to four spaces', function() {
        should_detect(
            ['block-indent'],
            ' \na { color: red \n}\n@media all {\n    .input__control { color: #000;\n    }\n}',
            {
                'block-indent': '    '
            }
        );
    });

    it('Should detect the block-indent option set to three spaces', function() {
        should_detect(
            ['block-indent'],
            'a\n{ color: red \n}\n@media all {\n   .input__control\n   { color: #000;\n   }\n}',
            {
                'block-indent': '   '
            }
        );
    });

    it('Should detect the block-indent option set to a tab', function() {
        should_detect(
            ['block-indent'],
            'a { color: red \n}\n@media all {\n\t.input__control\n\t{ color: #000;\n\t}\n}',
            {
                'block-indent': '\t'
            }
        );
    });
    it('Should detect the block-indent option set to an empty string', function() {
        should_detect(
            ['block-indent'],
            'a { color: red \n}\n@media all {\n.input__control\n{ color: #000;\n}\n}',
            {
                'block-indent': ''
            }
        );
    });
    it('Should detect the block-indent option in a complex case', function() {
        should_detect(
            ['block-indent'],
            'a { color: red \n}\n@media all {\n\t.input__control\n\t{ color: #000;\n\t\n\t\n\t\n\t}\n}',
            {
                'block-indent': '\t'
            }
        );
    });
});
