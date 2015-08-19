describe('Option `always-semicolon`, process', function() {
  describe('CSS', function() {
    it('Should add semicolon for last property if missing. Test 1', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('css/test-1.css', 'css/test-1.expected.css');
    });

    it('Should add semicolon for last property if missing. Test 2', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('css/test-2.css', 'css/test-2.expected.css');
    });

    it('Should add semicolon for last property if missing. Test 3', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('css/test-3.css', 'css/test-3.expected.css');
    });

    it('Should add semicolon for last property if missing. Test 4', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('css/test-4.css', 'css/test-4.expected.css');
    });

    it('Should add semicolon for last property if missing. Test 5', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('css/test-5.css', 'css/test-5.expected.css');
    });
  });

  describe('LESS', function() {
    it('Should not add semicolon to condition (single-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/condition.less');
    });

    it('Should not add semicolon to condition (multi-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/condition-multiline.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (single-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/include-1.less', 'less/include-1.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (multi-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/include-1-multiline.less', 'less/include-1-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (single-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/include-2.less', 'less/include-2.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (multi-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/include-2-multiline.less', 'less/include-2-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 3 (single-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/include-3.less', 'less/include-3.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 3 (multi-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/include-3-multiline.less', 'less/include-3-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 4 (single-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/include-4.less', 'less/include-4.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 4 (multi-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/include-4-multiline.less', 'less/include-4-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 5 (single-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/include-5.less', 'less/include-5.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 5 (multi-line style)', function() {
      this.comb.configure({'always-semicolon':true});
      return this.shouldBeEqual('less/include-5-multiline.less', 'less/include-5-multiline.expected.less');
    });
  });

  describe('Sass', function() {
    it('Should not add semicolon', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('sass/test.sass');
    });
  });

  describe('SCSS', function() {
    it('Should not add semicolon if last value is block (singl-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/block-value.scss');
    });

    it('Should not add semicolon if last value is block (multi-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/block-value-multiline.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (single-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/include-1.scss', 'scss/include-1.expected.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (multi-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/include-1-multiline.scss', 'scss/include-1-multiline.expected.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (single-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/include-2.scss', 'scss/include-2.expected.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (multi-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/include-2-multiline.scss', 'scss/include-2-multiline.expected.scss');
    });

    it('Should not add semicolon to last included mixin if there is a block (single-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/block-include.scss');
    });

    it('Should not add semicolon to last included mixin if there is a block (multi-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/block-include-multiline.scss');
    });

    it('Should add semicolon to last extend if missing (single-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/extend.scss', 'scss/extend.expected.scss');
    });

    it('Should add semicolon to last extend if missing (multi-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/extend-multiline.scss', 'scss/extend-multiline.expected.scss');
    });

    it('Should not add semicolon to condition (single-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/condition.scss');
    });

    it('Should not add semicolon to condition (multi-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/condition-multiline.scss');
    });

    it('Should not add semicolon to loop (single-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/loop.scss');
    });

    it('Should not add semicolon to loop (multi-line style)', function() {
      this.comb.configure({'always-semicolon': true});
      return this.shouldBeEqual('scss/loop-multiline.scss');
    });
  });
});
