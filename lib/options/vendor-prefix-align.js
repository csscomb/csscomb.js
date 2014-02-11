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
     * @param {String} [namespace=''] namespace name
     * @param {Number} [extraSymbols=0] extra symbols count
     * @returns {Object|undefined}
     */
    _getPrefixInfo: function(propertyName, namespace, extraSymbols) {
        var baseName = propertyName;
        var prefixLength = 0;

        namespace = namespace || '';
        extraSymbols = extraSymbols || 0;

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
            prefixLength: prefixLength,
            extra: extraSymbols
        };
    },
    /**
     * Internal
     *
     * Return extra indent for item in arguments
     * @param {Array} nodes nodes to process
     * @returns {Number|undefined}
     */
    _extraIndent: function(nodes) {
        if (!nodes || !nodes.length) return;

        var i = nodes.length;
        var node;
        var crPos;
        var result = 0;

        while (i--) {
            node = nodes[i];

            if (!Array.isArray(node))
                continue;

            crPos = node[1].lastIndexOf('\n');

            if (crPos !== -1)
                this.oneline = false;

            if (node[0] === 's') {
                result += node[1].length - crPos - 1;
                if (crPos !== -1)
                    break;
            }
            if (node[0] === 'commentML') {
                if (crPos === -1) {
                    result += node[1].length + 4 /* comment symbols length */ ;
                } else {
                    result += node[1].length - crPos + 1 /* only last comment symbols length - 1(not count \n)*/;
                    break;
                }
            }
        }

        return result;

    },
    /**
     * Wrapper for extra indent function for decl-node
     * @param {Array} nodes all nodes
     * @param {Number} i position in nodes array
     */
    _extraIndentDecl: function(nodes, i) {
        var subset = [];
        while (i--) {
            if (!nodes[i] || nodes[i][0] === 'declDelim')
                break;
            subset.unshift(nodes[i]);
        }
        return this._extraIndent(subset);
    },
    /**
     * Wrapper for extra indent function for val-node
     * @param {Array} nodes all nodes
     * @param {Number} i position in nodes array
     */
    _extraIndentVal: function(nodes, i) {
        var node = nodes[i];
        var subset = [];

        for (i = 0; i < node[3].length; ++ i) {
            if (node[3][i][0] === 'ident')
                break;
            subset.push(node[3][i]);
        }
        return this._extraIndent(subset);
    },

    /**
     * Internal
     *
     * Walk across nodes, and call payload for every node that pass selector check.
     * @param {Object} args arguments in form of:
     *  {
     *      node: {object} current node,
     *      selector: {function} propertyName selector
     *      payload: {function} work to do with gathered info
     *      namespaceSelector: {function} selector for namespace
     *      getExtraSymbols: {Number} extra symbols count
     *  }
     */
    _walk: function(args) {
        args.node.forEach(function(item, i) {
            var name = args.selector(item);
            var info = name && this._getPrefixInfo(
                name,
                args.namespaceSelector && this._makeNamespace(args.namespaceSelector(item)),
                args.getExtraSymbols.apply(this, [args.node, i])
            );
            if (!info) return;
            args.payload(info, i);
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
     * @param {node} nodes
     * @returns {String|undefined}
     */
    _getValName: function(nodes) {
        // TODO: Check that `nodes[3]` is the node we need
        if (nodes[0] !== 'declaration' || !nodes[3])
            return;

        for (var i = 0; i < nodes[3].length; ++i) {
            var node = nodes[3][i];
            if (node && node[0] === 'ident')
                return node[1];
            if (node && node[0] === 'function')
                return node[1][1];
        }

    },

    /**
     * Internal
     *
     * Update dict which contains info about items align.
     * @param {Object} info,
     * @param {Object} dict,
     */
    _updateDict: function(info, dict) {
        if (info.prefixLength === 0 && info.extra === 0) return;

        var indent = dict[info.id] || { prefixLength: 0, extra: 0 };

        dict[info.id] = indent.prefixLength + indent.extra > info.prefixLength + info.extra ?
        indent :
        {
            prefixLength: info.prefixLength,
            extra: info.extra,
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
            (item.prefixLength - info.prefixLength) +
            (item.extra - info.extra) +
            whitespaceNode.length - firstPart.length +
            1).join(' ');

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
        this.oneline = true;

        var dict = {};
        var _this = this;

        // Gathering Info
        this._walk({
            node: node,
            selector: this._getDeclName,
            getExtraSymbols: this._extraIndentDecl,
            payload: function(info, i) {
                _this._updateDict(info, dict, node[i - 1][1]);
            }
        });

        this._walk({
            node: node,
            selector: this._getValName,
            namespaceSelector: this._getDeclName,
            getExtraSymbols: this._extraIndentVal,
            payload: function(info, i) {
                _this._updateDict(info, dict, node[i][3][1][1]);
            }
        });

        if (this.oneline) return;

        // Update nodes
        this._walk({
            node: node,
            selector: this._getDeclName,
            getExtraSymbols: _this._extraIndentDecl,
            payload: function(info, i) {
                if (node[i - 1] !== 's') {
                    node.push(['s', '']);
                }
                node[i - 1][1] = _this._updateIndent(info, dict, node[i - 1][1]);
            }
        });
        this._walk({
            node: node,
            selector: this._getValName,
            namespaceSelector: this._getDeclName,
            getExtraSymbols: this._extraIndentVal,
            payload: function(info, i) {
                var valueNode = node[i][3];
                for (var a = 0; a < valueNode.length; ++a) {
                    if (valueNode[a][0] !== 'function' && valueNode[a][0] !== 'ident')
                        continue;

                    if (valueNode[a - 1][0] !== 's') {
                        valueNode.splice(a, 0, ['s', '']);
                        ++a;
                    }

                    break;
                }

                node[i][3][a - 1][1] = _this._updateIndent(info, dict, valueNode[a - 1][1]);
            }
        });

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

        var _this = this;
        // Gathering Info
        this._walk({
            node: node,
            selector: this._getDeclName,
            getExtraSymbols: _this._extraIndentDecl,
            payload: function(info, i) {
                if (node[i - 1]) {
                    var sum = node[i - 1][1].replace(/^[ \t]*\n+/, '').length + info.prefixLength;
                    getResult(node, sum, info, i);
                }
            }
        });

        this._walk({
            node: node,
            selector: this._getValName,
            getExtraSymbols: this._extraIndentVal,
            payload: function(info, i) {
                if (node[i][3][1]) {
                    var sum = node[i][3][1][1].replace(/^[ \t]*\n+/, '').length + info.prefixLength;
                    getResult(node, sum, info, i);
                }
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
