describe('options/sort-order (scss)', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should sort properties inside rules (single line)', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('rule.scss', 'rule.expected.scss');
    });

    it('Should sort properties inside rules (multiple lines)', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('rule.scss', 'rule.expected.scss');
    });

    it('Should sort properties inside nested rules', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('nested-rule-1.scss', 'nested-rule-1.expected.scss');
    });

    it('Should sort properties divided by nested rules', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'left', 'color']
        ] });
        this.shouldBeEqual('nested-rule-2.scss', 'nested-rule-2.expected.scss');
    });

    it('Should group declarations with proper comments and spaces (multiple lines)', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('comments-1.scss', 'comments-1.expected.scss');
    });

    it('Should group declarations with proper comments and spaces (single line)', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('comments-2.scss', 'comments-2.expected.scss');
    });

    it('Should divide properties from different groups with an empty line', function() {
        this.comb.configure({ 'sort-order': [
            ['top'], ['color']
        ] });
        this.shouldBeEqual('different-groups.scss', 'different-groups.expected.scss');
    });

    it('Should sort variables', function() {
        this.comb.configure({ 'sort-order': [
            ['$variable', 'color']
        ] });
        this.shouldBeEqual('variable.scss', 'variable.expected.scss');
    });

    it('Should sort imports', function() {
        this.comb.configure({ 'sort-order': [
            ['$import', 'color']
        ] });
        this.shouldBeEqual('import.scss', 'import.expected.scss');
    });

    it('Should sort @include-s', function() {
        this.comb.configure({ 'sort-order': [
            ['$include', 'color']
        ] });
        this.shouldBeEqual('include.scss', 'include.expected.scss');
    });

    it('Should sort @extend-s', function() {
        this.comb.configure({ 'sort-order': [
            ['$include', 'color']
        ] });
        this.shouldBeEqual('extend.scss', 'extend.expected.scss');
    });

    it('Should sort properties inside blocks passed to mixins', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'color']
        ] });
        this.shouldBeEqual('mixin.scss', 'mixin.expected.scss');
    });

    it('Should handle properties preceeding rulesets', function() {
        this.comb.configure({ 'sort-order': [
            ['top', 'left', 'color']
        ] });
        this.shouldBeEqual('ruleset.scss', 'ruleset.expected.scss');
    });

    it('Should handle properties preceeding conditions', function() {
        this.comb.configure({ 'sort-order': [
            ['font-size', 'display', 'top', 'color']
        ] });
        this.shouldBeEqual('condition.scss', 'condition.expected.scss');
    });

    it('Should sort complex case with leftovers', function() {
        this.comb.configure({
          "sort-order": [
            ["$variable"],
            ["position"],
            ["...", "border"],
            ["$include"],
            ["font"]
          ]
        });
        this.shouldBeEqual('leftovers.scss', 'leftovers.expected.scss');
    });
});
