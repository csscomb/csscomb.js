var assert = require('assert');

describe('options/strip-spaces', function() {
    describe('process', function() {
        it('Invalid value should not trim trailing spaces', function() {
            this.comb.configure({ 'strip-spaces': 'foobar' });
            return this.comb.processString('a { color: red }  \n')
                .then(function(actual) {
                    assert.equal(actual, 'a { color: red }  \n');
                });
        });

        it('Boolean true value should trim all trailing spaces', function() {
            this.comb.configure({ 'strip-spaces': true });
            return this.comb.processString(
                'a { color: red }   \n' +
                'a{color:red}\t /* foobar */\t \n' +
                'a {color:red}  \n   \n'
            ).then(function(actual) {
                assert.equal(actual,
                    'a { color: red }\n' +
                    'a{color:red}\t /* foobar */\n' +
                    'a {color:red}\n');
            });
        });

        it('Boolean true value should trim trailing spaces at eof', function() {
            this.comb.configure({ 'strip-spaces': true });
            return this.comb.processString(
                'a {color:red}  '
            ).then(function(actual) {
                assert.equal(actual, 'a {color:red}');
            });
        });
    });

    describe('detect', function() {
        it('Should detect strip-spaces option set to `true`', function() {
            this.shouldDetect(
                ['strip-spaces'],
                'a { color: red }',
                {
                    'strip-spaces': true
                }
            );
        });

        it('Should detect strip-spaces option set to `false`', function() {
            this.shouldDetect(
                ['strip-spaces'],
                'a { color: red }  ',
                {
                    'strip-spaces': false
                }
            );
        });

        it('Should detect strip-spaces option set to `true` with newline', function() {
            this.shouldDetect(
                ['strip-spaces'],
                'a { color: red }\nb { color: blue }',
                {
                    'strip-spaces': true
                }
            );
        });

        it('Should detect strip-spaces option set to `false` with newline', function() {
            this.shouldDetect(
                ['strip-spaces'],
                'a { color: red }  \nb { color: blue }',
                {
                    'strip-spaces': false
                }
            );
        });

        it('Should detect strip-spaces option set to `true` inside a value', function() {
            this.shouldDetect(
                ['strip-spaces'],
                'a {\n  color:\n  red }',
                {
                    'strip-spaces': true
                }
            );
        });

        it('Should detect strip-spaces option set to `false` inside a value', function() {
            this.shouldDetect(
                ['strip-spaces'],
                'a {\n  color: \n  red }',
                {
                    'strip-spaces': false
                }
            );
        });

        it('Should detect strip-spaces option set to `true` if the only trailing space is the last newline', function() {
            this.shouldDetect(
                ['strip-spaces'],
                'a { color: red }\n',
                {
                    'strip-spaces': true
                }
            );
        });

        it('Should detect strip-spaces option set to `false` if there is more than one newline at the end', function() {
            this.shouldDetect(
                ['strip-spaces'],
                'a { color: red }\n\n',
                {
                    'strip-spaces': false
                }
            );
        });
    });
});
