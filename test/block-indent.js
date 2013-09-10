var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/block-indent', function() {
    var comb;
    beforeEach(function() {
        comb = new Comb();
    });
    it('Invalid Number value should not change space after brace', function() {
        comb.configure({ 'block-indent': 3.5 });
        assert.equal(
            comb.processString('a { color: red }'),
            'a { color: red }'
        );
    });
    it('Invalid String value should not change space after brace', function() {
        comb.configure({ 'block-indent': 'foobar' });
        assert.equal(
            comb.processString('a { color: red }'),
            'a { color: red }'
        );
    });
    it('True Boolean value should set 4 spaces indent', function() {
        comb.configure({ 'block-indent': true });
        assert.equal(
            comb.processString(' \n a { color: red }  @media all {.input__control { color: #000;\n}\n}'),
            ' \na { color: red \n}\n@media all {\n    .input__control { color: #000;\n    }\n}'
        );
    });
    it('Valid Number value should set equal space after brace', function() {
        comb.configure({ 'block-indent': 3 });
        assert.equal(
            comb.processString(' a\n{ color: red }  @media all { .input__control\n{ color: #000;\n}\n}'),
            'a\n{ color: red \n}\n@media all {\n   .input__control\n   { color: #000;\n   }\n}'
        );
    });
    it('Valid String value should set equal space after brace', function() {
        comb.configure({ 'block-indent': '\t' });
        assert.equal(
            comb.processString(' a { color: red }  @media all { .input__control\n{ color: #000;\n}\n}'),
            'a { color: red \n}\n@media all {\n\t.input__control\n\t{ color: #000;\n\t}\n}'
        );
    });
});
