var assert = require('assert');

describe('options/quotes', function() {
    describe('process', function() {
        it('Invalid String should not change quotes', function() {
            this.comb.configure({ quotes: 3 });
            return this.comb.processString(
                'a { content: "" }b { content: \'\' }'
            ).then(function(actual) {
                assert.equal(actual, 'a { content: "" }b { content: \'\' }');
            });
        });

        it('`single` value should set the quotes to single', function() {
            this.comb.configure({ quotes: 'single' });
            return this.comb.processString(
                'a { content: "" }b { content: \'\' }'
            ).then(function(actual) {
                assert.equal(actual, 'a { content: \'\' }b { content: \'\' }');
            });
        });

        it('`double` value should set the quotes to double', function() {
            this.comb.configure({ quotes: 'double' });
            return this.comb.processString(
                'a { content: "" }b { content: \'\' }'
            ).then(function(actual) {
                assert.equal(actual, 'a { content: "" }b { content: "" }');
            });
        });

        it('`double` value should set the quotes to double in attrs and urls', function() {
            this.comb.configure({ quotes: 'double' });
            return this.comb.processString(
                'a[class^=\'foo\'] { background: url(\'foo.png\') }'
            ).then(function(actual) {
                assert.equal(actual, 'a[class^="foo"] { background: url("foo.png") }');
            });
        });

        it('`double` value should escape the unescaped double quotes on change', function() {
            this.comb.configure({ quotes: 'double' });
            return this.comb.processString(
                'a { content: "\\"" }b { content: \'"\' }'
            ).then(function(actual) {
                assert.equal(actual, 'a { content: "\\"" }b { content: "\\"" }');
            });
        });

        it('`single` value should unescape the escaped double quotes on change', function() {
            this.comb.configure({ quotes: 'single' });
            return this.comb.processString(
                'a { content: "\\"" }'
            ).then(function(actual) {
                assert.equal(actual, 'a { content: \'"\' }');
            });
        });
    });

    describe('detect', function() {
        it('Should not detect quotes when there are none', function() {
            this.shouldDetect(
                ['quotes'],
                'a { color:red }',
                {}
            );
        });

        it('Should detect double quotes', function() {
            this.shouldDetect(
                ['quotes'],
                'a { content: "foo" }',
                {
                    quotes: 'double'
                }
            );
        });

        it('Should detect single quotes', function() {
            this.shouldDetect(
                ['quotes'],
                'a { content: \'foo\' }',
                {
                    quotes: 'single'
                }
            );
        });

        it('Should detect single quotes in attribute', function() {
            this.shouldDetect(
                ['quotes'],
                'a[class^=\'foo\'] { color: red }',
                {
                    quotes: 'single'
                }
            );
        });

        it('Should detect double quotes in url', function() {
            this.shouldDetect(
                ['quotes'],
                'a { background: url("foo.png") }',
                {
                    quotes: 'double'
                }
            );
        });
    });
});
