var assert = require('assert');

describe('options/sort-order', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should be in expected order in case properties are not grouped', function() {
        this.comb.configure({ 'sort-order': ['position', 'z-index'] });
        this.shouldBeEqual('single-group.css', 'single-group.expected.css');
    });

    it('Should be in expected order in case of 1 group', function() {
        this.comb.configure({ 'sort-order': [
            ['position', 'z-index']
        ] });
        this.shouldBeEqual('single-group.css', 'single-group.expected.css');
    });

    it('Shuld be in expected order in case of multiple groups', function() {
        this.comb.configure({ 'sort-order': [
            ['position', 'z-index'],
            ['width', 'height']
        ] });
        this.shouldBeEqual('multiple-groups.css', 'multiple-groups.expected.css');

    });

    it('Should work correctly with comments in case of 1 group', function() {
        this.comb.configure({ 'sort-order': [
            ['border-bottom', 'font-style'],
        ] });
        this.shouldBeEqual('single-group-comments.css', 'single-group-comments.expected.css');
    });

    it('Should work correctly with comments in case of multiple groups', function() {
        this.comb.configure({ 'sort-order': [
            ['margin'],
            ['padding']
        ] });
        this.shouldBeEqual('multiple-groups-comments.css', 'multiple-groups-comments.expected.css');
    });

    it('Should parse semicolons inside data uri correctly', function() {
        this.comb.configure({
            'sort-order': [
                ['position', 'background', 'color']
            ]
        });
        this.shouldBeEqual('data-uri.css', 'data-uri.expected.css');
    });

    it('Should not add more than 1 line between groups', function() {
        var input = this.readFile('multiple-groups-2.css');
        var expected = this.readFile('multiple-groups-2.expected.css');
        this.comb.configure({
            'sort-order': [
                ['top'], ['color']
            ]
        });

        for (var i = 6; i--;) {
            input = this.comb.processString(input);
        }
        assert.equal(input, expected);
    });

    it('Issue 94. Test 1', function() {
        var config = this.Comb.getConfig('csscomb');
        this.comb.configure(config);
        this.shouldBeEqual('issue-94-1.css', 'issue-94-1.expected.css');
    });

    it('Issue 94. Test 2', function() {
        var config = this.Comb.getConfig('csscomb');
        this.comb.configure(config);
        this.shouldBeEqual('issue-94-2.css', 'issue-94-2.expected.css');
    });

    it('Issue 94. Test 3', function() {
        var config = this.Comb.getConfig('csscomb');
        this.comb.configure(config);
        this.shouldBeEqual('issue-94-3.css', 'issue-94-3.expected.css');
    });

    it('Should place the leftovers in the end', function() {
        var config = this.Comb.getConfig('csscomb');
        this.comb.configure(config);
        this.shouldBeEqual('leftovers-1.css', 'leftovers-1.expected.css');
    });

    it('Should place the leftovers in the beginning', function() {
        var config = this.Comb.getConfig('csscomb');
        config['sort-order'][0].unshift(['...']);
        this.comb.configure(config);
        this.shouldBeEqual('leftovers-2.css', 'leftovers-2.expected.css');
        config['sort-order'][0].shift();
    });

    it('Should place the leftovers in the beginning of its group', function() {
        var config = this.Comb.getConfig('csscomb');
        config['sort-order'][1].unshift('...');
        this.comb.configure(config);
        this.shouldBeEqual('leftovers-3.css', 'leftovers-3.expected.css');
        config['sort-order'][1].shift();
    });

    it('Should place the leftovers in the middle of its group', function() {
        var config = this.Comb.getConfig('csscomb');
        config['sort-order'][1].splice(1, 0, '...');
        this.comb.configure(config);
        this.shouldBeEqual('leftovers-4.css', 'leftovers-4.expected.css');
        config['sort-order'][1].splice(1, 1);
    });
});
