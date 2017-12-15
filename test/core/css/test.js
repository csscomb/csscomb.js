let Test = require('../core_test');

describe('css', function() {
    it('Should parse variables', function() {
        let test = new Test(this);
        test.comb.configure({});

        return test.shouldBeEqual('variable.css');
    });
});
