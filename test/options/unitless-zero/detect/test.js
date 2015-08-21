let Test = require('../../option_test');

describe('Option `unitless-zero`, detect', function() {
  describe('css', function() {
    it('Should detect unitless zero option', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['unitless-zero'],
          'a { width: 0 }',
          {'unitless-zero': true}
      );
    });

    it('Should detect zero with unit', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['unitless-zero'],
          'a { width: 0px }',
          {'unitless-zero': false}
      );
    });

    it('Should detect unitless zero option with multiple values', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['unitless-zero'],
          'a { padding: 0px 0 0 }',
          {'unitless-zero': true}
      );
    });

    it('Should detect zero with unit and multiple values', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['unitless-zero'],
          'a { padding: 0px 0 0em }',
          {'unitless-zero': false}
      );
    });

    it('Shouldn’t detect unitless zero option if there is no unit', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['unitless-zero'],
          'a { color: red }',
          {}
      );
    });

    it('Shouldn’t detect unitless zero option if there is `deg` unit', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['unitless-zero'],
          'a { transform: rotate(0deg) }',
          {}
      );
    });

    it('Should detect unitless zero option with percents', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['unitless-zero'],
          'a { padding: 0% 0 0 }',
          {'unitless-zero': true}
      );
    });
  });
});

