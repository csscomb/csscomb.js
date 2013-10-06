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
        var order = this._order, // sort order of properties
            sorted = [], // list of declarations that should be sorted
            deleted = [], // list of nodes that should be removed from parent node
            p, // property's name
            NODES = ['declaration', 's', 'comment', 'atruleb', 'atrules', 'atruler'], // allowed nodes
            SC = ['s', 'comment'], // spaces and comments
            i, l, j, nl; // counters for loops

        // TODO: Think it through!
        if (nodeType !== 'block') return;

        // Check every child node.
        // If it is declaration (property-value pair, e.g. `color: tomato`),
        // combine it with spaces, semicolon and comments and move them from
        // current node to a separate list for further sorting:
        for (i = 0, l = node.length; i < l; i++) {
            if (NODES.indexOf(node[i][0]) === -1) continue;

            // Save preceding spaces and comments, if there are any, and mark
            // them for removing from parent node:
            var sc0 = _checkSC0(i);
            if (!sc0) continue;

            if (!node[i]) {
                deleted.splice(deleted.length - sc0.length, deleted.length + 1);
                break;
            }

            // Check if there is a property (e.g. `color`) inside
            // the declaration. If not, proceed with the next node:
            p = null;
            for (j = 1, nl = node[i].length; j < nl; j++) {
                if (node[i][j][0] === 'property') {
                    if (node[i][j][1][0] === 'variable') {
                        p = '$variable';
                    } else {
                        p = node[i][j][1][1];
                    }
                    break;
                } else if (node[i][j][0] === 'atkeyword') {
                    if (['import', 'include', 'extend'].indexOf(node[i][j][1][1]) > -1) {
                        p = '$' + node[i][j][1][1];
                    }
                    break;
                }
            }

            if (!p) {
                deleted = [];
                continue;
            }

            // Combine declaration node with other relevant information
            // (property index, semicolon, spaces and comments):
            var n = {
                node: node[i],
                sc0: sc0,
                delim: [],
                // If the declaration's property is in order's list, save its
                // group and property indices. Otherwise set them to 10000, so
                // declaration appears at the bottom of a sorted list:
                gi: (order[p] && order[p].group > -1 ? order[p].group + 2 : 10000), // group index
                pi: (order[p] && order[p].prop > -1 ? order[p].prop + 2 : 10000) // property index
            };

            // Mark the declaration node to remove it later from parent node:
            deleted.push(i);

            // If there is `;` right after the declaration, save it with the
            // declaration and mark it for removing from parent node:
            if (node[i + 1] && node[i + 1][0] === 'decldelim') {
                n.delim.push(node[i + 1]);
                deleted.push(i + 1);
                i++;
            }


            // Save spaces and comments which follow right after the declaration
            // and mark them for removing from parent node:
            n.sc1 = _checkSC1(i);

            // Move the declaration node to a separate list for further sorting:
            sorted.push(n);

        }



        // Remove all nodes, that were moved to a `sorted` list, from parent node:
        for (i = 0, j = 0, l = deleted.length; i < l; i++, j++) {
            // Since every time we remove an element from an array, array's
            // length reduces by 1, save number of already removed elements (`j`)
            // and use it to find the index of a next element to remove:
            node.splice(deleted[i] - j, 1);
        }

        // Sort declarations saved for sorting:
        sorted.sort(function(a, b) {
            // If a's group index is higher than b's group index, in a sorted
            // list a appears after b:
            if (a.gi !== b.gi) return a.gi - b.gi;

            // If a and b have the same group index, and a's property index is
            // higher than b's property index, in a sorted list a appears after
            // b:
            return a.pi - b.pi;
        });

        // Build all nodes back together. First go sorted declarations, then
        // everything else:
        if (sorted.length > 0) {
            for (i = sorted.length - 1, l = -1; i > l; i--) {

                // Divide declarations from different groups with an empty line:
                if (sorted[i - 1] && sorted[i].gi > sorted[i - 1].gi) {
                    if (sorted[i].sc0[0] && sorted[i].sc0[0][0] === 's' &&
                        sorted[i].sc0[0][1].match(/\n/g) &&
                        sorted[i].sc0[0][1].match(/\n/g).length < 2) {
                            sorted[i].sc0.unshift(['s', '\n']);
                    }
                }

                sorted[i].sc0.reverse();
                sorted[i].sc1.reverse();

                for (j = 0, nl = sorted[i].sc1.length; j < nl; j++) {
                    node.unshift(sorted[i].sc1[j]);
                }
                if (sorted[i].delim.length > 0) node.unshift(['decldelim']);
                node.unshift(sorted[i].node);
                for (j = 0, nl = sorted[i].sc0.length; j < nl; j++) {
                    node.unshift(sorted[i].sc0[j]);
                }
            }
        }

        /**
         * Check if there are any comments or spaces before the declaration
         * @returns {Array} List of nodes with spaces and comments
         * @private
         */
        function _checkSC0 () {
            var sc = [],
                d = [];

            for (; i < l; i++) {
                // If there is no node, or it is nor spaces neither comment, stop:
                if (!node[i] ||
                    NODES.indexOf(node[i][0]) === -1) {
                        return false;
                }

                // If node is declaration or @-rule:
                if (SC.indexOf(node[i][0]) === -1) break;

                sc.push(node[i]);
                d.push(i);
            }

            deleted = deleted.concat(d);

            return sc;
        }

        /**
         * Check if there are any comments or spaces after the declaration
         * @returns {Array} List of nodes with spaces and comments
         * @private
         */
        function _checkSC1 () {
            var sc = [], // nodes with spaces and comments
                d = [];

            // Check every next node:
            for (; i < l; i++) {
                // If there is no node, or it is nor spaces neither comment, stop:
                if (!node[i + 1] || SC.indexOf(node[i + 1][0]) === -1) break;

                if (node[i + 1][0] === 'comment') {
                    sc.push(node[i + 1]);
                    d.push(i + 1);
                    continue;
                }

                var lbIndex = node[i + 1][1].indexOf('\n');

                if (lbIndex > -1) {
                    // TODO: Don't push an empty array
                    sc.push(['s', node[i + 1][1].substring(0, lbIndex)]);
                    node[i + 1][1] = node[i + 1][1].substring(lbIndex);
                    break;
                }

                sc.push(node[i + 1]);
                d.push(i + 1);
            }

            deleted = deleted.concat(d);

            return sc;
        }
    }
};
