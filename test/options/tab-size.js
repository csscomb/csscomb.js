describe('options/tab-size:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Test 1: String value => should not change anything', function() {
        this.comb.configure({ 'tab-size': '   ' });
        this.shouldBeEqual('test.css');
    });

    it('Test 2: Float value => should not change anything', function() {
        this.comb.configure({ 'tab-size': 4.5 });
        this.shouldBeEqual('test.css');
    });

    it('Test 3: Integer value => should replace tabs with proper number of spaces', function() {
        this.comb.configure({ 'tab-size': 4 });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });
});
