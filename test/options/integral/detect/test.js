let Test = require('../../option_test');

describe('Option `integral`, detect', function() {
  describe('css', function() {
    it('Should detect everything in integral test', function() {
      let test = new Test(this);
      let input = test.readFile('integral.expected.css');
      // Clone the required config object, otherwise other tests would fail.
      let expected = JSON.parse(JSON.stringify(test.Comb.getConfig('csscomb')));
      delete expected['sort-order'];
      delete expected.exclude;
      test.shouldDetect(undefined, input, expected);
    });
  });
});
