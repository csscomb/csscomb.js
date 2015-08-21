let Test = require('../../option_test');

describe('Option `space-between-declarations`, process', function() {
  describe('css', function() {
    it('Array value => should not change anything', function() {
      let test = new Test(this, {'space-between-declarations': ['', ' ']});
      return test.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
      let test = new Test(this, {'space-between-declarations': '  nani  '});
      return test.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
      let test = new Test(this, {'space-between-declarations': 3.5});
      return test.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space after declaration', function() {
      let test = new Test(this, {'space-between-declarations': 0});
      return test.shouldBeEqual('integer-value.css', 'integer-value.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space after declaration', function() {
      let test = new Test(this, {'space-between-declarations': ' '});
      return test.shouldBeEqual('space-value.css', 'space-value.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space after declaration', function() {
      let test = new Test(this, {'space-between-declarations': '\n    '});
      return test.shouldBeEqual('space-newline-value.css', 'space-newline-value.expected.css');
    });

    it('Should leave comments as is', function() {
      let test = new Test(this, {'space-between-declarations': 1});
      return test.shouldBeEqual('comments.css', 'comments.expected.css');
    });

    it('Issue 239', function() {
      let test = new Test(this, {'space-between-declarations': '\n    '});
      return test.shouldBeEqual('issue-239.css', 'issue-239.expected.css');
    });

    it('Issue 378', function() {
      let test = new Test(this, {'space-between-declarations': '\n'});
      return test.shouldBeEqual('issue-378.css');
    });
  });
});
