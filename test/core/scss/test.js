let Test = require('../core_test');

describe('scss', function() {
    it('Should parse nested rules', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('nested-rule.scss');
    });

    it('Should parse parent selector &', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('parent-selector.scss');
    });

    it('Should parse nested properties', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('nested-property.scss');
    });

    it('Should parse variables', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('variable.scss');
    });

    it('Should parse interpolated variables inside selectors', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('interpolated-variable-1.scss');
    });

    it('Should parse interpolated variables inside values', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('interpolated-variable-2.scss');
    });

    it('Should parse defaults', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('default.scss');
    });

    it('Should parse @import', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('import.scss');
    });

    it('Should parse @include', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('include.scss');
    });

    it('Should parse nested @media', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('nested-media.scss');
    });

    it('Should parse @extend with classes', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('extend-1.scss');
    });

    it('Should parse @extend with placeholders', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('extend-2.scss');
    });

    it('Should parse @warn', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('warn.scss');
    });

    it('Should parse @if', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('if.scss');
    });

    it('Should parse @if and @else', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('if-else.scss');
    });

    it('Should parse @if and @else if', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('if-else-if.scss');
    });

    it('Should parse @for', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('for.scss');
    });

    it('Should parse @each', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('each.scss');
    });

    it('Should parse @while', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('while.scss');
    });

    it('Should parse mixins', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('mixin-1.scss');
    });

    it('Should parse passing several variables to a mixin', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('mixin-2.scss');
    });

    it('Should parse passing a list of variables to a mixin', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('mixin-3.scss');
    });

    it('Should parse passing a content block to a mixin', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('mixin-4.scss');
    });

    it('Should parse @content', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('content.scss');
    });

    it('Should parse an empty file', function() {
      let test = new Test(this);
      test.comb.configure({});

      return test.shouldBeEqual('empty.scss');
    });

    it('Should parse functions', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('function.scss');
    });
});

