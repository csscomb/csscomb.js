describe('options/sort-order (sass)', function() {
    describe('process', function() {
        it('Should sort properties inside rules', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            return this.shouldBeEqual('rule.sass', 'rule.expected.sass');
        });

        it('Should sort properties inside nested rules', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            return this.shouldBeEqual('nested-rule-1.sass', 'nested-rule-1.expected.sass');
        });

        it('Should sort properties divided by nested rules', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'left', 'color']
            ] });
            return this.shouldBeEqual('nested-rule-2.sass', 'nested-rule-2.expected.sass');
        });

        it('Should group declarations with proper comments and spaces (multiple lines)', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            return this.shouldBeEqual('comments.sass', 'comments.expected.sass');
        });

        it('Should divide properties from different groups with an empty line', function() {
            this.comb.configure({ 'sort-order': [
                ['top'], ['color']
            ] });
            return this.shouldBeEqual('different-groups.sass', 'different-groups.expected.sass');
        });

        it('Should sort variables', function() {
            this.comb.configure({ 'sort-order': [
                ['$variable', 'color']
            ] });
            return this.shouldBeEqual('variable.sass', 'variable.expected.sass');
        });

        it('Should sort imports', function() {
            this.comb.configure({ 'sort-order': [
                ['$import', 'color']
            ] });
            return this.shouldBeEqual('import.sass', 'import.expected.sass');
        });

        it('Should sort @include-s', function() {
            this.comb.configure({ 'sort-order': [
                ['$include', 'color']
            ] });
            return this.shouldBeEqual('include.sass', 'include.expected.sass');
        });

        it('Should sort @extend-s', function() {
            this.comb.configure({ 'sort-order': [
                ['$extend', 'color']
            ] });
            return this.shouldBeEqual('extend.sass', 'extend.expected.sass');
        });

        it('Should sort @include-s with specified name. Test 1', function() {
            this.comb.configure({ 'sort-order': [
                ['$include'], ['color'], ['$include media']
            ] });
            this.shouldBeEqual('include-specified-1.sass', 'include-specified-1.expected.sass');
        });

        it('Should sort @include-s with specified name. Test 2', function() {
            this.comb.configure({ 'sort-order': [
                ['$include'], ['color'], ['$include media']
            ] });
            this.shouldBeEqual('include-specified-2.sass', 'include-specified-2.expected.sass');
        });

        it('Should sort properties inside blocks passed to mixins', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            return this.shouldBeEqual('mixin.sass', 'mixin.expected.sass');
        });

        it('Should handle properties preceeding rulesets', function() {
            this.comb.configure({ 'sort-order': [
                ['top', 'left', 'color']
            ] });
            return this.shouldBeEqual('ruleset.sass', 'ruleset.expected.sass');
        });

        it('Should handle properties preceeding conditions', function() {
            this.comb.configure({ 'sort-order': [
                ['font-size', 'display', 'top', 'color']
            ] });
            return this.shouldBeEqual('condition.sass', 'condition.expected.sass');
        });

        it('Issue 332', function() {
            this.comb.configure({ 'sort-order': [
                ['color'], ['$include']
            ] });
            return this.shouldBeEqual('issue-332.sass', 'issue-332.expected.sass');
        });

        it('Issue 332, test 2', function() {
            this.comb.configure({
                'sort-order': [['...']],
                'sort-order-fallback': 'abc'
            });
            return this.shouldBeEqual('issue-332-2.sass', 'issue-332-2.expected.sass');
        });
    });
});
