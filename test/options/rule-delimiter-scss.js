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
        this.shouldBeEqual('media.scss', 'media.expected.scss');
    });

    it('Should insert newline before i but do not touch include', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('include.scss', 'include.expected.scss');
    });

    it('Should insert newline before .some-class', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('import.scss', 'import.expected.scss');
    });

    it('Should change nothing', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('extend.scss', 'extend.expected.scss');
    });

    it('Should insert blank line before em', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('preceeded.scss', 'preceeded.expected.scss');
    });

    it('Very complex test', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('complex.scss', 'complex.expected.scss');
    });

    it('Should insert blank line before n-th child', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('for.scss', 'for.expected.scss');
    });

    it('Should insert blank line after @if and after @else', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('if.scss', 'if.expected.scss');
    });

    it('Should insert blank line before @return', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('return.scss', 'return.expected.scss');
    });

    it('Should insert blank line before @mixin', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('mixin.scss', 'mixin.expected.scss');
    });

    it('Should insert blank line after @function', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('function.scss', 'function.expected.scss');
    });

    it('Should add new lines after variables and before .sub_element', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('variable.scss', 'variable.expected.scss');
    });

    it('Should add new lines before @at-root', function() {
        this.comb.configure({ 'rule-delimiter': "\n\n" });
        this.shouldBeEqual('atroot.scss', 'atroot.expected.scss');
    });
});
