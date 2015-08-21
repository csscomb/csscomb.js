let Test = require('../../option_test');

describe('Option `space-before-selector-delimiter`, detect', function() {
  describe('css', function() {
    it('Should detect no whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-selector-delimiter'],
          'a,b{top:0}',
          {'space-before-selector-delimiter': ''}
      );
    });

    it('Should detect whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-selector-delimiter'],
          'a \n ,b {top:0}',
          {'space-before-selector-delimiter': ' \n '}
      );
    });

    it('Should detect no whitespace (2 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-selector-delimiter'],
          'a,b{top:0} a ,b{left:0}',
          {'space-before-selector-delimiter': ''}
      );
    });

    it('Should detect whitespace (2 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-selector-delimiter'],
          'a ,b {top:0} b,a{left:0}',
          {'space-before-selector-delimiter': ' '}
      );
    });

    it('Should detect no whitespace (3 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-selector-delimiter'],
          'a ,b{top:0} b,c{left:0} c,d{right:0}',
          {'space-before-selector-delimiter': ''}
      );
    });

    it('Should detect whitespace (3 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-selector-delimiter'],
          'a,b{top:0} b ,c{left:0} c ,d{right:0}',
          {'space-before-selector-delimiter': ' '}
      );
    });
  });
});
