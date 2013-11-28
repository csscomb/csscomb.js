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

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect unitless zero option', function() {
        should_detect(
            ['unitless-zero'],
            'a { width: 0 }',
            {
                'unitless-zero': true
            }
        );
    });

    it('Should detect zero with unit', function() {
        should_detect(
            ['unitless-zero'],
            'a { width: 0px }',
            {
                'unitless-zero': false
            }
        );
    });

    it('Should detect unitless zero option with multiple values', function() {
        should_detect(
            ['unitless-zero'],
            'a { padding: 0px 0 0 }',
            {
                'unitless-zero': true
            }
        );
    });

    it('Should detect zero with unit and multiple values', function() {
        should_detect(
            ['unitless-zero'],
            'a { padding: 0px 0 0em }',
            {
                'unitless-zero': false
            }
        );
    });

    it('Shouldn’t detect unitless zero option if there is no unit', function() {
        should_detect(
            ['unitless-zero'],
            'a { color: red }',
            {}
        );
    });

    it('Shouldn’t detect unitless zero option if there is `deg` unit', function() {
        should_detect(
            ['unitless-zero'],
            'a { transform: rotate(0deg) }',
            {}
        );
    });

    it('Should detect unitless zero option with percents', function() {
        should_detect(
            ['unitless-zero'],
            'a { padding: 0% 0 0 }',
            {
                'unitless-zero': true
            }
        );
    });
});
