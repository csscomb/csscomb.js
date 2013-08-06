var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/stick-brace', function() {
    var comb;
    beforeEach(function() {
        comb = new Comb();
    });
    it('Invalid String should not change space after brace', function() {
        comb.configure({ 'stick-brace': 'foobar' });
        assert.equal(
            comb.processString('a { color: red }'),
            'a { color: red }'
        );
    });
    it('True Boolean value should set 1 space after brace', function() {
        comb.configure({ 'stick-brace': true });
        assert.equal(
            comb.processString(
                'a { color: red }\n' +
                'b{color:blue}\n' +
                'i \t\t \n{font:0/0 a}'
            ),
            'a { color: red }\n' +
            'b {color:blue}\n' +
            'i {font:0/0 a}'
        );
    });
    it('Valid String value should set equal space after brace', function() {
        comb.configure({ 'stick-brace': '\n' });
        assert.equal(
            comb.processString(
                'a { color: red }\n' +
                'b{color:blue}\n' +
                'i \t\t \n{font:0/0 a}'
            ),
            'a\n{ color: red }\n' +
            'b\n{color:blue}\n' +
            'i\n{font:0/0 a}'
        );
    });
});
