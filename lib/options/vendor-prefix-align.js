module.exports = {

    /**
     * Internal
     * Containt vendor-prefixes list
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
     * Create object which contains info about vendor prefix used in propertyName
     * @param {String} propertyName property name
     * @returns {Object|undefined}
     */
    _getPrefixInfo: function(propertyName) {
        if (!propertyName) return;

        var result = { baseName: propertyName, prefixLength: 0 };

        this._prefixesList.some(function(prefix) {
            prefix = '-' + prefix + '-';
            if (propertyName.indexOf(prefix) !== 0) return;
            result = {
                baseName: propertyName.substr(prefix.length),
                prefixLength: prefix.length
            };
            return true;
        });

        return result;
    },

    _walk: function(node, selector, payload) {
        node.forEach(function(item, i) {
            var info = this._getPrefixInfo(selector(item));
            if (!info) return;
            payload(info, i);
        }, this);
    },

    _declName: function(item) {
        return item[0] === 'declaration' && item[1][1][1];
    },

    _valName: function(item) {
        return item[0] === 'declaration' && item[2] && item[2][2] &&
            item[2][2][0] === 'funktion' && item[2][2][1][0] === 'ident' &&
            item[2][2][1][1];
    },

    _updateDict: function(info, dict, whitespaceNode) {
        if (info.prefixLength === 0) return;

        var indent = dict[info.baseName] || { prefixLength: 0, baseLength: 0 };

        dict[info.baseName] = indent.prefixLength > info.prefixLength ?
            indent :
            {
                prefixLength: info.prefixLength,
                baseLength: whitespaceNode.substr(whitespaceNode.lastIndexOf('\n') + 1).length
            };
    },

    _updateIndent: function(info, dict, whitespaceNode) {
        if (!dict[info.baseName])
            return whitespaceNode;

        var firstPart = whitespaceNode.substr(0, whitespaceNode.lastIndexOf('\n') + 1 );
        var extraIndent = new Array(
            dict[info.baseName].prefixLength -
            info.prefixLength +
            dict[info.baseName].baseLength + 1).join(' ');

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
        this._walk(node, this._declName, function(info, i) {
            _this._updateDict(info, dict, node[i - 1][1]);
        });
        this._walk(node, this._valName, function(info, i) {
            _this._updateDict(info, dict, node[i][2][1][1]);
        });

        // Update nodes
        this._walk(node, this._declName, function(info, i) {
            node[i - 1][1] = _this._updateIndent(info, dict, node[i - 1][1]);
        });
        this._walk(node, this._valName, function(info, i) {
            node[i][2][1][1] = _this._updateIndent(info, dict, node[i][2][1][1]);
        });
    }

};
