var cssp = require('cssp');
var minimatch = require('minimatch');
var vow = require('vow');
var vfs = require('vow-fs');

/**
 * Starts Code Style processing process.
 *
 * @name Comb
 */
var Comb = function() {
    this._handlers;
    this._options = [
        'strip-spaces',
        'stick-brace',
        'colon-space',
        'rule-indent',
        'sort-order'
    ];
    this._config = {};
    this._exclude = null;
};

Comb.prototype = {

    /**
     * Loads configuration from JSON.
     * Activates and configures required options.
     *
     * @param {Object} config
     */
    configure: function(config) {
        var _this = this;
        this._handlers = [];
        this._options.forEach(function(option) {
            if (config[option]) {
                try {
                    var handler = require('./options/' + option).setValue(config[option]);
                    handler && _this._handlers.push(handler);
                } catch (e) {
                    throw new Error('Handler ' + option + ' was not found.');
                }
            }
        });
        this._exclude = (config.exclude || []).map(function(pattern) {
            return new minimatch.Minimatch(pattern);
        });
    },

    /**
     * Processes stylesheet tree node.
     *
     * @param {Array} tree Parsed tree
     * @returns {Array}
     */
    processTree: function(tree) {
        this.processNode(['tree', tree]);
        return tree;
    },

    /**
     * Processes tree node.
     * @param {Array} node Tree node
     */
    processNode: function(node, level) {
        var _this = this;
        var config = this._config;
        node.forEach(function(node) {
            if (!Array.isArray(node)) return;
            var nodeType = node.shift();
            _this._handlers.forEach(function(handler) {
                handler.process(nodeType, node);
            });
            node.unshift(nodeType);
            _this.processNode(node, level);
        });
    },

    /**
     * Process file provided with a string.
     * @param {String} text
     * @param {String} filename
     */
    processString: function(text, filename) {
        var tree;
        try {
            tree = this.processTree(cssp.parse(text));
        } catch (e) {
            throw new Error('Parsing error at ' + filename + ': ' + e.message);
        }
        return cssp.translate(tree);
    },

    /**
     * Process single file.
     *
     * @param {String} path
     * @returns {Promise}
     */
    processFile: function(path) {
        var _this = this;
        if (this._shouldProcess(path) && path.match(/\.css$/)) {
            return vfs.read(path, 'utf8').then(function(data) {
                return vfs.write(path, _this.processString(data, path), 'utf8');
            });
        }
        return null;
    },

    /**
     * Process directory recursively.
     *
     * @param {String} path
     * @returns {Promise}
     */
    processDirectory: function(path) {
        var _this = this;
        return vfs.listDir(path).then(function(filenames) {
            return vow.all(filenames.map(function(filename) {
                var fullname = path + '/' + filename;
                return vfs.stat(fullname).then(function(stat) {
                    if (_this._shouldProcess(fullname)) {
                        if (stat.isDirectory()) {
                            return _this.processDirectory(fullname);
                        } else if (fullname.match(/\.css$/)) {
                            return vow.when(_this.processFile(fullname)).then(function(errors) {
                                if (errors) return errors;
                            });
                        }
                    }
                    return;
                });
            })).then(function(results) {
                return [].concat.apply([], results);
            });
        });
    },

    /**
     * Processs directory or file.
     *
     * @param {String} path
     */
    processPath: function(path) {
        path = path.replace(/\/$/, '');
        var _this = this;
        return vfs.exists(path).then(function(exists) {
            if (exists) {
                return vfs.stat(path).then(function(stat) {
                    if (stat.isDirectory()) {
                        return _this.processDirectory(path);
                    } else {
                        return vow.when(_this.processFile(path)).then(function(errors) {
                            if (errors) return [errors];
                            return;
                        });
                    }
                });
            } else {
                throw new Error('Path ' + path + ' was not found.');
            }
        });
    },

    /**
     * Returns true if specified path is not in exluded list.
     *
     * @returns {Boolean}
     */
    _shouldProcess: function(path) {
        path = path.replace(/^\.\//, '');
        var exclude = this._exclude;
        for (var i = exclude.length; i--;) {
            if (exclude[i].match(path)) return false;
        }
        return true;
    }

};

module.exports = Comb;
