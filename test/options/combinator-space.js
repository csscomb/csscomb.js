var assert = require('assert');

describe('options/combinator-space', function() {
    it('Number value should not change space around combinator', function() {
        var input = 'a >b { color: red }';
        this.comb.configure({ 'combinator-space': 2 });
        assert.equal(this.comb.processString(input), input);
    });

    it('String value should not change space around combinator', function() {
        var input = 'a >b { color: red }';
        this.comb.configure({ 'combinator-space': 'foobar' });
        assert.equal(this.comb.processString(input), input);
    });

    it('Boolean value should not change space around combinator', function() {
        var input = 'a >b { color: red }';
        this.comb.configure({ 'combinator-space': true });
        assert.equal(this.comb.processString(input), input);
    });

    it('Array of strings should set proper spaces around combinator', function() {
        this.comb.configure({ 'combinator-space': [' ', '\n'] });
        assert.equal(
            this.comb.processString(
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
        this.comb.configure({ 'combinator-space': [0, 1] });
        assert.equal(
            this.comb.processString(
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

    it('Should detect no whitespaces around combinator', function() {
        this.shouldDetect(
            ['combinator-space'],
            'a+b { color:red }',
            {
                'combinator-space': ['', '']
            }
        );
    });

    it('Should detect a space around combinator', function() {
        this.shouldDetect(
            ['combinator-space'],
            'a + b { color:red }',
            {
                'combinator-space': [' ', ' ']
            }
        );
    });

    it('Should detect a mixed spaces around combinator', function() {
        this.shouldDetect(
            ['combinator-space'],
            'a + \n b { color:red }',
            {
                'combinator-space': [' ', ' \n ']
            }
        );
    });

    it('Should detect a space around combinator in long selector', function() {
        this.shouldDetect(
            ['combinator-space'],
            'a + b ~ c>d { color:red }',
            {
                'combinator-space': [' ', ' ']
            }
        );
    });

    it('Should detect a space around combinator in long selector, test 2', function() {
        this.shouldDetect(
            ['combinator-space'],
            'a>b + c + d { color:red }',
            {
                'combinator-space': [' ', ' ']
            }
        );
    });

    it('Should detect no whitespaces around combinator in long selector', function() {
        this.shouldDetect(
            ['combinator-space'],
            'a+b ~ c+d { color:red }',
            {
                'combinator-space': ['', '']
            }
        );
    });

    it('Shouldn’t detect whitespaces around combinator in selector without combinators', function() {
        this.shouldDetect(
            ['combinator-space'],
            'a { color:red }',
            {}
        );
    });
});
