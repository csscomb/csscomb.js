var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/combinator-space', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Number value should not change space around combinator', function() {
        var input = 'a >b { color: red }';
        comb.configure({ 'combinator-space': 2 });
        assert.equal(comb.processString(input), input);
    });

    it('String value should not change space around combinator', function() {
        var input = 'a >b { color: red }';
        comb.configure({ 'combinator-space': 'foobar' });
        assert.equal(comb.processString(input), input);
    });

    it('Boolean value should not change space around combinator', function() {
        var input = 'a >b { color: red }';
        comb.configure({ 'combinator-space': true });
        assert.equal(comb.processString(input), input);
    });

    it('Array of strings should set proper spaces around combinator', function() {
        comb.configure({ 'combinator-space': [' ', '\n'] });
        assert.equal(
            comb.processString(
                'a>b { color: red }' +
                'a> b { color: red }' +
                'a >b { color: red }' +
                'a+b { color: red }' +
                'a+ b { color: red }' +
                'a +b { color: red }' +
                'a~b { color: red }' +
                'a~ b { color: red }' +
                'a ~b { color: red }' +
                'a ~b+ c>d { color: red }'
            ),
            'a >\nb { color: red }' +
            'a >\nb { color: red }' +
            'a >\nb { color: red }' +
            'a +\nb { color: red }' +
            'a +\nb { color: red }' +
            'a +\nb { color: red }' +
            'a ~\nb { color: red }' +
            'a ~\nb { color: red }' +
            'a ~\nb { color: red }' +
            'a ~\nb +\nc >\nd { color: red }'
        );
    });

    it('Array of numbers should set proper spaces around combinator', function() {
        comb.configure({ 'combinator-space': [0, 1] });
        assert.equal(
            comb.processString(
                'a>b { color: red }' +
                'a> b { color: red }' +
                'a >b { color: red }' +
                'a+b { color: red }' +
                'a+ b { color: red }' +
                'a +b { color: red }' +
                'a~b { color: red }' +
                'a~ b { color: red }' +
                'a ~b { color: red }' +
                'a ~b+ c>d { color: red }'
            ),
            'a> b { color: red }' +
            'a> b { color: red }' +
            'a> b { color: red }' +
            'a+ b { color: red }' +
            'a+ b { color: red }' +
            'a+ b { color: red }' +
            'a~ b { color: red }' +
            'a~ b { color: red }' +
            'a~ b { color: red }' +
            'a~ b+ c> d { color: red }'
        );
    });

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect no whitespaces around combinator', function() {
        should_detect(
            ['combinator-space'],
            'a+b { color:red }',
            {
                'combinator-space': ['', '']
            }
        );
    });

    it('Should detect a space around combinator', function() {
        should_detect(
            ['combinator-space'],
            'a + b { color:red }',
            {
                'combinator-space': [' ', ' ']
            }
        );
    });

    it('Should detect a mixed spaces around combinator', function() {
        should_detect(
            ['combinator-space'],
            'a + \n b { color:red }',
            {
                'combinator-space': [' ', ' \n ']
            }
        );
    });

    it('Should detect a space around combinator in long selector', function() {
        should_detect(
            ['combinator-space'],
            'a + b ~ c>d { color:red }',
            {
                'combinator-space': [' ', ' ']
            }
        );
    });

    it('Should detect a space around combinator in long selector, test 2', function() {
        should_detect(
            ['combinator-space'],
            'a>b + c + d { color:red }',
            {
                'combinator-space': [' ', ' ']
            }
        );
    });

    it('Should detect no whitespaces around combinator in long selector', function() {
        should_detect(
            ['combinator-space'],
            'a+b ~ c+d { color:red }',
            {
                'combinator-space': ['', '']
            }
        );
    });

    it('Shouldn’t detect whitespaces around combinator in selector without combinators', function() {
        should_detect(
            ['combinator-space'],
            'a { color:red }',
            {}
        );
    });
});
