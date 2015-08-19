let glob = require('glob');
let Mocha = require('mocha');

let Comb = process.env.TEST_COV ?
    require('../lib-cov/csscomb') : require('../lib/csscomb');
let helpers = require('./test_helpers');

let mocha = new Mocha();
//mocha.reporter('spec');
if (process.env.TEST_COV) mocha.reporter('html-cov');

// Tell mocha which tests to run:
glob.sync('test/**/test.js').forEach(file => {
    mocha.addFile(file);
});

// Add helpers (see tests for usage examples):
mocha.suite.beforeEach(function() {
    this.Comb = Comb;
    this.comb = new Comb();
    this.readFile = helpers.readFile;
    this.shouldBeEqual = helpers.shouldBeEqual;
    this.shouldDetect = helpers.shouldDetect;
    this.getErrors = helpers.getErrors;
});

mocha.run(failures => {
    process.on('exit', () => {
        process.exit(failures);
    });
});

