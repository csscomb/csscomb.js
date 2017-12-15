const Test = require('../core_test');

describe('css', function() {
  it('Should parse variables', function() {
    const test = new Test(this);

    test.comb.configure({});

    return test.shouldBeEqual('variable.css');
  });
});
