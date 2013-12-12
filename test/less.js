var Comb = require('../lib/csscomb');
var assert = require('assert');
var fs = require('fs');

describe('LESS', function() {
    var comb;
    var input;

    function readFile(path) {
        return fs.readFileSync('test/less/' + path, 'utf8');
    }

    beforeEach(function() {
        comb = new Comb();
        comb.configure({});
    });

    it('Should parse nested rules', function() {
        input = readFile('nested-rule.less');
        assert.equal(comb.processString(input, 'less'), input);
    });

    it('Should parse operations', function() {
        input = readFile('operation.less');
        assert.equal(comb.processString(input, 'less'), input);
    });

    it('Should parse parent selector &', function() {
        input = readFile('parent-selector.less');
        assert.equal(comb.processString(input, 'less'), input);
    });

    it('Should parse variables', function() {
        input = readFile('variable.less');
        assert.equal(comb.processString(input, 'less'), input);
    });

    it('Should parse interpolated variables inside selectors', function() {
        input = readFile('interpolated-variable-1.less');
        assert.equal(comb.processString(input, 'less'), input);
    });

    it('Should parse interpolated variables inside values', function() {
        input = readFile('interpolated-variable-2.less');
        assert.equal(comb.processString(input, 'less'), input);
    });

    it('Should parse @import', function() {
        input = readFile('import.less');
        assert.equal(comb.processString(input, 'less'), input);
    });

    it('Should parse included mixins', function() {
        input = readFile('mixin.less');
        assert.equal(comb.processString(input, 'less'), input);
    });

    it('Should parse nested @media', function() {
        input = readFile('nested-media.less');
        assert.equal(comb.processString(input, 'less'), input);
    });
});
