var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/colon-space', function() {
    var comb;
    beforeEach(function() {
        comb = new Comb();
    });
    it('Invalid String should not change space around colon', function() {
        comb.configure({ 'colon-space': 'foobar' });
        assert.equal(
            comb.processString('a { color : red }'),
            'a { color : red }'
        );
    });
    it('True Boolean value should set space after colon', function() {
        comb.configure({ 'colon-space': true });
        assert.equal(
            comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}' +
                'a {color : /* foo */ red }' +
                'a {color /* bar */ : red }'
            ),
            'a { color: red }' +
            'a{color: red}' +
            'a {color: red}' +
            'a {color: /* foo */ red }' +
            'a {color /* bar */: red }'
        );
    });
    it('False Boolean value should set no space around colon', function() {
        comb.configure({ 'colon-space': false });
        assert.equal(
            comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}' +
                'a {color : /* foo */ red }' +
                'a {color /* bar */ : red }'
            ),
            'a { color:red }' +
            'a{color:red}' +
            'a {color:red}' +
            'a {color:/* foo */ red }' +
            'a {color /* bar */:red }'
        );
    });
    it('String `after` value should set space after colon', function() {
        comb.configure({ 'colon-space': 'after' });
        assert.equal(
            comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}' +
                'a {color : /* foo */ red }' +
                'a {color /* bar */ : red }'
            ),
            'a { color: red }' +
            'a{color: red}' +
            'a {color: red}' +
            'a {color: /* foo */ red }' +
            'a {color /* bar */: red }'
        );
    });
    it('String `before` value should set space before colon', function() {
        comb.configure({ 'colon-space': 'before' });
        assert.equal(
            comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}' +
                'a {color : /* foo */ red }' +
                'a {color /* bar */ : red }'
            ),
            'a { color :red }' +
            'a{color :red}' +
            'a {color :red}' +
            'a {color :/* foo */ red }' +
            'a {color /* bar */ :red }'
        );
    });
    it('String `both` value should set spaces around colon', function() {
        comb.configure({ 'colon-space': 'both' });
        assert.equal(
            comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}'
            ),
            'a { color : red }' +
            'a{color : red}' +
            'a {color : red}'
        );
    });
    it('String `  ` value should set two spaces after colon', function() {
        comb.configure({ 'colon-space': '  ' });
        assert.equal(
            comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}'
            ),
            'a { color:  red }' +
            'a{color:  red}' +
            'a {color:  red}'
        );
    });
    it('String `:` value should set no space around colon', function() {
        comb.configure({ 'colon-space': ':' });
        assert.equal(
            comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}'
            ),
            'a { color:red }' +
            'a{color:red}' +
            'a {color:red}'
        );
    });
    it('String `` value should set no space around colon', function() {
        comb.configure({ 'colon-space': '' });
        assert.equal(
            comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}'
            ),
            'a { color:red }' +
            'a{color:red}' +
            'a {color:red}'
        );
    });
    it('String `\\t:\\t` value should set tabs around colon', function() {
        comb.configure({ 'colon-space': '\t:\t' });
        assert.equal(
            comb.processString(
                'a { color: red }' +
                'a{color:red}' +
                'a {color : red}'
            ),
            'a { color\t:\tred }' +
            'a{color\t:\tred}' +
            'a {color\t:\tred}'
        );
    });
});
