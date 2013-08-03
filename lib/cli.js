/**
 * Command line implementation for CSScomb
 *
 * Usage example:
 * ./node_modules/.bin/csscomb file1 [dir1 [fileN [dirN]]]
 */
var fs = require('fs'),
    program = require('commander');

program
    .version(require('../package.json').version)
    .usage('[options] <file ...>')
    .option('-c, --config [path]', 'configuration file path')
    .parse(process.argv);

var Comb = require('./csscomb'),
    comb = new Comb(),
    configPath = program.config || (process.cwd() + '/.csscomb.json');

if (fs.existsSync(configPath)) {
    comb.configure(require(configPath));
} else {
    console.log('Configuration file ' + configPath + ' was not found.');
    process.exit(1);
}
