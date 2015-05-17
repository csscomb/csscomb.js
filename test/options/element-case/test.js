var assert = require('assert');

describe('options/element-case', function() {
    it('Invalid String should not change case of elements', function() {
        this.comb.configure({ 'element-case': 'foobar' });
        assert.equal(
            this.comb.processString(
                'LI a { color : red }'
            ),
            'LI a { color : red }'
        );
    });

    it('Should switch tag name to upper case', function() {
        this.comb.configure({ 'element-case': 'upper' });
        assert.equal(
            this.comb.processString(
                'div { color: #fff }'
            ),
            'DIV { color: #fff }'
        );
    });

    it('Should switch tag name to lower case', function() {
        this.comb.configure({ 'element-case': 'lower' });
        assert.equal(
            this.comb.processString(
                'DIV { color: #FFF }'
            ),
            'div { color: #FFF }'
        );
    });

    it('Should switch element-case in complex rules', function() {
        this.comb.configure({ 'element-case': 'lower' });
        assert.equal(
            this.comb.processString(
                'UL > LI > .foo:not(A) { color: red }'
            ),
            'ul > li > .foo:not(a) { color: red }'
        );
    });

    it('Should detect lowercase elements', function() {
        this.shouldDetect(
            ['element-case'],
            'a { color: red }',
            {
                'element-case': 'lower'
            }
        );
    });

    it('Should detect uppercase elements', function() {
        this.shouldDetect(
            ['element-case'],
            'A { color: red }',
            {
                'element-case': 'upper'
            }
        );
    });

    it('Should detect lowercase elements in a long selector', function() {
        this.shouldDetect(
            ['element-case'],
            'ul li:not(:hover) A { color: red }',
            {
                'element-case': 'lower'
            }
        );
    });

    it('Should detect uppercase elements in a long selector', function() {
        this.shouldDetect(
            ['element-case'],
            'ul .lol:not(LI) A { color: red }',
            {
                'element-case': 'upper'
            }
        );
    });

    it('Shouldn’t detect case of elements in a mixed case', function() {
        this.shouldDetect(
            ['element-case'],
            'aRtIcLe { color: red }',
            {}
        );
    });

    it('Shouldn’t detect case of elements when there are no such', function() {
        this.shouldDetect(
            ['element-case'],
            '*.lol { color: red }',
            {}
        );
    });
});
