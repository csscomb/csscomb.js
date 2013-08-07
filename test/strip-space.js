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
                'a{color:red}\t /* foobar */ \n' +
                'a {color:red}'
            ),
            'a { color: red }\n' +
            'a{color:red}\t /* foobar */\n' +
            'a {color:red}\n'
        );
    });
});
