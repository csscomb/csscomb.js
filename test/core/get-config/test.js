var assert = require('assert');
let Test = require('../core_test');

describe('csscomb methods', function() {
    it('getConfig()', function() {
        let test = new Test(this);
        var config = require('../../../config/csscomb.json');

        assert.equal(test.Comb.getConfig(), config);
    });

    it('getConfig(number)', function() {
        let test = new Test(this);

        assert.throws(function() {
            test.Comb.getConfig(16);
        });
    });

    it('getConfig(boolean)', function() {
        let test = new Test(this);

        assert.throws(function() {
            test.Comb.getConfig(true);
        });
    });

    it('getConfig(empty string)', function() {
        let test = new Test(this);
        var config = require('../../../config/csscomb.json');

        assert.equal(test.Comb.getConfig(''), config);
    });

    it('getConfig(invalid string)', function() {
        let test = new Test(this);

        assert.throws(function() {
            test.Comb.getConfig('nani');
        });
    });

    it('getConfig(csscomb)', function() {
        let test = new Test(this);
        var config = require('../../../config/csscomb.json');

        assert.equal(test.Comb.getConfig('csscomb'), config);
    });

    it('getConfig(zen)', function() {
        let test = new Test(this);
        var config = require('../../../config/zen.json');

        assert.equal(test.Comb.getConfig('zen'), config);
    });

    it('getConfig(yandex)', function() {
        let test = new Test(this);
        var config = require('../../../config/yandex.json');

        assert.equal(test.Comb.getConfig('yandex'), config);
    });
});
