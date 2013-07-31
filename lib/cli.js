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

var configPath = program.config || (process.cwd() + '/.csscomb.json');

/**
 * Trying to load config.
 * Custom config path can be specified using '-c' option.
 */
if (fs.existsSync(configPath)) {
    var config = require(configPath);
} else {
    console.log('Configuration file ' + configPath + ' was not found.');
    /**
     * Quitting with 1 error code.
     */
    process.exit(1);
}
