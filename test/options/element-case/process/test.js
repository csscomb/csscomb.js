var assert = require('assert');
let Test = require('../../option_test');

describe('Option `element-case`, process', function() {
  describe('css', function() {
    it('Invalid String should not change case of elements', function() {
      let test = new Test(this, {'element-case': 'foobar'});
      return test.comb.processString(
          'LI a { color : red }'
      ).then(function(actual) {
        assert.equal(actual, 'LI a { color : red }');
      });
    });

    it('Should switch tag name to upper case', function() {
      let test = new Test(this, {'element-case': 'upper'});
      return test.comb.processString(
          'div { color: #fff }'
      ).then(function(actual) {
        assert.equal(actual, 'DIV { color: #fff }');
      });
    });

    it('Should switch tag name to lower case', function() {
      let test = new Test(this, {'element-case': 'lower'});
      return test.comb.processString(
          'DIV { color: #FFF }'
      ).then(function(actual) {
        assert.equal(actual, 'div { color: #FFF }');
      });
    });

    it('Should switch element-case in complex rules', function() {
      let test = new Test(this, {'element-case': 'lower'});
      return test.comb.processString(
          'UL > LI > .foo:not(A) { color: red }'
      ).then(function(actual) {
        assert.equal(actual, 'ul > li > .foo:not(a) { color: red }');
      });
    });
  });

  describe('scss', function() {
    it('Should not touch mixin names', function() {
      let test = new Test(this, {'element-case': 'lower'});
      return test.shouldBeEqual('mixin.scss', 'mixin.expected.scss');
    });
  });
});
