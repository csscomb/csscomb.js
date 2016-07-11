'use strict';

var gonzales = require('gonzales-pe');

module.exports = {
  get name() {
    return 'sort-order';
  },

  get runBefore() {
    return 'space-before-closing-brace';
  },

  get syntax() {
    return ['css', 'less', 'sass', 'scss'];
  },

  /**
   * @param {Array} value Option value
   * @returns {Array}
   */
  setValue(value) {
    if (!Array.isArray(value))
      throw new Error('The option accepts only array of properties.');

    var order = {};

    if (typeof value[0] === 'string') {
      // If there is only one group of properties.
      value.forEach(function(prop, propIndex) {
        order[prop] = {group: 0, prop: propIndex};
      });
    } else {
      value.forEach(function(group, groupIndex) {
        group.forEach(function(prop, propIndex) {
          order[prop] = {group: groupIndex, prop: propIndex};
        });
      });
    }

    return order;
  },

  /**
   * @param {node} ast
   * @param {object} config
   */
  process(ast, config) {
    this._config = config;
    // Sort properties only inside blocks.
    ast.traverseByType('block', this._processBlock.bind(this));
  },

  _cleanSassLinebreaks(node) {
    let containsOnlyLinebreaks = true;

    node.forEach((space) => {
      if (!space.is('space') || space.content !== '\n') {
        containsOnlyLinebreaks = false;
        return null;
      }
    });

    if (containsOnlyLinebreaks)
      node.content = [];
  },

  _extendNode(block, i, spacesBefore) {
    let nodesToDelete = [i];
    let node = block.get(i);
    let extendedNode = {i: i, node: node};

    let propertyName = this._getSortableName(node);
    if (!propertyName) return null;

    // Check if current node's property name is in sort order.
    let propertyIndex = this.value[propertyName];
    // If the declaration's property is in order's list, save its
    // group and property indices. Otherwise set them to 10000, so
    // declaration appears at the bottom of a sorted list:
    extendedNode.groupIndex = propertyIndex && propertyIndex.group > -1 ?
        propertyIndex.group : this._getLastGroupIndex();
    extendedNode.propertyIndex = propertyIndex && propertyIndex.prop > -1 ?
        propertyIndex.prop : this._getLastPropertyIndex();

    // Spaces before node.
    nodesToDelete = nodesToDelete.concat(spacesBefore);
    extendedNode.spacesBeforeNode =
        this._getNodesByIndex(block, spacesBefore);

    // Spaces after node.
    let spacesBeforeDelimiter =
        this._getSpacesAndCommentsAfterNode(block, i);
    nodesToDelete = nodesToDelete.concat(spacesBeforeDelimiter);
    extendedNode.spacesBeforeDelimiter =
        this._getNodesByIndex(block, spacesBeforeDelimiter);

    i += spacesBeforeDelimiter.length;

    // Spaces after delimiter.
    // If there is `;` right after the declaration, save it with the
    // declaration and mark it for removing from parent node:
    if (block.get(i + 1) && block.get(i + 1).is('declarationDelimiter')) {
      i += 1;
      node = block.get(i);
      nodesToDelete.push(i);
      extendedNode.delim = node;

      if (node.syntax !== 'sass') {
        // Save spaces and comments which follow right after
        // the declaration and mark them for removing from parent node:
        let spacesAfterDelimiter =
            this._getSpacesAndCommentsAfterNode(block, i);
        i += spacesAfterDelimiter.length;
        nodesToDelete = nodesToDelete.concat(spacesAfterDelimiter);
        extendedNode.spacesAfterDelimiter =
            this._getNodesByIndex(block, spacesAfterDelimiter);
      }
    }

    extendedNode.endIndex = i;
    // Remove all nodes, that were moved to `sortables` list,
    // from block node:
    extendedNode.nodesToDelete = nodesToDelete;

    return extendedNode;
  },

  _getLastGroupIndex() {
    return this.value && this.value['...'] ?
        this.value['...'].group : Infinity;
  },

  _getLastPropertyIndex() {
    return this.value && this.value['...'] ?
        this.value['...'].prop : Infinity;
  },

  _getNodesByIndex(block, index) {
    return index.map((i) => block.get(i));
  },

  _getSortableIncludeName(node) {
    // Divide `include` into mixins with specific name
    // (e. g. `$include breakpoint`), and the rest — `$include`.
    let mixinName;

    if (node.syntax === 'less') {
      // `node.first()` is class and `node.first().first()` is ident.
      mixinName = node.first().first().content;
    } else if (node.syntax === 'sass' && node.first().content === '+') {
      // `node.first()` is `+` and `node.get(1)` is ident.
      mixinName = node.get(1).content;
    } else {
      // `node.first()` is @-keyword, `node.get(1)` is space and
      // `node.get(2)` is ident.
      mixinName = node.get(2).content;
    }

    let includeMixinName = '$include ' + mixinName;
    return this.value.hasOwnProperty(includeMixinName) ?
        includeMixinName :
        '$include';
  },

  _getSortableName(node) {
    if (node.is('extend')) return '$extend';
    if (node.is('include')) return this._getSortableIncludeName(node);
    else return this._getSortablePropertyName(node);
  },

  _getSortablePropertyName(node) {
    if (node.is('declaration')) {
      let property = node.first('property').first();
      return property.is('variable') ? '$variable' : property.content;
    }

    let atkeyword = node.first('atkeyword');
    if (atkeyword && atkeyword.first().content === 'import')
        return '$import';
  },

  _getSpacesAndCommentsAfterNode(node, i) {
    // List of start positions for nodes with spaces and comments:
    let positions = [];

    // Skip node itself.
    i++;

    for (let l = node.length; i < l; i++) {
      let currentNode = node.get(i);

      // If node is nor spaces neither comment, stop.
      if (!this._isSpaceOrComment(currentNode)) break;

      if (currentNode.is('multilineComment') ||
          currentNode.is('singlelineComment')) {
        positions.push(i);
        continue;
      }

      // If there are any line breaks in a node with spaces, stop and
      // split the node into two: one with spaces before line break
      // and one with `\n` symbol and everything that goes after.
      // Combine the first one with declaration/@-rule's node:
      let linebreakIndex = currentNode.content.indexOf('\n');
      if (linebreakIndex !== -1) {
        var s = currentNode.content.substring(0, linebreakIndex);
        if (s === '') break;
        var space = gonzales.createNode({type: 'space', content: s});
        node.insert(i + 1, space);
        positions.push(i + 1);
        currentNode.content = currentNode.content
            .substring(linebreakIndex);
        break;
      }

      positions.push(i);
    }

    return positions;
  },

  /**
   * Check if there are any comments or spaces before
   * the declaration/@-rule.
   * @param {Node} node
   * @param {Number} i
   * @returns {Array} List of nodes with spaces and comments
   */
  _getSpacesAndCommentsBeforeNode(node, i) {
    // List of start positions for nodes with spaces and comments:
    let positions = [];
    let sendPositions = false;

    for (let l = node.length; i < l; i++) {
      let currentNode = node.get(i);

      // If the node is declaration or @-rule, stop and return all
      // found nodes with spaces and comments (if there are any):
      if (!this._isSpaceOrComment(currentNode)) {
        sendPositions = true;
        break;
      }

      positions.push(i);
    }

    return sendPositions ? positions : null;
  },

  _insertSortablesToBlock(nodesToSort, node) {
    if (node.syntax === 'sass')
      this._cleanSassLinebreaks(node);

    for (let i = nodesToSort.length - 1, l = -1; i > l; i--) {
      let currentNode = nodesToSort[i];
      let prevNode = nodesToSort[i - 1];
      let spacesBeforeNode = currentNode.spacesBeforeNode || [];
      let spacesBeforeDelimiter = currentNode.spacesBeforeDelimiter || [];
      let spacesAfterDelimiter = currentNode.spacesAfterDelimiter || [];

      if (node.syntax === 'sass' && spacesBeforeNode.length) {
        let space = spacesBeforeNode[0];
        space.content = space.content.replace(/\n/, '');
      }

      spacesBeforeNode.reverse().map(this._removeEmptyLines);
      spacesBeforeDelimiter.reverse().map(this._removeEmptyLines);
      spacesAfterDelimiter.reverse().map(this._removeEmptyLines);

      // Divide declarations from different groups with
      // an empty line:
      if (prevNode && currentNode.groupIndex > prevNode.groupIndex) {
        let space = spacesBeforeNode[0];
        if (space && space.is('space') &&
            (space.syntax === 'sass' ||
            space.content.match(/\n/g) &&
            space.content.match(/\n/g).length < 2)) {
          space.content = '\n' + space.content;
        }
      }

      for (let j = 0, nl = spacesAfterDelimiter.length; j < nl; j++) {
        node.content.unshift(spacesAfterDelimiter[j]);
      }

      if (currentNode.delim) {
        node.content.unshift(currentNode.delim);
      } else if (i !== nodesToSort.length - 1 &&
          (currentNode.node.is('declaration') ||
          currentNode.node.is('extend'))) {
        let delimiter = gonzales.createNode({
          type: 'declarationDelimiter',
          content: currentNode.node.syntax === 'sass' ? '\n' : ';'
        });
        node.content.unshift(delimiter);
      }

      for (let j = 0, nl = spacesBeforeDelimiter.length; j < nl; j++) {
        node.content.unshift(spacesBeforeDelimiter[j]);
      }

      node.content.unshift(currentNode.node);

      for (let j = 0, nl = spacesBeforeNode.length; j < nl; j++) {
        node.content.unshift(spacesBeforeNode[j]);
      }
    }
  },

  // Types of nodes that can be sorted.
  _isAcceptableNode(node) {
    const NODES = ['atrule', 'declaration', 'extend', 'include',
                    'multilineComment', 'singlelineComment', 'space'];
    return NODES.indexOf(node.type) !== -1;
  },

  // Spaces and comments.
  _isSpaceOrComment(node) {
    const SC = ['multilineComment', 'singlelineComment', 'space'];
    return SC.indexOf(node.type) !== -1;
  },

  _processBlock(block) {
    // Check every child node.
    // If it is declaration (property-value pair, e.g. `color: tomato`),
    // or @-rule (e.g. `@include nani`),
    // combine it with spaces, semicolon and comments and move them from
    // current node to a separate list for further sorting:
    let nodesToSort = this._separateSortablesFromBlock(block);
    this._sortNodes(nodesToSort);
    this._insertSortablesToBlock(nodesToSort, block);
  },

  /**
   * Remove empty lines in space node.
   * @param {node} node Space node.
   */
  _removeEmptyLines(node) {
    node.content = node.content.replace(/\n[\s\t\n\r]*\n/, '\n');
  },

  _separateSortablesFromBlock(block) {
    let sortables = [];
    let nodesToDelete = [];

    // Don't cache `block.length` since we may insert new nodes into it.
    for (let i = 0; i < block.length; i++) {
      let node = block.get(i);
      if (!this._isAcceptableNode(node)) continue;

      // Save preceding spaces and comments, if there are any,
      // and mark them for removing from parent node:
      let spacesBeforeNode =
          this._getSpacesAndCommentsBeforeNode(block, i);
      if (!spacesBeforeNode) break;

      i += spacesBeforeNode.length;
      node = block.get(i);

      let extendedNode = this._extendNode(block, i, spacesBeforeNode);
      if (!extendedNode) continue;

      nodesToDelete = nodesToDelete.concat(extendedNode.nodesToDelete);
      i = extendedNode.endIndex;
      sortables.push(extendedNode);
    }

    nodesToDelete.sort((a, b) => a - b);
    for (let x = nodesToDelete.length - 1; x > -1; x--)
      block.removeChild(nodesToDelete[x]);

    return sortables;
  },

  _sortLeftovers(a, b) {
    let prefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''];
    let prefixesRegExp = /^(-webkit-|-moz-|-ms-|-o-)(.*)$/;

    // Get property name (i.e. `color`, `-o-animation`):
    a = a.node.first().first().content;
    b = b.node.first().first().content;

    // Get prefix and unprefixed part. For example:
    // ['-o-animation', '-o-', 'animation']
    // ['color', '', 'color']
    a = a.match(prefixesRegExp) || [a, '', a];
    b = b.match(prefixesRegExp) || [b, '', b];

    if (a[2] !== b[2]) {
      // If unprefixed parts are different (i.e. `border` and
      // `color`), compare them:
      return a[2] <= b[2] ? -1 : 1;
    } else {
      // If unprefixed parts are identical (i.e. `border` in
      // `-moz-border` and `-o-border`), compare prefixes.
      // They should go in the same order they are set
      // in `prefixes` array.
      return prefixes.indexOf(a[1]) <= prefixes.indexOf(b[1]) ? -1 : 1;
    }
  },

  _sortNodes(nodes) {
    nodes.sort((a, b) => {
      // If a's group index is higher than b's group index, in
      // a sorted list a appears after b:
      if (a.groupIndex !== b.groupIndex)
        return a.groupIndex - b.groupIndex;

      // If a and b belong to leftovers and `sort-order-fallback`
      // option is set to `abc`, sort properties alphabetically:
      if (a.groupIndex === this._getLastGroupIndex() &&
          this._config['sort-order-fallback']) {
        return this._sortLeftovers(a, b);
      }

      // If a and b have the same group index, and a's property index
      // is higher than b's property index, in a sorted list
      // a appears after b:
      if (a.propertyIndex !== b.propertyIndex)
        return a.propertyIndex - b.propertyIndex;

      // If a and b have the same group index and the same property
      // index, in a sorted list they appear in the same order
      // they were in original array:
      return a.i - b.i;
    });
  },

  detect: () => []
};
