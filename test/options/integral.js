var assert = require('assert');

describe('integral test', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Process result must be equal to expected.css', function() {
        var config = this.comb.getConfig('csscomb');
        this.comb.configure(config);
        this.shouldBeEqual('integral.css', 'integral.expected.css');
    });

    it.skip('Should detect everything in integral test', function(done) {
        var config = this.comb.getConfig('csscomb');
        var input = this.readFile('integral.css');
        var expected = {
            'remove-empty-rulesets': true,
            'always-semicolon': true,
            'color-case': 'lower',
            'color-shorthand': true,
            'element-case': 'lower',
            'leading-zero': false,
            quotes: 'single',
            'strip-spaces': true,
            'eof-newline': true,
            'stick-brace': '\n',
            'colon-space': ['', ' '],
            'combinator-space': [' ', ' '],
            'rule-indent': '    ',
            'block-indent': '    ',
            'unitless-zero': true,
            'vendor-prefix-align': true
        };

        this.shouldDetect(undefined, input, expected);

        expected['sort-order'] = config['sort-order'];
        this.comb.configure(expected);
        this.shouldDetect(undefined, 'integral.css', expected);
    });
});
