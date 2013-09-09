var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/element-case', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Invalid String should not change case of elements', function() {
        comb.configure({ 'element-case': 'foobar' });
        assert.equal(
            comb.processString(
                'LI a { color : red }'
            ),
            'LI a { color : red }'
        );
    });

    it('Should switch tag name to upper case', function() {
        comb.configure({ 'element-case': 'upper' });
        assert.equal(
            comb.processString(
                'div { color: #fff }'
            ),
            'DIV { color: #fff }'
        );
    });

    it('Should switch tag name to lower case', function() {
        comb.configure({ 'element-case': 'lower' });
        assert.equal(
            comb.processString(
                'DIV { color: #FFF }'
            ),
            'div { color: #FFF }'
        );
    });

    it('Should switch element-case in complex rules', function() {
        comb.configure({ 'element-case': 'lower' });
        assert.equal(
            comb.processString(
                'UL > LI > .foo:not(A) { color: red }'
            ),
            'ul > li > .foo:not(a) { color: red }'
        );
    });

});
