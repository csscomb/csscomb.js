var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/sort-order (scss)', function() {
    var comb;
    var config;
    var input;
    var expected;

    beforeEach(function() {
        comb = new Comb();
    });

    afterEach(function() {
        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

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

    it('Should group declarations with proper comments and spaces (multiple lines)', function() {
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

    it('Should group declarations with proper comments and spaces (single line)', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = 'div {/* 1 */ color: tomato; /* 2 */ top: 0; /* 3 */ /* 4 */}';

        expected = 'div {top: 0; /* 3 */ /* 4 *//* 1 */ color: tomato; /* 2 */ }';
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

        input = 'div { color: $tomato; $red: tomato; }';

        expected = 'div {$red: tomato;  color: $tomato; }';
    });

    it('Should sort imports', function() {
        config = { 'sort-order': [
            ['$import', 'color']
        ] };

        input = 'div { color: tomato; @import "foo.css"; }';

        expected = 'div {@import "foo.css";  color: tomato; }';
    });

    it('Should sort @include-s', function() {
        config = { 'sort-order': [
            ['$include', 'color']
        ] };

        input = 'div { color: tomato; @include .nani; }';

        expected = 'div {@include .nani;  color: tomato; }';
    });

    it('Should sort @extend-s', function() {
        config = { 'sort-order': [
            ['$include', 'color']
        ] };

        input = 'div { color: tomato; @extend %nani; }';

        expected = 'div {@extend %nani;  color: tomato; }';
    });

    it('Should sort properties inside blocks passed to mixins', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = '.foo { @include nani { color: tomato; top: 0; } }';

        expected = '.foo { @include nani {top: 0;  color: tomato; } }';
    });
});
