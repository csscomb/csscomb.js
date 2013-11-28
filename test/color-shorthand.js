var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/color-shorthand', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Should shrink hexadecimal colors to 3 symbols', function() {
        comb.configure({ 'color-shorthand': true });
        assert.equal(
            comb.processString(
                'div { color: #aabbcc }'
            ),
            'div { color: #abc }'
        );
    });

    it('Should expand hexadecimal colors to 6 symbols', function() {
        comb.configure({ 'color-shorthand': false });
        assert.equal(
            comb.processString(
                'div { color: #7ad }'
            ),
            'div { color: #77aadd }'
        );
    });

    it('Should save case while processing', function() {
        comb.configure({ 'color-shorthand': true });
        assert.equal(
            comb.processString(
                'div { color: #fFAafF }'
            ),
            'div { color: #fAf }'
        );
    });


    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect non-shorthanded color', function() {
        should_detect(
            ['color-shorthand'],
            'a { color: #FF33EE }',
            {
                'color-shorthand': false
            }
        );
    });

    it('Should detect shorthanded color', function() {
        should_detect(
            ['color-shorthand'],
            'a { color: #fff }',
            {
                'color-shorthand': true
            }
        );
    });

    it('Shouldn’t detect if a color is shorthanded if it can’t be shorthanded', function() {
        should_detect(
            ['color-shorthand'],
            'a { color: #F3F3F3 }',
            {}
        );
    });

    it('Shouldn’t detect if a color is shorthanded if it is not a vhash', function() {
        should_detect(
            ['color-shorthand'],
            'a { color: rgba(0,0,0,0.5) }',
            {}
        );
    });
});
