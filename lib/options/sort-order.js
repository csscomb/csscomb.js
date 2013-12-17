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

        if (typeof value[0] === 'string') {
            value.forEach(function(prop, propIndex) {
                this._order[prop] = { group: 0, prop: propIndex };
            }, this);
        } else {
            value.forEach(function(group, groupIndex) {
                group.forEach(function(prop, propIndex) {
                    this._order[prop] = { group: groupIndex, prop: propIndex };
                }, this);
            }, this);
        }

        return this;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        // Types of nodes that can be sorted:
        var NODES = ['atruleb', 'atruler', 'atrules', 'commentML', 'commentSL',
            'declaration', 's', 'include'];
        // Spaces and comments:
        var SC = ['commentML', 'commentSL', 's'];

        var currentNode;
        // Sort order of properties:
        var order = this._order;
        // List of declarations that should be sorted:
        var sorted = [];
        // list of nodes that should be removed from parent node:
        var deleted = [];
        // List of spaces and comments that go before declaration/@-rule:
        var sc0 = [];
        // Value to search in sort order: either a declaration's property name
        // (e.g. `color`), or @-rule's special keyword (e.g. `$import`):
        var propertyName;

        // Counters for loops:
        var i;
        var l;
        var j;
        var nl;

        /**
         * Check if there are any comments or spaces before
         * the declaration/@-rule.
         * @returns {Array} List of nodes with spaces and comments
         */
        var checkSC0 = function() {
            // List of nodes with spaces and comments:
            var sc = [];
            // List of nodes that can be later deleted from parent node:
            var d = [];

            for (; i < l; i++) {
                currentNode = node[i];
                // If there is no node left,
                // stop and do nothing with previously found spaces/comments:
                if (!currentNode) {
                    return false;
                }

                // Remove any empty lines:
                if (currentNode[0] === 's') {
                    currentNode[1] = currentNode[1].replace(/\n[\s\t\n\r]*\n/, '\n');
                }

                // If the node is declaration or @-rule, stop and return all
                // found nodes with spaces and comments (if there are any):
                if (SC.indexOf(currentNode[0]) === -1) break;

                sc.push(currentNode);
                d.push(i);
            }

            deleted = deleted.concat(d);

            return sc;
        };

        /**
         * Check if there are any comments or spaces after
         * the declaration/@-rule.
         * @returns {Array} List of nodes with spaces and comments
         * @private
         */
        var checkSC1 = function() {
            // List of nodes with spaces and comments:
            var sc = [];
            // List of nodes that can be later deleted from parent node:
            var d = [];
            // Position of `\n` symbol inside a node with spaces:
            var lbIndex;

            // Check every next node:
            for (; i < l; i++) {
                currentNode = node[i + 1];
                // If there is no node, or it is nor spaces neither comment, stop:
                if (!currentNode || SC.indexOf(currentNode[0]) === -1) break;

                // Remove any empty lines:
                if (currentNode[0] === 's') {
                    currentNode[1] = currentNode[1].replace(/\n[\s\t\n\r]*\n/, '\n');
                }

                if (['commentML', 'commentSL'].indexOf(currentNode[0]) > -1) {
                    sc.push(currentNode);
                    d.push(i + 1);
                    continue;
                }

                lbIndex = currentNode[1].indexOf('\n');

                // If there are any line breaks in a node with spaces, stop and
                // split the node into two: one with spaces before line break
                // and one with `\n` symbol and everything that goes after.
                // Combine the first one with declaration/@-rule's node:
                if (lbIndex > -1) {
                    // TODO: Don't push an empty array
                    sc.push(['s', currentNode[1].substring(0, lbIndex)]);
                    currentNode[1] = currentNode[1].substring(lbIndex);
                    break;
                }

                sc.push(currentNode);
                d.push(i + 1);
            }

            deleted = deleted.concat(d);

            return sc;
        };

        /**
         * Combine declaration/@-rule's node with other relevant information:
         * property index, semicolon, spaces and comments.
         * @returns {Object} Extended node
         */
        var extendNode = function() {
            currentNode = node[i];
            var nextNode = node[i + 1];
            // Object containing current node, all corresponding spaces,
            // comments and other information:
            var extendedNode;
            // Check if current node's property name is in sort order.
            // If it is, save information about its indices:
            var orderProperty = order[propertyName];

            extendedNode = {
                i: i,
                node: currentNode,
                sc0: sc0,
                delim: []
            };

            // If the declaration's property is in order's list, save its
            // group and property indices. Otherwise set them to 10000, so
            // declaration appears at the bottom of a sorted list:
            extendedNode.groupIndex = orderProperty && orderProperty.group > -1 ?
                orderProperty.group : 10000;
            extendedNode.propertyIndex = orderProperty && orderProperty.prop > -1 ?
                orderProperty.prop : 10000;

            // Mark current node to remove it later from parent node:
            deleted.push(i);

            // If there is `;` right after the declaration, save it with the
            // declaration and mark it for removing from parent node:
            if (currentNode && nextNode && nextNode[0] === 'declDelim') {
                extendedNode.delim.push(nextNode);
                deleted.push(i + 1);
                i++;
            }

            // Save spaces and comments which follow right after the declaration
            // and mark them for removing from parent node:
            extendedNode.sc1 = checkSC1();

            return extendedNode;
        };

        // TODO: Think it through!
        // Sort properties only inside blocks:
        if (nodeType !== 'block') return;

        // Check every child node.
        // If it is declaration (property-value pair, e.g. `color: tomato`),
        // or @-rule (e.g. `@include nani`),
        // combine it with spaces, semicolon and comments and move them from
        // current node to a separate list for further sorting:
        for (i = 0, l = node.length; i < l; i++) {
            if (NODES.indexOf(node[i][0]) === -1) continue;

            // Save preceding spaces and comments, if there are any, and mark
            // them for removing from parent node:
            sc0 = checkSC0();
            if (!sc0) continue;

            // If spaces/comments are the last nodes, stop and go to sorting:
            if (!node[i]) {
                deleted.splice(deleted.length - sc0.length, deleted.length + 1);
                break;
            }

            // Check if the node needs to be sorted:
            // it should be a special @-rule (e.g. `@include`) or a declaration
            // with a valid property (e.g. `color` or `$width`).
            // If not, proceed with the next node:
            propertyName = null;
            // Look for includes:
            if (node[i][0] === 'include') {
                propertyName = '$include';
            } else {
                for (j = 1, nl = node[i].length; j < nl; j++) {
                    currentNode = node[i][j];
                    if (currentNode[0] === 'property') {
                        propertyName = currentNode[1][0] === 'variable' ?
                            '$variable' : currentNode[1][1];
                        break;
                    } else if (currentNode[0] === 'atkeyword' &&
                        currentNode[1][1] === 'import') { // Look for imports
                        propertyName = '$import';
                        break;
                    }
                }
            }

            // If current node is not property-value pair or import or include,
            // skip it and continue with the next node:
            if (!propertyName) {
                deleted.splice(deleted.length - sc0.length, deleted.length + 1);
                continue;
            }

            // Make an extended node and move it to a separate list for further
            // sorting:
            sorted.push(extendNode());
        }

        // Remove all nodes, that were moved to a `sorted` list, from parent node:
        for (i = deleted.length - 1; i > -1; i--) {
            node.splice(deleted[i], 1);
        }

        // Sort declarations saved for sorting:
        sorted.sort(function(a, b) {
            // If a's group index is higher than b's group index, in a sorted
            // list a appears after b:
            if (a.groupIndex !== b.groupIndex) return a.groupIndex - b.groupIndex;

            // If a and b have the same group index, and a's property index is
            // higher than b's property index, in a sorted list a appears after
            // b:
            if (a.propertyIndex !== b.propertyIndex) return a.propertyIndex - b.propertyIndex;

            // If a and b have the same group index and the same property index,
            // in a sorted list they appear in the same order they were in
            // original array:
            return a.i - b.i;
        });

        // Build all nodes back together. First go sorted declarations, then
        // everything else:
        if (sorted.length > 0) {
            for (i = sorted.length - 1, l = -1; i > l; i--) {
                currentNode = sorted[i];
                var prevNode = sorted[i - 1];
                sc0 = currentNode.sc0;
                var sc1 = currentNode.sc1;

                // Divide declarations from different groups with an empty line:
                if (prevNode && currentNode.groupIndex > prevNode.groupIndex) {
                    if (sc0[0] && sc0[0][0] === 's' &&
                        sc0[0][1].match(/\n/g) &&
                        sc0[0][1].match(/\n/g).length < 2) {
                        sc0.unshift(['s', '\n']);
                    }
                }

                sc0.reverse();
                sc1.reverse();

                for (j = 0, nl = sc1.length; j < nl; j++) {
                    node.unshift(sc1[j]);
                }
                if (currentNode.delim.length > 0) node.unshift(['declDelim']);
                node.unshift(currentNode.node);
                for (j = 0, nl = sc0.length; j < nl; j++) {
                    node.unshift(sc0[j]);
                }
            }
        }
    }
};
