let Test = require('../../option_test');

describe('Option `element-case`, detect', function() {
  describe('css', function() {
    it('Should detect lowercase elements', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['element-case'],
          'a { color: red }',
          {'element-case': 'lower'}
      );
    });

    it('Should detect uppercase elements', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['element-case'],
          'A { color: red }',
          {'element-case': 'upper'}
      );
    });

    it('Should detect lowercase elements in a long selector', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['element-case'],
          'ul li:not(:hover) A { color: red }',
          {'element-case': 'lower'}
      );
    });

    it('Should detect uppercase elements in a long selector', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['element-case'],
          'ul .lol:not(LI) A { color: red }',
          {'element-case': 'upper'}
      );
    });

    it('Shouldn’t detect case of elements in a mixed case', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['element-case'],
          'aRtIcLe { color: red }',
          {}
      );
    });

    it('Shouldn’t detect case of elements when there are no such', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['element-case'],
          '*.lol { color: red }',
          {}
      );
    });
  });
});
