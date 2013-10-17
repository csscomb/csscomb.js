var Comb = require('../lib/csscomb');
var assert = require('assert');
var vow = require('vow');
var vfs = require('vow-fs');

describe('integral test', function() {
    var comb;
    it('Process result must be equal to expect.css', function(done) {
        comb = new Comb();
        comb.configure(require('../.csscomb.json'));
        vow.all(['origin', 'expect'].map(function(type) {
            var fileName = './test/integral.' + type + '.css';
            return vfs.read(fileName, 'utf8').then(function(data) {
                return data;
            });
        }))
        .then(function(results) {
            try {
                assert.equal(comb.processString(results[0]), results[1]);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it('Should detect everything in integral test', function(done) {
        comb = new Comb();
        comb.detect();
        vow.all(['origin', 'expect'].map(function(type) {
            var fileName = './test/integral.' + type + '.css';
            return vfs.read(fileName, 'utf8').then(function(data) {
                return data;
            });
        }))
        .then(function(results) {
            try {
                assert.equal(
                    JSON.stringify(comb.processString(results[1])),
                    JSON.stringify({
                        'remove-empty-rulesets': true,
                        'always-semicolon': true,
                        'color-case': 'lower',
                        'color-shorthand': true,
                        'element-case': 'lower',
                        'leading-zero': false,
                        'strip-spaces': true,
                        'eof-newline': true,
                        'stick-brace': '\n',
                        'colon-space': ['', ' '],
                        'combinator-space': [' ', ' '],
                        'rule-indent': '    ',
                        'unitless-zero': true
                    })
                );
                done();
            } catch (e) {
                done(e);
            }
        });
    });

});
