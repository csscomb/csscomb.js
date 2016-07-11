let assert = require('assert');
let fs = require('fs');
let path = require('path');

let Comb = require('../../lib/csscomb');

class CoreTest {
  constructor(context, config) {
    this.file = context.test.file;
    this.syntax = context.test.parent.title;

    this.Comb = Comb;
    this.comb = new Comb();
    if (config) this.comb.configure(config);
  }

  useConfig(name) {
    let config = Comb.getConfig(name);
    this.comb.configure(config);
  }

  getErrors(filename) {
    let input = this.readFile(filename);
    return this.comb.lintString(input, {syntax: this.syntax});
  }

  shouldBeEqual(inputFile, expectedFile) {
    let input = this.readFile(inputFile);
    let expected = expectedFile ? this.readFile(expectedFile) : input;

    return this.comb.processString(input, {syntax: this.syntax})
        .then(string => assert.equal(string, expected));
  }

  /**
   * Detect options in a file and compare result with expected.
   * File names should be relative to test suite's folder.
   * @param {Array} options List of options that should be detected
   * @param {String} input Name of template file
   * @param {Object} expected Expected config with detected options
   */
  shouldDetect(options, input, expected) {
    let detectedConfig = Comb.detectInString(input, options);
    assert.deepEqual(detectedConfig, expected);
  }

  readFile(filename) {
    let dirname = path.dirname(this.file);
    let filePath = path.join(dirname, filename);
    return fs.readFileSync(filePath, 'utf8');
  }
}

module.exports = CoreTest;
