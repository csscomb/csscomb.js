module.exports = {

    value: false,

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 'stylesheet') {
            if (node[node.length - 1][0] === 's') node.pop();
            node.push(['s', '\n']);
        }
    }

};
