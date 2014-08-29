describe('options/rule-delimiter (css)', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Should add blank line before .some-class', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('fontface.css', 'fontface.expected.css');
    });

    it('Should change nothing', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n\n" });
        this.shouldBeEqual('single.css', 'single.expected.css');
    });

    it('Should insert blank lines before .some-class and after .another-class', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('importfile.css', 'importfile.expected.css');
    });

    it('Should insert blank line before h1', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('media.css', 'media.expected.css');
    });

    it('Should insert newline before .another-class', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });
});
