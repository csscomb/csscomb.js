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

    it('Should insert blank lines before comment #2 and #3', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('comment.scss', 'comment.expected.scss');
    });

    it('Should insert nlank line before .home and after @media', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('stylesheet.scss', 'stylesheet.expected.scss');
    });

    it('Should insert newline before i but do not touch include', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('include.scss', 'include.expected.scss');
    });

    it('Should insert blank line before em', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('preceeded.scss', 'preceeded.expected.scss');
    });

    it('Very complex test', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('complex.scss', 'complex.expected.scss');
    });
});
