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

if (options.fix && process.stdin.isTTY) {
  processFiles(options._);
} else if (options.fix) {
  processSTDIN();
} else if (process.stdin.isTTY) {
  lintFiles(options._);
} else {
  lintSTDIN();
}


function getOptions() {
  var parserOptions = {
    boolean: ['help', 'fix', 'verbose'],
    alias: {
      config: 'c',
      detect: 'd',
      fix: 'f',
      help: 'h',
      verbose: 'v'
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
    '    -f, --fix',
    '        Run the tool in fixer mode, modifying files when possible.',
    '    -h, --help',
    '        Display help message.',
    '    -v, --verbose',
    '        Whether to print logging info.'
  ];
  process.stdout.write(help.join('\n'));
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
    var tbchanged = c.filter(isChanged => {
      return isChanged !== undefined;
    }).reduce((a, b) => {
      return a + b;
    }, 0);

    if (config.verbose) {
      let message = [
          `${c.length} file${c.length === 1 ? '' : 's'} processed`,
          `${tbchanged} file${tbchanged === 1 ? '' : 's'} fixed`,
          ''
          ].join('\n');
      process.stdout.write(message);
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

function lintFiles(files) {
  let anyErrorsFound = false;

  const promises = files.map(file => {
    return comb.lintPath(file).then(errors => {
      if (!errors.length) {
        return;
      }

      anyErrorsFound = true;
      const message = formatErrors(file, errors);
      process.stdout.write(message);
    });
  });

  Promise.all(promises).catch(error => {
    process.stderr.write(error.message);
    process.exit(1);
  }).then(function() {
    if (anyErrorsFound) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
}

function formatErrors(fileName, errors) {
  let message = [];

  errors.forEach(error => {
    message.push(
        error.message + ' at ' + fileName + ':' + error.line,
        error.context,
        '',
        ''
        );
  });

  return message.join('\n');
}

function lintSTDIN() {
  getInputData.then(lintInputData);
}

function lintInputData(input) {
  comb.lintString(input).catch(e => {
    process.stderr.write(e.message);
    process.exit(1);
  }).then(output => {
    if (!output.length) {
      process.exit(0);
    } else {
      process.stdout.write(output);
      process.exit(1);
    }
  });
}
