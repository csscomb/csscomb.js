let assert = require('assert');
let Test = require('../../option_test');

describe('Option `always-semicolon`, lint', function() {
  describe('css', function() {
    it('Should report no errors', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.getErrors('lint-1.css').then(errors => {
        assert.equal(errors.length, 0);
      });
    });

    it('Error mesage should be a string', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.getErrors('lint-2.css').then(errors => {
        let error = errors[0];
        assert.equal(typeof error.message, 'string');
      });
    });

    it('Error should provide correct position info', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.getErrors('lint-2.css').then(errors => {
        let error = errors[0];
        assert.equal(error.line, 1);
        assert.equal(error.column, 16);
      });
    });

    it('Should report multiple errors', function() {
      let test = new Test(this, {'always-semicolon': true});
      return test.getErrors('lint-3.css').then(errors => {
        assert.equal(errors.length, 2);

        assert.equal(errors[0].line, 2);
        assert.equal(errors[0].column, 14);

        assert.equal(errors[1].line, 8);
        assert.equal(errors[1].column, 24);
      });
    });
  });
});

