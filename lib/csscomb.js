var cssp = require('cssp');
var minimatch = require('minimatch');
var vow = require('vow');
var vowFs = require('vow-fs');

/**
 * Starts Code Style processing process.
 *
 * @name Comb
 */
var Comb = function() {
    this._rules = {
        'colon-space': {},
        'rule-indent': {},
        'stick-brace': {},
        'sort-order': {}
    },
    this._config = {};
    this._exclude = null;
};

Comb.prototype = {

    /**
     * Loads configuration from JSON.
     * Activates and configures required rules.
     *
     * @param {Object} config
     */
    configure: function(config) {
        for (var rule in config) {
            if (config.hasOwnProperty(rule) && this._rules[rule]) {
                this._config[rule] = config[rule];
            }
        }
        this._exclude = (config.exclude || []).map(function(pattern) {
            return new minimatch.Minimatch(pattern);
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
            tree = cssp.parse(text);
        } catch (e) {
            throw new Error('Parsing error at ' + filename + ': ' + e.message);
        }
        text = cssp.translate(cssp.transform(tree));
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
            return vowFs.read(path, 'utf8').then(function(data) {
                return _this.processString(data, path);
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
        return vowFs.listDir(path).then(function(filenames) {
            return vow.all(filenames.map(function(filename) {
                var fullname = path + '/' + filename;
                return vowFs.stat(fullname).then(function(stat) {
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
        return vowFs.exists(path).then(function(exists) {
            if (exists) {
                return vowFs.stat(path).then(function(stat) {
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
