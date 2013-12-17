var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/rule-indent', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Invalid Number value should not change rule indent', function() {
        var input = 'a {\n color: red }';
        comb.configure({ 'rule-indent': 3.5 });
        assert.equal(comb.processString(input), input);
    });

    it('Invalid String value should not change rule indent', function() {
        var input = 'a {\n color: red }';
        comb.configure({ 'rule-indent': 'foobar' });
        assert.equal(comb.processString(input), input);
    });

    it('Valid Number value should set equal space indent', function() {
        comb.configure({ 'rule-indent': 3 });
        assert.equal(
            comb.processString('a {\n color: red }'),
            'a {\n   color: red }'
        );
    });

    it('Valid String value should set equal indent', function() {
        comb.configure({ 'rule-indent': '\t' });
        assert.equal(
            comb.processString(
                'a{color:red;background:#fff}\n' +
                'a { color: red; background: #fff; }\n' +
                'a {\ncolor:red;\n\nbackground: #fff}\n' +
                'a { /* foo */ color:red; /* bar */\n\nbackground: #fff\n}\n'
            ),
            'a{\n\tcolor:red;\n\tbackground:#fff}\n' +
            'a {\n\tcolor: red;\n\tbackground: #fff; }\n' +
            'a {\n\tcolor:red;\n\n\tbackground: #fff}\n' +
            'a { /* foo */\n\tcolor:red; /* bar */\n\n\tbackground: #fff\n}\n'
        );
    });

    it('Valid value should ignore empty blocks', function() {
        comb.configure({ 'rule-indent': '  ' });
        assert.equal(
            comb.processString('a {}'),
            'a {}'
        );
    });

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect the empty rule-indent option', function() {
        should_detect(
            ['rule-indent'],
            'a{\ncolor: red\n}',
            {
                'rule-indent': ''
            }
        );
    });

    it('Should detect the rule-indent option equal to four spaces', function() {
        should_detect(
            ['rule-indent'],
            'a{\n    color: red\n}',
            {
                'rule-indent': '    '
            }
        );
    });

    it('Should detect the rule-indent option equal to a tab', function() {
        should_detect(
            ['rule-indent'],
            'a{\n\tcolor: red\n}',
            {
                'rule-indent': '\t'
            }
        );
    });

    it('Should detect the rule-indent option equal to two spaces inside a mq', function() {
        should_detect(
            ['rule-indent'],
            '@media all {\n  .input__control {\n    color: #000;\n  }\n}',
            {
                'rule-indent': '  '
            }
        );
    });

    it('Should detect the rule-indent option equal to a tab with a lot of whitespaces', function() {
        should_detect(
            ['rule-indent'],
            'a{\n\t\n\tcolor: red\n}',
            {
                'rule-indent': '\t'
            }
        );
    });
});
