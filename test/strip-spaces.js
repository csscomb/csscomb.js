var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/strip-space', function() {
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
});
