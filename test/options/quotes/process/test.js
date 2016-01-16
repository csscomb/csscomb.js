var assert = require('assert');
let Test = require('../../option_test');

describe('Option `quotes`, process', function() {
  describe('css', function() {
    it('Invalid String should not change quotes', function() {
      let test = new Test(this, {quotes: 3});
      return test.comb.processString(
          'a { content: "" }b { content: \'\' }'
      ).then(function(actual) {
        assert.equal(actual, 'a { content: "" }b { content: \'\' }');
      });
    });

    it('`single` value should set the quotes to single', function() {
      let test = new Test(this, {quotes: 'single'});
      return test.comb.processString(
          'a { content: "" }b { content: \'\' }'
      ).then(function(actual) {
        assert.equal(actual, 'a { content: \'\' }b { content: \'\' }');
      });
    });

    it('`double` value should set the quotes to double', function() {
      let test = new Test(this, {quotes: 'double'});
      return test.comb.processString(
          'a { content: "" }b { content: \'\' }'
      ).then(function(actual) {
        assert.equal(actual, 'a { content: "" }b { content: "" }');
      });
    });

    it('`double` value should set the quotes to double in attrs and urls', function() {
      let test = new Test(this, {quotes: 'double'});
      return test.comb.processString(
          'a[class^=\'foo\'] { background: url(\'foo.png\') }'
      ).then(function(actual) {
        assert.equal(actual, 'a[class^="foo"] { background: url("foo.png") }');
      });
    });

    it('`double` value should escape the unescaped double quotes on change', function() {
      let test = new Test(this, {quotes: 'double'});
      return test.comb.processString(
          'a { content: "\\"" }b { content: \'"\' }'
      ).then(function(actual) {
        assert.equal(actual, 'a { content: "\\"" }b { content: "\\"" }');
      });
    });

    it('`single` value should unescape the escaped double quotes on change', function() {
      let test = new Test(this, {quotes: 'single'});
      return test.comb.processString(
          'a { content: "\\"" }'
      ).then(function(actual) {
        assert.equal(actual, 'a { content: \'"\' }');
      });
    });
  });
});
