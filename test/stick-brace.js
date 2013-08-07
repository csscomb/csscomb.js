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
                'a { color: red }' +
                'a{color:red}' +
                'a \t\t \n{color:red}' +
                'a /* foo */ {color:red}'
            ),
            'a { color: red }' +
            'a {color:red}' +
            'a {color:red}' +
            'a /* foo */ {color:red}'
        );
    });
    it('Valid String value should set equal space after brace', function() {
        comb.configure({ 'stick-brace': '\n' });
        assert.equal(
            comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a \t\t \n{color:red}' +
                'a /* foo */ {color:red}'
            ),
            'a\n{ color: red }' +
            'a\n{color:red}' +
            'a\n{color:red}' +
            'a /* foo */\n{color:red}'
        );
    });
});
