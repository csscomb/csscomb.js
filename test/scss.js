var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('SCSS', function() {
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

    describe('Parsing', function() {
        it('Should parse nested rules', function() {
            config = { 'sort-order': [
                ['top', 'color']
            ] };

            input = 'div { color: tomato; a { top: 0; } }';

            expected = 'div { color: tomato; a { top: 0; } }';
        });

        it('Should parse parent selector &', function() {
            config = { 'sort-order': [
                ['top', 'left', 'color']
            ] };

            input = 'div { color: tomato; &.top { color: nani; top: 0; } left: 0; }';

            expected = 'div { left: 0;  color: tomato; &.top {top: 0;  color: nani; }}';
        });

        it('Should parse nested properties', function() {
            config = { 'sort-order': [
                ['left', 'color', 'font']
            ] };

            input = 'div { color: tomato; font: 2px/3px { family: fantasy; size: 30em; } left: 0; }';

            expected = 'div {left: 0;  color: tomato; font: 2px/3px { family: fantasy; size: 30em; } }';
        });

        it('Should parse variables', function() {
            config = {};

            input = '$red: tomato; div { color: $tomato; }';

            expected = '$red: tomato; div { color: $tomato; }';
        });

        it('Should parse interpolated variables inside selectors', function() {
            config = { 'sort-order': [
                ['top', 'left', 'color']
            ] };

            input = 'div.#{$nani} {color:tomato;top:0;}';

            expected = 'div.#{$nani} {top:0;color:tomato;}';
        });

        it('Should parse interpolated variables inside values', function() {
            config = { 'sort-order': [
                ['top', 'left', 'color']
            ] };

            input = 'div {color:#{$tomato};top:0;}';

            expected = 'div {top:0;color:#{$tomato};}';
        });

        it('Should parse defaults', function() {
            config = { 'sort-order': [
                ['top', 'left', 'color']
            ] };

            input = 'div { color: tomato !default; top: 0; }';

            expected = 'div {top: 0;  color: tomato !default; }';
        });

        it('Should parse @import', function() {
            config = {};

            input = 'div { @import "foo.css"; top: 0; }';

            expected = 'div { @import "foo.css"; top: 0; }';
        });

        it('Should parse @include', function() {
            config = {};

            input = 'div { @include nani($panda); top: 0; }';

            expected = 'div { @include nani($panda); top: 0; }';
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

        it('Should parse @extend with classes', function() {
            config = {};

            input = 'div { @extend .nani; top: 0; }';

            expected = 'div { @extend .nani; top: 0; }';
        });

        it('Should parse @extend with placeholders', function() {
            config = {};

            input = 'div { @extend %nani; top: 0; }';

            expected = 'div { @extend %nani; top: 0; }';
        });

        it('Should parse @warn', function() {
            config = {};

            input = 'div { @warn "nani"; top: 0; }';

            expected = 'div { @warn "nani"; top: 0; }';
        });

        it('Should parse @if', function() {
            config = {};

            input = 'div { @if $type == ocean { top: 0; } }';

            expected = 'div { @if $type == ocean { top: 0; } }';
        });

        it('Should parse @if and @else', function() {
            config = {};

            input = 'div { @if $type == ocean { top: 0; } @else { left: 0; } }';

            expected = 'div { @if $type == ocean { top: 0; } @else { left: 0; } }';
        });

        it('Should parse @if and @else if', function() {
            config = {};

            input = 'div { @if $type == ocean { top: 0; } @else if $type == monster { left: 0; } }';

            expected = 'div { @if $type == ocean { top: 0; } @else if $type == monster { left: 0; } }';
        });

        it('Should parse @for', function() {
            config = {};

            input = 'div {\n' +
                '  @for $i from 1 through 3 {\n' +
                '    .item-#{$i} { width: 2em * 1; }\n' +
                '  }\n' +
                '}';

            expected = 'div {\n' +
                '  @for $i from 1 through 3 {\n' +
                '    .item-#{$i} { width: 2em * 1; }\n' +
                '  }\n' +
                '}';
        });

        it('Should parse @each', function() {
            config = {};

            input = 'div {\n' +
                '  @each $animal in puma, sea-slug, erget {\n' +
                '    .#{$animal}-icon { background-image: url("/images/#{$animal}.png"); }\n' +
                '  }\n' +
                '}';

            expected = 'div {\n' +
                '  @each $animal in puma, sea-slug, erget {\n' +
                '    .#{$animal}-icon { background-image: url("/images/#{$animal}.png"); }\n' +
                '  }\n' +
                '}';
        });

        it('Should parse @while', function() {
            config = {};

            input = 'div {\n' +
                '  @while $i > 6 {\n' +
                '    .item { width: 2em * $i; }\n' +
                '    $i: $i - 2;\n' +
                '  }\n' +
                '}';

            expected = 'div {\n' +
                '  @while $i > 6 {\n' +
                '    .item { width: 2em * $i; }\n' +
                '    $i: $i - 2;\n' +
                '  }\n' +
                '}';
        });

        it('Should parse mixins', function() {
            config = {};

            input = '@mixin nani { color: tomato; } .foo { @include nani; }';

            expected = '@mixin nani { color: tomato; } .foo { @include nani; }';
        });

        it('Should parse passing several variables to a mixin', function() {
            config = {};

            input = '@mixin nani($tomato) { color: $tomato; } .foo { @include nani(red); }';

            expected = '@mixin nani($tomato) { color: $tomato; } .foo { @include nani(red); }';
        });

        it('Should parse passing a list of variables to a mixin', function() {
            config = {};

            input = '@mixin nani($shadows...) { box-shadow: $shadows; }\n' +
                '.foo { @include nani(0px 4px 5px #666, 2px 6px 10px #999); }';

            expected = '@mixin nani($shadows...) { box-shadow: $shadows; }\n' +
                '.foo { @include nani(0px 4px 5px #666, 2px 6px 10px #999); }';
        });

        it('Should parse passing a content block to a mixin', function() {
            config = {};

            input = '.foo { @include nani { color: tomato; top: 0 } }';

            expected = '.foo { @include nani { color: tomato; top: 0 } }';
        });

        it('Should parse @content', function() {
            config = {};

            input = '@mixin nani { a { @content; } }';

            expected =  '@mixin nani { a { @content; } }';
        });

        it('Should parse functions', function() {
            config = {};

            input = '@function nani($n) { @return $n * 2; }';

            expected = '@function nani($n) { @return $n * 2; }';
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
});
