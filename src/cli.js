'use strict';

/**
 * Command line implementation for CSSComb
 *
 * Usage example:
 * ./node_modules/.bin/csscomb [options] [file1 [dir1 [fileN [dirN]]]]
 */
var fs = require('fs');
var parseArgs = require('minimist');
var path = require('path');
var os = require('os');

var Comb = require('./csscomb');
var Errors = require('./errors');


var getInputData = new Promise(function(resolve) {
  var input = '';
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(data) {
    input += data;
  });
  process.stdin.on('end', function() {
    resolve(input);
  });
});

var comb = new Comb();
var options = getOptions();

if (options.help) {
  displayHelp();
  process.exit(0);
}

if (options.detect) {
  const config = detectConfig();
  process.stdout.write(config);
  process.exit(0);
}

var config = getConfig();
comb.configure(config);

if (options['tty-mode'] || process.stdin.isTTY) {
  processFiles(options._);
} else {
  processSTDIN();
}


function getOptions() {
  var parserOptions = {
    boolean: ['help', 'lint', 'verbose', 'tty-mode'],
    alias: {
      config: 'c',
      detect: 'd',
      lint: 'l',
      help: 'h',
      verbose: 'v',
      'tty-mode': 't'
    }
  };
  return parseArgs(process.argv.slice(2), parserOptions);
}

function displayHelp() {
  var help = [
    'NAME',
    '    csscomb — Lint and fix style errors in css files',
    '',
    'SYNOPSIS',
    '    csscomb [options] file.css',
    '    cat file.css | csscomb [options] -',
    '',
    'OPTIONS',
    '    -c, --config [path]',
    '        Path to configuration file.',
    '    -d, --detect',
    '        Run the tool in detect mode, returning detected options.',
    '    -l, --lint',
    '        Run the tool in linter mode, without modifying files.',
    '    -h, --help',
    '        Display help message.',
    '    -v, --verbose',
    '        Whether to print logging info.',
    '    -t, --tty-mode',
    '        Run the tool in TTY mode using external app (e.g. IDE).',
    ''
  ];
  process.stdout.write(help.join(os.EOL));
}

function detectConfig() {
  const config = Comb.detectInFile(options.detect);
  return JSON.stringify(config, false, 4);
}

function getConfig() {
  var configPath = options.config &&
      path.resolve(process.cwd(), options.config) ||
      Comb.getCustomConfigPath();

  var config;
  if (!fs.existsSync(configPath)) {
    config = require('../config/csscomb.json');
  } else if (configPath.match(/\.css$/)) {
    config = Comb.detectInFile(configPath);
  } else {
    config = Comb.getCustomConfig(configPath);
  }

  if (!config) {
    const errorMessage = Errors.configParsingError(configPath);
    process.stderr.write(errorMessage);
    process.exit(1);
  }

  applyTemplate(config);
  if (options.verbose) config.verbose = options.verbose;
  if (options.lint) config.lint = options.lint;

  return config;
}

function applyTemplate(config) {
  if (!config.template) return;

  if (!fs.existsSync(config.template)) {
    const errorMessage = Errors.missingTemplateFile(config.template);
    process.stderr.write(errorMessage);
    process.exit(1);
  }

  var templateConfig = Comb.detectInFile(config.template);
  for (var attrname in templateConfig) {
    if (templateConfig.hasOwnProperty(attrname) && !config[attrname]) {
      config[attrname] = templateConfig[attrname];
    }
  }
}

function processFiles(files) {
  const promises = files.map(file => {
    return comb.processPath(file);
  });

  Promise.all(promises).catch(error => {
    process.stderr.write(error.stack);
    process.exit(1);
  }).then(c => {
    c = [].concat.apply([], c);
    var tbchanged = c.filter(isChanged => {
      return isChanged !== undefined;
    }).reduce((a, b) => {
      return a + b;
    }, 0);

    var changed = options.lint ? 0 : tbchanged;

    if (options.verbose) {
      let message = [
          `${c.length} file${c.length === 1 ? '' : 's'} processed`,
          `${changed} file${changed === 1 ? '' : 's'} fixed`,
          ''
          ].join(os.EOL);
      process.stdout.write(message);
    }

    if (options.lint && tbchanged) {
      process.exit(1);
    }

    process.exit(0);
  });
}

function processSTDIN() {
  getInputData.then(processInputData);
}

function processInputData(input) {
  comb.processString(input).catch(e => {
    process.stderr.write(e.message);
    process.exit(1);
  }).then(output => {
    process.stdout.write(output);
    process.exit(0);
  });
}
