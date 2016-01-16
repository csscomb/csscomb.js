let Comb = process.env.TEST_COV ?
    require('../../../lib-cov/csscomb') :
    require('../../../lib/csscomb');
let assert = require('assert');

describe('CSScomb#configure', function() {
  it.skip('Passing no config to constructor should not configure anything', function() {
    let comb = new Comb();
    assert.equal(undefined, comb._handlers);
  });

  it.skip('Passing valid config name to constructor should configure using correct config', function() {
    let comb = new Comb('zen');
    let input = 'a { color: tomato; top: 0; }';
    let expected = 'a {top: 0;  color: tomato; }';
    let output = comb.processString(input);

    assert.equal(expected, output);
  });

  it.skip('Passing config object to constructor should configure using that object', function() {
    comb = new Comb({ 'always-semicolon': true });
    input = 'a { color: tomato }';
    expected = 'a { color: tomato; }';
    return comb.processString(input)
        .then(function(actual) {
            assert.equal(actual, expected);
        });
  });

  it.skip('new Comb() should be chainable', function() {
    input = 'a { color: tomato; top: 0; }';
    expected = 'a {top: 0;  color: tomato; }';
    output = new Comb('zen').processString(input);

    assert.equal(expected, output);
  });

  it.skip('configure() should be chainable', function() {
    input = 'a { color: tomato }';
    expected = 'a { color: tomato; }';
    return new Comb().configure({ 'always-semicolon': true })
        .processString(input)
        .then(function(actual) {
            assert.equal(actual, expected);
        });
  });
});
