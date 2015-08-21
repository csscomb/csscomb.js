let Test = require('../../option_test');

describe('Option `space-after-opening-brace`, detect', function() {
  describe('css', function() {
    it('Should detect no whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-opening-brace'],
          'a{top:0}',
          {'space-after-opening-brace': ''}
      );
    });

    it('Should detect whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-opening-brace'],
          'a{\n\ttop:0}',
          {'space-after-opening-brace': '\n\t'}
      );
    });

    it('Should detect no whitespace (2 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-opening-brace'],
          'a{top:0} b{\n left:0}',
          {'space-after-opening-brace': ''}
      );
    });

    it('Should detect whitespace (2 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-opening-brace'],
          'a{ top:0 } b{left:0}',
          {'space-after-opening-brace': ' '}
      );
    });

    it('Should detect no whitespace (3 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-opening-brace'],
          'a{top:0} b { left: 0 } c{\n\tright:0}',
          {'space-after-opening-brace': ''}
      );
    });

    it('Should detect whitespace (3 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-opening-brace'],
          'a{\ntop:0} b{\nleft:0} c{\n  right:0}',
          {'space-after-opening-brace': '\n'}
      );
    });
  });
});
