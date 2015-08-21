let Test = require('../../option_test');

describe('Option `space-before-colon`, process', function() {
  describe('css', function() {
    it('Array value => should not change anything', function() {
      let test = new Test(this, {'space-before-colon': ['', ' ']});
      return test.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
      let test = new Test(this, {'space-before-colon': '  nani  '});
      return test.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
      let test = new Test(this, {'space-before-colon': 3.5});
      return test.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space before colon', function() {
      let test = new Test(this, {'space-before-colon': 0});
      return test.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only) => should set proper space before colon', function() {
      let test = new Test(this, {'space-before-colon': '  '});
      return test.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spaces and newlines) => should set proper space before colon', function() {
      let test = new Test(this, {'space-before-colon': '\n    '});
      return test.shouldBeEqual('test.css', 'test-3.expected.css');
    });
  });

  describe('sass', function() {
    it('Should correct space', function() {
      let test = new Test(this, {'space-before-colon': 1});
      return test.shouldBeEqual('test.sass', 'test.expected.sass');
    });

    it('Should not correct space', function() {
      let test = new Test(this, {'space-before-colon': 1});
      return test.shouldBeEqual('test2.sass');
    });
  });
});

