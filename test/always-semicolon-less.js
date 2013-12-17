var Comb = require('../lib/csscomb');
var assert = require('assert');
var fs = require('fs');

describe('options/always-semicolon (scss)', function() {
    var comb;
    var input;
    var expected;

    function readFile(path) {
        return fs.readFileSync('test/always-semicolon-less/' + path, 'utf8');
    }

    beforeEach(function() {
        comb = new Comb();
        comb.configure({ 'always-semicolon': true });
    });

    it('Should not add semicolon to condition (single-line style)', function() {
        input = readFile('condition.less');

        assert.equal(comb.processString(input, 'less'), input);
    });

    it('Should not add semicolon to condition (multi-line style)', function() {
        input = readFile('condition-multiline.less');

        assert.equal(comb.processString(input, 'less'), input);
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (single-line style)', function() {
        input = readFile('include-1.less');
        expected = readFile('include-1.expected.less');

        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (multi-line style)', function() {
        input = readFile('include-1-multiline.less');
        expected = readFile('include-1-multiline.expected.less');

        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (single-line style)', function() {
        input = readFile('include-2.less');
        expected = readFile('include-2.expected.less');

        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (multi-line style)', function() {
        input = readFile('include-2-multiline.less');
        expected = readFile('include-2-multiline.expected.less');

        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 3 (single-line style)', function() {
        input = readFile('include-3.less');
        expected = readFile('include-3.expected.less');

        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 3 (multi-line style)', function() {
        input = readFile('include-3-multiline.less');
        expected = readFile('include-3-multiline.expected.less');

        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 4 (single-line style)', function() {
        input = readFile('include-4.less');
        expected = readFile('include-4.expected.less');

        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 4 (multi-line style)', function() {
        input = readFile('include-4-multiline.less');
        expected = readFile('include-4-multiline.expected.less');

        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 5 (single-line style)', function() {
        input = readFile('include-5.less');
        expected = readFile('include-5.expected.less');

        assert.equal(comb.processString(input, 'less'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 5 (multi-line style)', function() {
        input = readFile('include-5-multiline.less');
        expected = readFile('include-5-multiline.expected.less');

        assert.equal(comb.processString(input, 'less'), expected);
    });
});
