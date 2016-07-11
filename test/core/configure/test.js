let Comb = process.env.TEST_COV ?
    require('../../../lib-cov/csscomb') :
    require('../../../lib/csscomb');
let assert = require('assert');

describe('CSScomb#configure', function() {
  it('Passing no config to constructor should not configure anything', function() {
    let comb = new Comb();
    assert.equal(undefined, comb._handlers);
  });

  it('Passing valid config name to constructor should configure using correct config', function() {
    let comb = new Comb('zen');
    let input = 'a { color: tomato; top: 0; }';
    let expected = 'a {top: 0;  color: tomato; }';
    return comb.processString(input).then(function(output) {
      assert.equal(expected, output);
    });
  });

  it('Passing config object to constructor should configure using that object', function() {
    let comb = new Comb({ 'always-semicolon': true });
    let input = 'a { color: tomato }';
    let expected = 'a { color: tomato; }';
    return comb.processString(input).then(function(actual) {
      assert.equal(actual, expected);
    });
  });

  it('new Comb() should be chainable', function() {
    let input = 'a { color: tomato; top: 0; }';
    let expected = 'a {top: 0;  color: tomato; }';
    return (new Comb('zen')).processString(input).then(output => {
      assert.equal(expected, output);
    });
  });

  it('configure() should be chainable', function() {
    let input = 'a { color: tomato }';
    let expected = 'a { color: tomato; }';
    return (new Comb()).configure({ 'always-semicolon': true })
        .processString(input)
        .then(actual => {
            assert.equal(actual, expected);
        });
  });
});
