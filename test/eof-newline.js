var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/eof-newline', function() {
    var comb;
    beforeEach(function() {
        comb = new Comb();
    });
    it('Invalid value should not change trim trailing brac', function() {
        comb.configure({ 'eof-newline': 'foobar' });
        assert.equal(
            comb.processString('a { color: red }  \n'),
            'a { color: red }  \n'
        );
    });
    it('Boolean true value should insert line-break at eof', function() {
        comb.configure({ 'eof-newline': true });
        assert.equal(
            comb.processString(
                'a {color:red}  '
            ),
            'a {color:red}  \n'
        );
    });
    it('Boolean false value should remove line-break from eof', function() {
        comb.configure({ 'eof-newline': false });
        assert.equal(
            comb.processString(
                'a {color:red}  \n'
            ),
            'a {color:red}  '
        );
    });

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Shouldn’t detect eof newline', function() {
        should_detect(
            ['eof-newline'],
            'a { color: red }',
            {
                'eof-newline': false
            }
        );
    });

    it('Should detect eof newline', function() {
        should_detect(
            ['eof-newline'],
            'a { color: red }\n',
            {
                'eof-newline': true
            }
        );
    });

    it('Shouldn’t detect eof newline with spaces at the end', function() {
        should_detect(
            ['eof-newline'],
            'a { color: red }  ',
            {
                'eof-newline': false
            }
        );
    });

    it('Should detect eof newline with mixed spaces at the end', function() {
        should_detect(
            ['eof-newline'],
            'a { color: red } \n ',
            {
                'eof-newline': true
            }
        );
    });
});
