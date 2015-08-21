let Test = require('../../option_test');

describe('Option `space-before-combinator`, detect', function() {
  describe('css', function() {
    it('Should detect no whitespaces before combinator', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-combinator'],
          'a+b { color:red }',
          {'space-before-combinator': ''}
      );
    });

    it('Should detect a space before combinator', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-combinator'],
          'a + b { color:red }',
          {'space-before-combinator': ' '}
      );
    });

    it('Should detect a space before combinator in long selector', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-combinator'],
          'a + b ~ c>d { color:red }',
          {'space-before-combinator': ' '}
      );
    });

    it('Should detect a space before combinator in long selector, test 2', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-combinator'],
          'a>b + c + d { color:red }',
          {'space-before-combinator': ' '}
      );
    });

    it('Should detect no whitespaces before combinator in long selector', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-combinator'],
          'a+b ~ c+d { color:red }',
          {'space-before-combinator': ''}
      );
    });

    it('Shouldn’t detect whitespaces before combinator in selector without combinators', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-combinator'],
          'a { color:red }',
          {}
      );
    });
  });
});


