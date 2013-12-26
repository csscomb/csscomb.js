var assert = require('assert');

describe('csscomb methods', function() {
    it('getConfig()', function() {
        var config = require('../../config/csscomb.json');

        assert.equal(this.comb.getConfig(), config);
    });

    it('getConfig(number)', function() {
        assert.throws(function() {
            this.comb.getConfig(16);
        });
    });

    it('getConfig(boolean)', function() {
        assert.throws(function() {
            this.comb.getConfig(true);
        });
    });

    it('getConfig(empty string)', function() {
        var config = require('../../config/csscomb.json');

        assert.equal(this.comb.getConfig(''), config);
    });

    it('getConfig(invalid string)', function() {
        assert.throws(function() {
            this.comb.getConfig('nani');
        });
    });

    it('getConfig(csscomb)', function() {
        var config = require('../../config/csscomb.json');

        assert.equal(this.comb.getConfig('csscomb'), config);
    });

    it('getConfig(zen)', function() {
        var config = require('../../config/zen.json');

        assert.equal(this.comb.getConfig('zen'), config);
    });

    it('getConfig(yandex)', function() {
        var config = require('../../config/yandex.json');

        assert.equal(this.comb.getConfig('yandex'), config);
    });
});
