var assert = require('assert');
let Test = require('../../option_test');

describe('Option `color-shorthand`, process', function() {
  describe('css', function() {
    it('Should shrink hexadecimal colors to 3 symbols', function() {
      let test = new Test(this, {'color-shorthand': true});
      return test.comb.processString(
          'div { color: #aabbcc }'
      ).then(function(actual) {
        assert.equal(actual, 'div { color: #abc }');
      });
    });

    it('Should expand hexadecimal colors to 6 symbols', function() {
      let test = new Test(this, {'color-shorthand': false});
      return test.comb.processString(
          'div { color: #7ad }'
      ).then(function(actual) {
        assert.equal(actual, 'div { color: #77aadd }');
      });
    });

    it('Should save case while processing', function() {
      let test = new Test(this, {'color-shorthand': true});
      return test.comb.processString(
          'div { color: #fFAafF }'
      ).then(function(actual) {
        assert.equal(actual, 'div { color: #fAf }');
      });
    });
  });
});
