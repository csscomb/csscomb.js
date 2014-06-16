var gonzales = require('gonzales-pe');
var minimatch = require('minimatch');
var vow = require('vow');
var fs = require('fs');
var vfs = require('vow-fs');

// Names of supported options in exact order they should be processed:
var OPTIONS = [
    'remove-empty-rulesets',
    'always-semicolon',
    'color-case',
    'color-shorthand',
    'element-case',
    'leading-zero',
    'quotes',
    'strip-spaces',
    'eof-newline',
    'space-after-combinator',
    'space-before-combinator',
    'space-before-colon',
    'space-after-colon',
    'space-before-opening-brace',
    'space-after-opening-brace',
    'space-before-selector-delimiter',
    'space-after-selector-delimiter',
    'space-after-declaration',
    'block-indent',
    'sort-order-fallback',
    'sort-order',
    'space-before-closing-brace',
    'tab-size',
    'unitless-zero',
    'vendor-prefix-align'
];
// Names of options that are not supported in Sass:
var NON_SASS_OPTIONS = [
    'always-semicolon',
    'space-before-opening-brace',
    'space-after-opening-brace',
    'space-before-closing-brace',
    'space-after-declaration'
];
// Function for parsing CSS using Gonzales:
var cssToAST;

/**
 * Starts Code Style processing process.
 *
 * @param {String|Object} config
 * @constructor
 * @name Comb
 */
