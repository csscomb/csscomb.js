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
    .option('-l, --lint', 'in case some fixes needed returns an error')
    .parse(process.argv);

if (!program.args.length) {
    console.log('No input paths specified');
    program.help();
}

var configPath = program.config || (process.cwd() + '/.csscomb.json');

if (fs.existsSync(configPath)) {
    var comb = new Comb();
    var config = require(configPath);

    console.time('spent');

    config.verbose = program.verbose === true || config.verbose;
    config.lint = program.lint;

    comb.configure(config);

    vow.all(program.args.map(comb.processPath.bind(comb)))
    .then(function() {
        if (config.verbose) {
            console.log('');
            console.log(comb.processed + ' file' + (comb.processed === 1 ? '' : 's') + ' processed');
            console.log(comb.changed + ' file' + (comb.changed === 1 ? '' : 's') + ' fixed');
            console.timeEnd('spent');
        }
        if (config.lint && comb.tbchanged) {
            process.exit(1);
        }
    })
    .fail(function(e) {
        console.log('stack: ', e.stack);
        process.exit(1);
    });
} else {
    console.log('Configuration file ' + configPath + ' was not found.');
    process.exit(1);
}
