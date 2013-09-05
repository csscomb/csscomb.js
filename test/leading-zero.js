var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/leading-zero', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Should add leading zero in dimensions', function() {
        comb.configure({ 'leading-zero': true });
        assert.equal(
            comb.processString(
                'div { margin: .5em }'
            ),
            'div { margin: 0.5em }'
        );
    });

    it('Should remove leading zero in dimensions', function() {
        comb.configure({ 'leading-zero': false });
        assert.equal(
            comb.processString(
                'div { margin: 0.5em }'
            ),
            'div { margin: .5em }'
        );
    });

});
