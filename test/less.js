var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('LESS', function() {
    var comb;
    var config;
    var input;
    var expected;

    beforeEach(function() {
        comb = new Comb();
    });

    afterEach(function() {
        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should parse nested rules', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = 'div { color: tomato; a { top: 0; } }';

        expected = 'div { color: tomato; a { top: 0; } }';
    });

    it('Should parse operations', function() {
        config = {};

        input = 'div {\n' +
                '    @base: 5%;\n' +
                '    @filler: @base * 2;\n' +
                '    @other: @base + @filler;\n' +
                '    color: #888 / 4;\n' +
                '    background-color: @base-color + #111;\n' +
                '    height: 100% / 2 + @filler;\n' +
                '    }';

        expected = 'div {\n' +
                   '    @base: 5%;\n' +
                   '    @filler: @base * 2;\n' +
                   '    @other: @base + @filler;\n' +
                   '    color: #888 / 4;\n' +
                   '    background-color: @base-color + #111;\n' +
                   '    height: 100% / 2 + @filler;\n' +
                   '    }';
    });

    it('Should parse parent selector &', function() {
        config = { 'sort-order': [
            ['top', 'left', 'color']
        ] };

        input = 'div { color: tomato; &.top { color: nani; top: 0; } left: 0; }';

        expected = 'div { left: 0;  color: tomato; &.top {top: 0;  color: nani; }}';
    });

    it('Should parse variables', function() {
        config = {};

        input = '@red: tomato; div { color: @tomato; top: @@foo; }';

        expected = '@red: tomato; div { color: @tomato; top: @@foo; }';
    });

    it('Should parse interpolated variables inside selectors', function() {
        config = { 'sort-order': [
            ['top', 'left', 'color']
        ] };

        input = 'div.@{nani} {color:tomato;top:0;}';

        expected = 'div.@{nani} {top:0;color:tomato;}';
    });

    it('Should parse interpolated variables inside values', function() {
        config = { 'sort-order': [
            ['top', 'left', 'color']
        ] };

        input = 'div {color:@{tomato};top:0;}';

        expected = 'div {top:0;color:@{tomato};}';
    });

    it('Should parse @import', function() {
        config = {};

        input = 'div { @import "foo.css"; top: 0; }';

        expected = 'div { @import "foo.css"; top: 0; }';
    });

    it('Should parse included mixins', function() {
        config = {};

        input = 'div { .mixin; top: 0; }';

        expected = 'div { .mixin; top: 0; }';
    });

    it('Should parse nested @media', function() {
        config = {};

        input = 'div {\n' +
            '  @media screen and (orientation: landscape) {\n' +
            '    color: tomato;\n' +
            '  }\n' +
            '  top: 0;\n' +
            '}';

        expected = 'div {\n' +
            '  @media screen and (orientation: landscape) {\n' +
            '    color: tomato;\n' +
            '  }\n' +
            '  top: 0;\n' +
            '}';
    });
});
