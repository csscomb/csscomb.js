let Test = require('../../option_test');

describe('Option `leading-zero`, detect', function() {
  describe('css', function() {
    it('Should detect leading zero option', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['leading-zero'],
          'a { width: 0.5em }',
          {'leading-zero': true}
      );
    });

    it('Should detect leading zero option set to false', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['leading-zero'],
          'a { width: .5em }',
          {'leading-zero': false}
      );
    });

    it('Shouldn’t detect leading zero option', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['leading-zero'],
          'a { width: 10.5em }',
          {}
      );
    });
  });
});

