let Test = require('../../option_test');

describe('Option `integral`, process', function() {
  describe('css', function() {
    it('Process result must be equal to expected.css', function() {
      let test = new Test(this);
      test.useConfig('csscomb');
      return test.shouldBeEqual('integral.css', 'integral.expected.css');
    });

    it('Issue 374', function() {
      let test = new Test(this);
      test.useConfig('csscomb');
      return test.shouldBeEqual('issue-374.css');
    });
  });

  describe('sass', function() {
    it('Issue 252', function() {
      let test = new Test(this);
      test.useConfig('csscomb');
      return test.shouldBeEqual('issue-252.sass', 'issue-252.expected.sass');
    });
  });
});
