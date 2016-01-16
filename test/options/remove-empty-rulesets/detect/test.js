let Test = require('../../option_test');

describe('Option `remove-empty-rulesets`, detect', function() {
  describe('css', function() {
    it('Should detect test option set to `true`', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['remove-empty-rulesets'],
          'a { color: red }',
          {'remove-empty-rulesets': true}
      );
    });

    it('Should detect test option set to `false` with empty block', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['remove-empty-rulesets'],
          'a {}',
          {'remove-empty-rulesets': false}
      );
    });

    it('Should detect test option set to `false` with block containing whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['remove-empty-rulesets'],
          'a {   }',
          {'remove-empty-rulesets': false}
      );
    });

    it('Should detect test option set to `true` with block containing comment', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['remove-empty-rulesets'],
          'a { /* Hello */ }',
          {'remove-empty-rulesets': true}
      );
    });

    it('Should detect test option set to `true` with media query containing block', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['remove-empty-rulesets'],
          '@media all and (min-width:0) { a { /* Hello */ } }',
          {'remove-empty-rulesets': true}
      );
    });

    it('Should detect test option set to `true` with media query containing comment', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['remove-empty-rulesets'],
          '@media all and (min-width:0) {/* Hello */}',
          {'remove-empty-rulesets': true}
      );
    });

    it('Should detect test option set to `false` with empty media query', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['remove-empty-rulesets'],
          '@media all and (min-width:0) {}',
          {'remove-empty-rulesets': false}
      );
    });

    it('Should detect test option set to `false` with media query containing whitespace', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['remove-empty-rulesets'],
          '@media all and (min-width:0) { \n  }',
          {'remove-empty-rulesets': false}
      );
    });
  });
});

