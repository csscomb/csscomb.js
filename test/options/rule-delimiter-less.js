describe('options/rule-delimiter (less):', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should add blank line before .another-class', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('test.less', 'test.expected.less');
    });

    it('Should change nothing', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n\n" });
        this.shouldBeEqual('single.less');
    });

    it('Should insert blank lines before comment #2 and #3', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('comment.less', 'comment.expected.less');
    });

    it('Should insert blank line before .home and after @media', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('stylesheet.less', 'stylesheet.expected.less');
    });

    it('Should insert newline before i but do not touch include', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('include.less', 'include.expected.less');
    });

    it('Should insert blank line before em', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('preceeded.less', 'preceeded.expected.less');
    });

    it('Very complex test', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('complex.less', 'complex.expected.less');
    });
});
