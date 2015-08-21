let Test = require('../../option_test');

describe('Option `color-shorthand`, detect', function() {
  describe('css', function() {
    it('Should detect non-shorthanded color', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['color-shorthand'],
          'a { color: #FF33EE }',
          {'color-shorthand': false}
      );
    });

    it('Should detect shorthanded color', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['color-shorthand'],
          'a { color: #fff }',
          {'color-shorthand': true}
      );
    });

    it('Shouldn’t detect if a color is shorthanded if it can’t be shorthanded', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['color-shorthand'],
          'a { color: #F3F3F3 }',
          {}
      );
    });

    it('Shouldn’t detect if a color is shorthanded if it is not a vhash', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['color-shorthand'],
          'a { color: rgba(0,0,0,0.5) }',
          {}
      );
    });
  });
});
