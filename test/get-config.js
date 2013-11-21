var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('csscomb methods', function() {
    var comb = new Comb();

    it('getConfig()', function() {
        var config = require('../config/csscomb.json');

        assert.equal(comb.getConfig(), config);
    });

    it('getConfig(number)', function() {
        assert.throws(function() {
            comb.getConfig(16);
        });
    });

    it('getConfig(boolean)', function() {
        assert.throws(function() {
            comb.getConfig(true);
        });
    });

    it('getConfig(empty string)', function() {
        var config = require('../config/csscomb.json');

        assert.equal(comb.getConfig(''), config);
    });

    it('getConfig(invalid string)', function() {
        assert.throws(function() {
            comb.getConfig('nani');
        });
    });

    it('getConfig(csscomb)', function() {
        var config = require('../config/csscomb.json');

        assert.equal(comb.getConfig('csscomb'), config);
    });

    it('getConfig(zen)', function() {
        var config = require('../config/zen.json');

        assert.equal(comb.getConfig('zen'), config);
    });

    it('getConfig(yandex)', function() {
        var config = require('../config/yandex.json');

        assert.equal(comb.getConfig('yandex'), config);
    });
});
