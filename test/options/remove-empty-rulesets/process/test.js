var assert = require('assert');
let Test = require('../../option_test');

describe('Option `remove-empty-rulesets`, process', function() {
  describe('css', function() {
    it('Configured with invalid value, should not remove empty ruleset', function() {
      let test = new Test(this, {'remove-empty-rulesets': 'foobar'});
      return test.comb.processString('a { width: 10px; } b {}')
          .then(function(actual) {
            assert.equal(actual, 'a { width: 10px; } b {}');
          });
    });

    it('Should remove empty ruleset', function() {
      let test = new Test(this, {'remove-empty-rulesets': true});
      return test.comb.processString(' b {} ')
        .then(function(actual) {
          assert.equal(actual, '  ');
        });
    });

    it('Should remove ruleset with spaces', function() {
      let test = new Test(this, {'remove-empty-rulesets': true});
      return test.comb.processString(' b {   } ')
          .then(function(actual) {
            assert.equal(actual, '  ');
          });
    });

    it('Should leave ruleset with declarations', function() {
      let test = new Test(this, {'remove-empty-rulesets': true});
      return test.comb.processString('a { width: 10px; }\nb {} ')
          .then(function(actual) {
            assert.equal(actual, 'a { width: 10px; }\n ');
          });
    });

    it('Should leave ruleset with comments', function() {
      let test = new Test(this, {'remove-empty-rulesets': true});
      return test.comb.processString('a { /* comment */ }\nb {} ')
          .then(function(actual) {
            assert.equal(actual, 'a { /* comment */ }\n ');
          });
    });
  });

  describe('less', function() {
    it('Issue 201. Test 1', function() {
      let test = new Test(this, {'remove-empty-rulesets': true});
      return test.shouldBeEqual('1.less', '1.expected.less');
    });

    it('Issue 201. Test 2', function() {
      let test = new Test(this, {'remove-empty-rulesets': true});
      let string = '#a {#b {} #d {}}';
      return test.comb.processString(string, {syntax: 'less'})
          .then(function(actual) {
            assert.equal(actual, '');
          });
    });

    it('Issue 201. Test 3', function() {
      let test = new Test(this, {
        'remove-empty-rulesets': false,
        'always-semicolon': true
      });
      let string = '#a {#b {} #d {}}';
      return test.comb.processString(string, {syntax: 'less'})
          .then(function(actual) {
            assert.equal(actual, string);
          });
    });
  });

  describe('scss', function() {
    it('Should not remove rulesets which contain only includes', function() {
      let test = new Test(this, {'remove-empty-rulesets': true});
      return test.shouldBeEqual('include.scss');
    });

    it('Should remove rulesets with contain only empty nested rules', function() {
      let test = new Test(this, {'remove-empty-rulesets': true});
      return test.shouldBeEqual('empty-nested-rule.scss', 'empty-nested-rule.expected.scss');
    });

    it('Should not remove rulesets with non-empty nested rules. Test 1', function() {
      let test = new Test(this, {'remove-empty-rulesets': true});
      return test.shouldBeEqual('nested-rule-1.scss');
    });

    it('Should not remove rulesets with non-empty nested rules. Test 2', function() {
      let test = new Test(this, {'remove-empty-rulesets': true});
      return test.shouldBeEqual('nested-rule-2.scss', 'nested-rule-2.expected.scss');
    });
  });
});
