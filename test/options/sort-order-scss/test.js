describe('options/sort-order (scss)', function() {
    describe('process', function() {
        it('Should sort properties inside rules (single line)', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            return this.shouldBeEqual('rule.scss', 'rule.expected.scss');
        });

        it('Should sort properties inside rules (multiple lines)', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            return this.shouldBeEqual('rule.scss', 'rule.expected.scss');
        });

        it('Should sort properties inside nested rules', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            return this.shouldBeEqual('nested-rule-1.scss', 'nested-rule-1.expected.scss');
        });

        it('Should sort properties divided by nested rules', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'left', 'color']
            ] });
            return this.shouldBeEqual('nested-rule-2.scss', 'nested-rule-2.expected.scss');
        });

        it('Should group declarations with proper comments and spaces (multiple lines)', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            return this.shouldBeEqual('comments-1.scss', 'comments-1.expected.scss');
        });

        it('Should group declarations with proper comments and spaces (single line)', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            return this.shouldBeEqual('comments-2.scss', 'comments-2.expected.scss');
        });

        it('Should divide properties from different groups with an empty line', function() {
            this.comb.configure({ 'sort-order': [
                ['top'], ['color']
            ] });
            return this.shouldBeEqual('different-groups.scss', 'different-groups.expected.scss');
        });

        it('Should sort variables', function() {
            this.comb.configure({ 'sort-order': [
                ['$variable', 'color']
            ] });
            return this.shouldBeEqual('variable.scss', 'variable.expected.scss');
        });

        it('Should sort imports', function() {
            this.comb.configure({ 'sort-order': [
                ['$import', 'color']
            ] });
            return this.shouldBeEqual('import.scss', 'import.expected.scss');
        });

        it('Should sort @include-s', function() {
            this.comb.configure({ 'sort-order': [
                ['$include', 'color']
            ] });
            return this.shouldBeEqual('include.scss', 'include.expected.scss');
        });

        it('Should sort @include-s with specified name', function() {
            this.comb.configure({ 'sort-order': [
                ['$include'], ['color'], ['$include media']
            ] });
            this.shouldBeEqual('include-specified.scss', 'include-specified.expected.scss');
        });

        it('Should sort @extend-s', function() {
            this.comb.configure({ 'sort-order': [
                ['$extend', 'color']
            ] });
            return this.shouldBeEqual('extend.scss', 'extend.expected.scss');
        });

        it('Should sort properties inside blocks passed to mixins', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            return this.shouldBeEqual('mixin.scss', 'mixin.expected.scss');
        });

        it('Should handle properties preceeding rulesets', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'left', 'color']
            ] });
            return this.shouldBeEqual('ruleset.scss', 'ruleset.expected.scss');
        });

        it('Should handle properties preceeding conditions', function() {
            this.comb.configure({ 'sort-order': [
                ['font-size', 'display', 'top', 'color']
            ] });
            return this.shouldBeEqual('condition.scss', 'condition.expected.scss');
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
            return this.shouldBeEqual('leftovers.scss', 'leftovers.expected.scss');
        });

        it('Issue 317', function() {
            this.comb.configure({ 'sort-order': ['...'] });
            return this.shouldBeEqual('issue-317.scss');
        });

        it('Issue 333', function() {
            this.comb.configure({ 'sort-order': ['...'] });
            return this.shouldBeEqual('issue-333.scss');
        });
    });
});
