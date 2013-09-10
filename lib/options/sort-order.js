module.exports = {

    /**
     * Sets handler value.
     *
     * @param {Array} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        if (!value) return;

        this._order = {};
        value.forEach(function(group, groupIndex) {
            group.forEach(function(prop, propIndex) {
                this._order[prop] = { group: groupIndex, prop: propIndex };
            }, this);
        }, this);

        return this;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType !== 'block') return;

        var order = this._order;
        var nodeExt = this._createNodeExt(node);
        var firstSymbols = nodeExt[0].decl || nodeExt.shift();
        var lastSymbols = nodeExt[nodeExt.length - 1].decl || nodeExt.pop();

        nodeExt.sort(function(a, b) {
            var indexA = order[a.decl] || { prop: -1 };
            var indexB = order[b.decl] || { prop: -1 };
            var groupDelta = indexA.group - indexB.group;
            var propDelta = indexA.prop - indexB.prop;

            return groupDelta !== 0 ? groupDelta : propDelta;
        });

        firstSymbols && nodeExt.unshift(firstSymbols);
        lastSymbols && nodeExt.push(lastSymbols);

        this._applyNodeExt(node, nodeExt);
    },

    /**
     * Internal. Smart split bunch on '\n' symbols;
     * @param {Array} bunch
     * @param {Boolean} isPrevDeclExists
     */
    _splitBunch: function(bunch, isPrevDeclExists) {
        var nextBunch = [];
        var declAlready = false;
        var flag = false;
        var item;
        var indexOf;

        for (var i = 0; i < bunch.length; ++i) {
            if (flag) { nextBunch.push(bunch[i]); continue; }
            if (bunch[i][0] === 'declaration') { declAlready = true; }

            if (isPrevDeclExists && !declAlready) continue;
            if (bunch[i][0] !== 's') continue;

            var indexOfNewLine = bunch[i][1].indexOf('\n');

            if (indexOfNewLine === -1) continue;

            nextBunch.push(['s', bunch[i][1].substr(indexOfNewLine + 1)]);
            bunch[i][1] = bunch[i][1].substr(0, indexOfNewLine + 1);

            flag = i + 1;
        }

        if (nextBunch.length === 1 && nextBunch[0][0] === 's') {
            item = nextBunch[0];
            indexOf = item[1].lastIndexOf('\n');

            indexOf !== -1 && (item[1] = item[1].substr(indexOf + 1));
        }

        flag && bunch.splice(flag);

        return nextBunch;
    },

    /**
     * Internal. Create extended node in format of list
     * {
     *  data:[,,declaration,]
     *  decl: declarationPropertyName
     * };
     * @param {node} node
     */
    _createNodeExt: function(node) {
        var extNode = [];
        var bunch = [];
        var nextBunch;
        var prevDeclPropertyName;

        node.forEach(function(node) {
            if (node[0] === 'declaration') {
                nextBunch = this._splitBunch(bunch, prevDeclPropertyName);
                extNode.push({ data: bunch, decl: prevDeclPropertyName });
                bunch = nextBunch;
                prevDeclPropertyName = node[1][1][1];
            }
            bunch.push(node);
        }, this);

        nextBunch = this._splitBunch(bunch, prevDeclPropertyName);
        extNode.push({ data: bunch, decl: prevDeclPropertyName });
        nextBunch.length && extNode.push({ data: nextBunch });

        return extNode;
    },

    /**
     * Internal. Add delimiter at the end of groups of properties
     * @param {extNode} extNodePrev
     * @param {extNode} extNode
     */
    _addGroupDelimiter: function(extNodePrev, extNode) {
        if (!extNodePrev.decl || !extNode.decl) return;

        var indexA = this._order[extNodePrev.decl];
        var indexB = this._order[extNode.decl];
        var isGroupBorder = indexA && indexB && indexA.group !== indexB.group;

        if (isGroupBorder) extNode.data.unshift(['s', '\n']);
    },

    /**
     * Internal. apply extNode back at common format node.
     * @param {node} node
     * @param {extNode} extNode
     */
    _applyNodeExt: function(node, extNode) {
        node.splice(0, node.length);
        extNode.forEach(function(item, i) {
            i > 0 && this._addGroupDelimiter(extNode[i - 1], item);
            node.push.apply(node, item.data);
        }, this);
    }

};
