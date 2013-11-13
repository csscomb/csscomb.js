var Comb = require('../lib/csscomb');
var assert = require('assert');
var fs = require('fs');

describe('options/sort-order', function() {
    var comb;

    function readFile(path) {
        return fs.readFileSync('test/sort-order/' + path, 'utf8');
    }

    beforeEach(function() {
        comb = new Comb();
    });

    it('Should be in expected order in case of 1 group', function() {
        var config = { 'sort-order': [
            ['position', 'z-index']
        ] };

        var input = readFile('single-group.css');
        var expected = readFile('single-group.expected.css');

        comb.configure(config);
        assert.equal(comb.processString(input), expected);
    });

    it('Shuld be in expected order in case of multiple groups', function() {
        var config = { 'sort-order': [
            ['position', 'z-index'],
            ['width', 'height']
        ] };

        var input = readFile('multiple-groups.css');
        var expected = readFile('multiple-groups.expected.css');

        comb.configure(config);
        assert.equal(comb.processString(input), expected);

    });

    it('Should work correctly with comments in case of 1 group', function() {
        var config = { 'sort-order': [
            ['border-bottom', 'font-style'],
        ] };

        var input = readFile('single-group-comments.css');
        var expected = readFile('single-group-comments.expected.css');

        comb.configure(config);
        assert.equal(comb.processString(input), expected);
    });

    it('Should work correctly with comments in case of multiple groups', function() {
        var config = { 'sort-order': [
            ['margin'],
            ['padding']
        ] };

        var input = readFile('multiple-groups-comments.css');
        var expected = readFile('multiple-groups-comments.expected.css');

        comb.configure(config);
        assert.equal(comb.processString(input), expected);

    });
});
