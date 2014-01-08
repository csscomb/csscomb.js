describe('options/sort-order (less)', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should sort properties inside rules', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('rule.less', 'rule.expected.less');
    });

    it('Should sort properties inside nested rules', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('nested-rule-1.less', 'nested-rule-1.expected.less');
    });

    it('Should sort properties divided by nested rules', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'left', 'color']
        ] });
        this.shouldBeEqual('nested-rule-2.less', 'nested-rule-2.expected.less');
    });

    it('Should group declarations with proper comments and spaces (single line)', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('comments-1.less', 'comments-1.expected.less');
    });

    it('Should group declarations with proper comments and spaces (multiple lines). Test 1', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('comments-2.less', 'comments-2.expected.less');
    });

    it('Should group declarations with proper comments and spaces (multiple lines). Test 2', function() {
        this.comb.configure({ 'sort-order': [
            ['$variable', 'color']
        ] });
        this.shouldBeEqual('comments-3.less', 'comments-3.expected.less');
    });

    it('Should group declarations with proper comments and spaces (multiple lines). Test 3', function() {
        this.comb.configure({ 'sort-order': [
            ['$variable', 'color']
        ] });
        this.shouldBeEqual('comments-3.less', 'comments-3.expected.less');
    });

    it('Should divide properties from different groups with an empty line', function() {
        this.comb.configure({ 'sort-order': [
            ['top'], ['color']
        ] });
        this.shouldBeEqual('different-groups.less', 'different-groups.expected.less');
    });

    it('Should sort variables', function() {
        this.comb.configure({ 'sort-order': [
            ['$variable', 'color']
        ] });
        this.shouldBeEqual('variable.less', 'variable.expected.less');
    });

    it('Should sort imports', function() {
        this.comb.configure({ 'sort-order': [
            ['$import', 'color']
        ] });
        this.shouldBeEqual('import.less', 'import.expected.less');
    });

    it('Should sort included mixins. Test 1', function() {
        this.comb.configure({ 'sort-order': [
            ['$include', 'color', 'border-top', 'border-bottom']
        ] });
        this.shouldBeEqual('mixin-1.less', 'mixin-1.expected.less');
    });

    it('Should sort included mixins. Test 2', function() {
        this.comb.configure({ 'sort-order': [
            ['$include', 'top', 'color']
        ] });
        this.shouldBeEqual('mixin-2.less', 'mixin-2.expected.less');
    });

    it('Should sort included mixins. Test 3', function() {
        this.comb.configure({ 'sort-order': [
            ['$include', 'border', 'color']
        ] });
        this.shouldBeEqual('mixin-3.less', 'mixin-3.expected.less');
    });
});
