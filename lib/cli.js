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
    .option('-d, --detect', 'detect mode (would return detected options)')
    .option('-l, --lint', 'in case some fixes needed returns an error')
    .parse(process.argv);

if (!program.args.length) {
    console.log('No input paths specified');
    program.help();
}

var configPath = program.config || (process.cwd() + '/config/csscomb.json');
var comb = new Comb();

if (program.detect) {
    console.log(JSON.stringify(comb.detectInFile(program.args[0]), false, 4));
    process.exit(0);
}

if (fs.existsSync(configPath)) {
    var config;
    if (configPath.match(/\.css$/)) {
        config = comb.detectInFile(configPath);
    } else {
        config = require(configPath);
    }

    if (config.template) {
        if (fs.existsSync(config.template)) {
            var templateConfig = comb.detectInFile(config.template);
            for (var attrname in templateConfig) {
                if (!config[attrname]) {
                    config[attrname] = templateConfig[attrname];
                }
            }
        } else {
            console.log('Template configuration file ' + config.template + ' was not found.');
            process.exit(1);
        }
    }

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
