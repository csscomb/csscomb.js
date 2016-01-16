let Test = require('../../option_test');

describe('Option `block-indent`, detect', function() {
  describe('css', function() {
    it('Should detect nothing with an empty block, test 1', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['block-indent'],
          'a{ }',
          {}
      );
    });

    it('Should detect nothing with an empty block, test 2', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['block-indent'],
          'a{}',
          {}
      );
    });

    it('Should detect correct number of spaces', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['block-indent'],
          'a{\n    top: 0;\n    color: tomato;\n}',
          {'block-indent': '    '}
      );
    });

    it('Should detect no indent for one-line code', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['block-indent'],
          'a{ top: 0; color: tomato; }',
          {}
      );
    });

    it('Valid string value => should set proper space after combnator', function() {
      let test = new Test(this, {
        'block-indent': '    ',
        'space-before-closing-brace': '\n'
      });
      return test.shouldBeEqual('test.css', 'test-3.expected.css');
    });
  });
});