var Comb = function(config) {
    var _this = this;
    // List of file paths that should be excluded from processing:
    var exclude;
    // List of configured options with values:
    var configuredOptions;
    // List of handlers:
    var handlers;
    // Whether lint mode is on:
    var lint;
    // Whether verbose mode is on:
    var verbose;

    /**
     * PRIVATE METHODS
     */

    /**
     * Adds an option to list of configured options.
     *
     * @param {String} optionName Option's name (equal to file's name)
     * @param {Object|undefined} value Value that should be set for the option
     * @returns {Object} Object with option's name, value and link to
     * `process()` method
     */
    function addHandler(optionName, value) {
        var option = require('./options/' + optionName);
        value = option.setValue ? option.setValue(value) : setValue(option.accepts, value);
        handlers.push(option);
        configuredOptions[option.name] = value;
    }

    /**
     * Processes value and checks if it is acceptable by the option.
     *
     * @param {Object} acceptableValues Map of value types that are acceptable
     * by option. If `string` property is present, its value is a regular
     * expression that is used to validate value passed to the function.
     * @param {Object|undefined} value
     * @returns {Boolean|String} Valid option's value
     */
    function setValue(acceptableValues, value) {
        if (!acceptableValues) throw new Error('Option\'s module must either' +
            ' implement `setValue()` method or provide `accepts` object' +
            ' with acceptable values.');

        var valueType = typeof value;
        var pattern = acceptableValues[valueType];

        if (!pattern) throw new Error('The option does not accept values of type "' +
            valueType + '".\nValue\'s type must be one the following: ' +
            Object.keys(acceptableValues).join(', ') + '.');

        switch (valueType) {
            case 'boolean':
                if (pattern.indexOf(value) < 0) throw new Error(' Value must be ' +
                    'one of the following: ' + pattern.join(', ') + '.');
                return value;
            case 'number':
                if (value !== parseInt(value)) throw new Error('Value must be an integer.');
                return new Array(value + 1).join(' ');
            case 'string':
                if (!value.match(pattern)) throw new Error('Value must match pattern ' +
                    pattern + '.');
                return value;
            default:
                throw new Error('If you see this message and you are not' +
                    ' a developer adding a new option, please open an issue here:' +
                    ' https://github.com/csscomb/csscomb.js/issues/new' +
                    '\nFor option to accept values of type "' + valueType +
                    '" you need to implement custom `setValue()` method. See' +
                    ' `lib/options/sort-order.js` for example.');
        }
    }

    /**
     * Checks if path is present in `exclude` list.
     *
     * @param {String} path
     * @returns {Boolean} False if specified path is present in `exclude` list.
     * Otherwise returns true.
     */
    function shouldProcess(path) {
        path = path.replace(/^\.\//, '');
        for (var i = exclude.length; i--;) {
            if (exclude[i].match(path)) return false;
        }
        return true;
    }

    /**
     * Checks if specified path is not present in `exclude` list and it has one of
     * acceptable extensions.
     *
     * @param {String} path
     * @returns {Boolean} False if the path either has unacceptable extension or
     * is present in `exclude` list. True if everything is ok.
     */
    function shouldProcessFile(path) {
        var supportedSyntaxes = ['css', 'scss', 'sass', 'less'];
        // Get file's extension:
        var syntax = path.split('.').pop();

        // Check if syntax is supported. If not, ignore the file:
        if (supportedSyntaxes.indexOf(syntax) < 0) {
            return false;
        }
        return shouldProcess(path);
    }

    /**
     * Processes stylesheet tree node.
     *
     * @param {Array} tree Parsed tree
     * @returns {Array} Modified tree
     */
    function processTree(tree) {
        var _handlers;

        _handlers = handlers.filter(function(handler) {
            return _this.getSyntax() !== 'sass' ||
                NON_SASS_OPTIONS.indexOf(handler.name) < 0;
        }).map(function(handler) {
            return handler.process;
        });

        // We walk across complete tree for each handler,
        // because we need strictly maintain order in which handlers work,
        // despite fact that handlers work on different level of the tree.
        _handlers.forEach(function(handler) {
            processNode(['tree', tree], 0, handler);
        });
        return tree;
    }

    /**
     * Processes tree node.
     *
     * @param {Array} node Tree node
     * @param {Number} level Indent level
     * @param {Object} handler Option's handler
     */
    function processNode(node, level, handler) {
        node.forEach(function(node) {
            if (!Array.isArray(node)) return;

            var nodeType = node.shift();
            handler.call(_this, nodeType, node, level);
            node.unshift(nodeType);

            if (nodeType === 'atrulers' || nodeType === 'block') level++;

            processNode(node, level, handler);
        });
    }

    /**
     * PUBLIC INSTANCE METHODS
     * Methods that depend on certain instance variables, e.g. configuration:
     *   - configure;
     *   - getValue;
     *   - getSyntax;
     *   - processPath;
     *   - processDirectory;
     *   - processFile;
     *   - processString;
     */

    /**
     * Loads configuration from JSON.
     * Activates and configures required options.
     *
     * @param {Object} config
     * @returns {Object} Comb's object (that makes the method chainable).
     */
    this.configure = function configure(config) {
        handlers = [];
        configuredOptions = {};
        verbose = config.verbose;
        lint = config.lint;
        exclude = (config.exclude || []).map(function(pattern) {
            return new minimatch.Minimatch(pattern);
        });

        OPTIONS.forEach(function(option) {
            if (config[option] === undefined) return;
            try {
                addHandler(option, config[option]);
            } catch (e) {
                // Show warnings about illegal config values only in verbose mode:
                if (verbose) {
                    console.warn('\nFailed to configure "%s" option:\n%s', option, e.message);
                }
            }
        });

        return this;
    };

    /**
     * Gets option's value.
     *
     * @param {String} optionName
     * @returns {String|Boolean|undefined}
     */
    this.getValue = function getValue(optionName) {
        return configuredOptions[optionName];
    };

    this.getSyntax = function getSyntax() {
        return _this.syntax;
    };

    /**
     * Processes directory or file.
     *
     * @param {String} path
     * @returns {Promise}
     */
    this.processPath = function processPath(path) {
        path = path.replace(/\/$/, '');

        return vfs.exists(path).then(function(exists) {
            if (!exists) {
                console.warn('Path ' + path + ' was not found.');
                return;
            }
            return vfs.stat(path).then(function(stat) {
                if (stat.isDirectory()) {
                    return _this.processDirectory(path);
                } else {
                    return _this.processFile(path);
                }
            });
        });
    };

    /**
     * Processes directory recursively.
     *
     * @param {String} path
     * @returns {Promise}
     */
    this.processDirectory = function processDirectory(path) {
        return vfs.listDir(path).then(function(filenames) {
            return vow.all(filenames.map(function(filename) {
                var fullname = path + '/' + filename;
                return vfs.stat(fullname).then(function(stat) {
                    if (stat.isDirectory()) {
                        return shouldProcess(fullname) && _this.processDirectory(fullname);
                    } else {
                        return _this.processFile(fullname);
                    }
                });
            })).then(function(results) {
                return [].concat.apply([], results);
            });
        });
    };

    /**
     * Processes single file.
     *
     * @param {String} path
     * @returns {Promise}
     */
    this.processFile = function processFile(path) {
        if (!shouldProcessFile(path)) return;
        return vfs.read(path, 'utf8').then(function(data) {
            var syntax = path.split('.').pop();
            var processedData = _this.processString(data, syntax, path);
            var isChanged = data !== processedData;

            var tick = isChanged ? (lint ? '!' : '✓') : ' ';
            var output = function() {
                if (verbose) console.log(tick, path);
                return isChanged ? 1 : 0;
            };

            if (!isChanged || lint) {
                return output();
            } else {
                return vfs.write(path, processedData, 'utf8').then(output);
            }
        });
    };

    /**
     * Processes a string.
     *
     * @param {String} text
     * @param {String} [syntax] Syntax name (e.g. `scss`)
     * @param {String} [filename]
     * @returns {String} Processed string
     */
    this.processString = function processString(text, syntax, filename) {
        if (!text) return text;
        _this.syntax = syntax;
        var tree = cssToAST(text, syntax, filename);
        tree = processTree(tree);
        return gonzales.astToCSS({ syntax: syntax, ast: tree });
    };

    // If config was passed, configure:
    if (typeof config === 'string') {
        config = Comb.getConfig(config);
    }
    if (typeof config === 'object') {
        this.configure(config);
    }
};

/**
 * STATIC METHODS
 * Methods that can be called without creating an instance:
 *   - getConfig;
 *   - detectInFile;
 *   - detectInString.
 * For example: `Comb.getConfig('zen')`
 */
(function() {
    /**
     * Gets one of configuration files from `config` directory.
     *
     * @param {String} name Config's name: 'csscomb', 'zen' or 'yandex'
     * @returns {Object} Configuration object
     */
    Comb.getConfig = function getConfig(name) {
        // Names of predefined configs:
        var CONFIGS = ['csscomb', 'zen', 'yandex'];
        name = name || 'csscomb';

        if (typeof name !== 'string') {
            throw new Error('Config name must be a string.');
        }

        if (CONFIGS.indexOf(name) < 0) {
            throw new Error('"' + name + '" is not a valid config name. Try one of ' +
                'the following: \'csscomb\', \'zen\' or \'yandex\'.');
        }

        return require('../config/' + name + '.json');
    };

    /**
     * Detects the options in the given file
     *
     * @param {String} path Path to the stylesheet
     * @param {Array} options List of options to detect
     * @returns {Object} Detected options
     */
    Comb.detectInFile = function detectInFile(path, options) {
        var stylesheet = fs.readFileSync(path, 'utf8');
        return Comb.detectInString(stylesheet, options);
    };

    /**
     * Detects the options in the given string
     *
     * @param {String} text Stylesheet
     * @param {Array} options List of options to detect
     * @returns {Object} Detected options
     */
    Comb.detectInString = function detectInString(text, options) {
        var result;
        var handlers = [];

        if (!text) return text;

        OPTIONS.forEach(function(option) {
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

    /**
     * Converts CSS string to AST.
     *
     * @param {String} text CSS string
     * @param {String} [syntax] Syntax name (e.g., `scss`)
     * @param {String} [filename]
     * @returns {Array} AST
     */
    cssToAST = function cssToAST(text, syntax, filename) {
        var string = JSON.stringify;
        var fileInfo = filename ? ' at ' + filename : '';
        var tree;

        try {
            tree = gonzales.cssToAST({ syntax: syntax, css: text });
        } catch (e) {
            throw new Error('Parsing error' + fileInfo + ': ' + e.message);
        }

        // TODO: When can tree be undefined? <tg>
        if (typeof tree === 'undefined') {
            throw new Error('Undefined tree' + fileInfo + ': ' + string(text) + ' => ' + string(tree));
        }

        return tree;
    };

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
            detectInNode(['tree', tree], 0, handler, detectedOptions);
        });
        return detectedOptions;
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
        node.forEach(function(node) {
            if (!Array.isArray(node)) return;

            var nodeType = node.shift();
            var detected = handler.detect(nodeType, node, level);
            var variants = detectedOptions[handler.name];
            if (typeof detected === 'object') {
                variants.push.apply(variants, detected);
            } else if (typeof detected !== 'undefined') {
                variants.push(detected);
            }
            node.unshift(nodeType);

            if (nodeType === 'atrulers' || nodeType === 'block') level++;

            detectInNode(node, level, handler, detectedOptions);
        });
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
})();

module.exports = Comb;
