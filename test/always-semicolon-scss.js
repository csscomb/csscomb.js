var Comb = require('../lib/csscomb');
var assert = require('assert');
var fs = require('fs');

describe('options/always-semicolon (scss)', function() {
    var comb;
    var input;
    var expected;

    function readFile(path) {
        return fs.readFileSync('test/always-semicolon-scss/' + path, 'utf8');
    }

    beforeEach(function() {
        comb = new Comb();
        comb.configure({ 'always-semicolon': true });
    });

    it('Should not add semicolon if last value is block (singl-line style)', function() {
        input = readFile('block-value.scss');

        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should not add semicolon if last value is block (multi-line style)', function() {
        input = readFile('block-value-multiline.scss');

        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (single-line style)', function() {
        input = readFile('include-1.scss');
        expected = readFile('include-1.expected.scss');

        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 1 (multi-line style)', function() {
        input = readFile('include-1-multiline.scss');
        expected = readFile('include-1-multiline.expected.scss');

        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (single-line style)', function() {
        input = readFile('include-2.scss');
        expected = readFile('include-2.expected.scss');

        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should add semicolon to last included mixin if missing. Test 2 (multi-line style)', function() {
        input = readFile('include-2-multiline.scss');
        expected = readFile('include-2-multiline.expected.scss');

        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should not add semicolon to last included mixin if there is a block (single-line style)', function() {
        input = readFile('block-include.scss');

        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should not add semicolon to last included mixin if there is a block (multi-line style)', function() {
        input = readFile('block-include-multiline.scss');

        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should add semicolon to last extend if missing (single-line style)', function() {
        input = readFile('extend.scss');
        expected = readFile('extend.expected.scss');

        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should add semicolon to last extend if missing (multi-line style)', function() {
        input = readFile('extend-multiline.scss');
        expected = readFile('extend-multiline.expected.scss');

        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should not add semicolon to condition (single-line style)', function() {
        input = readFile('condition.scss');

        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should not add semicolon to condition (multi-line style)', function() {
        input = readFile('condition-multiline.scss');

        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should not add semicolon to loop (single-line style)', function() {
        input = readFile('loop.scss');

        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should not add semicolon to loop (multi-line style)', function() {
        input = readFile('loop-multiline.scss');

        assert.equal(comb.processString(input, 'scss'), input);
    });
});
