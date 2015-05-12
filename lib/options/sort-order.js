var gonzales = require('gonzales-pe');

module.exports = {
    name: 'sort-order',

    runBefore: 'space-before-closing-brace',

    syntax: ['css', 'less', 'sass', 'scss'],

    /**
     * Sets handler value.
     *
     * @param {Array} value Option value
     * @returns {Array}
     */
    setValue: function(value) {
        if (!Array.isArray(value)) throw new Error('The option accepts only array of properties.');

        var order = {};

        if (typeof value[0] === 'string') {
            value.forEach(function(prop, propIndex) {
                order[prop] = { group: 0, prop: propIndex };
            });
        } else {
            value.forEach(function(group, groupIndex) {
                group.forEach(function(prop, propIndex) {
                    order[prop] = { group: groupIndex, prop: propIndex };
                });
            });
        }

        return order;
    },

    /**
     * Processes tree node.
     * @param {node} node
     */
    process: function(node) {
        var _this = this;
        // Types of nodes that can be sorted:
        var NODES = ['atruleb', 'atruler', 'atrules', 'multilineComment', 'singlelineComment',
            'declaration', 'space', 'include'];
        // Spaces and comments:
        var SC = ['multilineComment', 'singlelineComment', 'space'];

        var currentNode;
        // Sort order of properties:
        var order = this.getValue('sort-order');
        var syntax = this.getSyntax();
        // List of declarations that should be sorted:
        var sorted = [];
        // list of nodes that should be removed from parent node:
        var deleted = [];
        // List of spaces and comments that go before declaration/@-rule:
        var sc0 = [];
        // Value to search in sort order: either a declaration's property name
        // (e.g. `color`), or @-rule's special keyword (e.g. `$import`):
        var propertyName;

        // Index to place the nodes that shouldn't be sorted
        var lastGroupIndex = order['...'] ? order['...'].group : Infinity;
        var lastPropertyIndex = order['...'] ? order['...'].prop : Infinity;

        // Counters for loops:
        var i;
        var l;
        var j;
        var nl;

        /**
         * Remove empty lines in space node.
         * @param {node} node Space node.
         */
        var removeEmptyLines = function(node) {
            node.content = node.content.replace(/\n[\s\t\n\r]*\n/, '\n');
        };

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
                currentNode = node.get(i);
                // If there is no node left,
                // stop and do nothing with previously found spaces/comments:
                if (!currentNode) {
                    return false;
                }

                // If the node is declaration or @-rule, stop and return all
                // found nodes with spaces and comments (if there are any):
                if (SC.indexOf(currentNode.type) === -1) break;

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
                currentNode = node.get(i + 1);
                // If there is no node, or it is nor spaces neither comment, stop:
                if (!currentNode || SC.indexOf(currentNode.type) === -1) break;

                if (currentNode.is('multilineComment') || currentNode.is('singlelineComment')) {
                    sc.push(currentNode);
                    d.push(i + 1);
                    continue;
                }

                lbIndex = currentNode.content.indexOf('\n');

                // If there are any line breaks in a node with spaces, stop and
                // split the node into two: one with spaces before line break
                // and one with `\n` symbol and everything that goes after.
                // Combine the first one with declaration/@-rule's node:
                if (lbIndex > -1) {
                    // TODO: Don't push an empty array
                    var s = currentNode.content.substring(0, lbIndex);
                    var space = gonzales.createNode({ type: 's', content: s });
                    sc.push(space);
                    currentNode.content = currentNode.content.substring(lbIndex);
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
            currentNode = node.get(i);
            var nextNode = node.get(i + 1);
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
                sc1: [],
                sc2: [],
                delim: []
            };

            // If the declaration's property is in order's list, save its
            // group and property indices. Otherwise set them to 10000, so
            // declaration appears at the bottom of a sorted list:

            extendedNode.groupIndex = orderProperty && orderProperty.group > -1 ?
                orderProperty.group : lastGroupIndex;
            extendedNode.propertyIndex = orderProperty && orderProperty.prop > -1 ?
                orderProperty.prop : lastPropertyIndex;

            // Mark current node to remove it later from parent node:
            deleted.push(i);

            extendedNode.sc1 = checkSC1();

            if (extendedNode.sc1.length) {
                currentNode = node.get(i);
                nextNode = node.get(i + 1);
            }

            // If there is `;` right after the declaration, save it with the
            // declaration and mark it for removing from parent node:
            if (currentNode && nextNode && nextNode.is('declarationDelimiter')) {
                extendedNode.delim.push(nextNode);
                deleted.push(i + 1);
                i++;

                if (syntax === 'sass') return extendedNode;

                // Save spaces and comments which follow right after the declaration
                // and mark them for removing from parent node:
                extendedNode.sc2 = checkSC1();
            }

            return extendedNode;
        };

        /**
         * Sorts properties alphabetically.
         *
         * @param {Object} a First extended node
         * @param {Object} b Second extended node
         * @returns {Number} `-1` if properties should go in order `a, b`. `1`
         * if properties should go in order `b, a`.
         */
        var sortLeftovers = function(a, b) {
            var prefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''];
            var prefixesRegExp = /^(-webkit-|-moz-|-ms-|-o-)(.*)$/;

            // Get property name (i.e. `color`, `-o-animation`):
            a = a.node.get(0).get(0).content;
            b = b.node.get(0).get(0).content;

            // Get prefix and unprefixed part. For example:
            // ['-o-animation', '-o-', 'animation']
            // ['color', '', 'color']
            a = a.match(prefixesRegExp) || [a, '', a];
            b = b.match(prefixesRegExp) || [b, '', b];

            if (a[2] !== b[2]) {
                // If unprefixed parts are different (i.e. `border` and
                // `color`), compare them:
                return a[2] < b[2] ? -1 : 1;
            } else {
                // If unprefixed parts are identical (i.e. `border` in
                // `-moz-border` and `-o-border`), compare prefixes (they
                // should go in the same order they are set in `prefixes` array):
                return prefixes.indexOf(a[1]) < prefixes.indexOf(b[1]) ? -1 : 1;
            }
        };

        // TODO: Think it through!
        // Sort properties only inside blocks:
        if (!node.is('block')) return;

        // Check every child node.
        // If it is declaration (property-value pair, e.g. `color: tomato`),
        // or @-rule (e.g. `@include nani`),
        // combine it with spaces, semicolon and comments and move them from
        // current node to a separate list for further sorting:
        for (i = 0, l = node.length; i < l; i++) {
            if (NODES.indexOf(node.get(i).type) === -1) continue;

            // Save preceding spaces and comments, if there are any, and mark
            // them for removing from parent node:
            sc0 = checkSC0();
            if (!sc0) continue;

            // If spaces/comments are the last nodes, stop and go to sorting:
            if (!node.get(i)) {
                deleted.splice(deleted.length - sc0.length, deleted.length + 1);
                break;
            }

            // Check if the node needs to be sorted:
            // it should be a special @-rule (e.g. `@include`) or a declaration
            // with a valid property (e.g. `color` or `$width`).
            // If not, proceed with the next node:
            propertyName = null;
            // Look for includes:
            if (node.get(i).is('include')) {
                propertyName = '$include';
            } else {
                for (j = 0, nl = node.get(i).length; j < nl; j++) {
                    currentNode = node.get(i).get(j);
                    if (!currentNode) continue;

                    if (currentNode.is('property')) {
                        propertyName = currentNode.get(0).is('variable') ?
                            '$variable' : currentNode.get(0).content;
                        break;
                    } else if (currentNode.is('atkeyword') &&
                        currentNode.get(0).content === 'import') { // Look for imports
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
            node.content.splice(deleted[i], 1);
        }

        // Sort declarations saved for sorting:
        sorted.sort(function(a, b) {
            // If a's group index is higher than b's group index, in a sorted
            // list a appears after b:
            if (a.groupIndex !== b.groupIndex) return a.groupIndex - b.groupIndex;

            // If a and b belong to leftovers and `sort-order-fallback` option
            // is set to `abc`, sort properties alphabetically:
            if (a.groupIndex === lastGroupIndex &&
                _this.getValue('sort-order-fallback')) {
                return sortLeftovers(a, b);
            }

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
                var sc2 = currentNode.sc2;

                sc0.reverse().map(removeEmptyLines);
                sc1.reverse().map(removeEmptyLines);
                sc2.reverse().map(removeEmptyLines);

                // Divide declarations from different groups with an empty line:
                if (prevNode && currentNode.groupIndex > prevNode.groupIndex) {
                    if (sc0[0] && sc0[0].is('space') &&
                       (this.syntax === 'sass' ||
                        sc0[0].content.match(/\n/g) &&
                        sc0[0].content.match(/\n/g).length < 2)) {
                        sc0[0].content = '\n' + sc0[0].content;
                    }
                }

                for (j = 0, nl = sc2.length; j < nl; j++) {
                    node.content.unshift(sc2[j]);
                }
                if (currentNode.delim.length > 0) {
                    var delim = this.syntax === 'sass' ? '\n' : ';';
                    var declDelim = gonzales.createNode({ type: 'declarationDelimiter', content: delim });
                    node.content.unshift(declDelim);
                }
                for (j = 0, nl = sc1.length; j < nl; j++) {
                    node.content.unshift(sc1[j]);
                }
                node.content.unshift(currentNode.node);

                for (j = 0, nl = sc0.length; j < nl; j++) {
                    node.content.unshift(sc0[j]);
                }
            }
        }
    }
};
