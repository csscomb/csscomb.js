var assert = require('assert');

describe('csscomb methods', function() {
    beforeEach(function() {
        this.comb.configure({ exclude: ['nani/*', 'foo', 'b.css'] });
    });

    it('shouldProcess(path)', function() {
        assert.equal(true, this.comb._shouldProcess('styles'));
    });

    it('shouldProcess(excluded path)', function() {
        assert.equal(false, this.comb._shouldProcess('foo'));
    });

    it('shouldProcessFile(css)', function() {
        assert.equal(true, this.comb._shouldProcessFile('a.css'));
    });

    it('shouldProcessFile(scss)', function() {
        assert.equal(true, this.comb._shouldProcessFile('a.scss'));
    });

    it('shouldProcessFile(less)', function() {
        assert.equal(true, this.comb._shouldProcessFile('a.less'));
    });

    it('shouldProcessFile(txt)', function() {
        assert.equal(false, this.comb._shouldProcessFile('a.txt'));
    });

    it('shouldProcessFile(css, excluded directory)', function() {
        assert.equal(false, this.comb._shouldProcessFile('nani/a.css'));
    });

    it('shouldProcessFile(css, excluded file)', function() {
        assert.equal(false, this.comb._shouldProcessFile('b.css'));
    });
});

