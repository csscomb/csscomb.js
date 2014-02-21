describe('options/sort-order-fallback', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should sort leftovers alphabetically if `sort-order-fallback` is set', function() {
        var config = {
            'sort-order-fallback': 'abc',
            'sort-order': [
                ['top', 'left'],
                ['...'],
                ['color']
            ]
        };
        this.comb.configure(config);
        this.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Should sort unknown properties alphabetically if `sort-order-fallback` is set', function() {
        var config = {
            'sort-order-fallback': 'abc',
            'sort-order': ['top', 'left']
        };
        this.comb.configure(config);
        this.shouldBeEqual('test.css', 'test-2.expected.css');
    });

    it('Should leave leftovers as is if `sort-order-fallback` is not set', function() {
        var config = {
            'sort-order': ['top', 'left']
        };
        this.comb.configure(config);
        this.shouldBeEqual('test.css', 'test-3.expected.css');
    });
});

