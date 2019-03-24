'use strict';

if (!global._babelPolyfill)
  require('@babel/polyfill');

let fs = require('fs');
var os = require('os');
let gonzales = require('gonzales-pe');
let minimatch = require('minimatch');
let Errors = require('./errors');
let Plugin = require('./plugin');

let vow = require('vow');
let vfs = require('vow-fs');

class Comb {
  constructor() {
    this.config = {};
    this.exclude = [];
    // Whether lint mode is on.
    this.lint = false;
    // List of file paths that should be excluded from processing.
    this.pathsToExclude = null;
    // List of used plugins.
    this.plugins = [];
    this.pluginsDependencies = {};
    // List of supported syntaxes.
    this.supportedSyntaxes = new Set();
    // Mapping file extensions to syntax
    this.syntaxMap = new Map();
    // Whether verbose mode is on.
    this.verbose = false;
  }

  /**
   * Loads configuration from JSON.
   *
   * @param {!Object} config
   * @return {!Comb}
   */
  configure(config) {
    if (typeof config !== 'object')
      // TODO: throw error
      throw new Error();

    this.lint = config.lint;
    this.verbose = config.verbose;
    if (config.exclude)
      this.exclude = config.exclude.map(function(pattern) {
        return new minimatch.Minimatch(pattern);
      });

    if (config.syntax) {
      for (let key in config.syntax) {
        this.syntaxMap.set(key, config.syntax[key]);
      }
    }

    for (let i = 0, l = this.plugins.length; i < l; i++) {
      let plugin = this.plugins[i];
      let name = plugin.name;
      if (!config.hasOwnProperty(name)) continue;

      try {
        plugin.value = config[name];
        this.config[name] = plugin.value;
      } catch (e) {
        // TODO: throw error
      }
    }

    // Chaining.
    return this;
  }

  /**
   * Lints all files in a directory.
   *
   * @param {String} path
   * @returns {Promise}
   */
  lintDirectory(path) {
    let files = this._getAcceptableFilesFromDirectory(path);
    let promises = files.map((file) => this.lintFile(file));
    return Promise.all(promises);
  }

  /**
   * Lints a single file.
   *
   * @param {String} path
   * @returns {Promise}
   */
  lintFile(path) {
    let syntax = this._extractSyntax(path);
    return this._readFile(path).then((string) => {
      return this.lintString(string, {syntax: syntax, filename: path});
    });
  }

  /**
   * Lints a file or a directory.
   *
   * @param {String} path
   */
  lintPath(path) {
    path = path.replace(/\/$/, '');
    return fs.statSync(path).isDirectory() ?
      this.lintDirectory(path) :
      this.lintFile(path);
  }

  /**
   * Lints a string.
   *
   * @param {String} text
   * @param {{context: String, filename: String, syntax: String}} options
   * @returns {Promise} Resolves with <Array> list of found errors.
   */
  lintString(text, options) {
    return this._parseString(text, options)
      .then(this._lintTree.bind(this))
      .then(errors => {
        errors.forEach(error => {
          error.context = this._getContext(text, error.line);
        });

        return errors;
      });
  }

  _getContext(text, currentLineNumber) {
    var LINES_AROUND = 2;
    var result = [];
    var start = currentLineNumber - 1 - LINES_AROUND;
    var end = currentLineNumber + LINES_AROUND;
    var lines = text.split(/\r\n|\r|\n/);

    for (var i = start; i < end; i++) {
      var line = lines[i];
      if (!line) continue;
      var ln = i + 1;
      if (ln === currentLineNumber) {
        result.push(ln + '*| ' + line);
      } else {
        result.push(ln + ' | ' + line);
      }
    }
    return result.join(os.EOL);
  }

