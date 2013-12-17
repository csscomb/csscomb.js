var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/strip-spaces', function() {
    var comb;
    beforeEach(function() {
        comb = new Comb();
    });
    it('Invalid value should not trim trailing spaces', function() {
        comb.configure({ 'strip-spaces': 'foobar' });
        assert.equal(
            comb.processString('a { color: red }  \n'),
            'a { color: red }  \n'
        );
    });
    it('Boolean true value should trim all trailing spaces', function() {
        comb.configure({ 'strip-spaces': true });
        assert.equal(
            comb.processString(
                'a { color: red }   \n' +
                'a{color:red}\t /* foobar */\t \n' +
                'a {color:red}  \n   \n'
            ),
            'a { color: red }\n' +
            'a{color:red}\t /* foobar */\n' +
            'a {color:red}\n'
        );
    });
    it('Boolean true value should trim trailing spaces at eof', function() {
        comb.configure({ 'strip-spaces': true });
        assert.equal(
            comb.processString(
                'a {color:red}  '
            ),
            'a {color:red}'
        );
    });

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect strip-spaces option set to `true`', function() {
        should_detect(
            ['strip-spaces'],
            'a { color: red }',
            {
                'strip-spaces': true
            }
        );
    });

    it('Should detect strip-spaces option set to `false`', function() {
        should_detect(
            ['strip-spaces'],
            'a { color: red }  ',
            {
                'strip-spaces': false
            }
        );
    });

    it('Should detect strip-spaces option set to `true` with newline', function() {
        should_detect(
            ['strip-spaces'],
            'a { color: red }\nb { color: blue }',
            {
                'strip-spaces': true
            }
        );
    });

    it('Should detect strip-spaces option set to `false` with newline', function() {
        should_detect(
            ['strip-spaces'],
            'a { color: red }  \nb { color: blue }',
            {
                'strip-spaces': false
            }
        );
    });

    it('Should detect strip-spaces option set to `true` inside a value', function() {
        should_detect(
            ['strip-spaces'],
            'a {\n  color:\n  red }',
            {
                'strip-spaces': true
            }
        );
    });

    it('Should detect strip-spaces option set to `false` inside a value', function() {
        should_detect(
            ['strip-spaces'],
            'a {\n  color: \n  red }',
            {
                'strip-spaces': false
            }
        );
    });

    it('Should detect strip-spaces option set to `true` if the only trailing space is the last newline', function() {
        should_detect(
            ['strip-spaces'],
            'a { color: red }\n',
            {
                'strip-spaces': true
            }
        );
    });

    it('Should detect strip-spaces option set to `false` if there is more than one newline at the end', function() {
        should_detect(
            ['strip-spaces'],
            'a { color: red }\n\n',
            {
                'strip-spaces': false
            }
        );
    });
});
