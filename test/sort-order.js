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

    it('Should be in expected order in case properties are not grouped', function() {
        var config = { 'sort-order': ['position', 'z-index'] };

        var input = readFile('single-group.css');
        var expected = readFile('single-group.expected.css');

        comb.configure(config);
        assert.equal(comb.processString(input), expected);
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

    it('Should parse semicolons inside data uri correctly', function() {

        var config = {
                'sort-order': [
                    ['position', 'background', 'color']
                ]
            };

        var input = 'a\n' +
            '{\n' +
            '\tcolor: tomato;\n' +
            '\tbackground: #D2D2D2 no-repeat url(\'data:image/svg+xml;charset=US-ASCII.naninani\');\n' +
            '\tposition: absolute;\n' +
            '}';

        var expected = 'a\n' +
            '{\n' +
            '\tposition: absolute;\n' +
            '\tbackground: #D2D2D2 no-repeat url(\'data:image/svg+xml;charset=US-ASCII.naninani\');\n' +
            '\tcolor: tomato;\n' +
            '}';

        comb.configure(config);
        assert.equal(comb.processString(input), expected);

    });

    it('Should not add more than 1 line between groups', function() {

        var config = {
                'sort-order': [
                    ['top'], ['color']
                ]
            };

        var input = 'a\n' +
            '{\n' +
            '\tcolor: tomato;\n' +
            '\ttop: 0;\n' +
            '}';

        var expected = 'a\n' +
            '{\n' +
            '\ttop: 0;\n' +
            '\n' +
            '\tcolor: tomato;\n' +
            '}';

        comb.configure(config);
        for (var i = 6; i--;) {
            input = comb.processString(input);
        }
        assert.equal(input, expected);

    });

    it('Issue 94. Test 1', function() {
        var config = comb.getConfig('csscomb');

        var input = readFile('issue-94-1.css');
        var expected = readFile('issue-94-1.expected.css');

        comb.configure(config);
        assert.equal(comb.processString(input), expected);
    });

    it('Issue 94. Test 2', function() {
        var config = comb.getConfig('csscomb');

        var input = readFile('issue-94-2.css');
        var expected = readFile('issue-94-2.expected.css');

        comb.configure(config);
        assert.equal(comb.processString(input), expected);
    });

    it('Issue 94. Test 3', function() {
        var config = comb.getConfig('csscomb');

        var input = readFile('issue-94-3.css');
        var expected = readFile('issue-94-3.expected.css');

        comb.configure(config);
        assert.equal(comb.processString(input), expected);
    });
});
