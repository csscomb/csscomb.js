/**
 * Command line implementation for CSSComb
 *
 * Usage example:
 * ./node_modules/.bin/csscomb [options] file1 [dir1 [fileN [dirN]]]
 */
var fs = require('fs');
var program = require('commander');
var vow = require('vow');
var Comb = require('./csscomb');

program
    .version(require('../package.json').version)
    .usage('[options] <file ...>')
    .option('-v, --verbose', 'verbose mode')
    .option('-c, --config [path]', 'configuration file path')
    .parse(process.argv);

if (!program.args.length) {
    console.log('No input paths specified');
    program.help();
}

var configPath = program.config || (process.cwd() + '/.csscomb.json');

if (fs.existsSync(configPath)) {
    var comb = new Comb();
    var config = require(configPath);
    var time = new Date();
    config.verbose = program.verbose === true || config.verbose;
    comb.configure(config);
    vow.all(program.args.map(function(path) {
        return comb.processPath(path);
    })).fail(function(e) {
        console.log('stack: ', e.stack);
        process.exit(1);
    }).always(function() {
        if (config.verbose) {
            console.log(comb.count + ' file' + (comb.count === 1 ? '' : 's') + ' processed');
            console.log((new Date().getTime() - time.getTime()) + ' ms spent');
        }
    });
} else {
    console.log('Configuration file ' + configPath + ' was not found.');
    process.exit(1);
}
