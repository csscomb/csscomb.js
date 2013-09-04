var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/color-case', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Should switch colors to upper case', function() {
        comb.configure({ 'color-case': 'upper' });
        assert.equal(
            comb.processString(
                'div { color: #fff }'
            ),
            'div { color: #FFF }'
        );
    });

    it('Should switch colors to lower case', function() {
        comb.configure({ 'color-case': 'lower' });
        assert.equal(
            comb.processString(
                'div { color: #FFF }'
            ),
            'div { color: #fff }'
        );
    });

    it('Should switch color-case in complex rules', function() {
        comb.configure({ 'color-case': 'lower' });
        assert.equal(
            comb.processString(
                'div { background: url(img.png#RND) #E3E3E3 0 100% no-repeat;' +
                    ' box-shadow: 1px 2px 3px 4px #F0F0F0 inset; }'
            ),
            'div { background: url(img.png#RND) #e3e3e3 0 100% no-repeat;' +
                ' box-shadow: 1px 2px 3px 4px #f0f0f0 inset; }'
        );
    });

    it('Should not switch selector case', function() {
        comb.configure({ 'color-case': 'lower' });
        assert.equal(
            comb.processString(
                '#Header { color: #FFF }'
            ),
            '#Header { color: #fff }'
        );
    });

});
