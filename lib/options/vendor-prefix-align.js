module.exports = (function() {
    // Vendor prefixes list:
    var PREFIXES = [
        'webkit',
        'moz',
        'ms',
        'o'
    ];

    var oneline;

    /**
     * Makes namespace from property name.
     *
     * @param {String} propertyName
     * @returns {String|undefined}
     */
    function makeNamespace(propertyName) {
        var info = getPrefixInfo(propertyName);
        return info && info.baseName;
    }

    /**
     * Creates object which contains info about vendor prefix used in propertyName.
     *
     * @param {String} propertyName property name
     * @param {String} [namespace=''] namespace name
     * @param {Number} [extraSymbols=0] extra symbols count
     * @returns {Object|undefined}
     */
    function getPrefixInfo(propertyName, namespace, extraSymbols) {
        var baseName = propertyName;
        var prefixLength = 0;

        namespace = namespace || '';
        extraSymbols = extraSymbols || 0;

        if (!propertyName) return;

        PREFIXES.some(function(prefix) {
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
    }

    /**
     * Returns extra indent for item in arguments
     *
     * @param {Array} nodes nodes to process
     * @returns {Number|undefined}
     */
    function extraIndent(nodes) {
        if (!nodes || !nodes.length) return;

        var node;
        var crPos;
        var tabPos;
        var result = 0;

        for (var i = nodes.length; i--;) {
            node = nodes[i];

            if (!Array.isArray(node))
                continue;

            if (!node[1]) {
                crPos = -1;
            } else {
                crPos = node[1].lastIndexOf('\n');
                tabPos = node[1].lastIndexOf('\t');
                if (tabPos > crPos) crPos = tabPos;
            }

            if (crPos !== -1)
                oneline = false;

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
    }

    /**
     * Wrapper for extra indent function for `property` node.
     *
     * @param {Array} nodes all nodes
     * @param {Number} i position in nodes array
     */
    function extraIndentProperty(nodes, i) {
        var subset = [];
        while (i--) {
            if (!nodes[i] || nodes[i][0] === 'declDelim')
                break;
            subset.unshift(nodes[i]);
        }
        return extraIndent(subset);
    }

    /**
     * Wrapper for extra indent function for val-node.
     *
     * @param {Array} nodes all nodes
     * @param {Number} i position in nodes array
     */
    function extraIndentVal(nodes, i) {
        var subset = [];
        var declaration = nodes[i];

        for (var x = declaration.length; x--;) {
            if (declaration[x][0] !== 'value') continue;

            x--;

            while (declaration[x][0] !== 'propertyDelim') {
                subset.push(declaration[x]);
                x--;
            }

            break;
        }
        return extraIndent(subset);
    }

    /**
     * Walks across nodes, and call payload for every node that pass selector check.
     *
     * @param {Object} args arguments in form of:
     *  {
     *      node: {object} current node,
     *      selector: {function} propertyName selector
     *      payload: {function} work to do with gathered info
     *      namespaceSelector: {function} selector for namespace
     *      getExtraSymbols: {Number} extra symbols count
     *  }
     */
    function walk(args) {
        args.node.forEach(function(item, i) {
            var name = args.selector(item);
            var info = name && getPrefixInfo(
                name,
                args.namespaceSelector && makeNamespace(args.namespaceSelector(item)),
                args.getExtraSymbols(args.node, i)
            );
            if (!info) return;
            args.payload(info, i);
        });
    }

    /**
     * Returns property name.
     * e.g.
     * for: 'color: #fff'
     * returns string: 'color'
     *
     * @param {node} node
     * @returns {String|undefined}
     */
    function getPropertyName(node) {
        if (node[0] !== 'declaration') return;
        // TODO: Check that it's not a variable
        return node[1][1][1];
    }

    /**
     * Returns property value name.
     * e.g.
     * for: '-webkit-transition: -webkit-transform 150ms linear'
     * returns string: '-webkit-transform', and
     * for: 'background: -webkit-linear-gradient(...)'
     * returns string: '-webkit-linear-gradient'
     *
     * @param {node} node
     * @returns {String|undefined}
     */
    function getValName(node) {
        if (node[0] !== 'declaration') return;

        var valueNode;
        var value;

        for (var i = node.length; i--;) {
            valueNode = node[i];

            if (valueNode[0] !== 'value') continue;

            value = valueNode[1];

            if (value[0] === 'ident') return value[1];
            if (value[0] === 'function') return value[1][1];
        }
    }

    /**
     * Updates dict which contains info about items align.
     *
     * @param {Object} info,
     * @param {Object} dict,
     */
    function updateDict(info, dict) {
        if (info.prefixLength === 0 && info.extra === 0) return;

        var indent = dict[info.id] || { prefixLength: 0, extra: 0 };

        dict[info.id] = indent.prefixLength + indent.extra > info.prefixLength + info.extra ?
            indent :
            {
                prefixLength: info.prefixLength,
                extra: info.extra,
            };
    }

    /**
     * Returns string with correct number of spaces for info.baseName property.
     *
     * @param {Object} info,
     * @param {Object} dict,
     * @param {String} whitespaceNode
     * @returns {String}
     */
    function updateIndent(info, dict, whitespaceNode) {
        var item = dict[info.id];
        if (!item)
            return whitespaceNode;

        var crPos = whitespaceNode.lastIndexOf('\n');
        var tabPos = whitespaceNode.lastIndexOf('\t');
        if (tabPos > crPos) crPos = tabPos;

        var firstPart = whitespaceNode.substr(0, crPos + 1 );
        var extraIndent = new Array(
            (item.prefixLength - info.prefixLength) +
            (item.extra - info.extra) +
            whitespaceNode.length - firstPart.length +
            1).join(' ');

        return firstPart.concat(extraIndent);
    }

    return {
        name: 'vendor-prefix-align',

        syntax: ['css', 'less', 'sass', 'scss'],

        accepts: { boolean: [true] },

        /**
         * Processes tree node.
         *
         * @param {String} nodeType
         * @param {node} node
         */
        process: function(nodeType, node) {
            if (nodeType !== 'block') return;
            oneline = true;

            var dict = {};

            // Gathering Info
            walk({
                node: node,
                selector: getPropertyName,
                getExtraSymbols: extraIndentProperty,
                payload: function(info) {
                    updateDict(info, dict);
                }
            });

            walk({
                node: node,
                selector: getValName,
                namespaceSelector: getPropertyName,
                getExtraSymbols: extraIndentVal,
                payload: function(info) {
                    updateDict(info, dict);
                }
            });

            if (oneline && this.getSyntax() !== 'sass') return;

            // Update nodes
            walk({
                node: node,
                selector: getValName,
                namespaceSelector: getPropertyName,
                getExtraSymbols: extraIndentVal,
                payload: function(info, i) {
                    for (var x = node[i].length; x--;) {
                        if (node[i][x][0] === 'value') break;
                    }

                    if (node[i][x - 1][0] !== 's') {
                        node[i].splice(x, 0, ['s', '']);
                        ++x;
                    }

                    node[i][x - 1][1] = updateIndent(info, dict, node[i][x - 1][1]);
                }
            });

            if (this.getSyntax() === 'sass') return;

            walk({
                node: node,
                selector: getPropertyName,
                getExtraSymbols: extraIndentProperty,
                payload: function(info, i) {
                    // `node[i - 1]` can be either space or comment:
                    var whitespaceNode = node[i - 1];
                    if (!whitespaceNode) return;
                    // If it's a comment, insert an empty space node:
                    if (whitespaceNode[0] !== 's') {
                        whitespaceNode = ['s', ''];
                        node.splice(i - 1, 0, whitespaceNode);
                    }
                    whitespaceNode[1] = updateIndent(info, dict, whitespaceNode[1]);
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

            // Gathering Info
            walk({
                node: node,
                selector: getPropertyName,
                getExtraSymbols: extraIndentProperty,
                payload: function(info, i) {
                    if (node[i - 1] && node[i - 1][1]) {
                        var sum = node[i - 1][1].replace(/^[ \t]*\n+/, '').length + info.prefixLength;
                        getResult(node, sum, info, i);
                    }
                }
            });

            walk({
                node: node,
                selector: getValName,
                getExtraSymbols: extraIndentVal,
                payload: function(info, i) {
                    for (var x = node[i].length; x--;) {
                        if (node[i][x][0] === 'value') break;
                    }

                    if (node[i][x - 1][1]) {
                        var sum = node[i][x - 1][1].replace(/^[ \t]*\n+/, '').length + info.prefixLength;
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
})();
