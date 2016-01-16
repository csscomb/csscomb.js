var assert = require('assert');
let Test = require('../../option_test');

describe('Option `strip-spaces`, process', function() {
  describe('css', function() {
    it('Invalid value should not trim trailing spaces', function() {
      let test = new Test(this, {'strip-spaces': 'foobar'});
      return test.comb.processString('a { color: red }  \n')
          .then(function(actual) {
            assert.equal(actual, 'a { color: red }  \n');
          });
    });

    it('Boolean true value should trim all trailing spaces', function() {
      let test = new Test(this, {'strip-spaces': true});
      return test.comb.processString(
          'a { color: red }   \n' +
          'a{color:red}\t /* foobar */\t \n' +
          'a {color:red}  \n   \n'
      ).then(function(actual) {
        assert.equal(actual,
            'a { color: red }\n' +
            'a{color:red}\t /* foobar */\n' +
            'a {color:red}\n');
      });
    });

    it('Boolean true value should trim trailing spaces at eof', function() {
      let test = new Test(this, {'strip-spaces': true});
      return test.comb.processString(
          'a {color:red}  '
      ).then(function(actual) {
        assert.equal(actual, 'a {color:red}');
      });
    });
  });
});
