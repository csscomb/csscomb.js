var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/combinator-space', function() {
    var comb;
    beforeEach(function() {
        comb = new Comb();
    });
    it('Invalid String should not change space around combinator', function() {
        comb.configure({ 'combinator-space': 'foobar' });
        assert.equal(
            comb.processString(
                'a >b { color: red }' +
                'a ~b { color: red }' +
                'a +b { color: red }'
            ),
            'a >b { color: red }' +
            'a ~b { color: red }' +
            'a +b { color: red }'
        );
    });
    it('True Boolean value should set space around combinator to one space', function() {
        comb.configure({ 'combinator-space': true });
        assert.equal(
            comb.processString(
                'a>b { color: red }' +
                'a> b { color: red }' +
                'a >b { color: red }' +
                'a+b { color: red }' +
                'a+ b { color: red }' +
                'a +b { color: red }' +
                'a~b { color: red }' +
                'a~ b { color: red }' +
                'a ~b { color: red }' +
                'a ~b+ c>d { color: red }'
            ),
            'a > b { color: red }' +
            'a > b { color: red }' +
            'a > b { color: red }' +
            'a + b { color: red }' +
            'a + b { color: red }' +
            'a + b { color: red }' +
            'a ~ b { color: red }' +
            'a ~ b { color: red }' +
            'a ~ b { color: red }' +
            'a ~ b + c > d { color: red }'
        );
    });
    it('False Boolean value should remove spaces around combinator', function() {
        comb.configure({ 'combinator-space': false });
        assert.equal(
            comb.processString(
                'a>b { color: red }' +
                'a> b { color: red }' +
                'a >b { color: red }' +
                'a+b { color: red }' +
                'a+ b { color: red }' +
                'a +b { color: red }' +
                'a~b { color: red }' +
                'a~ b { color: red }' +
                'a ~b { color: red }' +
                'a ~b+ c>d { color: red }'
            ),
            'a>b { color: red }' +
            'a>b { color: red }' +
            'a>b { color: red }' +
            'a+b { color: red }' +
            'a+b { color: red }' +
            'a+b { color: red }' +
            'a~b { color: red }' +
            'a~b { color: red }' +
            'a~b { color: red }' +
            'a~b+c>d { color: red }'
        );
    });
    it('String `` value should remove spaces around combinator', function() {
        comb.configure({ 'combinator-space': '' });
        assert.equal(
            comb.processString(
                'a>b { color: red }' +
                'a> b { color: red }' +
                'a >b { color: red }' +
                'a+b { color: red }' +
                'a+ b { color: red }' +
                'a +b { color: red }' +
                'a~b { color: red }' +
                'a~ b { color: red }' +
                'a ~b { color: red }' +
                'a ~b+ c>d { color: red }'
            ),
            'a>b { color: red }' +
            'a>b { color: red }' +
            'a>b { color: red }' +
            'a+b { color: red }' +
            'a+b { color: red }' +
            'a+b { color: red }' +
            'a~b { color: red }' +
            'a~b { color: red }' +
            'a~b { color: red }' +
            'a~b+c>d { color: red }'
        );
    });
    it('String `  ` value should set two spaces around combinator', function() {
        comb.configure({ 'combinator-space': '  ' });
        assert.equal(
            comb.processString(
                'a>b { color: red }' +
                'a> b { color: red }' +
                'a >b { color: red }' +
                'a+b { color: red }' +
                'a+ b { color: red }' +
                'a +b { color: red }' +
                'a~b { color: red }' +
                'a~ b { color: red }' +
                'a ~b { color: red }' +
                'a ~b+ c>d { color: red }'
            ),
            'a  >  b { color: red }' +
            'a  >  b { color: red }' +
            'a  >  b { color: red }' +
            'a  +  b { color: red }' +
            'a  +  b { color: red }' +
            'a  +  b { color: red }' +
            'a  ~  b { color: red }' +
            'a  ~  b { color: red }' +
            'a  ~  b { color: red }' +
            'a  ~  b  +  c  >  d { color: red }'
        );
    });
    it('Array value should set different spaces around combinator', function() {
        comb.configure({ 'combinator-space': [' ', '\n'] });
        assert.equal(
            comb.processString(
                'a>b { color: red }' +
                'a> b { color: red }' +
                'a >b { color: red }' +
                'a+b { color: red }' +
                'a+ b { color: red }' +
                'a +b { color: red }' +
                'a~b { color: red }' +
                'a~ b { color: red }' +
                'a ~b { color: red }' +
                'a ~b+ c>d { color: red }'
            ),
            'a >\nb { color: red }' +
            'a >\nb { color: red }' +
            'a >\nb { color: red }' +
            'a +\nb { color: red }' +
            'a +\nb { color: red }' +
            'a +\nb { color: red }' +
            'a ~\nb { color: red }' +
            'a ~\nb { color: red }' +
            'a ~\nb { color: red }' +
            'a ~\nb +\nc >\nd { color: red }'
        );
    });
});