  /**
   * Processes directory recursively.
   *
   * @param {String} path
   * @returns {Promise}
   */
  processDirectory(path) {
    let that = this;

    return vfs.listDir(path).then(function(filenames) {
      return vow.all(filenames.map(function(filename) {
        let fullname = path + '/' + filename;
        return vfs.stat(fullname).then(function(stat) {
          if (stat.isDirectory() && that._shouldProcess(fullname)) {
            return that.processDirectory(fullname);
          } else {
            return that.processFile(fullname);
          }
        });
      })).then(function(results) {
        return [].concat.apply([], results);
      });
    });
  }

  /**
   * Processes single file.
   *
   * @param {String} path
   * @returns {Promise}
   */
  processFile(path) {
    let that = this;

    if (!this._shouldProcessFile(path)) return;

    return new Promise(resolve => {
      vfs.read(path, 'utf8').then(function(data) {
        let syntax = that._extractSyntax(path);
        that.processString(data, {
          syntax: syntax,
          filename: path
        }).then(function(processedData) {
          if (data === processedData) {
            if (that.verbose) console.log(' ', path);
            resolve(0);
            return;
          }

          let tick = that.lint ? '!' : '✓';
          if (that.lint) {
            if (that.verbose) console.log(tick, path);
            resolve(1);
          } else {
            return vfs.write(path, processedData, 'utf8').then(function() {
              if (that.verbose) console.log(tick, path);
              resolve(1);
            });
          }
        });
      });
    });
  }

  /**
   * Processes directory or file.
   *
   * @returns {Promise}
   */
  processPath(path) {
    let that = this;
    path = path.replace(/\/$/, '');

    return vfs.stat(path).then(function(stat) {
      if (stat.isDirectory()) {
        return that.processDirectory(path);
      } else {
        return that.processFile(path);
      }
    });
  }

  /**
   * Processes a string.
   *
   * @param {String} text
   * @param {{context: String, filename: String, syntax: String}} options
   * @returns {Promise<string>} Resolves in processed string
   */
  processString(text, options) {
    return this._parseString(text, options)
        .then(this._processTree.bind(this))
        .then((ast) => ast.toString());
  }

  /**
   * Add a plugin.
   * @param {Object} options
   * @return {Comb}
   */
  use(options) {
    // Check whether plugin with the same is already used.
    let pluginName = options.name;
    if (this._pluginAlreadyUsed(pluginName)) {
      if (this.verbose)
        console.warn(Errors.twoPluginsWithSameName(pluginName));
      return;
    }

    let plugin = new Plugin(options);

    plugin.syntax.forEach(function(s) {
      this.supportedSyntaxes.add(s);
    }, this);

    // Sort plugins.
    let pluginToRunBefore = plugin.runBefore;

    if (!pluginToRunBefore) {
      this.plugins.push(plugin);
    } else {
      if (this._pluginAlreadyUsed(pluginToRunBefore)) {
        let i = this._pluginIndex(pluginToRunBefore);
        this.plugins.splice(i, 0, plugin);
      } else {
        this.plugins.push(plugin);
        if (!this.pluginsDependencies[pluginToRunBefore])
          this.pluginsDependencies[pluginToRunBefore] = [];
        this.pluginsDependencies[pluginToRunBefore].push(pluginName);
      }
    }

    let dependents = this.pluginsDependencies[pluginName];
    if (!dependents) return this;

    for (let i = 0, l = dependents.length; i < l; i++) {
      let name = dependents[i];
      let x = this._pluginIndex(name);
      let plugin = this.plugins[x];
      this.plugins.splice(x, 1);
      this.plugins.splice(-1, 0, plugin);
    }

    // Chaining.
    return this;
  }

  _getAcceptableFilesFromDirectory(path) {
    if (!this._shouldProcess(path)) return;

    let files = [];
    let filesInThisDir = fs.readdirSync(path);

    for (let i = 0, fl = filesInThisDir.length; i < fl; i++) {
      let fullname = path + '/' + filesInThisDir[i];
      let stat = fs.statSync(fullname);
      if (stat.isDirectory() && this._shouldProcess(fullname))
        files = files.concat(this._getAcceptableFilesFromDirectory(fullname));
      else if (this._shouldProcessFile(fullname))
        files.push(fullname);
    }

    return files;
  }

