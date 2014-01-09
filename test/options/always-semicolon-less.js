describe('options/always-semicolon (scss)', function() {
    beforeEach(function() {
        this.filename = __filename;
        this.comb.configure({ 'always-semicolon': true });
    });

    it('Should not add semicolon to condition (single-line style)', function() {
        this.shouldBeEqual('condition.less');
    });

    it('Should not add semicolon to condition (multi-line style)', function() {
        this.shouldBeEqual('condition-multiline.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (single-line style)', function() {
        this.shouldBeEqual('include-1.less', 'include-1.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (multi-line style)', function() {
        this.shouldBeEqual('include-1-multiline.less', 'include-1-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (single-line style)', function() {
        this.shouldBeEqual('include-2.less', 'include-2.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (multi-line style)', function() {
        this.shouldBeEqual('include-2-multiline.less', 'include-2-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 3 (single-line style)', function() {
        this.shouldBeEqual('include-3.less', 'include-3.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 3 (multi-line style)', function() {
        this.shouldBeEqual('include-3-multiline.less', 'include-3-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 4 (single-line style)', function() {
        this.shouldBeEqual('include-4.less', 'include-4.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 4 (multi-line style)', function() {
        this.shouldBeEqual('include-4-multiline.less', 'include-4-multiline.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 5 (single-line style)', function() {
        this.shouldBeEqual('include-5.less', 'include-5.expected.less');
    });

    it('Should add semicolon to last included mixin if missing. Test 5 (multi-line style)', function() {
        this.shouldBeEqual('include-5-multiline.less', 'include-5-multiline.expected.less');
    });
});
