let Test = require('../../option_test');

describe('Option `tab-size`, process', function() {
  describe('css', function() {
    it('Test 1: String value => should not change anything', function() {
      let test = new Test(this, {'tab-size': '   '});
      return test.shouldBeEqual('test.css');
    });

    it('Test 2: Float value => should not change anything', function() {
      let test = new Test(this, {'tab-size': 4.5});
      return test.shouldBeEqual('test.css');
    });

    it('Test 3: Integer value => should replace tabs with proper number of spaces', function() {
      let test = new Test(this, {'tab-size': 4});
      return test.shouldBeEqual('test.css', 'test.expected.css');
    });
  });
});
