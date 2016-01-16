var assert = require('assert');
let Test = require('../../option_test');

describe('Option `leading-zero`, process', function() {
  describe('css', function() {
    it('Should add leading zero in dimensions', function() {
      let test = new Test(this, {'leading-zero': true});
      return test.comb.processString(
          'div { margin: .5em }'
      ).then(function(actual) {
        assert.equal(actual, 'div { margin: 0.5em }');
      });
    });

    it('Should remove leading zero in dimensions', function() {
      let test = new Test(this, {'leading-zero': false});
      return test.comb.processString(
          'div { margin: 0.5em }'
      ).then(function(actual) {
        assert.equal(actual, 'div { margin: .5em }');
      });
    });
  });
});
