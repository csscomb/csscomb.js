let Test = require('../../option_test');

describe('Option `space-after-selector-delimiter`, detect', function() {
  describe('css', function() {
    it('Should detect no whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-selector-delimiter'],
          'a,b{top:0}',
          {'space-after-selector-delimiter': ''}
      );
    });

    it('Should detect whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-selector-delimiter'],
          'a, \n b {top:0}',
          {'space-after-selector-delimiter': ' \n '}
      );
    });

    it('Should detect no whitespace (2 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-selector-delimiter'],
          'a,b{top:0} a, b{left:0}',
          {'space-after-selector-delimiter': ''}
      );
    });

    it('Should detect whitespace (2 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-selector-delimiter'],
          'a, b {top:0} b,a{left:0}',
          {'space-after-selector-delimiter': ' '}
      );
    });

    it('Should detect no whitespace (3 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-selector-delimiter'],
          'a, b{top:0} b,c{left:0} c,d{right:0}',
          {'space-after-selector-delimiter': ''}
      );
    });

    it('Should detect whitespace (3 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-selector-delimiter'],
          'a,b{top:0} b, c{left:0} c, sd{right:0}',
          {'space-after-selector-delimiter': ' '}
      );
    });
  });
});
