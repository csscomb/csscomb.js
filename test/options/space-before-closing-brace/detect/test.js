let Test = require('../../option_test');

describe('Option `space-before-closing-brace`, detect', function() {
  describe('css', function() {
    it('Should detect no whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-closing-brace'],
          'a{top:0}',
          {'space-before-closing-brace': ''}
      );
    });

    it('Should detect no whitespace (2 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-closing-brace'],
          'a{top:0} b { color: tomato; }',
          {'space-before-closing-brace': ''}
      );
    });

    it('Should detect whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-closing-brace'],
          'a { top:0 }',
          {'space-before-closing-brace': ' '}
      );
    });

    it('Should detect whitespace (2 blocks)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-closing-brace'],
          'a { top:0 } b{color:tomato;}',
          {'space-before-closing-brace': ' '}
      );
    });

    it('Should detect whitespace (mix with block indent)', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-closing-brace', 'block-indent'],
          'a {\n  top:0\n  }\nb{\n  color:tomato;\n  }',
          {'block-indent': '  ', 'space-before-closing-brace': '\n  '}
      );
    });
  });
});
