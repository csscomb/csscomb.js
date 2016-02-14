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
  try {
    process.stdout.write(comb.processString(input));
    process.exit(0);
  } catch (e) {
    process.stderr.write(e.message);
    process.exit(1);
  }
}

function processSTDIN() {
  getInputData.then(processInputData);
}

function processFiles(files, config) {
  vow.all(files.map(comb.processPath.bind(comb))).then(function(c) {
    c = c.filter(function(isChanged) {
      return isChanged !== undefined;
    });

    var tbchanged = c.reduce(function(a, b) {
      return a + b;
    }, 0);

    var changed = config.lint ? 0 : tbchanged;

    if (config.verbose) {
      let message = `\n
          ${c.length} file${c.length === 1 ? '' : 's'} processed\n
          ${changed} file${changed === 1 ? '' : 's'} fixed\n`;
      process.stdout.write(format(message));
      console.timeEnd('Time spent');
    }

    if (config.lint && tbchanged) {
      process.exit(1);
    }

    process.exit(0);
  }).fail(function(e) {
    process.stderr.write(e.stack);
    process.exit(1);
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
  if (options.lint) config.lint = options.lint;

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
