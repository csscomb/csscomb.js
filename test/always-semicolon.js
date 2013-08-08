var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/always-semicolon', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Should add semicolon for last property if missing. Test 1', function() {
        comb.configure({ 'always-semicolon': true });
        assert.equal(
            comb.processString(
                'div { height: 0 }'
            ),
            'div { height: 0; }'
        );
    });

    it('Should add semicolon for last property if missing. Test 2', function() {
        comb.configure({ 'always-semicolon': true });
        assert.equal(
            comb.processString(
                'div {\nheight: 0\n}'
            ),
            'div {\nheight: 0;\n}'
        );
    });

    it('Should add semicolon for last property if missing. Test 3', function() {
        comb.configure({ 'always-semicolon': true });
        assert.equal(
            comb.processString(
                'div {height: 0}'
            ),
            'div {height: 0;}'
        );
    });

    it('Should add semicolon for last property if missing. Test 4', function() {
        comb.configure({ 'always-semicolon': true });
        assert.equal(
            comb.processString(
                'div {\nheight: 0 /* Comment */\n}'
            ),
            'div {\nheight: 0; /* Comment */\n}'
        );
    });

    it('Should add semicolon for last property if missing. Test 5', function() {
        comb.configure({ 'always-semicolon': true });
        assert.equal(
            comb.processString(
                'div {\ntop: 1px;\nheight: 0 /* 1comment */  /* 2comment */\n}'
            ),
            'div {\ntop: 1px;\nheight: 0; /* 1comment */  /* 2comment */\n}'
        );
    });
});
