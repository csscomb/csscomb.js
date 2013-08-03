/**
 * Starts Code Style checking process.
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
    this._excludes = null;
};

Comb.prototype = {

    /**
     * Loads configuration from JSON.
     *
     * @param {Object} config
     */
    configure: function(config) {
        for (var rule in config) {
            if (config.hasOwnProperty(rule) && this._rules[rule]) {
                this._config[rule] = config[rule];
            }
        }
    }

};

module.exports = Comb;
