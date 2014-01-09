describe('options/always-semicolon (scss)', function() {
    beforeEach(function() {
        this.filename = __filename;
        this.comb.configure({ 'always-semicolon': true });
    });

    it('Should not add semicolon if last value is block (singl-line style)', function() {
        this.shouldBeEqual('block-value.scss');
    });

    it('Should not add semicolon if last value is block (multi-line style)', function() {
        this.shouldBeEqual('block-value-multiline.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (single-line style)', function() {
        this.shouldBeEqual('include-1.scss', 'include-1.expected.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (multi-line style)', function() {
        this.shouldBeEqual('include-1-multiline.scss', 'include-1-multiline.expected.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (single-line style)', function() {
        this.shouldBeEqual('include-2.scss', 'include-2.expected.scss');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (multi-line style)', function() {
        this.shouldBeEqual('include-2-multiline.scss', 'include-2-multiline.expected.scss');
    });

    it('Should not add semicolon to last included mixin if there is a block (single-line style)', function() {
        this.shouldBeEqual('block-include.scss');
    });

    it('Should not add semicolon to last included mixin if there is a block (multi-line style)', function() {
        this.shouldBeEqual('block-include-multiline.scss');
    });

    it('Should add semicolon to last extend if missing (single-line style)', function() {
        this.shouldBeEqual('extend.scss', 'extend.expected.scss');
    });

    it('Should add semicolon to last extend if missing (multi-line style)', function() {
        this.shouldBeEqual('extend-multiline.scss', 'extend-multiline.expected.scss');
    });

    it('Should not add semicolon to condition (single-line style)', function() {
        this.shouldBeEqual('condition.scss');
    });

    it('Should not add semicolon to condition (multi-line style)', function() {
        this.shouldBeEqual('condition-multiline.scss');
    });

    it('Should not add semicolon to loop (single-line style)', function() {
        this.shouldBeEqual('loop.scss');
    });

    it('Should not add semicolon to loop (multi-line style)', function() {
        this.shouldBeEqual('loop-multiline.scss');
    });
});
