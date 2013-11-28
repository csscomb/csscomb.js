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

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect lowercase elements', function() {
        should_detect(
            ['element-case'],
            'a { color: red }',
            {
                'element-case': 'lower'
            }
        );
    });

    it('Should detect uppercase elements', function() {
        should_detect(
            ['element-case'],
            'A { color: red }',
            {
                'element-case': 'upper'
            }
        );
    });

    it('Should detect lowercase elements in a long selector', function() {
        should_detect(
            ['element-case'],
            'ul li:not(:hover) A { color: red }',
            {
                'element-case': 'lower'
            }
        );
    });

    it('Should detect uppercase elements in a long selector', function() {
        should_detect(
            ['element-case'],
            'ul .lol:not(LI) A { color: red }',
            {
                'element-case': 'upper'
            }
        );
    });

    it('Shouldn’t detect case of elements in a mixed case', function() {
        should_detect(
            ['element-case'],
            'aRtIcLe { color: red }',
            {}
        );
    });

    it('Shouldn’t detect case of elements when there are no such', function() {
        should_detect(
            ['element-case'],
            '*.lol { color: red }',
            {}
        );
    });
});
