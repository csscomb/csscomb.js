var assert = require('assert');

describe('options/rule-indent', function() {
    it('Invalid Number value should not change rule indent', function() {
        var input = 'a {\n color: red }';
        this.comb.configure({ 'rule-indent': 3.5 });
        assert.equal(this.comb.processString(input), input);
    });

    it('Invalid String value should not change rule indent', function() {
        var input = 'a {\n color: red }';
        this.comb.configure({ 'rule-indent': 'foobar' });
        assert.equal(this.comb.processString(input), input);
    });

    it('Valid Number value should set equal space indent', function() {
        this.comb.configure({ 'rule-indent': 3 });
        assert.equal(
            this.comb.processString('a {\n color: red }'),
            'a {\n   color: red }'
        );
    });

    it('Valid String value should set equal indent', function() {
        this.comb.configure({ 'rule-indent': '\t' });
        assert.equal(
            this.comb.processString(
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
        this.comb.configure({ 'rule-indent': '  ' });
        assert.equal(
            this.comb.processString('a {}'),
            'a {}'
        );
    });

    it('Should detect the empty rule-indent option', function() {
        this.shouldDetect(
            ['rule-indent'],
            'a{\ncolor: red\n}',
            {
                'rule-indent': ''
            }
        );
    });

    it('Should detect the rule-indent option equal to four spaces', function() {
        this.shouldDetect(
            ['rule-indent'],
            'a{\n    color: red\n}',
            {
                'rule-indent': '    '
            }
        );
    });

    it('Should detect the rule-indent option equal to a tab', function() {
        this.shouldDetect(
            ['rule-indent'],
            'a{\n\tcolor: red\n}',
            {
                'rule-indent': '\t'
            }
        );
    });

    it('Should detect the rule-indent option equal to two spaces inside a mq', function() {
        this.shouldDetect(
            ['rule-indent'],
            '@media all {\n  .input__control {\n    color: #000;\n  }\n}',
            {
                'rule-indent': '  '
            }
        );
    });

    it('Should detect the rule-indent option equal to a tab with a lot of whitespaces', function() {
        this.shouldDetect(
            ['rule-indent'],
            'a{\n\t\n\tcolor: red\n}',
            {
                'rule-indent': '\t'
            }
        );
    });
});
