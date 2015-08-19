var assert = require('assert');

describe.skip('options/leading-zero', function() {
    describe('process', function() {
        it('Should add leading zero in dimensions', function() {
            this.comb.configure({ 'leading-zero': true });
            return this.comb.processString(
                'div { margin: .5em }'
            ).then(function(actual) {
                assert.equal(actual, 'div { margin: 0.5em }');
            });
        });

        it('Should remove leading zero in dimensions', function() {
            this.comb.configure({ 'leading-zero': false });
            return this.comb.processString(
                'div { margin: 0.5em }'
            ).then(function(actual) {
                assert.equal(actual, 'div { margin: .5em }');
            });
        });
    });

    describe('detect', function() {
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
});
