let Test = require('../../option_test');

describe('Option `always-semicolon`, process', function() {
  describe('css', function() {
    it('Should add semicolon for last property if missing. Test 1', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('test-1.css', 'test-1.expected.css');
    });

    it('Should add semicolon for last property if missing. Test 2', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('test-2.css', 'test-2.expected.css');
    });

    it('Should add semicolon for last property if missing. Test 3', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('test-3.css', 'test-3.expected.css');
    });

    it('Should add semicolon for last property if missing. Test 4', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('test-4.css', 'test-4.expected.css');
    });

    it('Should add semicolon for last property if missing. Test 5', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('test-5.css', 'test-5.expected.css');
    });
  });

  describe('less', function() {
    it.skip('Should not add semicolon to condition (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('condition.less');
    });

    it.skip('Should not add semicolon to condition (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('condition-multiline.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-1.less', 'include-1.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-1-multiline.less', 'include-1-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-2.less', 'include-2.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-2-multiline.less', 'include-2-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 3 (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-3.less', 'include-3.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 3 (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-3-multiline.less', 'include-3-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 4 (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-4.less', 'include-4.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 4 (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-4-multiline.less', 'include-4-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 5 (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-5.less', 'include-5.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 5 (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-5-multiline.less', 'include-5-multiline.expected.less');
    });
  });

  describe('sass', function() {
    it('Should not add semicolon', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('test.sass');
    });
  });

  describe('scss', function() {
    it('Should not add semicolon if last value is block (singl-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('block-value.scss');
    });

    it('Should not add semicolon if last value is block (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('block-value-multiline.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-1.scss', 'include-1.expected.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-1-multiline.scss', 'include-1-multiline.expected.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-2.scss', 'include-2.expected.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('include-2-multiline.scss', 'include-2-multiline.expected.scss');
    });

    it('Should not add semicolon to last included mixin if there is a block (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('block-include.scss');
    });

    it('Should not add semicolon to last included mixin if there is a block (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('block-include-multiline.scss');
    });

    it('Should add semicolon to last extend if missing (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('extend.scss', 'extend.expected.scss');
    });

    it('Should add semicolon to last extend if missing (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('extend-multiline.scss', 'extend-multiline.expected.scss');
    });

    it('Should not add semicolon to condition (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('condition.scss');
    });

    it('Should not add semicolon to condition (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('condition-multiline.scss');
    });

    it('Should not add semicolon to loop (single-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('loop.scss');
    });

    it('Should not add semicolon to loop (multi-line style)', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.shouldBeEqual('loop-multiline.scss');
    });
  });
});
