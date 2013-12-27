var Comb = process.env.TEST_COV ?
    require('../lib-cov/csscomb') : require('../lib/csscomb');
var Mocha = require('mocha');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var mocha = new Mocha();
if (process.env.TEST_COV) mocha.reporter('html-cov');

// Tell mocha which tests to run:
['test/core', 'test/options'].forEach(function(dirname) {
    fs.readdirSync(dirname).forEach(function(file) {
        mocha.addFile(path.join(dirname, file));
    });
});

// Add helpers (see tests for usage examples):
mocha.suite.beforeEach(function() {
    this.comb = new Comb();
    this.filename = '';

    /**
     * Read css file from test suite's directory.
     * If run inside `test/core/cli.js` file, `this.readFile('nani.css')` will
     * return content of `test/core/cli/nani.css` file.
     * `this.filename = __filename` is required if this helper is used in a test
     * case (see tests for examples).
     * @param {String} filename Name of file that is located in test folder
     * @returns {String} File's content
     */
    this.readFile = function(filename) {
        // Remove `.js` from test suite's name:
        var dirname = this.filename.slice(0, -3);
        return fs.readFileSync(dirname + '/' + filename, 'utf8');
    };

    /**
     * Comb a file and compare the result with expected.
     * If `expected` is not defined, check that file's content does not change
     * after combing.
     * File names should be relative to test suite's folder.
     * @param {String} input Name of file that should be combed
     * @param {String} [expected] Name of file with expected content
     */
    this.shouldBeEqual = function(input, expected) {
        var syntax = input.split('.').pop();
        input = this.readFile(input);
        expected = expected ? this.readFile(expected) : input;
        assert.equal(this.comb.processString(input, syntax), expected);
    };

    /**
     * Detect options in a file and compare result with expected.
     * File names should be relative to test suite's folder.
     * @param {Array} options List of options that should be detected
     * @param {String} input Name of template file
     * @param {Object} expected Expected config with detected options
     */
    this.shouldDetect = function(options, input, expected) {
        // We need to “sort” the input and expected objects, as their order may vary
        function sortObject(o) {
            var sorted = {};
            var key = [];
            var a = [];

            for (key in o) {
                if (o.hasOwnProperty(key)) {
                    a.push(key);
                }
            }

            a.sort();

            for (key = 0; key < a.length; key++) {
                sorted[a[key]] = o[a[key]];
            }
            return sorted;
        }
        assert.equal(
            JSON.stringify(sortObject(this.comb.detectInString(input, options))),
            JSON.stringify(sortObject(expected))
        );
    };
});

mocha.run(function(failures) {
    process.on('exit', function() {
        process.exit(failures);
    });
});

