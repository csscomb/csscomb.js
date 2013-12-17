var Comb = require('../lib/csscomb');
var assert = require('assert');
var fs = require('fs');

describe('options/sort-order (less)', function() {
    var comb;
    var config;
    var input;
    var expected;

    function readFile(path) {
        return fs.readFileSync('test/sort-order-less/' + path, 'utf8');
    }

    beforeEach(function() {
        comb = new Comb();
    });

    it('Should sort properties inside rules', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = readFile('rule.less');
        expected = readFile('rule.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should sort properties inside nested rules', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = readFile('nested-rule-1.less');
        expected = readFile('nested-rule-1.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should sort properties divided by nested rules', function() {
        config = { 'sort-order': [
            ['top', 'left', 'color']
        ] };

        input = readFile('nested-rule-2.less');
        expected = readFile('nested-rule-2.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should group declarations with proper comments and spaces (single line)', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = readFile('comments-1.less');
        expected = readFile('comments-1.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should group declarations with proper comments and spaces (multiple lines). Test 1', function() {
        config = { 'sort-order': [
            ['top', 'color']
        ] };

        input = readFile('comments-2.less');
        expected = readFile('comments-2.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should group declarations with proper comments and spaces (multiple lines). Test 2', function() {
        config = { 'sort-order': [
            ['$variable', 'color']
        ] };

        input = readFile('comments-3.less');
        expected = readFile('comments-3.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should group declarations with proper comments and spaces (multiple lines). Test 3', function() {
        config = { 'sort-order': [
            ['$variable', 'color']
        ] };

        input = readFile('comments-3.less');
        expected = readFile('comments-3.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should divide properties from different groups with an empty line', function() {
        config = { 'sort-order': [
            ['top'], ['color']
        ] };

        input = readFile('different-groups.less');
        expected = readFile('different-groups.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should sort variables', function() {
        config = { 'sort-order': [
            ['$variable', 'color']
        ] };

        input = readFile('variable.less');
        expected = readFile('variable.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should sort imports', function() {
        config = { 'sort-order': [
            ['$import', 'color']
        ] };

        input = readFile('import.less');
        expected = readFile('import.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should sort included mixins. Test 1', function() {
        config = { 'sort-order': [
            ['$include', 'color', 'border-top', 'border-bottom']
        ] };

        input = readFile('mixin-1.less');
        expected = readFile('mixin-1.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should sort included mixins. Test 2', function() {
        config = { 'sort-order': [
            ['$include', 'top', 'color']
        ] };

        input = readFile('mixin-2.less');
        expected = readFile('mixin-2.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should sort included mixins. Test 3', function() {
        config = { 'sort-order': [
            ['$include', 'border', 'color']
        ] };

        input = readFile('mixin-3.less');
        expected = readFile('mixin-3.expected.less');

        comb.configure(config);
        assert.equal(comb.processString(input, 'less'), expected);
    });
});
