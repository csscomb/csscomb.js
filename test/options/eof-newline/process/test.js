var assert = require('assert');
let Test = require('../../option_test');

describe('Option `eof-newline`, process', function() {
  describe('css', function() {
    it('Invalid value should not change trim trailing brac', function() {
      let test = new Test(this, {'eof-newline': 'foobar'});
      return test.comb.processString(
          'a { color: red }  \n'
      ).then(function(actual) {
        assert.equal(actual, 'a { color: red }  \n');
      });
    });

    it('Boolean true value should insert line-break at eof', function() {
      let test = new Test(this, {'eof-newline': true});
      return test.comb.processString(
          'a {color:red}  '
      ).then(function(actual) {
        assert.equal(actual, 'a {color:red}  \n');
      });
    });

    it('Boolean false value should remove line-break from eof', function() {
      let test = new Test(this, {'eof-newline': false});
      return test.comb.processString(
          'a {color:red}  \n'
      ).then(function(actual) {
        assert.equal(actual, 'a {color:red}  ');
      });
    });
  });
});
