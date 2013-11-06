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

    describe('Parsing', function() {
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

    describe('Sorting', function() {
        it('Should sort properties inside rules', function() {
            config = { 'sort-order': [
                ['top', 'color']
            ] };

            input = 'div { color: tomato; top: 0; }';

            expected = 'div {top: 0;  color: tomato; }';
        });

        it('Should sort properties inside nested rules', function() {
            config = { 'sort-order': [
                ['top', 'color']
            ] };

            input = 'div { color: tomato; a { color: nani; top: 0; } }';

            expected = 'div { color: tomato; a {top: 0;  color: nani; } }';
        });

        it('Should sort properties divided by nested rules', function() {
            config = { 'sort-order': [
                ['top', 'left', 'color']
            ] };

            input = 'div { color: tomato; a { color: nani; top: 0; } left: 0; }';

            expected = 'div { left: 0;  color: tomato; a {top: 0;  color: nani; }}';
        });

        it('Should group declarations with proper comments and spaces (single line)', function() {
            config = { 'sort-order': [
                ['top', 'color']
            ] };

            input = 'div {/* 1 */ color: tomato; /* 2 */ top: 0; /* 3 */ /* 4 */}';

            expected = 'div {top: 0; /* 3 */ /* 4 *//* 1 */ color: tomato; /* 2 */ }';
        });

        it('Should group declarations with proper comments and spaces (multiple lines). Test 1', function() {
            config = { 'sort-order': [
                ['top', 'color']
            ] };

            input = 'div {\n' +
                '    color: tomato; /* 1 */\n' +
                '    /* 2 */\n' +
                '    /* 3 */\n' +
                '    top: 0; /* 4 */\n' +
                '    /* 5 */\n' +
                '}';

            expected = 'div {\n' +
                '    /* 2 */\n' +
                '    /* 3 */\n' +
                '    top: 0; /* 4 */\n' +
                '    color: tomato; /* 1 */\n' +
                '    /* 5 */\n' +
                '}';
        });

        it('Should group declarations with proper comments and spaces (multiple lines). Test 2', function() {
            config = { 'sort-order': [
                ['$variable', 'color']
            ] };

            input = 'p {\n' +
                    '    /* One hell of a comment */\n' +
                    '    color: tomato;\n' +
                    '    // Get in line!\n' +
                    '    @var: white;\n' +
                    '    }';

            expected = 'p {\n' +
                       '    // Get in line!\n' +
                       '    @var: white;\n' +
                       '    /* One hell of a comment */\n' +
                       '    color: tomato;\n' +
                       '    }';
        });

        it('Should group declarations with proper comments and spaces (multiple lines). Test 3', function() {
            config = { 'sort-order': [
                ['$variable', 'color']
            ] };

            input = 'p {\n' +
                    '    color: tomato; /* One hell of a comment */\n' +
                    '    @var: white; // Get in line!\n' +
                    '    }';

            expected = 'p {\n' +
                       '    @var: white; // Get in line!\n' +
                       '    color: tomato; /* One hell of a comment */\n' +
                       '    }';
        });

        it('Should divide properties from different groups with an empty line', function() {
            config = { 'sort-order': [
                ['top'], ['color']
            ] };

            input = 'div {\n' +
                '    color: tomato;\n' +
                '    top: 0;\n' +
                '}';

            expected = 'div {\n' +
                '    top: 0;\n' +
                '\n' +
                '    color: tomato;\n' +
                '}';
        });

        it('Should sort variables', function() {
            config = { 'sort-order': [
                ['$variable', 'color']
            ] };

            input = 'div { color: @red; @red: tomato; }';

            expected = 'div {@red: tomato;  color: @red; }';
        });

        it('Should sort imports', function() {
            config = { 'sort-order': [
                ['$import', 'color']
            ] };

            input = 'div { color: tomato; @import "foo.css"; }';

            expected = 'div {@import "foo.css";  color: tomato; }';
        });

        it('Should sort included mixins. Test 1', function() {
            config = { 'sort-order': [
                ['$include', 'color', 'border-top', 'border-bottom']
            ] };

            input = '.bordered {\n' +
                    '    border-bottom: solid 2px black;\n' +
                    '    border-top: dotted 1px black;\n' +
                    '    }\n' +
                    '#menu a {\n' +
                    '    color: #111;\n' +
                    '    .bordered;\n' +
                    '    }\n' +
                    '.post a {\n' +
                    '    color: red;\n' +
                    '    .bordered;\n' +
                    '    }';

            expected = '.bordered {\n' +
                       '    border-top: dotted 1px black;\n' +
                       '    border-bottom: solid 2px black;\n' +
                       '    }\n' +
                       '#menu a {\n' +
                       '    .bordered;\n' +
                       '    color: #111;\n' +
                       '    }\n' +
                       '.post a {\n' +
                       '    .bordered;\n' +
                       '    color: red;\n' +
                       '    }';
        });

        it('Should sort included mixins. Test 2', function() {
            config = { 'sort-order': [
                ['$include', 'top', 'color']
            ] };

            input = '.test {\n' +
                    '    .test1();\n' +
                    '    color: tomato;\n' +
                    '    .test2();\n' +
                    '    top: 0;\n' +
                    '    }';

            expected = '.test {\n' +
                       '    .test1();\n' +
                       '    .test2();\n' +
                       '    top: 0;\n' +
                       '    color: tomato;\n' +
                       '    }';
        });

        it('Should sort included mixins. Test 3', function() {
            config = { 'sort-order': [
                ['$include', 'border', 'color']
            ] };

            input = '.foo {\n' +
                    '    color: #0f0;\n' +
                    '    border: 1px solid #f00;\n' +
                    '    .linear-gradient(#fff; #000);\n' +
                    '}';

            expected = '.foo {\n' +
                       '    .linear-gradient(#fff; #000);\n' +
                       '    border: 1px solid #f00;\n' +
                       '    color: #0f0;\n' +
                       '}';
        });
    });
});
