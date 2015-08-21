let glob = require('glob');
let Mocha = require('mocha');

let mocha = new Mocha();
if (process.env.TEST_COV) mocha.reporter('html-cov');

// Tell mocha which tests to run:
glob.sync('test/**/test.js').forEach(file => {
  mocha.addFile(file);
});

mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures);
  });
});

