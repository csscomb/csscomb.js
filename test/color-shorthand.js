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

});
