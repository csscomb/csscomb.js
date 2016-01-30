let Test = require('../../option_test');

describe('Option `sort-order-fallback`, process', function() {
  describe('css', function() {
    it('Should sort leftovers alphabetically if `sort-order-fallback` is set', function() {
      let config = {
        'sort-order-fallback': 'abc',
        'sort-order': [
          ['top', 'left'],
          ['...'],
          ['color']
        ]
      };
      let test = new Test(this, config);
      return test.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Should sort unknown properties alphabetically if `sort-order-fallback` is set', function() {
      let config = {
        'sort-order-fallback': 'abc',
        'sort-order': ['top', 'left']
      };
      let test = new Test(this, config);
      return test.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Properties of the same name should stay in the same order', function() {
      let config = {
        'sort-order': ['...'],
        'sort-order-fallback': 'abc'
      };
      let test = new Test(this, config);
      return test.shouldBeEqual('same-property.css');
    });

    it('Should leave leftovers as is if `sort-order-fallback` is not set', function() {
      let config = {
        'sort-order': ['top', 'left']
      };
      let test = new Test(this, config);
      return test.shouldBeEqual('test.css', 'test-3.expected.css');
    });
  });
});
