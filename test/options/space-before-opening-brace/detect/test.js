let Test = require('../../option_test');

describe('Option `space-before-opening-brace`, detect', function() {
  describe('css', function() {
    it('Should detect no whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-opening-brace'],
          'a{top:0}',
          {'space-before-opening-brace': ''}
      );
    });

    it('Should detect whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-opening-brace'],
          'a \n {top:0}',
          {'space-before-opening-brace': ' \n '}
      );
    });

    it('Should detect no whitespace (2 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-opening-brace'],
          'a{top:0} b {left:0}',
          {'space-before-opening-brace': ''}
      );
    });

    it('Should detect whitespace (2 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-opening-brace'],
          'a {top:0} b{left:0}',
          {'space-before-opening-brace': ' '}
      );
    });

    it('Should detect no whitespace (3 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-opening-brace'],
          'a {top:0} b{left:0} c{right:0}',
          {'space-before-opening-brace': ''}
      );
    });

    it('Should detect whitespace (3 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-opening-brace'],
          'a{top:0} b {left:0} c {right:0}',
          {'space-before-opening-brace': ' '}
      );
    });
  });
});
