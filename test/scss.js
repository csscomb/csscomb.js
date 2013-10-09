var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('SCSS', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    describe('Parsing', function() {
        it('Should parse nested rules', function() {
            comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div { color: tomato; a { top: 0; } }'
                ),
                    'div { color: tomato; a { top: 0; } }'
            );
        });

        it('Should parse parent selector &', function() {
            comb.configure({ 'sort-order': [
                ['top', 'left', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div { color: tomato; &.top { color: nani; top: 0; } left: 0; }'
                ),
                    'div { left: 0;  color: tomato; &.top {top: 0;  color: nani; }}'
            );
        });

        it('Should parse nested properties', function() {
            comb.configure({ 'sort-order': [
                ['left', 'color', 'font']
            ] });
            assert.equal(
                comb.processString(
                    'div { color: tomato; font: 2px/3px { family: fantasy; size: 30em; } left: 0; }'
                ),
                    'div {left: 0;  color: tomato; font: 2px/3px { family: fantasy; size: 30em; } }'
            );
        });

        it('Should parse variables', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    '$red: tomato; div { color: $tomato; }'
                ),
                    '$red: tomato; div { color: $tomato; }'
            );
        });

        it('Should parse interpolated variables inside selectors', function() {
            comb.configure({ 'sort-order': [
                ['top', 'left', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div.#{$nani} {color:tomato;top:0;}'
                ),
                    'div.#{$nani} {top:0;color:tomato;}'
            );
        });

        it('Should parse interpolated variables inside values', function() {
            comb.configure({ 'sort-order': [
                ['top', 'left', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div {color:#{$tomato};top:0;}'
                ),
                    'div {top:0;color:#{$tomato};}'
            );
        });

        it('Should parse defaults', function() {
            comb.configure({ 'sort-order': [
                ['top', 'left', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div { color: tomato !default; top: 0; }'
                ),
                    'div {top: 0;  color: tomato !default; }'
            );
        });

        it('Should parse @import', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div { @import "foo.css"; top: 0; }'
                ),
                    'div { @import "foo.css"; top: 0; }'
            );
        });

        it('Should parse @include', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div { @include nani($panda); top: 0; }'
                ),
                    'div { @include nani($panda); top: 0; }'
            );
        });

        it('Should parse nested @media', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div {\n' +
                    '  @media screen and (orientation: landscape) {\n' +
                    '    color: tomato;\n' +
                    '  }\n' +
                    '  top: 0;\n' +
                    '}'
                ),
                    'div {\n' +
                    '  @media screen and (orientation: landscape) {\n' +
                    '    color: tomato;\n' +
                    '  }\n' +
                    '  top: 0;\n' +
                    '}'
            );
        });

        it('Should parse @extend with classes', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div { @extend .nani; top: 0; }'
                ),
                    'div { @extend .nani; top: 0; }'
            );
        });

        it('Should parse @extend with placeholders', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div { @extend %nani; top: 0; }'
                ),
                    'div { @extend %nani; top: 0; }'
            );
        });

        it('Should parse @warn', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div { @warn "nani"; top: 0; }'
                ),
                    'div { @warn "nani"; top: 0; }'
            );
        });

        it('Should parse @if', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div { @if $type == ocean { top: 0; } }'
                ),
                    'div { @if $type == ocean { top: 0; } }'
            );
        });

        it('Should parse @if and @else', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div { @if $type == ocean { top: 0; } @else { left: 0; } }'
                ),
                    'div { @if $type == ocean { top: 0; } @else { left: 0; } }'
            );
        });

        it('Should parse @if and @else if', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div { @if $type == ocean { top: 0; } @else if $type == monster { left: 0; } }'
                ),
                    'div { @if $type == ocean { top: 0; } @else if $type == monster { left: 0; } }'
            );
        });

        it('Should parse @for', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div {\n' +
                    '  @for $i from 1 through 3 {\n' +
                    '    .item-#{$i} { width: 2em * 1; }\n' +
                    '  }\n' +
                    '}'
                ),
                    'div {\n' +
                    '  @for $i from 1 through 3 {\n' +
                    '    .item-#{$i} { width: 2em * 1; }\n' +
                    '  }\n' +
                    '}'
            );
        });

        it('Should parse @each', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div {\n' +
                    '  @each $animal in puma, sea-slug, erget {\n' +
                    '    .#{$animal}-icon { background-image: url("/images/#{$animal}.png"); }\n' +
                    '  }\n' +
                    '}'
                ),
                    'div {\n' +
                    '  @each $animal in puma, sea-slug, erget {\n' +
                    '    .#{$animal}-icon { background-image: url("/images/#{$animal}.png"); }\n' +
                    '  }\n' +
                    '}'
            );
        });

        it('Should parse @while', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    'div {\n' +
                    '  @while $i > 6 {\n' +
                    '    .item { width: 2em * $i; }\n' +
                    '    $i: $i - 2;\n' +
                    '  }\n' +
                    '}'
                ),
                    'div {\n' +
                    '  @while $i > 6 {\n' +
                    '    .item { width: 2em * $i; }\n' +
                    '    $i: $i - 2;\n' +
                    '  }\n' +
                    '}'
            );
        });

        it('Should parse mixins', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    '@mixin nani { color: tomato; } .foo { @include nani; }'
                ),
                    '@mixin nani { color: tomato; } .foo { @include nani; }'
            );
        });

        it('Should parse passing several variables to a mixin', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    '@mixin nani($tomato) { color: $tomato; } .foo { @include nani(red); }'
                ),
                    '@mixin nani($tomato) { color: $tomato; } .foo { @include nani(red); }'
            );
        });

        it('Should parse passing a list of variables to a mixin', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    '@mixin nani($shadows...) { box-shadow: $shadows; }\n' +
                    '.foo { @include nani(0px 4px 5px #666, 2px 6px 10px #999); }'
                ),
                    '@mixin nani($shadows...) { box-shadow: $shadows; }\n' +
                    '.foo { @include nani(0px 4px 5px #666, 2px 6px 10px #999); }'
            );
        });

        it('Should parse passing a content block to a mixin', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    '.foo { @include nani { color: tomato; top: 0 } }'
                ),
                    '.foo { @include nani { color: tomato; top: 0 } }'
            );
        });

        it('Should parse @content', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    '@mixin nani { a { @content; } }'
                ),
                    '@mixin nani { a { @content; } }'
            );
        });

        it('Should parse functions', function() {
            comb.configure({});
            assert.equal(
                comb.processString(
                    '@function nani($n) { @return $n * 2; }'
                ),
                    '@function nani($n) { @return $n * 2; }'
            );
        });
    });

    describe('Sorting', function() {
        it('Should sort properties inside rules', function() {
            comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div { color: tomato; top: 0; }'
                ),
                    'div {top: 0;  color: tomato; }'
            );
        });

        it('Should sort properties inside nested rules', function() {
            comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div { color: tomato; a { color: nani; top: 0; } }'
                ),
                    'div { color: tomato; a {top: 0;  color: nani; } }'
            );
        });

        it('Should sort properties divided by nested rules', function() {
            comb.configure({ 'sort-order': [
                ['top', 'left', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div { color: tomato; a { color: nani; top: 0; } left: 0; }'
                ),
                    'div { left: 0;  color: tomato; a {top: 0;  color: nani; }}'
            );
        });

        it('Should group declarations with proper comments and spaces (multiple lines)', function() {
            comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div {\n' +
                    '    color: tomato; /* 1 */\n' +
                    '    /* 2 */\n' +
                    '    /* 3 */\n' +
                    '    top: 0; /* 4 */\n' +
                    '    /* 5 */\n' +
                    '}'
                ),
                    'div {\n' +
                    '    /* 2 */\n' +
                    '    /* 3 */\n' +
                    '    top: 0; /* 4 */\n' +
                    '    color: tomato; /* 1 */\n' +
                    '    /* 5 */\n' +
                    '}'
            );
        });

        it('Should group declarations with proper comments and spaces (single line)', function() {
            comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div {/* 1 */ color: tomato; /* 2 */ top: 0; /* 3 */ /* 4 */}'
                ),
                    'div {top: 0; /* 3 */ /* 4 *//* 1 */ color: tomato; /* 2 */ }'
            );
        });

        it('Should divide properties from different groups with an empty line', function() {
            comb.configure({ 'sort-order': [
                ['top'], ['color']
            ] });
            assert.equal(
                comb.processString(
                    'div {\n' +
                    '    color: tomato;\n' +
                    '    top: 0;\n' +
                    '}'
                ),
                    'div {\n' +
                    '    top: 0;\n' +
                    '\n' +
                    '    color: tomato;\n' +
                    '}'
            );
        });

        it('Should sort variables', function() {
            comb.configure({ 'sort-order': [
                ['$variable', 'color']
            ] });
            assert.equal(
                comb.processString(
                    'div { color: $tomato; $red: tomato; }'
                ),
                    'div {$red: tomato;  color: $tomato; }'
            );
        });

        it('Should sort imports', function() {
            comb.configure({ 'sort-order': [
                ['$import', 'color']
            ] });
            assert.equal(comb.processString(
                'div { color: tomato; @import "foo.css"; }'
            ),
                'div {@import "foo.css";  color: tomato; }');
        });

        it('Should sort @include-s', function() {
            comb.configure({ 'sort-order': [
                ['$include', 'color']
            ] });
            assert.equal(comb.processString(
                'div { color: tomato; @include .nani; }'
            ),
                'div {@include .nani;  color: tomato; }');
        });

        it('Should sort @extend-s', function() {
            comb.configure({ 'sort-order': [
                ['$extend', 'color']
            ] });
            assert.equal(comb.processString(
                'div { color: tomato; @extend %nani; }'
            ),
                'div {@extend %nani;  color: tomato; }');
        });

        it('Should sort properties inside blocks passed to mixins', function() {
            comb.configure({ 'sort-order': [
                ['top', 'color']
            ] });
            assert.equal(comb.processString(
                '.foo { @include nani { color: tomato; top: 0; } }'
            ),
                '.foo { @include nani {top: 0;  color: tomato; } }');
        });
    });
});
