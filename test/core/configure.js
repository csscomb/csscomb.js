var Comb = process.env.TEST_COV ? require('../../lib-cov/csscomb') : require('../../lib/csscomb');
var assert = require('assert');

describe('csscomb methods', function() {
    var comb;
    var input;
    var output;
    var expected;

    it('Passing no config to constructor should not configure anything', function() {
        comb = new Comb();
        assert.equal(undefined, comb._handlers);
    });

    it('Passing valid config name to constructor should configure using correct config', function() {
        comb = new Comb('zen');
        input = 'a { color: tomato; top: 0; }';
        expected = 'a {top: 0;  color: tomato; }';
        output = comb.processString(input);

        assert.equal(expected, output);
    });

    it('Passing config object to constructor should configure using that object', function() {
        comb = new Comb({ 'always-semicolon': true });
        input = 'a { color: tomato }';
        expected = 'a { color: tomato; }';
        output = comb.processString(input);

        assert.equal(expected, output);
    });

    it('new Comb() should be chainable', function() {
        input = 'a { color: tomato; top: 0; }';
        expected = 'a {top: 0;  color: tomato; }';
        output = new Comb('zen').processString(input);

        assert.equal(expected, output);
    });

    it('configure() should be chainable', function() {
        input = 'a { color: tomato }';
        expected = 'a { color: tomato; }';
        output = new Comb().configure({ 'always-semicolon': true }).processString(input);

        assert.equal(expected, output);
    });
});
