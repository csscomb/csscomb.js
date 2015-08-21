let Test = require('../../option_test');

describe('Option `quotes`, detect', function() {
  describe('css', function() {
    it('Should not detect quotes when there are none', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['quotes'],
          'a { color:red }',
          {}
      );
    });

    it('Should detect double quotes', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['quotes'],
          'a { content: "foo" }',
          {quotes: 'double'}
      );
    });

    it('Should detect single quotes', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['quotes'],
          'a { content: \'foo\' }',
          {quotes: 'single'}
      );
    });

    it('Should detect single quotes in attribute', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['quotes'],
          'a[class^=\'foo\'] { color: red }',
          {quotes: 'single'}
      );
    });

    it('Should detect double quotes in url', function() {
      let test = new Test(this);
      test.shouldDetect(
          ['quotes'],
          'a { background: url("foo.png") }',
          {quotes: 'double'}
      );
    });
  });
});

