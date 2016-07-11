var assert = require('assert');
let Test = require('../core_test');

describe('.use()', function() {
    it('Should set predefined options in correct order', function() {
        let test = new Test(this);
        var config = test.Comb.getConfig('csscomb');
        test.comb.configure(config);
        var options = test.comb.plugins.map(function(plugin) {
            return plugin.name;
        });
        var expected = [
          'always-semicolon',
          'lines-between-rulesets',
          'remove-empty-rulesets',
          'color-case',
          'color-shorthand',
          'element-case',
          'eof-newline',
          'leading-zero',
          'quotes',
          'sort-order-fallback',
          'space-after-colon',
          'space-after-combinator',
          'space-after-opening-brace',
          'space-after-selector-delimiter',
          'space-before-colon',
          'space-before-combinator',
          'space-before-opening-brace',
          'space-before-selector-delimiter',
          'space-between-declarations',
          'block-indent',
          'sort-order',
          'strip-spaces',
          'space-before-closing-brace',
          'unitless-zero',
          'tab-size',
          'vendor-prefix-align'
        ];
        assert.deepEqual(options, expected);
    });
});
