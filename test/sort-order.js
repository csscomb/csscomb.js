var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/sort-order', function() {

    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Should be in expected order in case of 1 group', function() {

        var config = {
                'sort-order': [
                    ['position', 'z-index']
                ]
            };

        var input = 'a\n' +
            '{\n' +
            '\tz-index: 2;\n' +
            '\tposition: absolute;\n' +
            '}';

        var expected = 'a\n' +
            '{\n' +
            '\tposition: absolute;\n' +
            '\tz-index: 2;\n' +
            '}';

        comb.configure(config);
        assert.equal(comb.processString(input), expected);

    });

    it('Shuld be in expected order in case of multiple groups', function() {

        var config = {
                'sort-order': [
                    ['position', 'z-index'],
                    ['width', 'height']
                ]
            };

        var input = 'a\n' +
            '{\n' +
            '\tz-index: 2;\n' +
            '\tposition: absolute;\n' +
            '\theight: 2px;\n' +
            '\twidth: 2px;\n' +
            '}';

        var expected = 'a\n' +
            '{\n' +
            '\tposition: absolute;\n' +
            '\tz-index: 2;\n' +
            '\n' +
            '\twidth: 2px;\n' +
            '\theight: 2px;\n' +
            '}';

        comb.configure(config);
        assert.equal(comb.processString(input), expected);

    });

    it('Should work correctly with comments in case of 1 group', function() {

        var config = {
                'sort-order': [
                    ['border-bottom', 'font-style'],
                ]
            };

        var input = 'div p em {\n' +
            '\t/* upline comment */\n' +
            '\tfont-style:italic;\n' +
            '\tborder-bottom:1px solid red; /* trololo */ /* trololo */\n' +
            '}';

        var expected = 'div p em {\n' +
            '\tborder-bottom:1px solid red; /* trololo */ /* trololo */\n' +
            '\t/* upline comment */\n' +
            '\tfont-style:italic;\n' +
            '}';

        comb.configure(config);
        assert.equal(comb.processString(input), expected);

    });

    it('Should work correctly with comments in case of multiple groups', function() {

        var config = {
                'sort-order': [
                    ['margin'],
                    ['padding']
                ]
            };

        var input = 'a, b, i /* foobar */\n' +
            '{\n' +
            '  padding: 0;\n' +
            '  margin: 0;\n' +
            '  }';

        var expected = 'a, b, i /* foobar */\n' +
            '{\n' +
            '  margin: 0;\n' +
            '\n' +
            '  padding: 0;\n' +
            '  }';

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
});
