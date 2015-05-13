var Comb = require('csscomb-core');
var gonzales = require('gonzales-pe');
var fs = require('fs');
var path = require('path');

/**
 * Converts CSS string to AST.
 *
 * @param {String} text CSS string
 * @param {String} [syntax] Syntax name (e.g., `scss`)
 * @param {String} [filename]
 * @returns {Array} AST
 */
function cssToAST(text, syntax, filename) {
    var string = JSON.stringify;
    var fileInfo = filename ? ' at ' + filename : '';
    var tree;

    try {
        tree = gonzales.parse(text, { syntax: syntax });
    } catch (e) {
        throw new Error('Parsing error' + fileInfo + ': ' + e.message);
    }

    // TODO: When can tree be undefined? <tg>
    if (typeof tree === 'undefined') {
        throw new Error('Undefined tree' + fileInfo + ': ' + string(text) + ' => ' + string(tree));
    }

    return tree;
}

/**
 * Gets option's data needed for detection
 *
 * @param {String} optionName
 * @returns {Object} Object with option's name, link to `detect()` method
 * and default value for the case when nothing can be detected
 */
function getHandler(optionName) {
    var option = require('./options/' + optionName);
    if (!option.detect) throw new Error('Option does not have `detect()` method.');
    return {
        name: option.name,
        detect: option.detect,
        detectDefault: option.detectDefault
    };
}

/**
 * Processes tree node and detects options.
 *
 * @param {Array} node Tree node
 * @param {Number} level Indent level
 * @param {Object} handler Object with option's data
 * @param {Object} detectedOptions
 */
function detectInNode(node, level, handler, detectedOptions) {
    node.map(function(tree) {
        var detected = handler.detect(tree);
        var variants = detectedOptions[handler.name];
        if (typeof detected === 'object') {
            variants.push.apply(variants, detected);
        } else if (typeof detected !== 'undefined') {
            variants.push(detected);
        }

        //if (nodeType === 'atrulers' || nodeType === 'block') level++;
    });
}

/**
 * Processes tree and detects options.
 *
 * @param {Array} tree
 * @param {Array} handlers List of options that we should look for
 * @returns {Object} Map with detected options and all variants of possible
 * values
 */
function detectInTree(tree, handlers) {
    var detectedOptions = {};
    // We walk across complete tree for each handler,
    // because we need strictly maintain order in which handlers work,
    // despite fact that handlers work on different level of the tree.
    handlers.forEach(function(handler) {
        detectedOptions[handler.name] = [];
        // TODO: Pass all parameters as one object? <tg>
        detectInNode(tree, 0, handler, detectedOptions);
    });
    return detectedOptions;
}

/**
 * Gets the detected options.
 *
 * @param {Object} detected
 * @param {Array} handlers
 * @returns {Object}
 */
function getDetectedOptions(detected, handlers) {
    var options = {};
    Object.keys(detected).forEach(function(option) {
        // List of all the detected variants from the stylesheet for the given option:
        var values = detected[option];
        var i;
        if (!values.length) {
            // If there are no values for the option, check if there is a default one:
            for (i = handlers.length; i--;) {
                if (handlers[i].name === option &&
                    handlers[i].detectDefault !== undefined) {
                    options[option] = handlers[i].detectDefault;
                    break;
                }
            }
        } else if (values.length === 1) {
            options[option] = values[0];
        } else {
            // If there are more than one value for the option, find the most popular one;
            // `variants` would be populated with the popularity for different values.
            var variants = {};
            var bestGuess = null;
            var maximum = 0;
            for (i = values.length; i--;) {
                var currentValue = values[i];
                // Count the current value:
                if (variants[currentValue]) {
                    variants[currentValue]++;
                } else {
                    variants[currentValue] = 1;
                }
                // If the current variant is the most popular one, treat
                // it as the best guess:
                if (variants[currentValue] >= maximum) {
                    maximum = variants[currentValue];
                    bestGuess = currentValue;
                }
            }
            if (bestGuess !== null) {
                options[option] = bestGuess;
            }
        }
    });

    return options;
}

/**
 * Starts Code Style processing process.
 *
 * @param {String|Object} config
 * @constructor
 * @name CSScomb
 */
var CSScomb = function(config) {
    var options = fs.readdirSync(__dirname + '/options').map(function(option) {
        return require('./options/' + option);
    });

    var comb = new Comb(options, 'css', 'less', 'scss', 'sass');

    // If config was passed, configure:
    if (typeof config === 'string') {
        config = CSScomb.getConfig(config);
    }
    if (typeof config === 'object') {
        comb.configure(config);
    }

    return comb;
};