  /**
   * @param {Node} ast
   * @param {String=} filename
   * @return {Array} List of errors.
   */
  _lintTree(ast, filename) {
    let errors = [];
    let config = this.config;

    this.plugins.filter(function(plugin) {
      return typeof plugin.value !== null &&
             typeof plugin.lint === 'function' &&
             plugin.syntax.indexOf(ast.syntax) !== -1;
    }).forEach(function(plugin) {
      let e = plugin.lint(ast, config);
      errors = errors.concat(e);
    });

    if (filename) {
      errors.map(function(error) {
        error.filename = filename;
        return error;
      });
    }

    return errors;
  }

  _parseString(text, options) {
    let syntax = options && options.syntax;
    let filename = options && options.filename || '';
    let context = options && options.context;
    let tree;
    const lint = this.lint;

    if (!text) return new Promise(function(resolve) {
      resolve(lint ? [] : text);
    });

    if (!syntax) syntax = 'css';
    this.syntax = syntax;

    return new Promise(function(resolve) {
      try {
        tree = gonzales.parse(text, {syntax: syntax, rule: context});
        resolve(tree, filename);
      } catch (e) {
        let version = require('../package.json').version;
        let message = filename ? [filename] : [];
        message.push(e.message);
        message.push('CSScomb Core version: ' + version);
        e.stack = e.message = message.join(os.EOL);
        throw e;
      }
    });
  }

  _pluginAlreadyUsed(name) {
    return this._pluginIndex(name) !== -1;
  }

  _pluginIndex(name) {
    let index = -1;
    this.plugins.some(function(plugin, i) {
      if (plugin.name === name) {
        index = i;
        return true;
      }
    });
    return index;
  }

  /**
   * @param {Node} ast
   * @return {Node} Transformed AST
   */
  _processTree(ast) {
    let config = this.config;

    this.plugins.filter(function(plugin) {
      return plugin.value !== null &&
             typeof plugin.process === 'function' &&
             plugin.syntax.indexOf(ast.syntax) !== -1;
    }).forEach(function(plugin) {
      plugin.process(ast, config);
    });

    return ast;
  }

  _readFile(path) {
    return new Promise((resolve, reject) => {
      if (!this._shouldProcessFile(path)) reject();

      fs.readFile(path, 'utf8', function(e, string) {
        if (e) reject();
        resolve(string);
      });
    });
  }

  /**
   * Checks if path is not present in `exclude` list.
   *
   * @param {String} path
   * @returns {Boolean} False if specified path is present in `exclude` list.
   * Otherwise returns true.
   */
  _shouldProcess(path) {
    path = path.replace(/\/$/, '');
    if (!fs.existsSync(path)) {
      console.warn('Path ' + path + ' was not found.');
      return false;
    }

    path = path.replace(/^\.\//, '');
    return this.exclude.every(function(e) {
      return !e.match(path);
    });
  }

  /**
   * Checks if specified path is not present in `exclude` list and it has one of
   * acceptable syntaxes.
   *
   * @param {String} path
   * @returns {Boolean} False if the path either has unacceptable extension or
   * is present in `exclude` list. True if everything is ok.
   */
  _shouldProcessFile(path) {
    // Get file's extension:
    var syntax = this._extractSyntax(path);

    // Check if syntax is supported. If not, ignore the file:
    if (!this.supportedSyntaxes.has(syntax))
      return false;

    return this._shouldProcess(path);
  }

  /**
   * Extract syntax by file path
   *
   * @param {String} path
   * @returns {String} syntax
   */
  _extractSyntax(path) {
    var extension = path.split('.').pop();

    return this.syntaxMap.get('.' + extension) || extension;
  }
}

module.exports = Comb;
