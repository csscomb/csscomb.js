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
});
