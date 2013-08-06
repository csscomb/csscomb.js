var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/strip-space', function() {
    var comb;
    beforeEach(function() {
        comb = new Comb();
    });
    it('Invalid value should not change trim trailing brace', function() {
        comb.configure({ 'strip-spaces': 'foobar' });
        assert.equal(
            comb.processString('a { color: red }'),
            'a { color: red }'
        );
    });
    it('True Boolean value should trim all trailing spaces', function() {
        comb.configure({ 'strip-spaces': true });
        assert.equal(
            comb.processString(
                'a { color: red }   \n' +
                'b{color:blue}\t  \n' +
                'i {font:0/0 a}'
            ),
            'a { color: red }\n' +
            'b{color:blue}\n' +
            'i {font:0/0 a}\n'
        );
    });
});
