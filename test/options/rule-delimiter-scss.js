describe('options/rule-delimiter (scss)', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should add blank line before .another-class', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('test.scss', 'test.expected.scss');
    });

    it('Should change nothing', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n\n" });
        this.shouldBeEqual('single.scss', 'single.expected.scss');
    });
});
