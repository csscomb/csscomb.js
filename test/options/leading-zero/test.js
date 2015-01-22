var assert = require('assert');

describe('options/leading-zero', function() {
    it('Should add leading zero in dimensions', function() {
        this.comb.configure({ 'leading-zero': true });
        assert.equal(
            this.comb.processString(
                'div { margin: .5em }'
            ),
            'div { margin: 0.5em }'
        );
    });

    it('Should remove leading zero in dimensions', function() {
        this.comb.configure({ 'leading-zero': false });
        assert.equal(
            this.comb.processString(
                'div { margin: 0.5em }'
            ),
            'div { margin: .5em }'
        );
    });

    it('Should detect leading zero option', function() {
        this.shouldDetect(
            ['leading-zero'],
            'a { width: 0.5em }',
            {
                'leading-zero': true
            }
        );
    });

    it('Should detect leading zero option set to false', function() {
        this.shouldDetect(
            ['leading-zero'],
            'a { width: .5em }',
            {
                'leading-zero': false
            }
        );
    });

    it('Shouldn’t detect leading zero option', function() {
        this.shouldDetect(
            ['leading-zero'],
            'a { width: 10.5em }',
            {}
        );
    });
});
