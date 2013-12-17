var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/stick-brace', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Boolean value should not change space before brace', function() {
        var input = 'a { color: red }';
        comb.configure({ 'stick-brace': 'foobar' });
        assert.equal(comb.processString(input), input);
    });

    it('Invalid String should not change space before brace', function() {
        var input = 'a { color: red }';
        comb.configure({ 'stick-brace': 'foobar' });
        assert.equal(comb.processString(input), input);
    });

    it('Invalid Number should not change space before brace', function() {
        var input = 'a { color: red }';
        comb.configure({ 'stick-brace': 3.5 });
        assert.equal(comb.processString(input), input);
    });

    it('Valid Number value should set equal space before brace', function() {
        comb.configure({ 'stick-brace': 0 });
        assert.equal(
            comb.processString('a {color:red }'),
            'a{color:red }'
        );
    });

    it('Valid String value should set equal space before brace', function() {
        comb.configure({ 'stick-brace': '\n' });
        assert.equal(
            comb.processString(
                'a{ color: red }' +
                'a, b /* i */ { color: red; }' +
                'a \t\t \n{color:red\n \n}' +
                'a /* foo */ {color:red ;\n}' +
                '@media all { .input__control { color: #000;\n \n }\t}'
            ),
            'a\n{ color: red }' +
            'a, b /* i */\n{ color: red; }' +
            'a\n{color:red\n \n}' +
            'a /* foo */\n{color:red ;\n}' +
            '@media all\n{ .input__control\n{ color: #000;\n \n }\t}'
        );
    });
    it('Empty String value should set no space before brace', function() {
        comb.configure({ 'stick-brace': '' });
        assert.equal(
            comb.processString(
                'a{ color: red }' +
                'a, b /* i */ { color: red; }' +
                'a \t\t \n{color:red\n \n}' +
                'a /* foo */ {color:red ;\n}' +
                '@media all { .input__control { color: #000;\n \n }\t}'
            ),
            'a{ color: red }' +
            'a, b /* i */{ color: red; }' +
            'a{color:red\n \n}' +
            'a /* foo */{color:red ;\n}' +
            '@media all{ .input__control{ color: #000;\n \n }\t}'
        );
    });

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect the empty stick-brace option', function() {
        should_detect(
            ['stick-brace'],
            'a{ color: red }',
            {
                'stick-brace': ''
            }
        );
    });

    it('Should detect the stick-brace option equal to a single space', function() {
        should_detect(
            ['stick-brace'],
            'a {\ncolor: red }',
            {
                'stick-brace': ' '
            }
        );
    });

    it('Should detect the stick-brace option equal to a newline with spaces', function() {
        should_detect(
            ['stick-brace'],
            '.input__control\n    { color: #000;\n \n }',
            {
                'stick-brace': '\n    '
            }
        );
    });

    it('Should detect the stick-brace option equal to a newline when nested in mq', function() {
        should_detect(
            ['stick-brace'],
            '@media all\n{\n    .input__control\n    { color: #000;\n \n }\t}',
            {
                'stick-brace': '\n'
            }
        );
    });
});
