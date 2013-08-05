module.exports = {

    value: false,

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 'property') {
            if (node[node.length - 1][0] === 's') node.pop();
            if (this.value === 'both' || this.value === 'before')
                node.push(['s', ' ']);
        }
        if (nodeType === 'value') {
            if (node[0][0] === 's') node.shift();
            if (this.value === 'both' || this.value === 'after')
                node.unshift(['s', ' ']);
        }
    }

};
