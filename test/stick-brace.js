var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/stick-brace', function() {
    var comb;
    beforeEach(function() {
        comb = new Comb();
    });
    it('Invalid String should not change space before brace', function() {
        comb.configure({ 'stick-brace': 'foobar' });
        assert.equal(
            comb.processString('a { color: red }'),
            'a { color: red }'
        );
    });
    it('True Boolean value should set 1 space before brace', function() {
        comb.configure({ 'stick-brace': true });
        assert.equal(
            comb.processString('a{color:red }'),
            'a {color:red }'
        );
    });
    it('Valid Number value should set equal space before brace', function() {
        comb.configure({ 'stick-brace': 0 });
        assert.equal(
            comb.processString('a {color:red }'),
            'a{color:red }'
        );
    });
    it('Valid String value should set equal space before brace', function() {
        comb.configure({ 'stick-brace': '\n' });
        assert.equal(
            comb.processString(
                'a{ color: red }' +
                'a, b /* i */ { color: red; }' +
                'a \t\t \n{color:red\n \n}' +
                'a /* foo */ {color:red ;\n}' +
                '@media all { .input__control { color: #000;\n \n }\t}'
            ),
            'a\n{ color: red }' +
            'a, b /* i */\n{ color: red; }' +
            'a\n{color:red\n \n}' +
            'a /* foo */\n{color:red ;\n}' +
            '@media all\n{ .input__control\n{ color: #000;\n \n }\t}'
        );
    });
});
