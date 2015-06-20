describe('options/tab-size:', function() {
    describe('process', function() {
        it('Test 1: String value => should not change anything', function() {
            this.comb.configure({ 'tab-size': '   ' });
            return this.shouldBeEqual('test.css');
        });

        it('Test 2: Float value => should not change anything', function() {
            this.comb.configure({ 'tab-size': 4.5 });
            return this.shouldBeEqual('test.css');
        });

        it('Test 3: Integer value => should replace tabs with proper number of spaces', function() {
            this.comb.configure({ 'tab-size': 4 });
            return this.shouldBeEqual('test.css', 'test.expected.css');
        });
    });
});
