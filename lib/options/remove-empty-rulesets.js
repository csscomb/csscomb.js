module.exports = {

    /**
     * Sets handler value.
     *
     * @param {String} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        if (value === true) {
            this._value = value;
            return this;
        }
    },

    /**
     * Remove rulesets with no declarations.
     *
     * @param {String} nodeType
     * @param {Array} nodeContent
     */
    process: function(nodeType, nodeContent) {
        if (nodeType === 'stylesheet') {
            this._processStylesheetContent(nodeContent);
        }
    },

    _processStylesheetContent: function(nodeContent) {
        this._removeEmptyRulesets(nodeContent);
        this._mergeAdjacentWhitespace(nodeContent);
    },

    _removeEmptyRulesets: function(nodeContent) {
        var i = nodeContent.length;
        // Loop through node and try to find a ruleset:
        while (i--) {
            var node = nodeContent[i];
            if (!this._isRuleset(node)) continue;
            // If a ruleset is found, try to find its nested rulesets and remove
            // all empty ones:
            var j = node.length;
            while (j--) {
                // Nested rulesets are located inside blocks, that's why look
                // for blocks only:
                var blockNode = node[j];
                if (blockNode[0] !== 'block') continue;
                blockNode.shift();
                this._processStylesheetContent(blockNode);
                blockNode.unshift('block');
                node[j] = blockNode;
            }
            // If after removing all empty nested rulesets the parent has also
            // become empty, remove it too:
            if (this._isEmptyRuleset(node)) {
                nodeContent.splice(i, 1);
            }
        }
    },

    /**
     * Removing ruleset nodes from tree may result in two adjacent whitespace nodes which is not correct AST:
     * [space, ruleset, space] => [space, space]
     * To ensure correctness of further processing we should merge such nodes into one.
     * [space, space] => [space]
     */
    _mergeAdjacentWhitespace: function(nodeContent) {
        var i = nodeContent.length - 1;
        while (i-- > 0) {
            if (this._isWhitespace(nodeContent[i]) && this._isWhitespace(nodeContent[i + 1])) {
                nodeContent[i][1] += nodeContent[i + 1][1];
                nodeContent.splice(i + 1, 1);
            }
        }
    },

    _isEmptyRuleset: function(ruleset) {
        return ruleset.filter(this._isBlock).every(this._isEmptyBlock, this);
    },

    /**
     * Block is considered empty when it has nothing but spaces.
     */
    _isEmptyBlock: function(node) {
        return node.length === 1 || !node.some(this._isNotWhitespace);
    },

    _isDeclarationOrComment: function(node) {
        return ['declaration', 'commentML', 'commentSL'].indexOf(node[0]) > -1;
    },

    _isRuleset: function(node) {
        return node[0] === 'ruleset';
    },

    _isBlock: function(node) {
        return node[0] === 'block';
    },

    _isWhitespace: function(node) {
        return node[0] === 's';
    },

    _isNotWhitespace: function(node) {
        return typeof node === 'object' && node[0] !== 's';
    },

    /**
     * Detects the value of an option at the tree node.
     * This option is treated as `true` by default, but any trailing space would invalidate it.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    _detectDefault: true,

    detect: function(nodeType, node) {
        if (nodeType === 'atrulers' || nodeType === 'block') {
            if (node.length === 0 || (node.length === 1 && node[0][0] === 's')) {
                return false;
            }
        }
    }
};
