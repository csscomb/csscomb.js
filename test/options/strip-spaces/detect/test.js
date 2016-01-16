let Test = require('../../option_test');

describe('Option `strip-spaces`, detect', function() {
  describe('css', function() {
    it('Should detect strip-spaces option set to `true`', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['strip-spaces'],
          'a { color: red }',
          {'strip-spaces': true}
      );
    });

    it('Should detect strip-spaces option set to `false`', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['strip-spaces'],
          'a { color: red }  ',
          {'strip-spaces': false}
      );
    });

    it('Should detect strip-spaces option set to `true` with newline', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['strip-spaces'],
          'a { color: red }\nb { color: blue }',
          {'strip-spaces': true}
      );
    });

    it('Should detect strip-spaces option set to `false` with newline', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['strip-spaces'],
          'a { color: red }  \nb { color: blue }',
          {'strip-spaces': false}
      );
    });

    it('Should detect strip-spaces option set to `true` inside a value', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['strip-spaces'],
          'a {\n  color:\n  red }',
          {'strip-spaces': true}
      );
    });

    it('Should detect strip-spaces option set to `false` inside a value', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['strip-spaces'],
          'a {\n  color: \n  red }',
          {'strip-spaces': false}
      );
    });

    it('Should detect strip-spaces option set to `true` if the only trailing space is the last newline', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['strip-spaces'],
          'a { color: red }\n',
          {'strip-spaces': true}
      );
    });

    it('Should detect strip-spaces option set to `false` if there is more than one newline at the end', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['strip-spaces'],
          'a { color: red }\n\n',
          {'strip-spaces': false}
      );
    });
  });
});
