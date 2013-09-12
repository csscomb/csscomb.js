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
});
