let Test = require('../../option_test');

describe('Option `eof-newline`, detect', function() {
  describe('css', function() {
    it('Shouldn’t detect eof newline', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['eof-newline'],
          'a { color: red }',
          {'eof-newline': false}
      );
    });

    it('Should detect eof newline', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['eof-newline'],
          'a { color: red }\n',
          {'eof-newline': true}
      );
    });

    it('Shouldn’t detect eof newline with spaces at the end', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['eof-newline'],
          'a { color: red }  ',
          {'eof-newline': false}
      );
    });

    it('Should detect eof newline with mixed spaces at the end', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['eof-newline'],
          'a { color: red } \n ',
          {'eof-newline': true}
      );
    });
  });
});

