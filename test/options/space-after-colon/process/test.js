let Test = require('../../option_test');

describe('Option `space-after-colon`, process', function() {
  describe('css', function() {
    it('Array value => should not change anything', function() {
      let test = new Test(this, {'space-after-colon': ['', ' ']});
      return test.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
      let test = new Test(this, {'space-after-colon': '  nani  '});
      return test.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
      let test = new Test(this, {'space-after-colon': 3.5});
      return test.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space after colon', function() {
      let test = new Test(this, {'space-after-colon': 0});
      return test.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value (spaces only)=> should set proper space after colon', function() {
      let test = new Test(this, {'space-after-colon': '  '});
      return test.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Valid string value (spacesand newlines)=> should set proper space after colon', function() {
      let test = new Test(this, {'space-after-colon': '\n    '});
      return test.shouldBeEqual('test.css', 'test-3.expected.css');
    });
  });

  describe('sass', function() {
    it('Should set proper space if colon is after property name', function() {
      let test = new Test(this, {'space-after-colon': 2});
      return test.shouldBeEqual('colon-after-property-name.sass', 'colon-after-property-name.expected.sass');
    });

    it('Should not change space after colon which is before property name', function() {
      let test = new Test(this, {'space-after-colon': 1});
      return test.shouldBeEqual('colon-before-property-name.sass', 'colon-before-property-name.expected.sass');
    });
  });

  describe('scss', function() {
    it('Space after colon should not affect pseudo elements', function() {
      let test = new Test(this, {'space-after-colon': 1});
      return test.shouldBeEqual('pseudo-elements.scss', 'pseudo-elements.expected.scss');
    });
  });
});

