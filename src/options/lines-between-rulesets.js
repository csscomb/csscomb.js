'use strict';

let gonzales = require('gonzales-pe');

let option = {
  newLinesString: '',
  newLinesNode: null,

  /**
   * Option's name as it's used in config.
   * @type {String}
   */
  get name() {
    return 'lines-between-rulesets';
  },

  /**
   * Name of option that must run after this option.
   * @type {String}
   */
  get runBefore() {
    return 'block-indent';
  },

  /**
   * List of syntaxes that are supported by this option.
   * @type {Array}
   */
  get syntax() {
    return ['css', 'less', 'sass', 'scss'];
  },

  /**
   * Types of values this option accepts in config.
   * @type {Object}
   */
  get accepts() {
    return {
      number: true
    };
  },

  /**
   * @param {number} value
   * @returns {number}
   */
  /*
  ** Still need to override, as the core implementation of setValue doesn't
  ** pass numbers through, but creates a string of spaces of the same length.
  */
  setValue(value) {
    let valueType = typeof value;

    if (valueType !== 'number') {
      throw new Error('Value must be a number.');
    }

    return value;
  },

  buildSpacing(syntax) {
    let spacing = '';
    let numNewLines = 0;
    let newLinesOffset = 1;

    if (syntax === 'sass') {
      newLinesOffset = 0;
    }

    numNewLines = Math.round(this.value) + newLinesOffset;

    for (var i = 0; i < numNewLines; i++) {
      spacing += '\n';
    }

    return spacing;
  },

  /**
   * Processes ast and fixes found code style errors.
   * @param {Node} ast
   */
  process(ast) {
    this.newLinesString = this.buildSpacing(ast.syntax);
    this.newLinesNode = gonzales.createNode({
      type: 'space',
      content: this.newLinesString
    });
    this.processBlock(ast);
  },

  processBlock(x) {
    if (x.is('stylesheet')) {
      // Check all @rules
      this.processAtRules(x);

      // Check all rulesets
      this.processRuleSets(x);
    }

    x.forEach((node) => {
      if (!node.is('block')) {
        return this.processBlock(node);
      }

      // Check all @rules
      this.processAtRules(node);

      // Check all rulesets
      this.processRuleSets(node);

      this.processBlock(node);
    });
  },

  processAtRules(node) {
    node.forEach('atrule', (atRuleNode, index) => {
      this.insertNewlines(node, index);
    });
  },

  processRuleSets(node) {
    node.forEach('ruleset', (ruleSetNode, index) => {
      this.insertNewlines(node, index);
    });
  },

  isComment(node) {
    if (!node) {
      return false;
    }
    return (node.is('singlelineComment') || node.is('multilineComment'));
  },

  isNewline(node) {
    if (!node) {
      return false;
    }
    return (node.content === '\n');
  },

  prevLineIsComment(parent, index) {
    let indexThreshold = 2;
    let prevChild;
    let prevMinusOneChild;
    let prevMinusTwoChild;
    let parentSyntax = parent ? parent.syntax : null;

    // Sass is troublesome because newlines are counted as separate nodes
    if (parentSyntax === 'sass') {
      indexThreshold = 3;
    }

    if (!parent || index < indexThreshold) {
      return false;
    }

    prevChild = parent.get(index - 1);
    prevMinusOneChild = parent.get(index - 2);

    if (parentSyntax === 'sass') {
      prevMinusTwoChild = parent.get(index - 3);
      return (
        this.isComment(prevMinusTwoChild) &&
        this.isNewline(prevMinusOneChild) &&
        prevChild.is('space')
      );
    }

    return (this.isComment(prevMinusOneChild) && prevChild.is('space'));
  },

  /*
  ** Find the latest previous child that isn't a comment, and return its index.
  */
  findLatestNonCommentNode(parent, index) {
    let prevChild;
    let lastNonCommentIndex = -1;
    let currentIndex = index;
    let jumpSize = 2;

    if (parent.syntax === 'sass') {
      jumpSize = 3;
    }

    while (currentIndex >= 0) {
      if (this.prevLineIsComment(parent, currentIndex)) {
        currentIndex -= jumpSize;
        continue;
      }

      prevChild = parent.get(currentIndex - 1);

      if (!this.isComment(prevChild)) {
        lastNonCommentIndex = currentIndex - 1;
        break;
      }

      currentIndex--;
    }

    return lastNonCommentIndex;
  },

  insertNewlinesAsString(node) {
    let content = node.content;
    let lastNewline = content.lastIndexOf('\n');
    let newContent;

    if (lastNewline > -1) {
      content = content.substring(lastNewline + 1);
    }

    newContent = this.newLinesString + content;
    node.content = newContent;
  },

  insertNewlinesAsNode(node) {
    node.insert(node.length, this.newLinesNode);
  },

  insertNewlines(node, index) {
    let prevChild = node.get(index - 1);
    let shouldInsert = false;

    // Check for previous nodes that are not a space
    // Do not insert if the ruleset is the first item
    for (var i = 0; i < index; i++) {
      if (!node.get(i).is('space')) {
        shouldInsert = true;
        break;
      }
    }

    if (prevChild && shouldInsert) {
      if (this.prevLineIsComment(node, index) || this.isComment(prevChild)) {
        let lastNonCommentIndex = this.findLatestNonCommentNode(node, index);
        prevChild = node.get(lastNonCommentIndex);
      }

      if (prevChild.is('space')) {
        this.insertNewlinesAsString(prevChild);
      } else {
        this.insertNewlinesAsNode(prevChild);
      }
    }
  }
};

module.exports = option;
