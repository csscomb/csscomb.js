let Test = require('../../option_test');

describe('Option `space-after-colon`, detect', function() {
  describe('css', function() {
    it('Should detect no whitespaces', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-colon'],
          'a { color:red }',
          {'space-after-colon': ''}
      );
    });

    it('Should detect space from two variants', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-colon'],
          'a { color: red; color :red }',
          {'space-after-colon': ' '}
      );
    });

    it('Should detect no whitespaces along three variants', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-colon'],
          'a { color: red; background :red } b { width:10px }',
          {'space-after-colon': ''}
      );
    });

    it('Should detect space', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['space-after-colon'],
          'a { color : red; background :red } b { width: 10px }',
          {'space-after-colon': ' '}
      );
    });
  });
});


