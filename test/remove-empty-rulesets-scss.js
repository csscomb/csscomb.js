var Comb = require('../lib/csscomb');
var assert = require('assert');
var fs = require('fs');

describe('options/remove-empty-rulesets (scss)', function() {
    var comb = new Comb({ 'remove-empty-rulesets': true });
    var input;
    var expected;

    function readFile(path) {
        return fs.readFileSync('test/remove-empty-rulesets-scss/' + path, 'utf8');
    }

    it('Should not remove rulesets which contain only includes', function() {
        input = readFile('include.scss', 'utf-8');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should remove rulesets with contain only empty nested rules', function() {
        input = readFile('empty-nested-rule.scss', 'utf-8');
        expected = readFile('empty-nested-rule.expected.scss', 'utf-8');
        assert.equal(comb.processString(input, 'scss'), expected);
    });

    it('Should not remove rulesets with non-empty nested rules. Test 1', function() {
        input = readFile('nested-rule-1.scss', 'utf-8');
        assert.equal(comb.processString(input, 'scss'), input);
    });

    it('Should not remove rulesets with non-empty nested rules. Test 2', function() {
        input = readFile('nested-rule-2.scss', 'utf-8');
        expected = readFile('nested-rule-2.expected.scss', 'utf-8');
        assert.equal(comb.processString(input, 'scss'), expected);
    });
});
