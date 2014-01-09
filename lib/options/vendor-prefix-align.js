module.exports = {

    /**
     * Internal
     *
     * Containt vendor-prefixes list.
     */
    _prefixesList: [
        'webkit',
        'moz',
        'ms',
        'o'
    ],

    /**
     * Internal
     *
     * Make namespace from property name
     * @param {String} propertyName
     * @returns {String|undefined}
     */
    _makeNamespace: function(propertyName) {
        var info = this._getPrefixInfo(propertyName);
        return info && info.baseName;
    },

    /**
     * Internal
     *
     * Create object which contains info about vendor prefix used in propertyName.
     * @param {String} propertyName property name
     * @returns {Object|undefined}
     */
    _getPrefixInfo: function(propertyName, namespace) {
        var baseName = propertyName;
        var prefixLength = 0;

        namespace = namespace || '';

        if (!propertyName) return;

        this._prefixesList.some(function(prefix) {
            prefix = '-' + prefix + '-';
            if (propertyName.indexOf(prefix) !== 0) return;

            baseName = baseName.substr(prefix.length);
            prefixLength = prefix.length;

            return true;
        });

        return {
            id: namespace + baseName,
            baseName: baseName,
            prefixLength: prefixLength
        };
    },

    /**
     * Internal
     *
     * Walk across nodes, and call payload for every node that pass selector check.
     * @param {node} node
     * @param {function} selector
     * @param {function} payload
     */
    _walk: function(node, selector, payload, namespaceSelector) {
        node.forEach(function(item, i) {
            var info = this._getPrefixInfo(
                selector(item),
                namespaceSelector && this._makeNamespace(namespaceSelector(item))
            );
            if (!info) return;
            payload(info, i);
        }, this);
    },

    /**
     * Internal
     *
     * Return property name.
     * e.g.
     * for: 'color: #fff'
     * returns string: 'color'
     * @param {node} node
     * @returns {String|undefined}
     */
    _getDeclName: function(node) {
        if (node[0] !== 'declaration') return;
        // TODO: Check that it's not a variable
        return node[1][1][1];
    },

    /**
     * Internal
     *
     * Return property value name.
     * e.g.
     * for: '-webkit-transition: -webkit-transform 150ms linear'
     * returns string: '-webkit-transform', and
     * for: 'background: -webkit-linear-gradient(...)'
     * returns string: '-webkit-linear-gradient'
     * @param {node} node
     * @returns {String|undefined}
     */
    _getValName: function(node) {
        // TODO: Check that `node[3]` is the node we need
        if (node[0] !== 'declaration' || !node[3] || !node[3][2])
            return;
        if (node[3][2] && node[3][2][0] === 'ident')
            return node[3][2][1];
        if (node[3][2] && node[3][2][0] === 'function')
            return node[3][2][1][1];
    },

    /**
     * Internal
     *
     * Update dict which contains info about items align.
     * @param {Object} info,
     * @param {Object} dict,
     * @param {String} whitespaceNode
     */
    _updateDict: function(info, dict, whitespaceNode) {
        if (info.prefixLength === 0) return;

        var indent = dict[info.id] || { prefixLength: 0, baseLength: 0 };

        dict[info.id] = indent.prefixLength > info.prefixLength ?
        indent :
        {
            prefixLength: info.prefixLength,
            baseLength: whitespaceNode.substr(whitespaceNode.lastIndexOf('\n') + 1).length
        };
    },

    /**
     * Return string with correct number of spaces for info.baseName property.
     * @param {Object} info,
     * @param {Object} dict,
     * @param {String} whitespaceNode
     * @returns {String}
     */
    _updateIndent: function(info, dict, whitespaceNode) {
        var item = dict[info.id];
        if (!item)
            return whitespaceNode;

        var firstPart = whitespaceNode.substr(0, whitespaceNode.lastIndexOf('\n') + 1 );
        var extraIndent = new Array(
            item.prefixLength -
            info.prefixLength +
        item.baseLength + 1).join(' ');

        return firstPart.concat(extraIndent);
    },

    /**
     * Sets handler value.
     *
     * @param {Array} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        return value ? this : undefined;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType !== 'block') return;

        var dict = {};
        var _this = this;

        // Gathering Info
        this._walk(node, this._getDeclName, function(info, i) {
            _this._updateDict(info, dict, node[i - 1][1]);
        });
        this._walk(node, this._getValName, function(info, i) {
            _this._updateDict(info, dict, node[i][3][1][1]);
        }, this._getDeclName);

        // Update nodes
        this._walk(node, this._getDeclName, function(info, i) {
            node[i - 1][1] = _this._updateIndent(info, dict, node[i - 1][1]);
        });
        this._walk(node, this._getValName, function(info, i) {
            node[i][3][1][1] = _this._updateIndent(info, dict, node[i][3][1][1]);
        }, this._getDeclName );

    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        if (nodeType !== 'block') return;

        var result = {
                true: 0,
                false: 0
            };

        var maybePrefix = false;
        var prevPrefixLength = false;
        var prevProp;
        var prevSum;
        var partialResult = null;

        var getResult = function(node, sum, info, i) {
            var prop = info.baseName;

            // If this is the last item in a row and we have a result, then catch it
            if (prop !== prevProp && partialResult !== null) {
                if (partialResult) {
                    result.true++;
                } else {
                    result.false++;
                }
                partialResult = null;
            }

            if (prop === prevProp && info.prefixLength !== prevPrefixLength) {
                maybePrefix = true;
            } else {
                maybePrefix = false;
            }

            if (maybePrefix && partialResult !== false) {
                // If there is prefixed prop, check if the prefixes are aligned,
                // but only if we hadn't already catched that it is false
                if (sum === prevSum) {
                    partialResult = true;
                } else {
                    partialResult = false;
                }
            }

            if (node.length === i + 3 && partialResult !== null) {
                // If we're at the last property and have a result, catch it
                if (partialResult) {
                    result.true++;
                } else {
                    result.false++;
                }
            }

            prevPrefixLength = info.prefixLength;
            prevProp = prop;
            prevSum = sum;
        };

        // Gathering Info
        this._walk(node, this._getDeclName, function(info, i) {
            if (node[i - 1]) {
                var sum = node[i - 1][1].replace(/^[ \t]*\n+/, '').length + info.prefixLength;
                getResult(node, sum, info, i);
            }
        });

        this._walk(node, this._getValName, function(info, i) {
            if (node[i][3][1]) {
                var sum = node[i][3][1][1].replace(/^[ \t]*\n+/, '').length + info.prefixLength;
                getResult(node, sum, info, i);
            }
        });

        if (result.true > 0 || result.false > 0) {
            if (result.true >= result.false) {
                return true;
            } else {
                return false;
            }
        }
    }
};
