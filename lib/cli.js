/**
 * Command line implementation for CSSComb
 *
 * Usage example:
 * ./node_modules/.bin/csscomb file1 [dir1 [fileN [dirN]]]
 */
var fs = require('fs');
var program = require('commander');
var vow = require('vow');
var Comb = require('./csscomb');

program
    .version(require('../package.json').version)
    .usage('[options] <file ...>')
    .option('-c, --config [path]', 'configuration file path')
    .parse(process.argv);

if (!program.args.length) {
    console.log('No input paths specified');
    program.help();
}

var configPath = program.config || (process.cwd() + '/.csscomb.json');

if (fs.existsSync(configPath)) {
    var comb = new Comb();
    comb.configure(require(configPath));
    vow.all(program.args.map(function(path) {
        return comb.processPath(path);
    })).fail(function(e) {
        console.log('stack: ', e.stack);
        process.exit(1);
    });
} else {
    console.log('Configuration file ' + configPath + ' was not found.');
    process.exit(1);
}
