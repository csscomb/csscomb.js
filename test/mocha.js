var Comb = process.env.TEST_COV ?
    require('../lib-cov/csscomb') : require('../lib/csscomb');
var Mocha = require('mocha');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var mocha = new Mocha();
if (process.env.TEST_COV) mocha.reporter('html-cov');

// Tell mocha which tests to run:
fs.readdirSync('test/core').forEach(function(dir) {
    mocha.addFile(path.join('test/core', dir, 'test.js'));
});
fs.readdirSync('test/options').forEach(function(dir) {
    mocha.addFile(path.join('test/options', dir, 'test.js'));
});

function readFile(filename) {
    var dirname = path.dirname(this.test.file);
    return fs.readFileSync(dirname + '/' + filename, 'utf8');
}

function shouldBeEqual(input, expected) {
    var syntax = input.split('.').pop();
    input = readFile.call(this, input);
    expected = expected ? readFile.call(this, expected) : input;
    assert.equal(this.comb.processString(input, { syntax: syntax }), expected);
}

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

/**
 * Detect options in a file and compare result with expected.
 * File names should be relative to test suite's folder.
 * @param {Array} options List of options that should be detected
 * @param {String} input Name of template file
 * @param {Object} expected Expected config with detected options
 */
function shouldDetect(options, input, expected) {
    // We need to “sort” the input and expected objects, as their order may vary
    assert.equal(
        JSON.stringify(sortObject(Comb.detectInString(input, options))),
        JSON.stringify(sortObject(expected))
    );
}

// Add helpers (see tests for usage examples):
mocha.suite.beforeEach(function() {
    this.Comb = Comb;
    this.comb = new Comb();
    this.readFile = readFile;
    this.shouldBeEqual = shouldBeEqual;
    this.shouldDetect = shouldDetect;
});

mocha.run(function(failures) {
    process.on('exit', function() {
        process.exit(failures);
    });
});

