let assert = require('assert');

describe('Option `always-semicolon`, lint', function() {
  describe('CSS', function() {
    it('Should report no errors', function() {
      this.comb.configure({'always-semicolon': true});
      return this.getErrors('css/lint-1.css').then(errors => {
        assert.equal(errors.length, 0);
      });
    });

    it('Error mesage should be a string', function() {
      this.comb.configure({'always-semicolon': true});
      return this.getErrors('css/lint-2.css').then(errors => {
        let error = errors[0];
        assert.equal(typeof error.message, 'string');
      });
    });

    it('Error should provide correct position info', function() {
      this.comb.configure({'always-semicolon': true});
      return this.getErrors('css/lint-2.css').then(errors => {
        let error = errors[0];
        assert.equal(error.line, 1);
        assert.equal(error.column, 16);
      });
    });

    it('Should report multiple errors', function() {
      this.comb.configure({'always-semicolon': true});
      return this.getErrors('css/lint-3.css').then(errors => {
        assert.equal(errors.length, 2);

        assert.equal(errors[0].line, 2);
        assert.equal(errors[0].column, 14);

        assert.equal(errors[1].line, 8);
        assert.equal(errors[1].column, 24);
      });
    });
  });
});

