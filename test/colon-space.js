var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/colon-space', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('String value should not change space around colon', function() {
        var input = 'a { color : red }';
        comb.configure({ 'colon-space': ' ' });
        assert.equal(comb.processString(input), input);
    });

    it('Boolean value should not change space around colon', function() {
        var input = 'a { color : red }';
        comb.configure({ 'colon-space': true });
        assert.equal(comb.processString(input), input);
    });

    it('Array of strings should set proper space around colon', function() {
        comb.configure({ 'colon-space': ['', ' '] });
        assert.equal(
            comb.processString(
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
        comb.configure({ 'colon-space': [0, 1] });
        assert.equal(
            comb.processString(
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

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect no whitespaces around colon', function() {
        should_detect(
            ['colon-space'],
            'a { color:red }',
            {
                'colon-space': ['', '']
            }
        );
    });

    it('Should detect space after colon', function() {
        should_detect(
            ['colon-space'],
            'a { color: red }',
            {
                'colon-space': ['', ' ']
            }
        );
    });

    it('Should detect space after colon from two variants.', function() {
        should_detect(
            ['colon-space'],
            'a { color: red; color:red }',
            {
                'colon-space': ['', ' ']
            }
        );
    });

    it('Should detect no whitespaces around colon along three variants', function() {
        should_detect(
            ['colon-space'],
            'a { color: red; background:red } b { width:10px }',
            {
                'colon-space': ['', '']
            }
        );
    });

    it('Should detect space around colon', function() {
        should_detect(
            ['colon-space'],
            'a { color : red; background :red } b { width:10px }',
            {
                'colon-space': [' ', ' ']
            }
        );
    });

    it('Should detect different whitespaces around colon', function() {
        should_detect(
            ['colon-space'],
            'a { color :  red; background :red } b { width :  10px }',
            {
                'colon-space': [' ', '  ']
            }
        );
    });

    it('Should detect whitespace after colon', function() {
        should_detect(
            ['colon-space'],
            '.input\n{\n    position: relative;\n\n    display: inline-block;\n\n    width: 100%;\n}',
            {
                'colon-space': ['', ' ']
            }
        );
    });
});