/**
 * STATIC METHODS
 * Methods that can be called without creating an instance:
 *   - getConfig;
 *   - getCustomConfig;
 *   - getCustomConfigPath;
 *   - detectInFile;
 *   - detectInString.
 * For example: `CSScomb.getConfig('zen')`
 */

/**
 * Gets one of configuration files from configs' directory.
 *
 * @param {String} name Config's name, e.g. 'yandex'
 * @returns {Object} Configuration object
 */
CSScomb.getConfig = function getConfig(name) {
    var DEFAULT_CONFIG_NAME = 'csscomb';
    name = name || DEFAULT_CONFIG_NAME;

    if (typeof name !== 'string') {
        throw new Error('Config name must be a string.');
    }

    var CONFIG_DIR_PATH = '../config';
    var availableConfigsNames = fs.readdirSync(__dirname + '/' + CONFIG_DIR_PATH)
        .map(function(configFileName) {
            return configFileName.split('.')[0];  // strip file extension(s)
        });

    if (availableConfigsNames.indexOf(name) < 0) {
        var configsNamesAsString = availableConfigsNames
            .map(function(configName) {
                return '\'' + configName + '\'';
            })
            .join(', ');
        throw new Error('"' + name + '" is not a valid config name. Try one of ' +
            'the following: ' + configsNamesAsString + '.');
    }

    return require(CONFIG_DIR_PATH + '/' + name + '.json');
};

/**
 * Gets configuration from provided config path or looks for it in common
 * places.
 *
 * @param {String} [configPath]
 * @returns {Object|null}
 */
CSScomb.getCustomConfig = function getCustomConfig(configPath) {
    var config;
    configPath = configPath || CSScomb.getCustomConfigPath();

    try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
        config = null;
    }

    return config;
};

/**
 * Looks for a config file: recursively from current (process) directory
 * up to $HOME dir
 * If no custom config file is found, return `null`.
 *
 * @param {String} [configPath]
 * @returns {String | null}
 */
CSScomb.getCustomConfigPath = function getCustomConfigPath(configPath) {
    var HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

    configPath = configPath || path.join(process.cwd(), '.csscomb.json');

    // If we've finally found a config, return its path:
    if (fs.existsSync(configPath)) return fs.realpathSync(configPath);

    // If we are in HOME dir already and yet no config file, return a default
    // one from our package.
    // If project is located not under HOME, compare to root instead.
    // Since there appears to be no good way to get root path in
    // Windows, assume that if current dir has no parent dir, we're in
    // root.
    var dirname = path.dirname(configPath);
    var parentDirname = path.dirname(dirname);
    if (dirname === HOME || dirname === parentDirname) return null;

    // If there is no config in this directory, go one level up and look for
    // a config there:
    configPath = path.join(parentDirname, '.csscomb.json');
    return CSScomb.getCustomConfigPath(configPath);
};

/**
 * Detects the options in the given file
 *
 * @param {String} path Path to the stylesheet
 * @param {Array} options List of options to detect
 * @returns {Object} Detected options
 */
CSScomb.detectInFile = function detectInFile(path, options) {
    var stylesheet = fs.readFileSync(path, 'utf8');
    return CSScomb.detectInString(stylesheet, options);
};

/**
 * Detects the options in the given string
 *
 * @param {String} text Stylesheet
 * @param {Array} options List of options to detect
 * @returns {Object} Detected options
 */
CSScomb.detectInString = function detectInString(text, options) {
    var result;
    var handlers = [];

    if (!text) return text;

    var optionNames = fs.readdirSync(__dirname + '/options');
    optionNames.forEach(function(option) {
        option = option.slice(0, -3);
        if (options && options.indexOf(option) < 0) return;
        try {
            handlers.push(getHandler(option));
        } catch (e) {
            console.warn('\nFailed to load "%s" option:\n%s', option, e.message);
        }
    });

    var tree = cssToAST(text);
    var detectedOptions = detectInTree(tree, handlers);
    result = getDetectedOptions(detectedOptions, handlers);

    // Handle conflicting options with spaces around braces:
    var blockIndent = result['block-indent'];
    var spaceAfterOpeningBrace = result['space-after-opening-brace'];

    if (typeof blockIndent === 'string' &&
        spaceAfterOpeningBrace &&
        spaceAfterOpeningBrace.indexOf('\n') > -1) {
        result['space-after-opening-brace'] = '\n';
    }

    return result;
};

module.exports = CSScomb;
