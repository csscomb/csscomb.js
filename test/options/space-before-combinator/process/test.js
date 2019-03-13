let Test = require('../../option_test');

describe('Option `space-before-combinator`, process', function() {
  describe('css', function() {
    it('Array value => should not change anything', function() {
      let test = new Test(this, {'space-before-combinator': ['', ' ']});
      return test.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
      let test = new Test(this, {'space-before-combinator': '  nani  '});
      return test.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
      let test = new Test(this, {'space-before-combinator': 3.5});
      return test.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space before combinator', function() {
      let test = new Test(this, {'space-before-combinator': 0});
      return test.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space before combinator', function() {
      let test = new Test(this, {'space-before-combinator': '  '});
      return test.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space before combinator', function() {
      let test = new Test(this, {'space-before-combinator': '\n    '});
      return test.shouldBeEqual('test.css', 'test-3.expected.css');
    });
  });

  describe('scss', function() {
    it('Should not touch leading combinators', function() {
      let test = new Test(this, {'space-before-combinator': '  '});
      return test.shouldBeEqual('test.scss', 'test.expected.scss');
    });
  });
});
