var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/rule-indent', function() {
    var comb;
    beforeEach(function() {
        comb = new Comb();
    });
    it('Invalid Number value should not change rule indent', function() {
        comb.configure({ 'rule-indent': 3.5 });
        assert.equal(
            comb.processString('a {\n color: red }'),
            'a {\n color: red }'
        );
    });
    it('Invalid String value should not change rule indent', function() {
        comb.configure({ 'rule-indent': 'foobar' });
        assert.equal(
            comb.processString('a {\n color: red }'),
            'a {\n color: red }'
        );
    });
    it('True Boolean value should set 4 spaces indent', function() {
        comb.configure({ 'rule-indent': true });
        assert.equal(
            comb.processString('a {\n color: red }'),
            'a {\n    color: red }'
        );
    });
    it('Valid Number value should set equal space indent', function() {
        comb.configure({ 'rule-indent': 3 });
        assert.equal(
            comb.processString('a {\n color: red }'),
            'a {\n   color: red }'
        );
    });
    it('Valid String value should set equal indent', function() {
        comb.configure({ 'rule-indent': '\t' });
        assert.equal(
            comb.processString(
                'a{color:red;background:#fff}\n' +
                'a { color: red; background: #fff; }\n' +
                'a {\ncolor:red;\n\nbackground: #fff}\n' +
                'a { /* foo */ color:red; /* bar */\n\nbackground: #fff\n}\n'
            ),
            'a{\n\tcolor:red;\n\tbackground:#fff}\n' +
            'a {\n\tcolor: red;\n\tbackground: #fff; }\n' +
            'a {\n\tcolor:red;\n\n\tbackground: #fff}\n' +
            'a { /* foo */\n\tcolor:red; /* bar */\n\n\tbackground: #fff\n}\n'
        );
    });
});
