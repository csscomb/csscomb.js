let Test = require('../../option_test');

describe('Option `vendor-prefix-align`, detect', function() {
  describe('css', function() {
    it('Shouldn not detect anything if there are no prefixed groups', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['vendor-prefix-align'],
          'a{ color: red }a{ -webkit-transform: translateZ(0) }',
          {}
      );
    });

    it('Shouldn detect vendor-prefix-align as false in properties', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['vendor-prefix-align'],
          test.readFile('property-align.css'),
          {'vendor-prefix-align': false}
      );
    });

    it('Shouldn detect vendor-prefix-align as true in properties', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['vendor-prefix-align'],
          test.readFile('property-align.expected.css'),
          {'vendor-prefix-align': true}
      );
    });

    it('Shouldn detect vendor-prefix-align as false in values', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['vendor-prefix-align'],
          test.readFile('value-align.css'),
          {'vendor-prefix-align': false}
      );
    });

    it('Shouldn detect vendor-prefix-align as true in values', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['vendor-prefix-align'],
          test.readFile('value-align.expected.css'),
          {'vendor-prefix-align': true}
      );
    });

    it('Shouldn detect vendor-prefix-align as true, test 1', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['vendor-prefix-align'],
          test.readFile('already-aligned.css'),
          {'vendor-prefix-align': true}
      );
    });

    it('Shouldn detect vendor-prefix-align as true, test 2', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['vendor-prefix-align'],
          test.readFile('complex.expected.css'),
          {'vendor-prefix-align': true}
      );
    });

    it('Shouldn detect vendor-prefix-align as false', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['vendor-prefix-align'],
          test.readFile('complex.css'),
          {'vendor-prefix-align': false}
      );
    });

    it('Should not detect anything in simple case', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['vendor-prefix-align'],
          'a{border:0;}',
          {}
      );
    });
  });
});
