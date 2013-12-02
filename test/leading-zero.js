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

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect leading zero option', function() {
        should_detect(
            ['leading-zero'],
            'a { width: 0.5em }',
            {
                'leading-zero': true
            }
        );
    });

    it('Should detect leading zero option set to false', function() {
        should_detect(
            ['leading-zero'],
            'a { width: .5em }',
            {
                'leading-zero': false
            }
        );
    });

    it('Shouldn’t detect leading zero option', function() {
        should_detect(
            ['leading-zero'],
            'a { width: 10.5em }',
            {}
        );
    });
});
