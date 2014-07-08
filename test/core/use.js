var assert = require('assert');

describe('.use()', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should set predefined options in correct order', function() {
        var config = this.Comb.getConfig('csscomb');
        this.comb.configure(config);
        var options = this.comb.getOptionsOrder();
        var expected = [
          'always-semicolon',
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
