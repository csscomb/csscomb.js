var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/unitless-zero', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Should remove units in zero-valued dimensions', function() {
        comb.configure({ 'unitless-zero': true });
        assert.equal(
            comb.processString(
                'div { margin: 0em; padding: 0px }'
            ),
            'div { margin: 0; padding: 0 }'
        );
        assert.equal(
            comb.processString(
                'div { margin: 0% }'
            ),
            'div { margin: 0 }'
        );
    });

    it('Should remove units in zero-valued media-query params', function() {
        comb.configure({ 'unitless-zero': true });
        assert.equal(
            comb.processString('@media all and (min-width: 0px) { div { margin: 0em; padding: 0px } }'),
            '@media all and (min-width: 0) { div { margin: 0; padding: 0 } }'
        );
    });

    it('Should not remove units (degs) in rotate property', function() {
        comb.configure({ 'unitless-zero': true });
        assert.equal(
            comb.processString(
                'div { -webkit-transform: rotate(0deg); }'
            ),
            'div { -webkit-transform: rotate(0deg); }'
        );
    });

});
