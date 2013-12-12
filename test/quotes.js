var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/quotes', function() {
    var comb;
    beforeEach(function() {
        comb = new Comb();
    });

    it('Invalid String should not change quotes', function() {
        comb.configure({ quotes: 'foobar' });
        assert.equal(
            comb.processString(
                'a { content: "" }' +
                'b { content: \'\' }'
            ),
            'a { content: "" }' +
            'b { content: \'\' }'
        );
    });

    it('`single` value should set the quotes to single', function() {
        comb.configure({ quotes: 'single' });
        assert.equal(
            comb.processString(
                'a { content: "" }' +
                'b { content: \'\' }'
            ),
            'a { content: \'\' }' +
            'b { content: \'\' }'
        );
    });

    it('`double` value should set the quotes to double', function() {
        comb.configure({ quotes: 'double' });
        assert.equal(
            comb.processString(
                'a { content: "" }' +
                'b { content: \'\' }'
            ),
            'a { content: "" }' +
            'b { content: "" }'
        );
    });

    it('`double` value should set the quotes to double in attrs and urls', function() {
        comb.configure({ quotes: 'double' });
        assert.equal(
            comb.processString(
                'a[class^=\'foo\'] { background: url(\'foo.png\') }'
            ),
            'a[class^="foo"] { background: url("foo.png") }'
        );
    });

    it('`double` value should escape the unescaped double quotes on change', function() {
        comb.configure({ quotes: 'double' });
        assert.equal(
            comb.processString(
                'a { content: "\\"" }' +
                'b { content: \'"\' }'
            ),
            'a { content: "\\"" }' +
            'b { content: "\\"" }'
        );
    });


    it('`single` value should unescape the escaped double quotes on change', function() {
        comb.configure({ quotes: 'single' });
        assert.equal(
            comb.processString(
                'a { content: "\\"" }'
            ),
            'a { content: \'"\' }'
        );
    });

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should not detect quotes when there are none', function() {
        should_detect(
            ['quotes'],
            'a { color:red }',
            {}
        );
    });

    it('Should detect double quotes', function() {
        should_detect(
            ['quotes'],
            'a { content: "foo" }',
            {
                quotes: 'double'
            }
        );
    });

    it('Should detect single quotes', function() {
        should_detect(
            ['quotes'],
            'a { content: \'foo\' }',
            {
                quotes: 'single'
            }
        );
    });

    it('Should detect single quotes in attribute', function() {
        should_detect(
            ['quotes'],
            'a[class^=\'foo\'] { color: red }',
            {
                quotes: 'single'
            }
        );
    });

    it('Should detect double quotes in url', function() {
        should_detect(
            ['quotes'],
            'a { background: url("foo.png") }',
            {
                quotes: 'double'
            }
        );
    });
});
