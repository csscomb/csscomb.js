let Test = require('../../option_test');

describe('Option `block-indent`, process', function() {
  describe('css', function() {
    it('Array value => should not change anything', function() {
      let test = new Test(this, {'block-indent': ['', ' ']});
      return test.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
      let test = new Test(this, {'block-indent': '  nani  '});
      return test.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
      let test = new Test(this, {'block-indent': 3.5});
      return test.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper number of spaces', function() {
      let test = new Test(this, {'block-indent': 0});
      return test.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value => should set proper number of spaces', function() {
      let test = new Test(this, {'block-indent': '    '});
      return test.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Issue 379', function() {
      let test = new Test(this, {'block-indent': 4});
      return test.shouldBeEqual('issue-379.css', 'issue-379.expected.css');
    });
  });

  describe('sass', function() {
    it('First level ruleset\'s block', function() {
      let test = new Test(this, {'block-indent': 2});
      return test.shouldBeEqual('block.sass', 'block.expected.sass');
    });

    it('Nested ruleset', function() {
      let test = new Test(this, {'block-indent': 2});
      return test.shouldBeEqual('nested-ruleset.sass', 'nested-ruleset.expected.sass');
    });

    it('Mixin', function() {
      let test = new Test(this, {'block-indent': 4});
      return test.shouldBeEqual('mixin.sass', 'mixin.expected.sass');
    });
  });

  describe('scss', function() {
    it('Issue 213', function() {
      let test = new Test(this, {'block-indent': 2});
      return test.shouldBeEqual('nested-include.scss', 'nested-include.expected.scss');
    });
  });
});
