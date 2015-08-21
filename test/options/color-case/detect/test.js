let Test = require('../../option_test');

describe('Option `block-indent`, detect', function() {
  describe('css', function() {
    it('Should detect uppercase color', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['color-case'],
          'a { color: #F3F3F3 }',
          {'color-case': 'upper'}
      );
    });

    it('Should detect lowercase color', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['color-case'],
          'a { color: #f6f6f6 }',
          {'color-case': 'lower'}
      );
    });

    it('Should detect uppercase color in a shorthand', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['color-case'],
          'a { color: #FFF }',
          {'color-case': 'upper'}
      );
    });

    it('Should detect lowercase color in a shorthand', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['color-case'],
          'a { color: #fff }',
          {'color-case': 'lower'}
      );
    });

    it('Shouldn’t detect color case if it contains only digits', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['color-case'],
          'a { color: #333 }',
          {}
      );
    });

    it('Shouldn’t detect color case if it is in mixed case', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['color-case'],
          'a { color: #fFfFfF }',
          {}
      );
    });
  });
});
