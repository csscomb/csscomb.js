'use strict';

/**
 * Command line implementation for CSSComb
 *
 * Usage example:
 * ./node_modules/.bin/csscomb [options] [file1 [dir1 [fileN [dirN]]]]
 */
var format = require('./format');
var fs = require('fs');
var parseArgs = require('minimist');
var path = require('path');
var vow = require('vow');
var Comb = require('./csscomb');
var comb = new Comb();

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
    '    -f, --fix',
    '        Run the tool in fixer mode, modifying files when possible.',
    '    -v, --verbose',
    '        Whether to print logging info.'
  ];
  console.log(help.join('\n'));
}

var getInputData = new vow.Promise(function(resolve) {
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

function processInputData(input) {
  comb.lintString(input).catch(e => {
    process.stderr.write(e.message);
    process.exit(1);
  }).then(output => {
    process.stdout.write(output);
    process.exit(0);
  });
}

function processSTDIN() {
  getInputData.then(processInputData);
}

function processFiles(files, config) {
  const promises = files.map(file => {
    return comb.lintPath(file);
  });

  Promise.all(promises).catch(error => {
    process.stderr.write(error.message);
    process.exit(1);
  }).then(function(c) {
    console.log(c);
    process.exit(0);
  });
}

function getOptions() {
  var parserOptions = {
    boolean: ['verbose', 'lint'],
    alias: {
      config: 'c',
      detect: 'd',
      lint: 'l',
      verbose: 'v'
    }
  };
  return parseArgs(process.argv.slice(2), parserOptions);
}

function applyTemplate(config) {
  if (!config.template) return;

  if (!fs.existsSync(config.template)) {
    let message = `Template configuration file ${config.template}
                   was not found.`;
    process.stderr.write(format(message));
    process.exit(1);
  }

  var templateConfig = Comb.detectInFile(config.template);
  for (var attrname in templateConfig) {
    if (templateConfig.hasOwnProperty(attrname) && !config[attrname]) {
      config[attrname] = templateConfig[attrname];
    }
  }
}

function getConfig(options) {
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
    let message = `Error parsing configuration file ${configPath}.`;
    process.stderr.write(format(message));
    process.exit(1);
  }

  applyTemplate(config);
  if (options.verbose) config.verbose = options.verbose;

  return config;
}

function detectConfig(file) {
  var config = Comb.detectInFile(file);
  config = JSON.stringify(config, false, 4);
  process.stdout.write(config);
  process.exit(0);
}

console.time('Time spent');

var options = getOptions();

if (options.help) {
  displayHelp();
  process.exit(0);
}

if (options.detect) {
  detectConfig(options.detect);
}

var config = getConfig(options);
comb.configure(config);

if (process.stdin.isTTY) {
  processFiles(options._, config);
} else {
  processSTDIN();
}
