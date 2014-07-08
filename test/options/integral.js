var assert = require('assert');

describe('integral test', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Process result must be equal to expected.css', function() {
        var config = this.Comb.getConfig('csscomb');
        this.comb.configure(config);
        this.shouldBeEqual('integral.css', 'integral.expected.css');
    });

    it('Issue 252', function() {
        var config = this.Comb.getConfig('csscomb');
        this.comb.configure(config);
        this.shouldBeEqual('issue-252.sass', 'issue-252.expected.sass');
    });

    it('Should detect everything in integral test', function() {
        var input = this.readFile('integral.expected.css');
        // Clone the required config object, otherwise other tests would fail
        var expected = JSON.parse(JSON.stringify(this.Comb.getConfig('csscomb')));
        delete expected['sort-order'];
        delete expected['exclude'];
        this.shouldDetect(undefined, input, expected);
    });
});
