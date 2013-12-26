var assert = require('assert');

describe('options/eof-newline', function() {
    it('Invalid value should not change trim trailing brac', function() {
        this.comb.configure({ 'eof-newline': 'foobar' });
        assert.equal(
            this.comb.processString('a { color: red }  \n'),
            'a { color: red }  \n'
        );
    });
    it('Boolean true value should insert line-break at eof', function() {
        this.comb.configure({ 'eof-newline': true });
        assert.equal(
            this.comb.processString(
                'a {color:red}  '
            ),
            'a {color:red}  \n'
        );
    });
    it('Boolean false value should remove line-break from eof', function() {
        this.comb.configure({ 'eof-newline': false });
        assert.equal(
            this.comb.processString(
                'a {color:red}  \n'
            ),
            'a {color:red}  '
        );
    });

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
