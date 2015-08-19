var assert = require('assert');

describe.skip('options/eof-newline', function() {
    describe('process', function() {
        it('Invalid value should not change trim trailing brac', function() {
            this.comb.configure({ 'eof-newline': 'foobar' });
            return this.comb.processString(
                'a { color: red }  \n'
            ).then(function(actual) {
                assert.equal(actual, 'a { color: red }  \n');
            });
        });

        it('Boolean true value should insert line-break at eof', function() {
            this.comb.configure({ 'eof-newline': true });
            return this.comb.processString(
                'a {color:red}  '
            ).then(function(actual) {
                assert.equal(actual, 'a {color:red}  \n');
            });
        });

        it('Boolean false value should remove line-break from eof', function() {
            this.comb.configure({ 'eof-newline': false });
            return this.comb.processString(
                'a {color:red}  \n'
            ).then(function(actual) {
                assert.equal(actual, 'a {color:red}  ');
            });
        });
    });

    describe('detect', function() {
        it('Shouldn’t detect eof newline', function() {
            this.shouldDetect(
                ['eof-newline'],
                'a { color: red }',
                {
                    'eof-newline': false
                }
            );
        });

        it('Should detect eof newline', function() {
            this.shouldDetect(
                ['eof-newline'],
                'a { color: red }\n',
                {
                    'eof-newline': true
                }
            );
        });

        it('Shouldn’t detect eof newline with spaces at the end', function() {
            this.shouldDetect(
                ['eof-newline'],
                'a { color: red }  ',
                {
                    'eof-newline': false
                }
            );
        });

        it('Should detect eof newline with mixed spaces at the end', function() {
            this.shouldDetect(
                ['eof-newline'],
                'a { color: red } \n ',
                {
                    'eof-newline': true
                }
            );
        });
    });
});
