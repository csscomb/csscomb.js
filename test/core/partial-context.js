var Comb = process.env.TEST_COV ? require('../../lib-cov/csscomb') : require('../../lib/csscomb');
var assert = require('assert');

describe('context of processString', function() {
    var comb;
    var input;
    var output;
    var expected;

    it('No `context` argument should use the whole stylesheet as context', function() {
        comb = new Comb('zen');
        input = 'a { color: tomato; top: 0; }';
        expected = 'a {top: 0;  color: tomato; }';
        output = comb.processString(input);

        assert.equal(expected, output);
    });

    it('`context` argument set to `declaration` should process the content of the passed declaration', function() {
        comb = new Comb({ 'colon-space': ['', ' '], 'color-case': 'lower', 'color-shorthand': true });
        input = 'color:#FFFFFF';
        expected = 'color: #fff';
        output = comb.processString(input, null, null, 'declaration');

        assert.equal(expected, output);
    });

    it('`context` argument set to `block` should process the content of the passed block', function() {
        comb = new Comb('zen');
        input = 'color: tomato; top: 0; ';
        expected = 'top: 0; color: tomato; ';
        output = comb.processString(input, null, null, 'block');

        assert.equal(expected, output);
    });
});
