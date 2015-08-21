let Test = require('../../option_test');

describe('Option `space-before-selector-delimiter`, process', function() {
  describe('css', function() {
    it('Array value => should not change anything', function() {
      let test = new Test(this, {'space-before-selector-delimiter': ['', ' ']});
      return test.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
      let test = new Test(this, {'space-before-selector-delimiter': '  nani  '});
      return test.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
      let test = new Test(this, {'space-before-selector-delimiter': 3.5});
      return test.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space before selector delimiter', function() {
      let test = new Test(this, {'space-before-selector-delimiter': 0});
      return test.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space before selector delimiter', function() {
      let test = new Test(this, {'space-before-selector-delimiter': '  '});
      return test.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space before selector delimiter', function() {
      let test = new Test(this, {'space-before-selector-delimiter': '\n    '});
      return test.shouldBeEqual('test.css', 'test-3.expected.css');
    });
  });
});
