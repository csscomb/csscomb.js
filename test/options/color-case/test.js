var assert = require('assert');

describe('options/color-case', function() {
    it('Should switch colors to upper case', function() {
        this.comb.configure({ 'color-case': 'upper' });
        assert.equal(
            this.comb.processString(
                'div { color: #fff }'
            ),
            'div { color: #FFF }'
        );
    });

    it('Should switch colors to lower case', function() {
        this.comb.configure({ 'color-case': 'lower' });
        assert.equal(
            this.comb.processString(
                'div { color: #FFF }'
            ),
            'div { color: #fff }'
        );
    });

    it('Should switch color-case in complex rules', function() {
        this.comb.configure({ 'color-case': 'lower' });
        assert.equal(
            this.comb.processString(
                'div { background: url(img.png#RND) #E3E3E3 0 100% no-repeat;' +
                    ' box-shadow: 1px 2px 3px 4px #F0F0F0 inset; }'
            ),
            'div { background: url(img.png#RND) #e3e3e3 0 100% no-repeat;' +
                ' box-shadow: 1px 2px 3px 4px #f0f0f0 inset; }'
        );
    });

    it('Should not switch selector case', function() {
        this.comb.configure({ 'color-case': 'lower' });
        assert.equal(
            this.comb.processString(
                '#Header { color: #FFF }'
            ),
            '#Header { color: #fff }'
        );
    });

    it('Should detect uppercase color', function() {
        this.shouldDetect(
            ['color-case'],
            'a { color: #F3F3F3 }',
            {
                'color-case': 'upper'
            }
        );
    });

    it('Should detect lowercase color', function() {
        this.shouldDetect(
            ['color-case'],
            'a { color: #f6f6f6 }',
            {
                'color-case': 'lower'
            }
        );
    });

    it('Should detect uppercase color in a shorthand', function() {
        this.shouldDetect(
            ['color-case'],
            'a { color: #FFF }',
            {
                'color-case': 'upper'
            }
        );
    });

    it('Should detect lowercase color in a shorthand', function() {
        this.shouldDetect(
            ['color-case'],
            'a { color: #fff }',
            {
                'color-case': 'lower'
            }
        );
    });

    it('Shouldn’t detect color case if it contains only digits', function() {
        this.shouldDetect(
            ['color-case'],
            'a { color: #333 }',
            {}
        );
    });

    it('Shouldn’t detect color case if it is in mixed case', function() {
        this.shouldDetect(
            ['color-case'],
            'a { color: #fFfFfF }',
            {}
        );
    });

});
