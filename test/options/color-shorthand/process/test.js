var assert = require('assert');

describe.skip('options/color-shorthand', function() {
    describe('process', function() {
        it('Should shrink hexadecimal colors to 3 symbols', function() {
            this.comb.configure({ 'color-shorthand': true });
            return this.comb.processString(
                'div { color: #aabbcc }'
            ).then(function(actual) {
                assert.equal(actual, 'div { color: #abc }');
            });
        });

        it('Should expand hexadecimal colors to 6 symbols', function() {
            this.comb.configure({ 'color-shorthand': false });
            return this.comb.processString(
                'div { color: #7ad }'
            ).then(function(actual) {
                assert.equal(actual, 'div { color: #77aadd }');
            });
        });

        it('Should save case while processing', function() {
            this.comb.configure({ 'color-shorthand': true });
            return this.comb.processString(
                'div { color: #fFAafF }'
            ).then(function(actual) {
                assert.equal(actual, 'div { color: #fAf }');
            });
        });
    });

    describe('detect', function() {
        it('Should detect non-shorthanded color', function() {
            this.shouldDetect(
                ['color-shorthand'],
                'a { color: #FF33EE }',
                {
                    'color-shorthand': false
                }
            );
        });

        it('Should detect shorthanded color', function() {
            this.shouldDetect(
                ['color-shorthand'],
                'a { color: #fff }',
                {
                    'color-shorthand': true
                }
            );
        });

        it('Shouldn’t detect if a color is shorthanded if it can’t be shorthanded', function() {
            this.shouldDetect(
                ['color-shorthand'],
                'a { color: #F3F3F3 }',
                {}
            );
        });

        it('Shouldn’t detect if a color is shorthanded if it is not a vhash', function() {
            this.shouldDetect(
                ['color-shorthand'],
                'a { color: rgba(0,0,0,0.5) }',
                {}
            );
        });
    });
});
