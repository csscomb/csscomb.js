describe('options/sort-order (sass)', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should sort properties inside rules', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('rule.sass', 'rule.expected.sass');
    });

    it('Should sort properties inside nested rules', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('nested-rule-1.sass', 'nested-rule-1.expected.sass');
    });

    it('Should sort properties divided by nested rules', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'left', 'color']
        ] });
        this.shouldBeEqual('nested-rule-2.sass', 'nested-rule-2.expected.sass');
    });

    it('Should group declarations with proper comments and spaces (multiple lines)', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('comments.sass', 'comments.expected.sass');
    });

    it('Should divide properties from different groups with an empty line', function() {
        this.comb.configure({ 'sort-order': [
            ['top'], ['color']
        ] });
        this.shouldBeEqual('different-groups.sass', 'different-groups.expected.sass');
    });

    it('Should sort variables', function() {
        this.comb.configure({ 'sort-order': [
            ['$variable', 'color']
        ] });
        this.shouldBeEqual('variable.sass', 'variable.expected.sass');
    });

    it('Should sort imports', function() {
        this.comb.configure({ 'sort-order': [
            ['$import', 'color']
        ] });
        this.shouldBeEqual('import.sass', 'import.expected.sass');
    });

    it('Should sort @include-s', function() {
        this.comb.configure({ 'sort-order': [
            ['$include', 'color']
        ] });
        this.shouldBeEqual('include.sass', 'include.expected.sass');
    });

    it('Should sort @extend-s', function() {
        this.comb.configure({ 'sort-order': [
            ['$include', 'color']
        ] });
        this.shouldBeEqual('extend.sass', 'extend.expected.sass');
    });

    it('Should sort properties inside blocks passed to mixins', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('mixin.sass', 'mixin.expected.sass');
    });

    it('Should handle properties preceeding rulesets', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'left', 'color']
        ] });
        this.shouldBeEqual('ruleset.sass', 'ruleset.expected.sass');
    });

    it('Should handle properties preceeding conditions', function() {
        this.comb.configure({ 'sort-order': [
            ['font-size', 'display', 'top', 'color']
        ] });
        this.shouldBeEqual('condition.sass', 'condition.expected.sass');
    });
});
