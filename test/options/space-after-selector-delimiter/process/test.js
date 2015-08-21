let Test = require('../../option_test');

describe('Option `space-after-selector-delimiter`, process', function() {
  describe('css', function() {
    it('Array value => should not change anything', function() {
      let test = new Test(this, {'space-after-selector-delimiter': ['', ' ']});
      return test.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
      let test = new Test(this, {'space-after-selector-delimiter': '  nani  '});
      return test.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
      let test = new Test(this, {'space-after-selector-delimiter': 3.5});
      return test.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space after selector delimiter', function() {
      let test = new Test(this, {'space-after-selector-delimiter': 0});
      return test.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space after selector delimiter', function() {
      let test = new Test(this, {'space-after-selector-delimiter': '  '});
      return test.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space after selector delimiter', function() {
      let test = new Test(this, {'space-after-selector-delimiter': '\n    '});
      return test.shouldBeEqual('test.css', 'test-3.expected.css');
    });
  });

  describe('sass', function() {
    it('Issue 238', function() {
      let test = new Test(this, {'space-after-selector-delimiter': '\n'});
      return test.shouldBeEqual('issue-238.sass', 'issue-238.expected.sass');
    });
  });
});
