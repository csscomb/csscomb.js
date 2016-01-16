let Test = require('../../option_test');

describe('Option `space-before-colon`, detect', function() {
  describe('css', function() {
    it('Should detect no whitespaces', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-colon'],
          'a { color:red }',
          {'space-before-colon': ''}
      );
    });

    it('Should detect no space from two variants', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-colon'],
          'a { color: red; color :red }',
          {'space-before-colon': ''}
      );
    });

    it('Should detect no whitespaces along three variants', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-colon'],
          'a { color: red; background :red } b { width:10px }',
          {'space-before-colon': ''}
      );
    });

    it('Should detect space', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-before-colon'],
          'a { color : red; background :red } b { width:10px }',
          {'space-before-colon': ' '}
      );
    });
  });
});


