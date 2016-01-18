var assert = require('assert');
let Test = require('../../option_test');

describe('Option `unitless-zero`, process', function() {
  describe('css', function() {
    it('Should remove units in zero-valued dimensions', function() {
      let test = new Test(this, {'unitless-zero': true});
      return test.comb.processString(
          'div { margin: 0em; padding: 0px }'
      ).then(function(actual) {
        assert.equal(actual, 'div { margin: 0; padding: 0 }');
      });
    });

    it('Should remove units in zero-valued dimensions, test 2', function() {
      let test = new Test(this, {'unitless-zero': true});
      return test.comb.processString(
          'div { margin: 0% }'
      ).then(function(actual) {
        assert.equal(actual, 'div { margin: 0 }');
      });
    });

    it('Should remove units in zero-valued media-query params', function() {
      let test = new Test(this, {'unitless-zero': true});
      return test.comb.processString(
          '@media all and (min-width: 0px) { div { margin: 0em; padding: 0px } }'
      ).then(function(actual) {
        assert.equal(actual, '@media all and (min-width: 0) { div { margin: 0; padding: 0 } }');
      });
    });

    it('Should not remove units (degs) in rotate property', function() {
      let test = new Test(this, {'unitless-zero': true});
      return test.comb.processString(
          'div { -webkit-transform: rotate(0deg); }'
      ).then(function(actual) {
        assert.equal(actual, 'div { -webkit-transform: rotate(0deg); }');
      });
    });

    it('Issue 394', function() {
      let test = new Test(this, {'unitless-zero': true});
      return test.shouldBeEqual('issue-394.css', 'issue-394.expected.css');
    });
  });

  describe('less', function() {
    it('Issue 389', function() {
      let test = new Test(this, {'unitless-zero': true});
      return test.shouldBeEqual('issue-389.less');
    });
  });
});
