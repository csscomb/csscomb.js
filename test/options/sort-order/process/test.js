var assert = require('assert');
let Test = require('../../option_test');

describe('Option `sort-order`, process', function() {
  describe('css', function() {
    it('Should be in expected order in case properties are not grouped', function() {
      let test = new Test(this, {'sort-order': ['position', 'z-index']});
      return test.shouldBeEqual('single-group.css', 'single-group.expected.css');
    });

    it('Should be in expected order in case of 1 group', function() {
      let test = new Test(this, {'sort-order': [['position', 'z-index']]});
      return test.shouldBeEqual('single-group.css', 'single-group.expected.css');
    });

    it('Shuld be in expected order in case of multiple groups', function() {
      let test = new Test(this, {
        'sort-order': [
          ['position', 'z-index'],
          ['width', 'height']
        ]
      });
      return test.shouldBeEqual('multiple-groups.css', 'multiple-groups.expected.css');
    });

    it('Should work correctly with comments in case of 1 group', function() {
      let test = new Test(this, {
        'sort-order': [
          ['border-bottom', 'font-style'],
        ]
      });
      return test.shouldBeEqual('single-group-comments.css', 'single-group-comments.expected.css');
    });

    it('Should work correctly with comments in case of multiple groups', function() {
      let test = new Test(this, {
        'sort-order': [
          ['margin'], ['padding']
        ]
      });
      return test.shouldBeEqual('multiple-groups-comments.css', 'multiple-groups-comments.expected.css');
    });

    it('Should parse semicolons inside data uri correctly', function() {
      let test = new Test(this, {
        'sort-order': [
          ['position', 'background', 'color']
        ]
      });
      return test.shouldBeEqual('data-uri.css', 'data-uri.expected.css');
    });

    it('Should not add more than 1 line between groups', function() {
      let test = new Test(this, {
        'sort-order': [
          ['top'], ['color']
        ]
      });
      let input = test.readFile('multiple-groups-2.css');
      let expected = test.readFile('multiple-groups-2.expected.css');

      test.comb.processString(input)
          .then(test.comb.processString)
          .then(test.comb.processString)
          .then(test.comb.processString)
          .then(test.comb.processString)
          .then(test.comb.processString)
          .then(function(actual) {
            assert.equal(actual, expected);
          });
    });

    it('Issue 94. Test 1', function() {
      let test = new Test(this);
      test.useConfig('csscomb');
      return test.shouldBeEqual('issue-94-1.css', 'issue-94-1.expected.css');
    });

    it('Issue 94. Test 2', function() {
      let test = new Test(this);
      test.useConfig('csscomb');
      return test.shouldBeEqual('issue-94-2.css', 'issue-94-2.expected.css');
    });

    it('Issue 94. Test 3', function() {
      let test = new Test(this);
      test.useConfig('csscomb');
      return test.shouldBeEqual('issue-94-3.css', 'issue-94-3.expected.css');
    });

    it('Should place the leftovers in the end', function() {
      let test = new Test(this);
      test.useConfig('csscomb');
      return test.shouldBeEqual('leftovers-1.css', 'leftovers-1.expected.css');
    });

    it('Should place the leftovers in the beginning', function() {
      let test = new Test(this);
      let config = test.Comb.getConfig('csscomb');
      config['sort-order'][0].unshift(['...']);
      test.comb.configure(config);

      return test.shouldBeEqual('leftovers-2.css', 'leftovers-2.expected.css')
          .then(function() {
            config['sort-order'][0].shift();
          });
    });

    it('Should place the leftovers in the beginning of its group', function() {
      let test = new Test(this);
      let config = test.Comb.getConfig('csscomb');
      config['sort-order'][1].unshift('...');
      test.comb.configure(config);
      return test.shouldBeEqual('leftovers-3.css', 'leftovers-3.expected.css')
          .then(function() {
            config['sort-order'][1].shift();
          });
    });

    it('Should place the leftovers in the middle of its group', function() {
      let test = new Test(this);
      let config = test.Comb.getConfig('csscomb');
      config['sort-order'][1].splice(1, 0, '...');
      test.comb.configure(config);
      return test.shouldBeEqual('leftovers-4.css', 'leftovers-4.expected.css')
          .then(function() {
            config['sort-order'][1].splice(1, 1);
          });
    });

    it('Should add declaration delimiters if they are missing', function() {
      let test = new Test(this, {'sort-order': ['position', 'z-index']});
      return test.shouldBeEqual('missing-delimiter.css', 'missing-delimiter.expected.css');
    });
  });

  describe('less', function() {
    it('Should sort properties inside rules', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('rule.less', 'rule.expected.less');
    });

    it('Should sort properties inside nested rules', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('nested-rule-1.less', 'nested-rule-1.expected.less');
    });

    it('Should sort properties divided by nested rules', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'left', 'color']]
      });
      return test.shouldBeEqual('nested-rule-2.less', 'nested-rule-2.expected.less');
    });

    it('Should group declarations with proper comments and spaces (single line)', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('comments-1.less', 'comments-1.expected.less');
    });

    it('Should group declarations with proper comments and spaces (multiple lines). Test 1', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('comments-2.less', 'comments-2.expected.less');
    });

    it('Should group declarations with proper comments and spaces (multiple lines). Test 2', function() {
      let test = new Test(this, {
        'sort-order': [['$variable', 'color']]
      });
      return test.shouldBeEqual('comments-3.less', 'comments-3.expected.less');
    });

    it('Should group declarations with proper comments and spaces (multiple lines). Test 3', function() {
      let test = new Test(this, {
        'sort-order': [['$variable', 'color']]
      });
      return test.shouldBeEqual('comments-3.less', 'comments-3.expected.less');
    });

    it('Should divide properties from different groups with an empty line', function() {
      let test = new Test(this, {
        'sort-order': [['top'], ['color']]
      });
      return test.shouldBeEqual('different-groups.less', 'different-groups.expected.less');
    });

    it('Should sort variables', function() {
      let test = new Test(this, {
        'sort-order': [['$variable', 'color']]
      });
      return test.shouldBeEqual('variable.less', 'variable.expected.less');
    });

    it('Should sort imports', function() {
      let test = new Test(this, {
        'sort-order': [['$import', 'color']]
      });
      return test.shouldBeEqual('import.less', 'import.expected.less');
    });

    it('Should sort included mixins. Test 1', function() {
      let test = new Test(this, {
        'sort-order': [['$include', 'color', 'border-top', 'border-bottom']]
      });
      return test.shouldBeEqual('mixin-1.less', 'mixin-1.expected.less');
    });

    it('Should sort included mixins. Test 2', function() {
      let test = new Test(this, {
        'sort-order': [['$include', 'top', 'color']]
      });
      return test.shouldBeEqual('mixin-2.less', 'mixin-2.expected.less');
    });

    it('Should sort included mixins. Test 3', function() {
      let test = new Test(this, {
        'sort-order': [['$include', 'border', 'color']]
      });
      return test.shouldBeEqual('mixin-3.less', 'mixin-3.expected.less');
    });

    it('Should sort included mixins with specified name. Test 4', function() {
      let test = new Test(this, {
        'sort-order': [['$include'], ['color'], ['$include media']]
      });
      return test.shouldBeEqual('mixin-4.less', 'mixin-4.expected.less');
    });

    it('Should sort @extend-s', function() {
      let test = new Test(this, {
        'sort-order': [['$extend', 'color']]
      });
      return test.shouldBeEqual('extend.less', 'extend.expected.less');
    });
  });

  describe('sass', function() {
    it('Should sort properties inside rules', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('rule.sass', 'rule.expected.sass');
    });

    it('Should sort properties inside nested rules', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('nested-rule-1.sass', 'nested-rule-1.expected.sass');
    });

    it('Should sort properties divided by nested rules', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'left', 'color']]
      });
      return test.shouldBeEqual('nested-rule-2.sass', 'nested-rule-2.expected.sass');
    });

    it('Should group declarations with proper comments and spaces (multiple lines)', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('comments.sass', 'comments.expected.sass');
    });

    it('Should divide properties from different groups with an empty line', function() {
      let test = new Test(this, {
        'sort-order': [['top'], ['color']]
      });
      return test.shouldBeEqual('different-groups.sass', 'different-groups.expected.sass');
    });

    it('Should sort variables', function() {
      let test = new Test(this, {
        'sort-order': [['$variable', 'color']]
      });
      return test.shouldBeEqual('variable.sass', 'variable.expected.sass');
    });

    it('Should sort imports', function() {
      let test = new Test(this, {
        'sort-order': [['$import', 'color']]
      });
      return test.shouldBeEqual('import.sass', 'import.expected.sass');
    });

    it('Should sort @include-s', function() {
      let test = new Test(this, {
        'sort-order': [['$include', 'color']]
      });
      return test.shouldBeEqual('include.sass', 'include.expected.sass');
    });

    it('Should sort @extend-s', function() {
      let test = new Test(this, {
        'sort-order': [['$extend', 'color']]
      });
      return test.shouldBeEqual('extend.sass', 'extend.expected.sass');
    });

    it('Should sort @include-s with specified name. Test 1', function() {
      let test = new Test(this, {
        'sort-order': [['$include'], ['color'], ['$include media']]
      });
      return test.shouldBeEqual('include-specified-1.sass', 'include-specified-1.expected.sass');
    });

    it('Should sort @include-s with specified name. Test 2', function() {
      let test = new Test(this, {
        'sort-order': [['$include'], ['color'], ['$include media']]
      });
      return test.shouldBeEqual('include-specified-2.sass', 'include-specified-2.expected.sass');
    });

    it('Should sort properties inside blocks passed to mixins', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('mixin.sass', 'mixin.expected.sass');
    });

    it('Should handle properties preceeding rulesets', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'left', 'color']]
      });
      return test.shouldBeEqual('ruleset.sass', 'ruleset.expected.sass');
    });

    it('Should handle properties preceeding conditions', function() {
      let test = new Test(this, {
        'sort-order': [['font-size', 'display', 'top', 'color']]
      });
      return test.shouldBeEqual('condition.sass', 'condition.expected.sass');
    });

    it('Issue 332', function() {
      let test = new Test(this, {
        'sort-order': [['color'], ['$include']]
      });
      return test.shouldBeEqual('issue-332.sass', 'issue-332.expected.sass');
    });

    it('Issue 332, test 2', function() {
      let test = new Test(this, {
        'sort-order': [['...']],
        'sort-order-fallback': 'abc'
      });
      return test.shouldBeEqual('issue-332-2.sass', 'issue-332-2.expected.sass');
    });
  });

  describe('scss', function() {
    it('Should sort properties inside rules (single line)', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('rule.scss', 'rule.expected.scss');
    });

    it('Should sort properties inside rules (multiple lines)', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('rule.scss', 'rule.expected.scss');
    });

    it('Should sort properties inside nested rules', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('nested-rule-1.scss', 'nested-rule-1.expected.scss');
    });

    it('Should sort properties divided by nested rules', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'left', 'color']]
      });
      return test.shouldBeEqual('nested-rule-2.scss', 'nested-rule-2.expected.scss');
    });

    it('Should group declarations with proper comments and spaces (multiple lines)', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('comments-1.scss', 'comments-1.expected.scss');
    });

    it('Should group declarations with proper comments and spaces (single line)', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('comments-2.scss', 'comments-2.expected.scss');
    });

    it('Should divide properties from different groups with an empty line', function() {
      let test = new Test(this, {
        'sort-order': [['top'], ['color']]
      });
      return test.shouldBeEqual('different-groups.scss', 'different-groups.expected.scss');
    });

    it('Should sort variables', function() {
      let test = new Test(this, {
        'sort-order': [['$variable', 'color']]
      });
      return test.shouldBeEqual('variable.scss', 'variable.expected.scss');
    });

    it('Should sort imports', function() {
      let test = new Test(this, {
        'sort-order': [['$import', 'color']]
      });
      return test.shouldBeEqual('import.scss', 'import.expected.scss');
    });

    it('Should sort @include-s', function() {
      let test = new Test(this, {
        'sort-order': [['$include', 'color']]
      });
      return test.shouldBeEqual('include.scss', 'include.expected.scss');
    });

    it('Should sort @include-s with specified name', function() {
      let test = new Test(this, {
        'sort-order': [['$include'], ['color'], ['$include media']]
      });
      return test.shouldBeEqual('include-specified.scss', 'include-specified.expected.scss');
    });

    it('Should sort @extend-s', function() {
      let test = new Test(this, {
        'sort-order': [['$extend', 'color']]
      });
      return test.shouldBeEqual('extend.scss', 'extend.expected.scss');
    });

    it('Should sort properties inside blocks passed to mixins', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'color']]
      });
      return test.shouldBeEqual('mixin.scss', 'mixin.expected.scss');
    });

    it('Should handle properties preceeding rulesets', function() {
      let test = new Test(this, {
        'sort-order': [['top', 'left', 'color']]
      });
      return test.shouldBeEqual('ruleset.scss', 'ruleset.expected.scss');
    });

    it('Should handle properties preceeding conditions', function() {
      let test = new Test(this, {
        'sort-order': [['font-size', 'display', 'top', 'color']]
      });
      return test.shouldBeEqual('condition.scss', 'condition.expected.scss');
    });

    it('Should sort complex case with leftovers', function() {
      let test = new Test(this, {
        'sort-order': [
          ['$variable'],
          ['position'],
          ['...', 'border'],
          ['$include'],
          ['font']
        ]
      });
      return test.shouldBeEqual('leftovers.scss', 'leftovers.expected.scss');
    });

    it('Issue 317', function() {
      let test = new Test(this, {'sort-order': ['...']});
      return test.shouldBeEqual('issue-317.scss');
    });

    it('Issue 333', function() {
      let test = new Test(this, {'sort-order': ['...']});
      return test.shouldBeEqual('issue-333.scss');
    });

    it('Issue 399', function() {
      let test = new Test(this, {'sort-order': [['$extend', 'color']]});
      return test.shouldBeEqual('issue-399.expected.scss');
    });
  });
});
