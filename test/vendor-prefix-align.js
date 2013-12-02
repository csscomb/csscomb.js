var Comb = require('../lib/csscomb');
var fs = require('fs');
var assert = require('assert');

describe('options/vendor-prefix-align', function() {
    var comb;

    beforeEach(function() {
        var config = {
            'vendor-prefix-align': true
        };

        comb = new Comb();
        comb.configure(config);
    });

    it('Should correctly align prefixes in properties', function() {
        var input = fs.readFileSync('./test/vendor-prefix-align/property-align.css', 'utf8');
        var expected = fs.readFileSync('./test/vendor-prefix-align/property-align.expected.css', 'utf8');

        assert.equal(comb.processString(input), expected);
    });

    it('Should correctly align prefixes in values', function() {
        var input = fs.readFileSync('./test/vendor-prefix-align/value-align.css', 'utf8');
        var expected = fs.readFileSync('./test/vendor-prefix-align/value-align.expected.css', 'utf8');

        assert.equal(comb.processString(input), expected);
    });

    it('Should not touch already align prefixes', function() {
        var input = fs.readFileSync('./test/vendor-prefix-align/already-aligned.css', 'utf8');
        var expected = fs.readFileSync('./test/vendor-prefix-align/already-aligned.expected.css', 'utf8');

        assert.equal(comb.processString(input), expected);
    });

    it('Should correct align prefixes in preoperties and values at the same time', function() {
        var input = fs.readFileSync('./test/vendor-prefix-align/both.css', 'utf8');
        var expected = fs.readFileSync('./test/vendor-prefix-align/both.expected.css', 'utf8');

        assert.equal(comb.processString(input), expected);
    });

    it('Should always correctly align prefixes', function() {
        var input = fs.readFileSync('./test/vendor-prefix-align/complex.css', 'utf8');
        var expected = fs.readFileSync('./test/vendor-prefix-align/complex.expected.css', 'utf8');

        assert.equal(comb.processString(input), expected);
    });

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Shouldn not detect anything if there are no prefixed groups', function() {
        should_detect(
            ['vendor-prefix-align'],
            'a{ color: red }a{ -webkit-transform: translateZ(0) }',
            {}
        );
    });

    it('Shouldn detect vendor-prefix-align as false in properties', function() {
        should_detect(
            ['vendor-prefix-align'],
            fs.readFileSync('./test/vendor-prefix-align/property-align.css', 'utf8'),
            {
                'vendor-prefix-align': false
            }
        );
    });

    it('Shouldn detect vendor-prefix-align as true in properties', function() {
        should_detect(
            ['vendor-prefix-align'],
            fs.readFileSync('./test/vendor-prefix-align/property-align.expected.css', 'utf8'),
            {
                'vendor-prefix-align': true
            }
        );
    });

    it('Shouldn detect vendor-prefix-align as false in values', function() {
        should_detect(
            ['vendor-prefix-align'],
            fs.readFileSync('./test/vendor-prefix-align/value-align.css', 'utf8'),
            {
                'vendor-prefix-align': false
            }
        );
    });

    it('Shouldn detect vendor-prefix-align as true in values', function() {
        should_detect(
            ['vendor-prefix-align'],
            fs.readFileSync('./test/vendor-prefix-align/value-align.expected.css', 'utf8'),
            {
                'vendor-prefix-align': true
            }
        );
    });

    it('Shouldn detect vendor-prefix-align as true, test 1', function() {
        should_detect(
            ['vendor-prefix-align'],
            fs.readFileSync('./test/vendor-prefix-align/already-aligned.css', 'utf8'),
            {
                'vendor-prefix-align': true
            }
        );
    });

    it('Shouldn detect vendor-prefix-align as true, test 2', function() {
        should_detect(
            ['vendor-prefix-align'],
            fs.readFileSync('./test/vendor-prefix-align/complex.expected.css', 'utf8'),
            {
                'vendor-prefix-align': true
            }
        );
    });

    it('Shouldn detect vendor-prefix-align as false', function() {
        should_detect(
            ['vendor-prefix-align'],
            fs.readFileSync('./test/vendor-prefix-align/complex.css', 'utf8'),
            {
                'vendor-prefix-align': false
            }
        );
    });

    it('Should not detect anything in simple case', function() {
        should_detect(
            ['vendor-prefix-align'],
            'a{border:0;}',
            {}
        );
    });
});
