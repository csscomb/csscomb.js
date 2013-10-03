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
        while (i--) {
            if (this._isRuleset(nodeContent[i]) && this._isEmptyRuleset(nodeContent[i])) {
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
     * Block considered empty when it has no declarations or comments.
     */
    _isEmptyBlock: function(node) {
        return !node.some(this._isDeclarationOrComment);
    },

    _isDeclarationOrComment: function(node) {
        return node[0] === 'declaration' || node[0] === 'comment';
    },

    _isRuleset: function(node) {
        return node[0] === 'ruleset';
    },

    _isBlock: function(node) {
        return node[0] === 'block';
    },

    _isWhitespace: function(node) {
        return node[0] === 's';
    }

};
