describe('options/rule-delimiter (css)', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should add blank line before .some-class', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('fontface.less', 'fontface.expected.css');
    });

    it('Should change nothing', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n\n" });
        this.shouldBeEqual('single.less', 'single.expected.css');
    });

    it('Should insert blank lines before .some-class and after .another-class', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('importfile.less', 'importfile.expected.css');
    });

    it('Should insert blank line before h1', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('media.less', 'media.expected.css');
    });

    it('Should insert newline before .another-class', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('test.css', 'test.expected.css');
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
