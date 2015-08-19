let assert = require('assert');
let fs = require('fs');
let path = require('path');

let Comb = process.env.TEST_COV ?
    require('../lib-cov/csscomb') : require('../lib/csscomb');

let helpers = {
    getErrors(filename) {
        let syntax = filename.split('.').pop();
        let input = helpers.readFile.call(this, filename);
        return this.comb.lintString(input, {syntax: syntax});
    },

    shouldBeEqual(input, expected) {
        let syntax = input.split('.').pop();
        input = helpers.readFile.call(this, input);
        expected = expected ? helpers.readFile.call(this, expected) : input;
        return this.comb.processString(input, {syntax: syntax})
            .then(function(string) {
                assert.equal(string, expected);
            });
    },

    /**
     * Detect options in a file and compare result with expected.
     * File names should be relative to test suite's folder.
     * @param {Array} options List of options that should be detected
     * @param {String} input Name of template file
     * @param {Object} expected Expected config with detected options
     */
    shouldDetect(options, input, expected) {
        // We need to “sort” the input and expected objects, as their order
        // may vary.
        let actual = helpers.sortObject(Comb.detectInString(input, options));
        assert.equal(
            JSON.stringify(helpers.sortObject(actual)),
            JSON.stringify(helpers.sortObject(expected))
        );
    },

    readFile(filename) {
        let dirname = path.dirname(this.test.file);
        return fs.readFileSync(dirname + '/' + filename, 'utf8');
    },

    sortObject(o) {
        let a = [];
        for (let key in o) {
            if (o.hasOwnProperty(key)) {
                a.push(key);
            }
        }
        a.sort();

        let sorted = {};
        for (let key = 0; key < a.length; key++) {
            sorted[a[key]] = o[a[key]];
        }
        return sorted;
    }
};

module.exports = helpers;
