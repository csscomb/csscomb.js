module.exports = {

    value: false,

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        if (nodeType === 's') {
            node[0] = node[0].replace(/[ \t]+\n/g, '\n');
        }

        if (nodeType === 'stylesheet') {
            if (node[node.length - 1][0] === 's') node.pop();
            node.push(['s', '\n']);
        }
    }

};
