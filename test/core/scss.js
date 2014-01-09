describe('SCSS', function() {
    beforeEach(function() {
        this.filename = __filename;
        this.comb.configure({});
    });

    it('Should parse nested rules', function() {
        this.shouldBeEqual('nested-rule.scss');
    });

    it('Should parse parent selector &', function() {
        this.shouldBeEqual('parent-selector.scss');
    });

    it('Should parse nested properties', function() {
        this.shouldBeEqual('nested-property.scss');
    });

    it('Should parse variables', function() {
        this.shouldBeEqual('variable.scss');
    });

    it('Should parse interpolated variables inside selectors', function() {
        this.shouldBeEqual('interpolated-variable-1.scss');
    });

    it('Should parse interpolated variables inside values', function() {
        this.shouldBeEqual('interpolated-variable-2.scss');
    });

    it('Should parse defaults', function() {
        this.shouldBeEqual('default.scss');
    });

    it('Should parse @import', function() {
        this.shouldBeEqual('import.scss');
    });

    it('Should parse @include', function() {
        this.shouldBeEqual('include.scss');
    });

    it('Should parse nested @media', function() {
        this.shouldBeEqual('nested-media.scss');
    });

    it('Should parse @extend with classes', function() {
        this.shouldBeEqual('extend-1.scss');
    });

    it('Should parse @extend with placeholders', function() {
        this.shouldBeEqual('extend-2.scss');
    });

    it('Should parse @warn', function() {
        this.shouldBeEqual('warn.scss');
    });

    it('Should parse @if', function() {
        this.shouldBeEqual('if.scss');
    });

    it('Should parse @if and @else', function() {
        this.shouldBeEqual('if-else.scss');
    });

    it('Should parse @if and @else if', function() {
        this.shouldBeEqual('if-else-if.scss');
    });

    it('Should parse @for', function() {
        this.shouldBeEqual('for.scss');
    });

    it('Should parse @each', function() {
        this.shouldBeEqual('each.scss');
    });

    it('Should parse @while', function() {
        this.shouldBeEqual('while.scss');
    });

    it('Should parse mixins', function() {
        this.shouldBeEqual('mixin-1.scss');
    });

    it('Should parse passing several variables to a mixin', function() {
        this.shouldBeEqual('mixin-2.scss');
    });

    it('Should parse passing a list of variables to a mixin', function() {
        this.shouldBeEqual('mixin-3.scss');
    });

    it('Should parse passing a content block to a mixin', function() {
        this.shouldBeEqual('mixin-4.scss');
    });

    it('Should parse @content', function() {
        this.shouldBeEqual('content.scss');
    });

    it('Should parse functions', function() {
        this.shouldBeEqual('function.scss');
    });
});

