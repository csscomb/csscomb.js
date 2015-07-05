'use strict';

let Test = require('../../option_test');

describe('Option `lines-between-rulesets`, process', function() {
  describe('css', function() {
    it('Numeric value => should insert 1 newline between rulesets', function() {
      let test = new Test(this, { 'lines-between-rulesets': 1 });
      return test.shouldBeEqual('lines-between-rulesets.css', 'lines-between-rulesets.expected.css');
    });

    it('Numeric value => should insert multiple newlines between rulesets', function() {
      let test = new Test(this, { 'lines-between-rulesets': 2 });
      return test.shouldBeEqual('lines-between-rulesets.css', '2-lines-between-rulesets.expected.css');
    });

    it('Invalid string value => should should not change anything', function() {
      let test = new Test(this, { 'lines-between-rulesets': '\n' });
      return test.shouldBeEqual('lines-between-rulesets.css');
    });

    it('Float number value => should be rounded', function() {
      let test = new Test(this, { 'lines-between-rulesets': 0.5 });
      return test.shouldBeEqual('lines-between-rulesets.css', 'lines-between-rulesets.expected.css');
    });
  });

  describe('less', function() {
    it('Numeric value => should insert 1 newline between rulesets', function() {
      let test = new Test(this, { 'lines-between-rulesets': 1 });
      return test.shouldBeEqual('lines-between-rulesets.less', 'lines-between-rulesets.expected.less');
    });

    it('Numeric value => should insert multiple newlines between rulesets', function() {
      let test = new Test(this, { 'lines-between-rulesets': 2 });
      return test.shouldBeEqual('lines-between-rulesets.less', '2-lines-between-rulesets.expected.less');
    });

    it('Invalid string value => should should not change anything', function() {
      let test = new Test(this, { 'lines-between-rulesets': '\n' });
      return test.shouldBeEqual('lines-between-rulesets.less');
    });

    it('Float number value => should be rounded', function() {
      let test = new Test(this, { 'lines-between-rulesets': 0.5 });
      return test.shouldBeEqual('lines-between-rulesets.less', 'lines-between-rulesets.expected.less');
    });
  });

  describe('scss', function() {
    it('Numeric value => should insert 1 newline between rulesets', function() {
      let test = new Test(this, { 'lines-between-rulesets': 1 });
      return test.shouldBeEqual('lines-between-rulesets.scss', 'lines-between-rulesets.expected.scss');
    });

    it('Numeric value => should insert multiple newlines between rulesets', function() {
      let test = new Test(this, { 'lines-between-rulesets': 2 });
      return test.shouldBeEqual('lines-between-rulesets.scss', '2-lines-between-rulesets.expected.scss');
    });

    it('Invalid string value => should should not change anything', function() {
      let test = new Test(this, { 'lines-between-rulesets': '\n' });
      return test.shouldBeEqual('lines-between-rulesets.scss');
    });

    it('Float number value => should be rounded', function() {
      let test = new Test(this, { 'lines-between-rulesets': 0.5 });
      return test.shouldBeEqual('lines-between-rulesets.scss', 'lines-between-rulesets.expected.scss');
    });
  });

  describe('sass', function() {
    it('Numeric value => should insert 1 newline between rulesets', function() {
      let test = new Test(this, { 'lines-between-rulesets': 1 });
      return test.shouldBeEqual('lines-between-rulesets.sass', 'lines-between-rulesets.expected.sass');
    });

    it('Numeric value => should insert multiple newlines between rulesets', function() {
      let test = new Test(this, { 'lines-between-rulesets': 2 });
      return test.shouldBeEqual('lines-between-rulesets.sass', '2-lines-between-rulesets.expected.sass');
    });

    it('Invalid string value => should should not change anything', function() {
      let test = new Test(this, { 'lines-between-rulesets': '\n' });
      return test.shouldBeEqual('lines-between-rulesets.sass');
    });

    it('Float number value => should be rounded', function() {
      let test = new Test(this, { 'lines-between-rulesets': 0.5 });
      return test.shouldBeEqual('lines-between-rulesets.sass', 'lines-between-rulesets.expected.sass');
    });
  });
});
