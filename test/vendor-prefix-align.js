var Comb = require('../lib/csscomb');
var fs = require('fs');
var assert = require('assert');

describe('options/vendor-prefix-align', function() {
    var comb;

    beforeEach(function() {
        var config = {
            'vendor-prefix-align': true
        };

        comb = new Comb();
        comb.configure(config);
    });

    it('Should correctly align prefixes in properties', function() {
        var input = fs.readFileSync('./test/vendor-prefix-align/property-align.css', 'utf8');
        var expected = fs.readFileSync('./test/vendor-prefix-align/property-align.expected.css', 'utf8');

        assert.equal(comb.processString(input), expected);
    });

    it('Should correctly align prefixes in values', function() {
        var input = fs.readFileSync('./test/vendor-prefix-align/value-align.css', 'utf8');
        var expected = fs.readFileSync('./test/vendor-prefix-align/value-align.expected.css', 'utf8');

        assert.equal(comb.processString(input), expected);
    });

    it('Should not touch already align prefixes', function() {
        var input = fs.readFileSync('./test/vendor-prefix-align/already-aligned.css', 'utf8');
        var expected = fs.readFileSync('./test/vendor-prefix-align/already-aligned.expected.css', 'utf8');

        assert.equal(comb.processString(input), expected);
    });

    it('Should always correctly align prefixes', function() {
        var input = fs.readFileSync('./test/vendor-prefix-align/complex.css', 'utf8');
        var expected = fs.readFileSync('./test/vendor-prefix-align/complex.expected.css', 'utf8');

        assert.equal(comb.processString(input), expected);
    });

});
