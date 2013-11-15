var Comb = require('../lib/csscomb');
var assert = require('assert');
var fs = require('fs');

describe('options/sort-order (scss)', function() {
    var comb;
    var config;
    var input;
    var expected;

    function readFile(path) {
        return fs.readFileSync('test/sort-order-scss/' + path, 'utf8');
    }

    beforeEach(function() {
        comb = new Comb();
    });

    it('Should sort properties inside rules (single line)', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = readFile('rule.scss');
        expected = readFile('rule.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should sort properties inside rules (multiple lines)', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = readFile('rule.scss');
        expected = readFile('rule.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should sort properties inside nested rules', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = readFile('nested-rule-1.scss');
        expected = readFile('nested-rule-1.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should sort properties divided by nested rules', function() {
        config = { 'sort-order': [
            ['top', 'left', 'color']
        ] };

        input = readFile('nested-rule-2.scss');
        expected = readFile('nested-rule-2.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should group declarations with proper comments and spaces (multiple lines)', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = readFile('comments-1.scss');
        expected = readFile('comments-1.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should group declarations with proper comments and spaces (single line)', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = readFile('comments-2.scss');
        expected = readFile('comments-2.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should divide properties from different groups with an empty line', function() {
        config = { 'sort-order': [
            ['top'], ['color']
        ] };

        input = readFile('different-groups.scss');
        expected = readFile('different-groups.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should sort variables', function() {
        config = { 'sort-order': [
            ['$variable', 'color']
        ] };

        input = readFile('variable.scss');
        expected = readFile('variable.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should sort imports', function() {
        config = { 'sort-order': [
            ['$import', 'color']
        ] };

        input = readFile('import.scss');
        expected = readFile('import.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should sort @include-s', function() {
        config = { 'sort-order': [
            ['$include', 'color']
        ] };

        input = readFile('include.scss');
        expected = readFile('include.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should sort @extend-s', function() {
        config = { 'sort-order': [
            ['$include', 'color']
        ] };

        input = readFile('extend.scss');
        expected = readFile('extend.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should sort properties inside blocks passed to mixins', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = readFile('mixin.scss');
        expected = readFile('mixin.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should handle properties preceeding rulesets', function() {
        config = { 'sort-order': [
            ['top', 'left', 'color']
        ] };

        input = readFile('ruleset.scss');
        expected = readFile('ruleset.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should handle properties preceeding conditions', function() {
        config = { 'sort-order': [
            ['font-size', 'display', 'top', 'color']
        ] };

        input = readFile('condition.scss');
        expected = readFile('condition.expected.scss');

        comb.configure(config);
        assert.equal(comb.processString(input, 'scss'), expected);
    });
});
