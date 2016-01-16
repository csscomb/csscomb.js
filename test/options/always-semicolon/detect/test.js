let Test = require('../../option_test');

describe('Option `always-semicolon`, detect', function() {
  describe('css', function() {
    it('Should detect semicolon for last property. Test 1', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['always-semicolon'],
          'div { height: 0 }',
          {'always-semicolon': false}
      );
    });

    it('Should detect semicolon for last property. Test 2', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['always-semicolon'],
          'div { height: 0; }',
          {'always-semicolon': true}
      );
    });

    it('Should detect semicolon for last property. Test 3', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['always-semicolon'],
          'div { height: 0; } div { height: 0 }',
          {'always-semicolon': true}
      );
    });

    it('Should detect semicolon for last property. Test 4', function() {
      let test = new Test(this);
      test.shouldDetect(
        ['always-semicolon'],
        'div { height: 0 } div { height: 0; } div { height: 0 }',
        {'always-semicolon': false}
      );
    });

    it('Should detect semicolon for last property. Test 5', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['always-semicolon'],
          'div {\nheight: 0 /* Comment */\n} ' +
          'div { height: 0; }' +
          'div {\ntop: 1px;\nheight: 0 /* 1comment */  /* 2comment */\n}',
          {'always-semicolon': false}
      );
    });


    it('Should detect semicolon for last property. Test 6', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['always-semicolon'],
          'a{\n    border:0;\n}',
          {'always-semicolon': true}
      );
    });

    it('Should not detect semicolon for last property if there are no properties', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['always-semicolon'],
          'div {}',
          {}
      );
    });
  });
});

