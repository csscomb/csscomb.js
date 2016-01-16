let assert = require('assert');
let Test = require('../../option_test');

describe('Option `color-case`, process', function() {
  describe('css', function() {
    it('Should switch colors to upper case', function() {
      let test = new Test(this, {'color-case': 'upper'});
      return test.comb.processString('div { color: #fff }')
          .then(actual => {
            assert.equal(actual, 'div { color: #FFF }');
          });
    });

    it('Should switch colors to lower case', function() {
      let test = new Test(this, {'color-case': 'lower'});
      return test.comb.processString('div { color: #FFF }')
          .then(actual => {
            assert.equal(actual, 'div { color: #fff }');
          });
    });

    it('Should switch color-case in complex rules', function() {
      let test = new Test(this, {'color-case': 'lower'});
      return test.comb.processString(
          'div { background: url(img.png#RND) #E3E3E3 0 100% no-repeat;' +
          ' box-shadow: 1px 2px 3px 4px #F0F0F0 inset; }'
      ).then(actual => {
        assert.equal(actual, 'div { background: url(img.png#RND) #e3e3e3 0 100% no-repeat; box-shadow: 1px 2px 3px 4px #f0f0f0 inset; }');
      });
    });

    it('Should not switch selector case', function() {
      let test = new Test(this, {'color-case': 'lower'});
      return test.comb.processString('#Header { color: #FFF }')
          .then(function(actual) {
            assert.equal(actual, '#Header { color: #fff }');
          });
    });
  });
});
