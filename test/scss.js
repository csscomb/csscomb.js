var Comb = require('../lib/csscomb');
var assert = require('assert');
var fs = require('fs');

describe('SCSS', function() {
    var comb;
    var input;

    function readFile(path) {
        return fs.readFileSync('test/scss/' + path, 'utf8');
    }

    beforeEach(function() {
        comb = new Comb();
        comb.configure({});
    });

    it('Should parse nested rules', function() {
        input = readFile('nested-rule.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse parent selector &', function() {
        input = readFile('parent-selector.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse nested properties', function() {
        input = readFile('nested-property.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse variables', function() {
        input = readFile('variable.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse interpolated variables inside selectors', function() {
        input = readFile('interpolated-variable-1.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse interpolated variables inside values', function() {
        input = readFile('interpolated-variable-2.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse defaults', function() {
        input = readFile('default.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @import', function() {
        input = readFile('import.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @include', function() {
        input = readFile('include.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse nested @media', function() {
        input = readFile('nested-media.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @extend with classes', function() {
        input = readFile('extend-1.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @extend with placeholders', function() {
        input = readFile('extend-2.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @warn', function() {
        input = readFile('warn.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @if', function() {
        input = readFile('if.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @if and @else', function() {
        input = readFile('if-else.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @if and @else if', function() {
        input = readFile('if-else-if.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @for', function() {
        input = readFile('for.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @each', function() {
        input = readFile('each.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @while', function() {
        input = readFile('while.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse mixins', function() {
        input = readFile('mixin-1.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse passing several variables to a mixin', function() {
        input = readFile('mixin-2.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse passing a list of variables to a mixin', function() {
        input = readFile('mixin-3.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse passing a content block to a mixin', function() {
        input = readFile('mixin-4.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse @content', function() {
        input = readFile('content.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should parse functions', function() {
        input = readFile('function.scss');
        assert.equal(comb.processString(input, 'scss'), input);
    });
});
