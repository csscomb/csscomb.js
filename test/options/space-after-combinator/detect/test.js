let Test = require('../../option_test');

describe('Option `space-after-combinator`, detect', function() {
  describe('css', function() {
    it('Should detect no whitespaces after combinator', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-combinator'],
          'a+b { color:red }',
          {'space-after-combinator': ''}
      );
    });

    it('Should detect a space after combinator', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-combinator'],
          'a + \n b { color:red }',
          {'space-after-combinator': ' \n '}
      );
    });

    it('Should detect a space after combinator in long selector', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-combinator'],
          'a + b ~ c>d { color:red }',
          {'space-after-combinator': ' '}
      );
    });

    it('Should detect a space after combinator in long selector, test 2', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-combinator'],
          'a>b + c + d { color:red }',
          {'space-after-combinator': ' '}
      );
    });

    it('Should detect no whitespaces after combinator in long selector', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-combinator'],
          'a+b ~ c+d { color:red }',
          {'space-after-combinator': ''}
      );
    });

    it('Shouldn’t detect whitespaces after combinator in selector without combinators', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-combinator'],
          'a { color:red }',
          {}
      );
    });
  });
});


