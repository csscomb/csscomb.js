describe('Sass', function() {
    beforeEach(function() {
        this.filename = __filename;
        this.comb.configure({});
    });

    it('Should parse nested rules', function() {
        this.shouldBeEqual('nested-rule.sass');
    });

    it('Should parse parent selector &', function() {
        this.shouldBeEqual('parent-selector.sass');
    });

    it('Should parse nested properties', function() {
        this.shouldBeEqual('nested-property.sass');
    });

    it('Should parse variables', function() {
        this.shouldBeEqual('variable.sass');
    });

    it('Should parse interpolated variables inside selectors', function() {
        this.shouldBeEqual('interpolated-variable-1.sass');
    });

    it('Should parse interpolated variables inside values', function() {
        this.shouldBeEqual('interpolated-variable-2.sass');
    });

    it('Should parse defaults', function() {
        this.shouldBeEqual('default.sass');
    });

    it('Should parse @import', function() {
        this.shouldBeEqual('import.sass');
    });

    it('Should parse @include', function() {
        this.shouldBeEqual('include.sass');
    });

    it('Should parse nested @media', function() {
        this.shouldBeEqual('nested-media.sass');
    });

    it('Should parse @extend with classes', function() {
        this.shouldBeEqual('extend-1.sass');
    });

    it('Should parse @extend with placeholders', function() {
        this.shouldBeEqual('extend-2.sass');
    });

    it('Should parse @warn', function() {
        this.shouldBeEqual('warn.sass');
    });

    it('Should parse @if', function() {
        this.shouldBeEqual('if.sass');
    });

    it('Should parse @if and @else', function() {
        this.shouldBeEqual('if-else.sass');
    });

    it('Should parse @if and @else if', function() {
        this.shouldBeEqual('if-else-if.sass');
    });

    it('Should parse @for', function() {
        this.shouldBeEqual('for.sass');
    });

    it('Should parse @each', function() {
        this.shouldBeEqual('each.sass');
    });

    it('Should parse @while', function() {
        this.shouldBeEqual('while.sass');
    });

    it('Should parse mixins', function() {
        this.shouldBeEqual('mixin-1.sass');
    });

    it('Should parse passing several variables to a mixin', function() {
        this.shouldBeEqual('mixin-2.sass');
    });

    it('Should parse passing a list of variables to a mixin', function() {
        this.shouldBeEqual('mixin-3.sass');
    });

    it('Should parse passing a content block to a mixin', function() {
        this.shouldBeEqual('mixin-4.sass');
    });

    it('Should parse @content', function() {
        this.shouldBeEqual('content.sass');
    });

    it('Should parse functions', function() {
        this.shouldBeEqual('function.sass');
    });
});


