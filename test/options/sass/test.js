describe('Sass', function() {
    beforeEach(function() {
        this.comb.configure({});
    });

    describe('process', function() {
        it('Should parse nested rules', function() {
            return this.shouldBeEqual('nested-rule.sass');
        });

        it('Should parse parent selector &', function() {
            return this.shouldBeEqual('parent-selector.sass');
        });

        it('Should parse nested properties', function() {
            return this.shouldBeEqual('nested-property.sass');
        });

        it('Should parse variables', function() {
            return this.shouldBeEqual('variable.sass');
        });

        it('Should parse interpolated variables inside selectors', function() {
            return this.shouldBeEqual('interpolated-variable-1.sass');
        });

        it('Should parse interpolated variables inside values', function() {
            return this.shouldBeEqual('interpolated-variable-2.sass');
        });

        it('Should parse defaults', function() {
            return this.shouldBeEqual('default.sass');
        });

        it('Should parse @import', function() {
            return this.shouldBeEqual('import.sass');
        });

        it('Should parse @include', function() {
            return this.shouldBeEqual('include.sass');
        });

        it('Should parse nested @media', function() {
            return this.shouldBeEqual('nested-media.sass');
        });

        it('Should parse @extend with classes', function() {
            return this.shouldBeEqual('extend-1.sass');
        });

        it('Should parse @extend with placeholders', function() {
            return this.shouldBeEqual('extend-2.sass');
        });

        it('Should parse @warn', function() {
            return this.shouldBeEqual('warn.sass');
        });

        it('Should parse @if', function() {
            return this.shouldBeEqual('if.sass');
        });

        it('Should parse @if and @else', function() {
            return this.shouldBeEqual('if-else.sass');
        });

        it('Should parse @if and @else if', function() {
            return this.shouldBeEqual('if-else-if.sass');
        });

        it('Should parse @for', function() {
            return this.shouldBeEqual('for.sass');
        });

        it('Should parse @each', function() {
            return this.shouldBeEqual('each.sass');
        });

        it('Should parse @while', function() {
            return this.shouldBeEqual('while.sass');
        });

        it('Should parse mixins', function() {
            return this.shouldBeEqual('mixin-1.sass');
        });

        it('Should parse passing several variables to a mixin', function() {
            return this.shouldBeEqual('mixin-2.sass');
        });

        it('Should parse passing a list of variables to a mixin', function() {
            return this.shouldBeEqual('mixin-3.sass');
        });

        it('Should parse passing a content block to a mixin', function() {
            return this.shouldBeEqual('mixin-4.sass');
        });

        it('Should parse @content', function() {
            return this.shouldBeEqual('content.sass');
        });

        it('Should parse functions', function() {
            return this.shouldBeEqual('function.sass');
        });
    });
});


