var Comb = require('../lib/csscomb');
var assert = require('assert');
var vow = require('vow');
var vfs = require('vow-fs');

var comb;

vow.all(['origin', 'expect'].map(function(type) {
    var fileName = './test/integral.' + type + '.css';
    return vfs.read(fileName, 'utf8').then(function(data) {
        return data;
    });
}))
.then(function(results) {
    describe('integral test', function() {
        it('Process result must be equal to expect.css', function(done) {
            try {
                comb = new Comb();
                comb.configure(require('../config/csscomb.json'));
                assert.equal(comb.processString(results[0]), results[1]);

                done();
            } catch (e) {
                done(e);
            }

        });

        comb = new Comb();
        comb.detect();
        var detectedOptions = comb.processString(results[1]);
        it('Should detect everything in integral test', function(done) {
            try {
                assert.equal(
                    JSON.stringify(detectedOptions),
                    JSON.stringify({
                        'remove-empty-rulesets': true,
                        'always-semicolon': true,
                        'color-case': 'lower',
                        'color-shorthand': true,
                        'element-case': 'lower',
                        'leading-zero': false,
                        'quotes': 'single',
                        'strip-spaces': true,
                        'eof-newline': true,
                        'stick-brace': '\n',
                        'colon-space': ['', ' '],
                        'combinator-space': [' ', ' '],
                        'rule-indent': '    ',
                        'block-indent': '    ',
                        'unitless-zero': true,
                        'vendor-prefix-align': true
                    })
                );

                done();
            } catch (e) {
                done(e);
            }
        });

        var detectedConfiguration = JSON.parse(JSON.stringify(detectedOptions));
        detectedConfiguration['sort-order'] = require('../.csscomb.json')['sort-order'];
        it('Result processed with detected options must be equal to expect.css', function(done) {
            try {
                comb = new Comb();
                comb.configure(detectedConfiguration);
                assert.equal(comb.processString(results[0]), results[1]);

                done();
            } catch (e) {
                done(e);
            }

        });
    });
});
