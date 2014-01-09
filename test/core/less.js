describe('LESS', function() {
    beforeEach(function() {
        this.filename = __filename;
        this.comb.configure({});
    });

    it('Should parse nested rules', function() {
        this.shouldBeEqual('nested-rule.less');
    });

    it('Should parse operations', function() {
        this.shouldBeEqual('operation.less');
    });

    it('Should parse parent selector &', function() {
        this.shouldBeEqual('parent-selector.less');
    });

    it('Should parse variables', function() {
        this.shouldBeEqual('variable.less');
    });

    it('Should parse interpolated variables inside selectors', function() {
        this.shouldBeEqual('interpolated-variable-1.less');
    });

    it('Should parse interpolated variables inside values', function() {
        this.shouldBeEqual('interpolated-variable-2.less');
    });

    it('Should parse @import', function() {
        this.shouldBeEqual('import.less');
    });

    it('Should parse included mixins', function() {
        this.shouldBeEqual('mixin.less');
    });

    it('Should parse nested @media', function() {
        this.shouldBeEqual('nested-media.less');
    });
});
