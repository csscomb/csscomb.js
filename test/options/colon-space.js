var assert = require('assert');

describe('options/colon-space', function() {
    it('String value should not change space around colon', function() {
        var input = 'a { color : red }';
        this.comb.configure({ 'colon-space': ' ' });
        assert.equal(this.comb.processString(input), input);
    });

    it('Boolean value should not change space around colon', function() {
        var input = 'a { color : red }';
        this.comb.configure({ 'colon-space': true });
        assert.equal(this.comb.processString(input), input);
    });

    it('Array of strings should set proper space around colon', function() {
        this.comb.configure({ 'colon-space': ['', ' '] });
        assert.equal(
            this.comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}' +
                'a {color : /* foo */ red }' +
                'a {color /* bar */ : red }'
            ),
            'a { color: red }' +
            'a{color: red}' +
            'a {color: red}' +
            'a {color: /* foo */ red }' +
            'a {color /* bar */: red }'
        );
    });

    it('Array of numbers should set proper space around colon', function() {
        this.comb.configure({ 'colon-space': [0, 1] });
        assert.equal(
            this.comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}' +
                'a {color : /* foo */ red }' +
                'a {color /* bar */ : red }'
            ),
            'a { color: red }' +
            'a{color: red}' +
            'a {color: red}' +
            'a {color: /* foo */ red }' +
            'a {color /* bar */: red }'
        );
    });

    it('Should detect no whitespaces around colon', function() {
        this.shouldDetect(
            ['colon-space'],
            'a { color:red }',
            {
                'colon-space': ['', '']
            }
        );
    });

    it('Should detect space after colon', function() {
        this.shouldDetect(
            ['colon-space'],
            'a { color: red }',
            {
                'colon-space': ['', ' ']
            }
        );
    });

    it('Should detect space after colon from two variants.', function() {
        this.shouldDetect(
            ['colon-space'],
            'a { color: red; color:red }',
            {
                'colon-space': ['', ' ']
            }
        );
    });

    it('Should detect no whitespaces around colon along three variants', function() {
        this.shouldDetect(
            ['colon-space'],
            'a { color: red; background:red } b { width:10px }',
            {
                'colon-space': ['', '']
            }
        );
    });

    it('Should detect space around colon', function() {
        this.shouldDetect(
            ['colon-space'],
            'a { color : red; background :red } b { width:10px }',
            {
                'colon-space': [' ', ' ']
            }
        );
    });

    it('Should detect different whitespaces around colon', function() {
        this.shouldDetect(
            ['colon-space'],
            'a { color :  red; background :red } b { width :  10px }',
            {
                'colon-space': [' ', '  ']
            }
        );
    });

    it('Should detect whitespace after colon', function() {
        this.shouldDetect(
            ['colon-space'],
            '.input\n{\n    position: relative;\n\n    display: inline-block;\n\n    width: 100%;\n}',
            {
                'colon-space': ['', ' ']
            }
        );
    });
});
